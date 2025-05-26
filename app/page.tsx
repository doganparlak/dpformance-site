import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white px-6 flex flex-col items-center justify-center text-center">
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

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold max-w-3xl leading-tight mb-4">
        Unlock the Power of <span className="text-red-600">Football Intelligence</span>
      </h1>

      <p className="text-lg sm:text-xl text-gray-400 max-w-xl mb-8">
        DPformance is a data-driven consultancy helping teams, analysts, and agencies make smarter football decisions through advanced analytics and insights.
      </p>

      <button className="bg-red-600 hover:bg-red-700 transition-colors px-6 py-3 rounded-full font-medium text-white shadow-md">
        Get in Touch
      </button>

      <footer className="mt-16 text-sm text-gray-500">
        © 2025 DPformance. All rights reserved.
      </footer>
    </main>
  );
}
