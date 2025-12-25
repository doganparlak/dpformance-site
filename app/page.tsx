'use client';

import Head from 'next/head';
import Image from 'next/image';
import WorksSection from './WorksSection';
import ScoutWiseSection from './ScoutWiseSection';
import { Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { DEFAULT_LANG, LANG_STORAGE_KEY, getStrings, isLang, type Lang } from './i18n';

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const [headerH, setHeaderH] = useState(0);
  // kept from your file (not used elsewhere yet)
  const ids = useRef(['about-us', 'founder', 'consultancy', 'selected-works', 'scoutwise', 'contact']).current;

  const [lang, setLang] = useState<Lang>(DEFAULT_LANG);
  const t = getStrings(lang);

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem(LANG_STORAGE_KEY) : null;
    const initial = isLang(saved) ? saved : DEFAULT_LANG;

    setLang(initial);
    document.documentElement.lang = initial;
  }, []);

  const switchLang = (next: Lang) => {
    setLang(next);
    localStorage.setItem(LANG_STORAGE_KEY, next);
    document.documentElement.lang = next;
  };

  // Measure header height, set smooth scroll (respect reduced motion), expose CSS var
  useEffect(() => {
    const header = document.querySelector('header') as HTMLElement | null;

    const applyScrollBehavior = () => {
      const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      document.documentElement.style.scrollBehavior = prefersReduced ? 'auto' : 'smooth';
    };

    const measure = () => {
      const h = header?.offsetHeight ?? 0;
      setHeaderH(h);
      document.documentElement.style.setProperty('--header-h', `${h}px`);
      applyScrollBehavior();
    };

    measure();

    const ro = header ? new ResizeObserver(measure) : null;
    ro?.observe(header!);

    const onResize = () => measure();
    window.addEventListener('resize', onResize);

    const mql = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const motionListener = () => applyScrollBehavior();
    mql?.addEventListener?.('change', motionListener);

    return () => {
      window.removeEventListener('resize', onResize);
      ro?.disconnect();
      mql?.removeEventListener?.('change', motionListener);
    };
  }, []);

  // Header-aware scrolling for clicks
  const scrollToId = (id: string) => (e?: React.MouseEvent) => {
    e?.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const targetY = window.scrollY + rect.top - headerH - 8; // tiny breathing room
    history.replaceState(null, '', `#${id}`); // keep URL in sync, no jump
    window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
  };

  // Honor initial #hash with header offset once sizes are known
  useEffect(() => {
    if (headerH === 0) return;
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const timer = setTimeout(() => scrollToId(id)(), 0);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerH]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <Head>
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.desc} />

        <meta property="og:title" content={t.meta.title} />
        <meta property="og:description" content={t.meta.ogDesc} />
        <meta property="og:url" content="https://dpformance.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://dpformance.com/logo-dpformance-transparent.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.twitterDesc} />
        <meta name="twitter:image" content="https://dpformance.com/logo-dpformance-transparent.png" />

        {/* Native hash navigation padding as a graceful fallback */}
        <style jsx global>{`
          html {
            scroll-padding-top: var(--header-h, 0px);
          }
        `}</style>
      </Head>

      <main className="min-h-screen bg-gray-950 text-white px-6 flex flex-col items-center text-center">
        {/* Header Navigation */}
        <header className="w-full max-w-6xl py-4 flex items-center justify-between sticky top-0 z-50 bg-gray-950 bg-opacity-90 border-b border-gray-800 shadow-md backdrop-blur-sm">
          <div className="w-24" />

          <nav className="flex gap-8 text-sm sm:text-base font-semibold">
            <a
              href="#about-us"
              onClick={scrollToId('about-us')}
              className="pb-1 cursor-pointer transition-colors border-b-2 border-transparent hover:border-primary-red hover:text-primary-red"
            >
              {t.nav.about}
            </a>
            <a
              href="#founder"
              onClick={scrollToId('founder')}
              className="pb-1 cursor-pointer transition-colors border-b-2 border-transparent hover:border-primary-red hover:text-primary-red"
            >
              {t.nav.founder}
            </a>
            <a
              href="#consultancy"
              onClick={scrollToId('consultancy')}
              className="pb-1 cursor-pointer transition-colors border-b-2 border-transparent hover:border-primary-red hover:text-primary-red"
            >
              {t.nav.consultancy}
            </a>
            <a
              href="#selected-works"
              onClick={scrollToId('selected-works')}
              className="pb-1 cursor-pointer transition-colors border-b-2 border-transparent hover:border-primary-red hover:text-primary-red"
            >
              {t.nav.works}
            </a>
            <a
              href="#scoutwise"
              onClick={scrollToId('scoutwise')}
              className="group pb-1 cursor-pointer transition-colors border-b-2 border-transparent hover:border-primary-red"
            >
              <span className="group-hover:text-primary-red text-white">Scout</span>
              <span className="text-[#16A34A]">Wise</span>
            </a>
            <a
              href="#contact"
              onClick={scrollToId('contact')}
              className="pb-1 cursor-pointer transition-colors border-b-2 border-transparent hover:border-primary-red hover:text-primary-red"
            >
              {t.nav.contact}
            </a>
          </nav>

          <div className="w-24 flex justify-end">
            <button
              type="button"
              aria-label={t.langToggle.aria}
              onClick={() => switchLang(lang === 'en' ? 'tr' : 'en')}
              className="inline-flex items-center gap-2 rounded-full border border-gray-800 bg-gray-900/60 px-3 py-1.5 text-xs font-semibold text-gray-200 hover:bg-gray-900 hover:text-white transition-colors"
            >
              <span className={lang === 'tr' ? 'text-primary-red' : ''}>{t.langToggle.tr}</span>
              <span className="text-gray-500">/</span>
              <span className={lang === 'en' ? 'text-primary-red' : ''}>{t.langToggle.en}</span>
            </button>
          </div>
        </header>

        {/* About Us Section */}
        <section id="about-us" className="flex flex-col items-center justify-center mt-10 px-4">
          <motion.div
            initial={{ opacity: 0, x: 160, y: -160 }} // start off-screen, top-right
            whileInView={{ opacity: 1, x: 0, y: 0 }} // move to center
            viewport={{ once: true }} // animate only the first time it appears
            transition={{
              duration: 0.9,
              ease: 'easeOut',
            }}
            className="mb-8 shadow-[0_0_15px_rgba(239,68,68,0.5)] rounded-2xl"
          >
            <Image
              src="/logo-dpformance-transparent.png"
              alt="DPformance Logo"
              width={300}
              height={300}
              priority
              className="rounded-2xl shadow-lg"
            />
          </motion.div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold max-w-3xl leading-tight mb-4">
            <span className="block">{t.hero.line1}</span>
            <span className="block text-primary-red">{t.hero.line2}</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-xl mb-6">{t.hero.desc}</p>

          <button
            onClick={scrollToId('consultancy')}
            className="mb-8 px-6 py-3 bg-primary-red hover:bg-red-700 rounded-full text-white font-semibold transition-colors shadow-md"
            aria-label={t.hero.ctaAria}
          >
            {t.hero.cta}
          </button>
        </section>

        {/* Founder Section */}
        <section id="founder" className="mt-20 max-w-4xl w-full text-left px-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">{t.founder.title}</h2>
          <div className="bg-gray-900 rounded-xl p-6 shadow-md text-gray-300">
            <div className="flex flex-col items-center mb-4">
              <h3 className="text-2xl font-bold text-red-500">
                <a href="https://doganparlak.github.io" target="_blank" rel="noopener noreferrer">
                  Dogan Parlak
                </a>
              </h3>
              <p className="text-lg font-medium text-white">{t.founder.role}</p>
            </div>
            <p style={{ textAlign: 'justify' }}>{t.founder.p1}</p>
            <p className="mt-4" style={{ textAlign: 'justify' }}>
              {t.founder.p2}
            </p>
          </div>
        </section>

        {/* Consultancy Section */}
        <section id="consultancy" className="mt-16 max-w-5xl w-full text-left px-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">{t.consultancy.title}</h2>

          <p className="text-gray-400 text-center mb-10 max-w-2xl mx-auto">
            {t.consultancy.intro1}
            <br />
            <br />
            {t.consultancy.intro2}
            <br />
            <br />
            <span className="text-base font-bold text-red-500">{t.consultancy.servicesLead}</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <ServiceCard
              icon={
                <svg
                  className="w-6 h-6 text-primary-red mb-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16M8 6v12"
                  />
                </svg>
              }
              title={t.consultancy.cards.gather.title}
              description={t.consultancy.cards.gather.desc}
            />

            <ServiceCard
              icon={
                <svg
                  className="w-6 h-6 text-primary-red mb-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
              title={t.consultancy.cards.tactical.title}
              description={t.consultancy.cards.tactical.desc}
            />

            <ServiceCard
              icon={
                <svg
                  className="w-6 h-6 text-primary-red mb-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v6" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h10v10H7z" />
                </svg>
              }
              title={t.consultancy.cards.scouting.title}
              description={t.consultancy.cards.scouting.desc}
            />

            <ServiceCard
              icon={
                <svg
                  className="w-6 h-6 text-primary-red mb-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h4l3 8 4-16 3 8h4" />
                </svg>
              }
              title={t.consultancy.cards.dashboards.title}
              description={t.consultancy.cards.dashboards.desc}
            />

            <ServiceCard
              icon={
                <svg
                  className="w-6 h-6 text-primary-red mb-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12v8" />
                </svg>
              }
              title={t.consultancy.cards.rnd.title}
              description={t.consultancy.cards.rnd.desc}
            />

            <ServiceCard
              icon={
                <svg
                  className="w-6 h-6 text-primary-red mb-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v7" />
                </svg>
              }
              title={t.consultancy.cards.coach.title}
              description={t.consultancy.cards.coach.desc}
            />
          </div>
        </section>

        {/* Selected Works */}
        <section id="selected-works" className="mt-16 w-full max-w-6xl px-4">
          {/* if/when you translate WorksSection, pass lang: <WorksSection lang={lang} /> */}
          <WorksSection lang={lang} />
        </section>

        {/* ScoutWise */}
        <section id="scoutwise" className="mt-20 w-full max-w-6xl px-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">
            <span className="text-white">Scout</span>
            <span className="text-[#16A34A]">Wise</span>
          </h2>
          {/* if/when you translate ScoutWiseSection, pass lang: <ScoutWiseSection lang={lang} /> */}
          <ScoutWiseSection lang={lang} />
        </section>

        {/* Contact Section */}
        <section id="contact" className="mt-20 max-w-5xl w-full text-center px-4">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6">{t.contact.title}</h2>
          <p className="mb-6 text-gray-400 max-w-md mx-auto">{t.contact.subtitle}</p>

          <form onSubmit={handleSubmit} className="mx-auto max-w-md flex flex-col gap-4 text-left">
            <label htmlFor="name" className="block text-gray-300 font-medium">
              {t.contact.form.name}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder={t.contact.form.namePh}
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-primary-red text-white"
            />

            <label htmlFor="email" className="block text-gray-300 font-medium">
              {t.contact.form.email}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder={t.contact.form.emailPh}
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-primary-red text-white"
            />

            <label htmlFor="phone" className="block text-gray-300 font-medium">
              {t.contact.form.phone}
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t.contact.form.phonePh}
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-primary-red text-white"
            />

            <label htmlFor="message" className="block text-gray-300 font-medium">
              {t.contact.form.message}
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              value={formData.message}
              onChange={handleChange}
              placeholder={t.contact.form.msgPh}
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-primary-red text-white resize-none"
            />

            <button
              type="submit"
              disabled={status === 'sending'}
              className="mt-4 bg-primary-red hover:bg-red-700 text-white py-3 rounded font-semibold transition-colors shadow-md disabled:opacity-50"
            >
              {status === 'sending' ? t.contact.form.sending : t.contact.form.send}
            </button>

            {status === 'success' && <p className="mt-2 text-green-400">{t.contact.form.success}</p>}
            {status === 'error' && <p className="mt-2 text-red-500">{t.contact.form.error}</p>}
          </form>

          <div className="flex justify-center gap-10 mt-12 text-gray-400 text-3xl">
            <a
              href="mailto:dogan.parlak@dpformance.com"
              aria-label="Email"
              className="hover:text-primary-red transition-colors animate-pulse-hover"
            >
              <Mail className="w-7 h-7" />
            </a>
            <a
              href="tel:+905313414661"
              aria-label="Phone"
              className="hover:text-primary-red transition-colors animate-pulse-hover"
            >
              <Phone className="w-7 h-7" />
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 py-8 w-full border-t border-gray-800 text-gray-500 text-sm relative flex justify-center items-center gap-4">
          <p>
            &copy; {new Date().getFullYear()} DPformance. {t.footer.rights}
          </p>
          <button
            aria-label={t.footer.backTop}
            onClick={scrollToTop}
            className="hover:text-primary-red transition-colors"
          >
            ↑
          </button>
        </footer>
      </main>
    </>
  );
}

// Service Card component with hover scale effect
function ServiceCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow-md hover:scale-[1.05] transform transition-transform duration-300 cursor-default">
      <div>{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
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
      <span className="text-xl sm:text-3xl text-gray-400 italic">Coming Soon...</span>
    </div>
  );
}
