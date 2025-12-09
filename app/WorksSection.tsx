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

/* ---------------- DATA ---------------- */
const DATA: Record<TabKey, Work[]> = {
  UEFA: [
    {
      title: 'Player Workload Analysis – UEFA Intelligence Center',
      longText: [
        'Integrated Transfermarkt, OPTA, and UEFA’s FAME data to analyze multi-season player workload...'
      ],
      folder: 'UEFA_IC_IMAGES',
    },
    {
      title: 'Technical Metric Implementation – UEFA Performance Analysis Department',
      longText: [
        'Developed methodologies and automated core performance metrics from UEFA tracking and event data...'
      ],
      folder: 'UEFA_PA_IMAGES',
    },
  ],

  FIFA: [
    {
      title: 'An Open-Source Implementation of FIFA’s Enhanced Football Intelligence',
      longText: [
        'Open-source implementation of FIFA’s E.F.I. metrics...'
      ],
      folder: 'FIFA_IMAGES',
    },
  ],

  academic: [
    {
      title: 'Shape Graphs and Tactical Inference',
      longText: [
        'Introduced shape graphs to capture formations frame-by-frame...'
      ],
      link: { href: 'https://lnkd.in/drwewjHB', label: 'Read more' },
      folder: 'SHAPE_GRAPHS_IMAGES',
    },
    {
      title: 'Clustering Passing Patterns',
      longText: [
        'Clustering passing patterns by building spatial networks...',
      ],
    },
  ],

  independent: [
    {
      title: 'Corner Kick Strategy Identification',
      longText: [
        'Analyzed corner kicks to identify patterns, strategies, and player movements...'
      ],
      folder: 'CORNER_KICK_ANALYSIS',
    },
  ],
};


export default function WorksSection() {
  const [tab, setTab] = useState<TabKey>('UEFA'); // ← FIXED

  return (
    <section id="selected-works" className="scroll-mt-28 w-full mt-24 md:mt-28">
      <div className="mx-auto w-full max-w-6xl px-4">

        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-gray-800 px-3 py-1 text-xs uppercase tracking-wider text-gray-300">
            <FolderOpen className="h-3.5 w-3.5 text-primary-red" />
            Previous Works
          </span>
          <h2 className="text-3xl font-semibold sm:text-4xl text-white">Selected Work</h2>
          <p className="mt-3 text-gray-400">
            A collection of UEFA & FIFA projects, academic research, and independent analytical work.
          </p>
        </div>

        {/* Tabs */}
        <div className="mx-auto mt-8 flex w-full max-w-3xl items-center justify-center rounded-xl border border-gray-800 bg-gray-900/60 p-1">
          <TabButton
            active={tab === 'UEFA'}
            onClick={() => setTab('UEFA')}
            icon={<Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
            label="UEFA"
          />
          <TabButton
            active={tab === 'FIFA'}
            onClick={() => setTab('FIFA')}
            icon={<Globe2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
            label="FIFA"
          />
          <TabButton
            active={tab === 'academic'}
            onClick={() => setTab('academic')}
            icon={<GraduationCap className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
            label="Academy R&D"
          />
          <TabButton
            active={tab === 'independent'}
            onClick={() => setTab('independent')}
            icon={<Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
            label="Independent"
          />
        </div>

        {/* Panels */}
        <div className="mt-8">
          {tab === 'UEFA' ? (
            <GridPanel items={DATA.UEFA} />
          ) : tab === 'FIFA' ? (
            <GridPanel items={DATA.FIFA} />
          ) : tab === 'academic' ? (
            <GridPanel items={DATA.academic} />
          ) : (
            <GridPanel items={DATA.independent} emptyHint="Add independent projects when ready." />
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
}: {
  open: boolean;
  images: Img[];
  index: number;
  onClose: () => void;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
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
          aria-label="Close gallery"
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
            aria-label="Previous"
            onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-lg bg-black/50 p-2 text-gray-200 hover:bg-black/70"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            aria-label="Next"
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
        active
          ? 'bg-primary-red text-white'
          : 'text-gray-300 hover:bg-gray-900 hover:text-white',
      ].join(' ')}
      aria-pressed={active}
    >
      {icon}
      <span className="truncate">{label}</span>
    </button>
  );
}

/* Section Header (kept for future use) */
function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="grid h-7 w-7 place-items-center rounded-lg border border-gray-800 bg-gray-900">
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-white">{title}</h3>
    </div>
  );
}

/* Grid of cards */
function GridPanel({ items, emptyHint }: { items: Work[]; emptyHint?: string }) {
  if (!items?.length) {
    return (
      <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-6 text-sm text-gray-400">
        {emptyHint || 'No items yet.'}
      </div>
    );
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {items.map((w, i) => (
        <WorkCard key={`${w.title}-${i}`} work={w} />
      ))}
    </div>
  );
}

/* Work Card */
function WorkCard({ work }: { work: Work }) {
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
          if (json?.images?.length)
            setImgs(json.images.map((src) => ({ src, alt: work.title })));
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
            View PDF
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
            >
              <Image src={img.src} alt={img.alt || work.title} fill className="object-cover" />
              {i === preview.length - 1 && more > 0 && (
                <div className="absolute inset-0 grid place-items-center bg-black/60 text-xs font-semibold text-white">
                  +{more} more
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
      />
    </div>
  );
}
