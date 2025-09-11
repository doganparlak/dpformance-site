'use client';

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Database,
  BarChart3,
  MessageSquare,
  Sparkles,
  SlidersHorizontal,
  FileBarChart2,
  Target,
  CheckCircle2,
  ShieldCheck,
  Compass,
  Users,
  Layout,
  FileText,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react";

const GALLERY: { src: string; alt: string }[] = [
  { src: "/gallery/Overview.png", alt: "Overview" },
  { src: "/gallery/Team_Strategy_Area_Ex.png", alt: "Team strategy area example" },
  { src: "/gallery/chat_area_ex.png", alt: "Chat area example" },
  { src: "/gallery/chat_area_ex_3.png", alt: "Chat area example" },
  { src: "/gallery/chat_area_ex_4.png", alt: "Chat area example" },
  { src: "/gallery/scouting_report_request.png", alt: "Scouting report request" },
];

const REPORT_PDF = "/gallery/scouting_report.pdf";

export default function ProductsSection() {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  // keyboard controls for the lightbox
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % GALLERY.length);
      if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + GALLERY.length) % GALLERY.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const openGallery = (startAt = 0) => {
    setIdx(startAt);
    setOpen(true);
  };

  return (
    <section id="products" className="scroll-mt-28 relative py-20 sm:py-24">
      {/* Soft background accent (dark with subtle red tint) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-10rem] h-[28rem] w-[56rem] -translate-x-1/2 rounded-full bg-red-500/5 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-gray-800 px-3 py-1 text-xs uppercase tracking-wider text-gray-300">
            <Sparkles className="h-3.5 w-3.5 text-primary-red" /> New Product
          </span>
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl text-white">
            Products
          </h2>
          <p className="mt-3 text-gray-400">
            Purpose-built tools that amplify your football intelligence. Meet our flagship product.
          </p>
        </div>

        {/* DP-ScoutIQ Card */}
        <div className="mx-auto mt-10 max-w-6xl rounded-3xl border border-gray-800 bg-gray-900/60 p-6 shadow-lg sm:p-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-primary-red px-2.5 py-1 text-xs font-medium text-white">
                  DP-ScoutIQ
                </span>
                <span className="inline-flex items-center rounded-full border border-gray-800 px-2.5 py-1 text-xs text-gray-300">
                  AI-Powered Scouting
                </span>
              </div>
              <h3 className="mt-3 text-2xl font-semibold sm:text-3xl text-white">
                AI-Powered Scouting & Recruitment Intelligence
              </h3>
              <p className="mt-3 text-gray-400">
                DP-ScoutIQ is an advanced chatbot for football scouting. Built on a Retrieval-Augmented
                Generation (RAG) architecture and multi-agent orchestration, it helps you analyze,
                compare, and recruit players—fast.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-gray-400">
                <span className="rounded-full border border-gray-800 px-2.5 py-1">RAG</span>
                <span className="rounded-full border border-gray-800 px-2.5 py-1">Multi-Agent</span>
                <span className="rounded-full border border-gray-800 px-2.5 py-1">Vector DB</span>
                <span className="rounded-full border border-gray-800 px-2.5 py-1">Custom Modules</span>
                <span className="rounded-full border border-gray-800 px-2.5 py-1">Demo: 1,000+ matches</span>
              </div>
            </div>

            <div className="shrink-0">
              <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg w-64">
                <div className="flex items-center gap-4">
                  <div className="grid h-14 w-14 place-items-center rounded-xl bg-primary-red/10">
                    <Compass className="h-7 w-7 text-primary-red" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white">DP-ScoutIQ</p>
                    <p className="text-base text-gray-300 font-semibold">by DPformance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How it works */}
          <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-3">
            <FeatureTile
              icon={<Database className="h-5 w-5" />}
              title="Data Module"
              desc="Integrates match & player performance data."
            />
            <FeatureTile
              icon={<BarChart3 className="h-5 w-5" />}
              title="Stats Module"
              desc="Generates metrics and stores them in a vector database for instant retrieval."
            />
            <FeatureTile
              icon={<MessageSquare className="h-5 w-5" />}
              title="Chatbot Module"
              desc="Conversational interface—work like with a colleague, but faster and more precise."
            />
          </div>

          {/* Strategy Input */}
          <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-900 p-5">
            <p className="text-sm font-medium text-white">Team Strategy Input (optional)</p>
            <p className="mt-2 text-sm text-gray-400">
              Align recommendations with your identity. For example:
              <em className="ml-1 text-gray-300">
                “We play in a 4-3-3, build up in a 3-2-5, and defend in a 4-4-2. Attack-minded fullbacks and
                high pass-accuracy midfielders are preferred.”
              </em>
            </p>
          </div>

          {/* What you can do (updated grid + your filter item) */}
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div className="rounded-2xl border border-dashed border-gray-800 p-6">
              <p className="text-sm font-medium text-white">What you can do</p>

              <div className="grid gap-3 mt-3 text-sm">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-primary-red" />
                  <span className="text-gray-300">Find and compare players based on your needs.</span>
                </div>

                <div className="flex items-start gap-3">
                  <Database className="w-5 h-5 text-primary-red" />
                  <span className="text-gray-300">Answer data-based football questions.</span>
                </div>

                <div className="flex items-start gap-3">
                  <Compass className="w-5 h-5 text-primary-red" />
                  <span className="text-gray-300">Adapt recommendations to your team’s identity and plans.</span>
                </div>

                <div className="flex items-start gap-3">
                  <Layout className="w-5 h-5 text-primary-red" />
                  <span className="text-gray-300">Define team strategy – formation, style, and key traits.</span>
                </div>

                <div className="flex items-start gap-3">
                  <BarChart3 className="w-5 h-5 text-primary-red" />
                  <span className="text-gray-300">Visualize key stats with charts, comparisons, and summaries.</span>
                </div>

                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-primary-red" />
                  <span className="text-gray-300">Ask about players or stats and generate scouting reports instantly.</span>
                </div>

                <div className="flex items-start gap-3">
                  <SlidersHorizontal className="w-5 h-5 text-primary-red" />
                  <span className="text-gray-300">Filter by age, nationality, role, stats, or tactical fit.</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-dashed border-gray-800 p-6">
              <p className="text-sm font-medium text-white">Auto-Generated Scouting Reports</p>
              <ul className="mt-3 space-y-3 text-sm">
                <Li icon={<CheckCircle2 className="h-4 w-4 text-primary-red" />}>Team Tactical Context (your strategy/philosophy)</Li>
                <Li icon={<CheckCircle2 className="h-4 w-4 text-primary-red" />}>Player Recommendations aligned with style & KPIs</Li>
                <Li icon={<CheckCircle2 className="h-4 w-4 text-primary-red" />}>Statistical Highlights and visuals</Li>
                <Li icon={<CheckCircle2 className="h-4 w-4 text-primary-red" />}>Key Attributes, Weaknesses & Concerns</Li>
                <Li icon={<CheckCircle2 className="h-4 w-4 text-primary-red" />}>Final, actionable recruitment summary</Li>
              </ul>
            </div>
          </div>

          {/* CTA Row */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="#contact"
              className="inline-flex h-11 items-center rounded-xl bg-primary-red px-6 text-sm font-semibold text-white shadow-md hover:bg-red-700"
            >
              Request a Demo
            </Link>

            {/* Open Lightbox */}
            <button
              onClick={() => openGallery(0)}
              className="inline-flex h-11 items-center rounded-xl border border-gray-800 px-6 text-sm font-semibold text-gray-200 hover:bg-gray-900"
            >
              View Sneak Peeks
            </button>

            {/* PDF Download */}
            <a
              href={REPORT_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-gray-800 px-5 text-sm font-semibold text-gray-200 hover:bg-gray-900"
            >
              <Download className="w-4 h-4" />
              Scouting Report (PDF)
            </a>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <ShieldCheck className="h-4 w-4 text-primary-red" /> Modular & Customizable
            </div>
          </div>
        </div>
      </div>

      {/* ---- Lightbox / Modal ---- */}
      <Lightbox
        open={open}
        idx={idx}
        onClose={() => setOpen(false)}
        next={() => setIdx((i) => (i + 1) % GALLERY.length)}
        prev={() => setIdx((i) => (i - 1 + GALLERY.length) % GALLERY.length)}
      />
    </section>
  );
}

/* ---------- Lightbox Component ---------- */
function Lightbox({
  open,
  idx,
  onClose,
  next,
  prev,
}: {
  open: boolean;
  idx: number;
  onClose: () => void;
  next: () => void;
  prev: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={(e) => {
        // close when clicking backdrop
        if (e.target === dialogRef.current) onClose();
      }}
      ref={dialogRef}
    >
      <div className="relative mx-4 w-full max-w-5xl rounded-2xl border border-gray-800 bg-gray-950 p-3 shadow-2xl">
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close gallery"
          className="absolute right-3 top-3 rounded-lg border border-gray-800 bg-gray-900 p-2 text-gray-300 hover:bg-gray-800"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Main media */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-black">
          <Image
            src={GALLERY[idx].src}
            alt={GALLERY[idx].alt}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-contain"
            priority
          />
          {/* Nav arrows */}
          <button
            aria-label="Previous"
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-lg bg-black/50 p-2 text-gray-200 hover:bg-black/70"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            aria-label="Next"
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-black/50 p-2 text-gray-200 hover:bg-black/70"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Thumbnails */}
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
          {GALLERY.map((img, i) => (
            <button
              key={img.src}
              onClick={() => (document.activeElement as HTMLElement | null)?.blur() || undefined || (i)}
              className={`relative aspect-video overflow-hidden rounded-lg border ${i === idx ? "border-primary-red" : "border-gray-800"} bg-gray-900`}
              onMouseDown={(e) => e.preventDefault()}
              onFocus={() => {}}
              onClickCapture={() => (window.getSelection()?.removeAllRanges?.(), undefined)}
              // set image index
              onKeyDown={() => {}}
            >
              <span className="sr-only">{img.alt}</span>
              <Image src={img.src} alt={img.alt} fill className="object-cover opacity-90" />
              {/* overlay click handler */}
              <span
                className="absolute inset-0 block"
                onClick={() => (document as any) && (window as any) && (i)}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- UI bits used above ---------- */
function FeatureTile({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="group rounded-2xl border border-gray-800 bg-gray-900/60 p-5 transition-colors hover:bg-gray-900">
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-lg border border-gray-800 bg-gray-900 text-primary-red">
          {icon}
        </div>
        <p className="font-medium text-white">{title}</p>
      </div>
      <p className="mt-2 text-sm text-gray-400">{desc}</p>
    </div>
  );
}

function Li({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-1.5">{icon}</span>
      <span>{children}</span>
    </li>
  );
}
