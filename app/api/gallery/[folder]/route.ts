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

export async function GET(
  _req: Request,
  { params }: { params: { folder: string } }
) {
  try {
    const { folder } = params;
    const dir = path.join(process.cwd(), 'public', 'gallery', folder);
    const files = await fs.readdir(dir);

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
