// app/WorksSection.tsx
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import {
  FolderOpen,
  GraduationCap,
  Sparkles,
  Shield,
  Globe2,
  ChevronRight,
  X,
  ChevronLeft,
  FileText,
  ExternalLink,
} from 'lucide-react';
import { getStrings, type Lang } from './i18n';

type Img = { src: string; alt?: string };

type Work = {
  org?: 'UEFA' | 'FIFA';
  title: string;
  longText?: string[];
  images?: Img[];
  folder?: string;
  link?: { href: string; label: string };
};

type TabKey = 'UEFA' | 'FIFA' | 'academic' | 'independent';

export default function WorksSection({ lang }: { lang: Lang }) {
  const t = getStrings(lang);

  const DATA: Record<TabKey, Work[]> = useMemo(
    () => ({
      UEFA: [
        {
          title: t.works.items.uefa.workload.title,
          longText: [t.works.items.uefa.workload.p1],
          folder: 'UEFA_IC_IMAGES',
        },
        {
          title: t.works.items.uefa.tech.title,
          longText: [t.works.items.uefa.tech.p1],
          folder: 'UEFA_PA_IMAGES',
        },
      ],

      FIFA: [
        {
          title: t.works.items.fifa.efi.title,
          longText: [t.works.items.fifa.efi.p1],
          folder: 'FIFA_IMAGES',
        },
      ],

      academic: [
        {
          title: t.works.items.academic.shapeGraphs.title,
          longText: [t.works.items.academic.shapeGraphs.p1],
          link: { href: 'https://lnkd.in/drwewjHB', label: t.works.readMore },
          folder: 'SHAPE_GRAPHS_IMAGES',
        },
        {
          title: t.works.items.academic.clustering.title,
          longText: [t.works.items.academic.clustering.p1],
        },
      ],

      independent: [
        {
          title: t.works.items.independent.cornerKicks.title,
          longText: [t.works.items.independent.cornerKicks.p1],
          folder: 'CORNER_KICK_ANALYSIS',
        },
      ],
    }),
    [t]
  );

  const [tab, setTab] = useState<TabKey>('UEFA');

  return (
    <section id="selected-works" className="scroll-mt-28 w-full mt-24 md:mt-28">
      <div className="mx-auto w-full max-w-6xl px-4">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-gray-800 px-3 py-1 text-xs uppercase tracking-wider text-gray-300">
            <FolderOpen className="h-3.5 w-3.5 text-primary-red" />
            {t.works.badge}
          </span>

          <h2 className="text-3xl font-semibold sm:text-4xl text-white">{t.works.title}</h2>

          <p className="mt-3 text-gray-400">{t.works.subtitle}</p>
        </div>

        {/* Tabs */}
        <div className="mx-auto mt-8 flex w-full max-w-3xl items-center justify-center rounded-xl border border-gray-800 bg-gray-900/60 p-1">
          <TabButton
            active={tab === 'UEFA'}
            onClick={() => setTab('UEFA')}
            icon={<Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
            label={t.works.tabs.uefa}
          />
          <TabButton
            active={tab === 'FIFA'}
            onClick={() => setTab('FIFA')}
            icon={<Globe2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
            label={t.works.tabs.fifa}
          />
          <TabButton
            active={tab === 'academic'}
            onClick={() => setTab('academic')}
            icon={<GraduationCap className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
            label={t.works.tabs.academic}
          />
          <TabButton
            active={tab === 'independent'}
            onClick={() => setTab('independent')}
            icon={<Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
            label={t.works.tabs.independent}
          />
        </div>

        {/* Panels */}
        <div className="mt-8">
          {tab === 'UEFA' ? (
            <GridPanel items={DATA.UEFA} emptyHint={t.works.empty.default} t={t} />
          ) : tab === 'FIFA' ? (
            <GridPanel items={DATA.FIFA} emptyHint={t.works.empty.default} t={t} />
          ) : tab === 'academic' ? (
            <GridPanel items={DATA.academic} emptyHint={t.works.empty.default} t={t} />
          ) : (
            <GridPanel items={DATA.independent} emptyHint={t.works.empty.independent} t={t} />
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------- UI components ---------------- */

function Lightbox({
  open,
  images,
  index,
  onClose,
  setIndex,
  t,
}: {
  open: boolean;
  images: Img[];
  index: number;
  onClose: () => void;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  t: ReturnType<typeof getStrings>;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % images.length);
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, images.length, onClose, setIndex]);

  if (!open || !images.length) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative mx-4 w-full max-w-5xl rounded-2xl border border-gray-800 bg-gray-950 p-3 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label={t.works.lightbox.close}
          className="absolute right-3 top-3 rounded-lg border border-gray-800 bg-gray-900 p-2 text-gray-300 hover:bg-gray-800"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-black">
          <Image
            src={images[index].src}
            alt={images[index].alt || `Media ${index + 1}`}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-contain"
            priority
          />

          <button
            aria-label={t.works.lightbox.prev}
            onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-lg bg-black/50 p-2 text-gray-200 hover:bg-black/70"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            aria-label={t.works.lightbox.next}
            onClick={() => setIndex((i) => (i + 1) % images.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-black/50 p-2 text-gray-200 hover:bg-black/70"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Thumbnails */}
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
          {images.map((img, i) => (
            <button
              key={`${img.src}-${i}`}
              onClick={() => setIndex(i)}
              className={`relative aspect-video overflow-hidden rounded-lg border ${
                i === index ? 'border-primary-red' : 'border-gray-800'
              } bg-gray-900`}
              aria-label={t.works.lightbox.thumb.replace('{n}', String(i + 1))}
            >
              <Image src={img.src} alt={img.alt || `Thumb ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Tab Button */
function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        'min-w-0 flex flex-1 items-center justify-center',
        'gap-1.5 sm:gap-2 rounded-md sm:rounded-lg px-2 sm:px-3 md:px-4 py-1.5 sm:py-2',
        'text-xs sm:text-sm transition-colors',
        active ? 'bg-primary-red text-white' : 'text-gray-300 hover:bg-gray-900 hover:text-white',
      ].join(' ')}
      aria-pressed={active}
    >
      {icon}
      <span className="truncate">{label}</span>
    </button>
  );
}

/* Grid of cards */
function GridPanel({
  items,
  emptyHint,
  t,
}: {
  items: Work[];
  emptyHint?: string;
  t: ReturnType<typeof getStrings>;
}) {
  if (!items?.length) {
    return (
      <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-6 text-sm text-gray-400">
        {emptyHint || t.works.empty.default}
      </div>
    );
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {items.map((w, i) => (
        <WorkCard key={`${w.title}-${i}`} work={w} t={t} />
      ))}
    </div>
  );
}

/* Work Card */
function WorkCard({ work, t }: { work: Work; t: ReturnType<typeof getStrings> }) {
  const [imgs, setImgs] = useState<Img[]>(work.images || []);
  const [pdfs, setPdfs] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!work.images && work.folder) {
        const res = await fetch(`/api/gallery/${encodeURIComponent(work.folder)}`);
        const json = (await res.json()) as { images: string[]; pdfs?: string[] };
        if (!cancelled) {
          if (json?.images?.length) setImgs(json.images.map((src) => ({ src, alt: work.title })));
          if (json?.pdfs?.length) setPdfs(json.pdfs);
        }
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [work.folder, work.images, work.title]);

  const preview = useMemo(() => imgs.slice(0, 3), [imgs]);
  const more = Math.max(0, imgs.length - preview.length);

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/60 p-5">
      <h4 className="text-base font-semibold text-white">{work.title}</h4>

      {work.longText && (
        <div className="mt-3 space-y-2 text-sm text-gray-300">
          {work.longText.map((p, i) => (
            <p key={i} style={{ textAlign: 'justify' }}>
              {p}
            </p>
          ))}
        </div>
      )}

      {work.link && (
        <a
          href={work.link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary-red hover:underline"
        >
          {work.link.label}
          <ChevronRight className="h-4 w-4" />
        </a>
      )}

      {pdfs.length > 0 && (
        <div className="mt-4">
          <a
            href={pdfs[0]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-800 px-3 py-2 text-sm text-gray-200 hover:bg-gray-900"
          >
            <FileText className="h-4 w-4 text-primary-red" />
            {t.works.viewPdf}
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      )}

      {imgs.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-2">
          {preview.map((img, i) => (
            <button
              key={`${img.src}-${i}`}
              onClick={() => openAt(i)}
              className="relative aspect-video overflow-hidden rounded-md border border-gray-800 bg-black focus:outline-none"
              title={img.alt || work.title}
              aria-label={t.works.openMedia.replace('{n}', String(i + 1))}
            >
              <Image src={img.src} alt={img.alt || work.title} fill className="object-cover" />
              {i === preview.length - 1 && more > 0 && (
                <div className="absolute inset-0 grid place-items-center bg-black/60 text-xs font-semibold text-white">
                  +{more} {t.works.more}
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      <Lightbox
        open={open}
        images={imgs}
        index={index}
        onClose={() => setOpen(false)}
        setIndex={setIndex}
        t={t}
      />
    </div>
  );
}
