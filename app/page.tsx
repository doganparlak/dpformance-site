'use client';

import Image from 'next/image';
import { Mail, Linkedin, Phone } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white px-6 flex flex-col items-center justify-center text-center">
      {/* Logo */}
      <div className="animate-fade-in-down mb-8">
        <Image
          src="/logo-dpformance-transparent.png"
          alt="DPformance Logo"
          width={300}
          height={300}
          priority
          className="rounded-2xl shadow-lg"
        />
      </div>

      {/* Headline */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold max-w-3xl leading-tight mb-4">
        Unlock the Power of <span className="text-red-600">Football Intelligence</span>
      </h1>

      {/* Description */}
      <p className="text-lg sm:text-xl text-gray-400 max-w-xl mb-8">
        DPformance is a data-driven consultancy providing advanced football analytics and insights to support smarter understanding, communication, and strategy across the game.
      </p>

      {/* Contact Icons */}
      <div className="flex gap-6 mb-8">
        <a href="mailto:dogan.parlak@dpformance.com" aria-label="Email" className="hover:text-red-500 transition-colors">
          <Mail className="w-6 h-6 text-white" />
        </a>
        <a
          href="https://www.linkedin.com/in/dogan-parlak-0269521b1/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="hover:text-red-500 transition-colors"
        >
          <Linkedin className="w-6 h-6 text-white" />
        </a>
        <a href="tel:+905313414661" aria-label="Phone" className="hover:text-red-500 transition-colors">
          <Phone className="w-6 h-6 text-white" />
        </a>
      </div>

      {/* Our Partners Section */}
      <section className="mt-12 w-full max-w-6xl">
        <h2 className="text-center text-2xl sm:text-3xl font-semibold mb-6">
          Our Partners
        </h2>

        <div className="relative overflow-hidden">
          <div className="flex gap-10 whitespace-nowrap animate-scroll-left">
            <PartnerLogos />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 text-sm text-gray-500">
        © 2025 DPformance. All rights reserved.
      </footer>
    </main>
  );
}

function PartnerLogos() {
  return (
    <div className="flex items-center justify-center h-48 px-4">
      {/* 
      <Image
        src="/partners/UEFA_logo.png"
        alt="UEFA Logo"
        width={240}
        height={120}
        className="inline-block object-contain transition-all duration-300 drop-shadow-lg"
      />
      */}
      <span className="text-xl sm:text-3xl text-gray-400 italic">
        Coming Soon...
      </span>
    </div>
  );
}

