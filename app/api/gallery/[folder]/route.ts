// app/api/gallery/[folder]/route.ts
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg']);
const PDF_EXTS = new Set(['.pdf']);

function naturalCompare(a: string, b: string) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

// Safely extract the folder segment from /api/gallery/:folder
function getFolderFromUrl(url: string): string | null {
  const u = new URL(url);
  const parts = u.pathname.split('/').filter(Boolean); // e.g. ['api','gallery','FIFA_IMAGES']
  const idx = parts.indexOf('gallery');
  if (idx === -1 || !parts[idx + 1]) return null;
  return decodeURIComponent(parts[idx + 1]);
}

export async function GET(req: Request) {
  try {
    const folder = getFolderFromUrl(req.url);
    if (!folder) {
      return NextResponse.json({ images: [], pdfs: [] }, { status: 200 });
    }

    // Resolve and guard against path traversal
    const baseDir = path.join(process.cwd(), 'public', 'gallery');
    const dir = path.resolve(baseDir, folder);
    if (!dir.startsWith(baseDir)) {
      return NextResponse.json({ images: [], pdfs: [] }, { status: 200 });
    }

    const files = await fs.readdir(dir).catch(() => []);
    const sorted = files.sort(naturalCompare);

    const images = sorted
      .filter((f) => IMAGE_EXTS.has(path.extname(f).toLowerCase()))
      .map((f) => `/gallery/${folder}/${f}`);

    const pdfs = sorted
      .filter((f) => PDF_EXTS.has(path.extname(f).toLowerCase()))
      .map((f) => `/gallery/${folder}/${f}`);

    return NextResponse.json({ images, pdfs });
  } catch {
    return NextResponse.json({ images: [], pdfs: [] }, { status: 200 });
  }
}
