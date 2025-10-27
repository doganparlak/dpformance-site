'use client';

import Head from 'next/head';
import Image from 'next/image';
import ProductsSection from "./ProductsSection";
import WorksSection from "./WorksSection";
import { Mail, Phone } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const [headerH, setHeaderH] = useState(0);
  const ids = useRef(['about-us', 'founder', 'consultancy', 'selected-works', 'contact']).current;

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
    const t = setTimeout(() => scrollToId(id)(), 0);
    return () => clearTimeout(t);
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
      <title>Unlock the Power of Football Intelligence | DPformance</title>
      <meta
        name="description"
        content="DPformance is a data-driven consultancy providing advanced football analytics and insights to support smarter understanding, communication, and strategy across the game. Founded by Dogan Parlak, MSc in Computer Science and expert in football data science."
      />
      <meta property="og:title" content="Unlock the Power of Football Intelligence | DPformance" />
      <meta
        property="og:description"
        content="DPformance is a data-driven consultancy providing advanced football analytics and insights to support smarter understanding, communication, and strategy across the game."
      />
      <meta property="og:url" content="https://dpformance.com" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://dpformance.com/logo-dpformance-transparent.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Unlock the Power of Football Intelligence | DPformance" />
      <meta
        name="twitter:description"
        content="DPformance is a data-driven consultancy providing advanced football analytics and insights."
      />
      <meta name="twitter:image" content="https://dpformance.com/logo-dpformance-transparent.png" />

      {/* Native hash navigation padding as a graceful fallback */}
      <style jsx global>{`
        html { scroll-padding-top: var(--header-h, 0px); }
      `}</style>
    </Head>

    <main className="min-h-screen bg-gray-950 text-white px-6 flex flex-col items-center text-center">
      {/* Header Navigation */}
      <header className="w-full max-w-6xl py-4 flex justify-center sticky top-0 z-50 bg-gray-950 bg-opacity-90 border-b border-gray-800 shadow-md backdrop-blur-sm">
        <nav className="flex gap-8 text-sm sm:text-base font-semibold">
          <a
            href="#about-us"
            onClick={scrollToId('about-us')}
            className="pb-1 cursor-pointer transition-colors border-b-2 border-transparent hover:border-primary-red hover:text-primary-red"
          >
            About Us
          </a>
          <a
            href="#founder"
            onClick={scrollToId('founder')}
            className="pb-1 cursor-pointer transition-colors border-b-2 border-transparent hover:border-primary-red hover:text-primary-red"
          >
            Founder
          </a>
          <a
            href="#consultancy"
            onClick={scrollToId('consultancy')}
            className="pb-1 cursor-pointer transition-colors border-b-2 border-transparent hover:border-primary-red hover:text-primary-red"
          >
            Consultancy
          </a>
          {/* <a
            href="#products"
            onClick={scrollToId('products')}
            className="pb-1 cursor-pointer transition-colors border-b-2 border-transparent hover:border-primary-red hover:text-primary-red"
          >
            Products
          </a> */}
          <a
            href="#selected-works"
            onClick={scrollToId('selected-works')}
            className="pb-1 cursor-pointer transition-colors border-b-2 border-transparent hover:border-primary-red hover:text-primary-red"
          >
            Selected Works
          </a>
          <a
            href="#contact"
            onClick={scrollToId('contact')}
            className="pb-1 cursor-pointer transition-colors border-b-2 border-transparent hover:border-primary-red hover:text-primary-red"
          >
            Contact
          </a>
        </nav>
      </header>

      {/* About Us Section */}
      <section id="about-us" className="flex flex-col items-center justify-center mt-10 px-4">
        <div className="animate-fade-in-down mb-8 shadow-[0_0_15px_rgba(239,68,68,0.5)] rounded-2xl">
          <Image
            src="/logo-dpformance-transparent.png"
            alt="DPformance Logo"
            width={300}
            height={300}
            priority
            className="rounded-2xl shadow-lg"
          />
        </div>

        {/* Updated headline with explicit line break */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold max-w-3xl leading-tight mb-4">
          <span className="block">Unlock the Power of</span>
          <span className="block text-primary-red">Football Intelligence</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-400 max-w-xl mb-6">
          DPformance is a data-driven consultancy providing advanced football analytics and insights to
          support smarter understanding, communication, and strategy across the game.
        </p>

        {/* Header-aware scroll helper */}
        <button
          onClick={scrollToId('consultancy')}
          className="mb-8 px-6 py-3 bg-primary-red hover:bg-red-700 rounded-full text-white font-semibold transition-colors shadow-md"
          aria-label="Learn more about our services"
        >
          Learn More
        </button>
      </section>

        {/* Founder Section */}
        <section id="founder" className="mt-20 max-w-4xl w-full text-left px-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">Meet the Founder</h2>
          <div className="bg-gray-900 rounded-xl p-6 shadow-md text-gray-300">
            <div className="flex flex-col items-center mb-4">
              <h3 className="text-2xl font-bold text-red-500">
                <a
                  href="https://doganparlak.github.io"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Dogan Parlak
                </a>
              </h3>
              <p className="text-lg font-medium text-white">Data Scientist</p>
            </div>
            <p style={{ textAlign: "justify" }}>
              Dogan holds a BSc in Electrical and Electronics Engineering and an MSc in Computer Science from the University of Zurich with a major in Data Science and a minor in Banking and Finance. His work bridges data science and football strategy, combining academic rigor with practical impact.
            </p>
            <p className="mt-4" style={{ textAlign: "justify" }}>
              He has utilized <span className="font-semibold text-white">FIFA</span> and <span className="font-semibold text-white">UEFA</span> data, accessed under agreement and with their courtesy, in advanced football analytics initiatives, developing projects such as an open-source implementation of FIFA’s Enhanced Football Intelligence framework, player workload analysis, technical metric automation, tactical inference models, and dynamic match reporting. These efforts utilized tracking data, event data, competition data, as well as OPTA and Transfermarkt datasets to generate strategic insights and improve performance evaluation workflows. Prior to founding DPformance, he worked as an Artificial Intelligence Engineer, developing intelligent systems that merge human understanding with machine insight.
            </p>
          </div>
        </section>

        {/* Consultancy Section */}
        <section id="consultancy" className="mt-16 max-w-5xl w-full text-left px-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">Consultancy</h2>
          <p className="text-gray-400 text-center mb-10 max-w-2xl mx-auto">
            We deliver tailored data solutions and football analytics to enhance performance, scouting, and tactical understanding for clubs, analysts, and organizations.
            Our work draws on a wide range of data types — including <span className="text-white font-medium">tracking data, event data, and competition data</span> —
            and is shaped by the specific structures, technologies, and objectives of each client.
            <br />
            <br />
            <span className="text-base font-bold text-red-500">
              Some of our services include:
            </span>
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
              title="Data Gathering & Integration"
              description="Gather, preprocess, and maintain datasets, including assistance with selecting suppliers that best fit specific needs, ensuring smooth integration and readiness for analysis."
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
              title="Tactical & Performance Intelligence"
              description="Comprehensive evaluations of team and player performance using advanced metrics and multi-source data integration."
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
              title="Scouting & Recruitment Support"
              description="Data-informed profiling and benchmarking to assist clubs and agencies in making informed recruitment decisions."
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
              title="Custom Dashboards & Reporting"
              description="Interactive dashboards and automated reports tailored to your operational needs, powered by integrated data pipelines."
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
              title="Research & Development"
              description="Development of state-of-the-art approaches aimed at improving football analysis through advanced techniques and innovative methodologies."
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
              title="Coach Identification & Evaluation"
              description="Analytical profiling and assessment of coaching staff to support recruitment, development, and strategic alignment within football organizations."
            />
          </div>
        </section>

        {/* Selected Works: ensure the correct id exists */}
        <section id="selected-works" className="mt-16 w-full max-w-6xl px-4">
          <WorksSection />
        </section>

        {/* Contact Section */}
        <section id="contact" className="mt-20 max-w-5xl w-full text-center px-4">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Get In Touch</h2>
          <p className="mb-6 text-gray-400 max-w-md mx-auto">
            Reach out to discuss how DPformance can assist your team.
          </p>

          <form onSubmit={handleSubmit} className="mx-auto max-w-md flex flex-col gap-4 text-left">
            <label htmlFor="name" className="block text-gray-300 font-medium">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-primary-red text-white"
            />

            <label htmlFor="email" className="block text-gray-300 font-medium">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="E-mail"
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-primary-red text-white"
            />

            <label htmlFor="phone" className="block text-gray-300 font-medium">Phone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-primary-red text-white"
            />

            <label htmlFor="message" className="block text-gray-300 font-medium">Message</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message here..."
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-primary-red text-white resize-none"
            />

            <button
              type="submit"
              disabled={status === 'sending'}
              className="mt-4 bg-primary-red hover:bg-red-700 text-white py-3 rounded font-semibold transition-colors shadow-md disabled:opacity-50"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            {status === 'success' && (
              <p className="mt-2 text-green-400">Thank you for contacting us! We'll get back to you soon.</p>
            )}
            {status === 'error' && (
              <p className="mt-2 text-red-500">Something went wrong. Please try again.</p>
            )}
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
          <p>&copy; {new Date().getFullYear()} DPformance. All rights reserved.</p>
          <button
            aria-label="Back to top"
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
      <span className="text-xl sm:text-3xl text-gray-400 italic">
        Coming Soon...
      </span>
    </div>
  );
}
