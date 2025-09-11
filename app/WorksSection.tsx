'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import {
  FolderOpen,
  Building2,
  GraduationCap,
  Sparkles,
  Trophy,
  Shield,
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
  images?: Img[];         // optional: direct list (overrides folder)
  folder?: string;        // folder slug under /public/gallery
  link?: { href: string; label: string };
};

type TabKey = 'organizational' | 'academic' | 'independent';

/* ---------------- Data (now points to folders) ---------------- */
const DATA: Record<TabKey, Work[] | Record<'UEFA' | 'FIFA', Work[]>> = {
  organizational: {
    UEFA: [
      {
        title: 'Player Workload Analysis – UEFA Intelligence Center',
        longText: [
          'Integrated Transfermarkt, OPTA, and UEFA’s FAME data to analyze multi-season player workload using statistical and machine learning methods, surfacing trends, risk signals, and actionable insights for player management.',
        ],
        folder: 'UEFA_IC_IMAGES',
      },
      {
        title: 'Technical Metric Implementation – UEFA Performance Analysis Department',
        longText: [
          'Developed methodologies and automated core performance metrics from UEFA tracking and event data—ball location, press/pass classification, progression, effective time, and ball-out-of-play—using custom algorithms with clear, decision-ready visualizations.',
        ],
        folder: 'UEFA_PA_IMAGES',
      },
    ],
    FIFA: [
      {
        title: 'An Open-Source Implementation of FIFA’s Enhanced Football Intelligence',
        longText: [
          'Open-source implementation of FIFA’s E.F.I. metrics (e.g., possession control, phases of play, ball recovery time, line breaks, receptions behind lines, defensive line height, team shape, final-third entries, forced turnovers, pressure on the ball, expected goals) to make the framework reproducible and accessible for researchers and practitioners.',
        ],
        folder: 'FIFA_IMAGES',
      },
    ],
  },

  academic: [
    {
      title: 'Shape Graphs and Tactical Inference',
      longText: [
        'Introduced shape graphs to capture team formations frame-by-frame without aggregation, enabling explainable automatic formation detection and novel “position plots” that visualize tactical fluidity with context.',
      ],
      link: { href: 'https://lnkd.in/drwewjHB', label: 'Read more' },
      folder: 'SHAPE_GRAPHS_IMAGES', 
    },

    // NEW ITEM ↓
    {
        title: 'Clustering Passing Patterns',
        longText: [
        'Clustering passing patterns of players and teams by building spatial networks.',
        'Constructed pitch-zone graphs with edges weighted by pass frequency, directionality, and progression value, then embed and cluster the network to reveal recurring structures and styles.',
        'Outputs include role/phase archetypes and team signatures that are comparable across matches and seasons.',
        ],
        // no images, no folder, no link for now
    },
  ],

  independent: [
     {
      title: 'Corner Kick Strategy Identification',
      longText: [
        'Analyzed corner kicks, aiming to identify patterns, strategies, and player movements that create scoring opportunities. It applies methodologies based on IFAB rules and prior research in automatic event detection. Examined player distribution across zones, defensive tactics like man-marking versus zonal defending, and player positioning through clustering analysis. Results reveal how teams defend and attack during corner kicks, offering insights into tactical strengths and weaknesses. ',
      ],
      folder: 'CORNER_KICK_ANALYSIS', 
    }
  ],
};

export default function WorksSection() {
  const [tab, setTab] = useState<TabKey>('organizational');

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
            A snapshot of organizational projects, academic research & development, and independent work.
          </p>
        </div>

        {/* Tabs */}
        <div className="mx-auto mt-8 flex w-full max-w-3xl items-center justify-center rounded-xl border border-gray-800 bg-gray-900/60 p-1">
          <TabButton
            active={tab === 'organizational'}
            onClick={() => setTab('organizational')}
            icon={<Building2 className="h-4 w-4" />}
            label="Organizational"
          />
          <TabButton
            active={tab === 'academic'}
            onClick={() => setTab('academic')}
            icon={<GraduationCap className="h-4 w-4" />}
            label="Academy R&D"
          />
          <TabButton
            active={tab === 'independent'}
            onClick={() => setTab('independent')}
            icon={<Sparkles className="h-4 w-4" />}
            label="Independent"
          />
        </div>

        {/* Panels */}
        <div className="mt-8">
          {tab === 'organizational' ? (
            <OrganizationalPanel data={DATA.organizational as Record<'UEFA' | 'FIFA', Work[]>} />
          ) : tab === 'academic' ? (
            <GridPanel items={DATA.academic as Work[]} />
          ) : (
            <GridPanel items={DATA.independent as Work[]} emptyHint="Add independent projects when ready." />
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------- UI pieces ---------------- */

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
  setIndex: React.Dispatch<React.SetStateAction<number>>; // <-- FIXED TYPE
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
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close gallery"
          className="absolute right-3 top-3 rounded-lg border border-gray-800 bg-gray-900 p-2 text-gray-300 hover:bg-gray-800"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Main image */}
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
          {/* reusing ChevronRight from above imports */}
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
      className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm transition-colors ${
        active ? 'bg-primary-red text-white' : 'text-gray-300 hover:bg-gray-900 hover:text-white'
      }`}
      aria-pressed={active}
    >
      {icon}
      {label}
    </button>
  );
}

function OrganizationalPanel({ data }: { data: Record<'UEFA' | 'FIFA', Work[]> }) {
  return (
    <div className="grid gap-6">
      {/* UEFA */}
      <SectionHeader icon={<Shield className="h-4 w-4 text-primary-red" />} title="UEFA" />
      <GridPanel items={data.UEFA} />
      {/* FIFA */}
      <SectionHeader icon={<Trophy className="h-4 w-4 text-primary-red" />} title="FIFA" />
      <GridPanel items={data.FIFA} />
    </div>
  );
}

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

/* ---------------- Work Card (fetches folder images) ---------------- */
function WorkCard({ work }: { work: Work }) {
  const [imgs, setImgs] = useState<Img[]>(work.images || []);
  const [pdfs, setPdfs] = useState<string[]>([]); // ← NEW
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!work.images && work.folder) {
        const res = await fetch(`/api/gallery/${encodeURIComponent(work.folder)}`);
        const json = (await res.json()) as { images: string[]; pdfs?: string[] }; // ← accept pdfs
        if (!cancelled) {
          if (json?.images?.length) setImgs(json.images.map((src) => ({ src, alt: work.title })));
          if (json?.pdfs?.length) setPdfs(json.pdfs); // ← store pdfs
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
      {/* Title */}
      <h4 className="text-base font-semibold text-white">{work.title}</h4>

      {/* Text */}
      {work.longText && (
        <div className="mt-3 space-y-2 text-sm text-gray-300">
          {work.longText.map((p, i) => (
            <p key={i} style={{ textAlign: 'justify' }}>
              {p}
            </p>
          ))}
        </div>
      )}

      {/* Optional external link */}
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

      {/* PDF action (only if a PDF exists) */}
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

      {/* Image preview strip (clickable; render only when there are images) */}
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

      {/* Lightbox */}
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
