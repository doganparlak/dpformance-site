// app/ScoutWiseSection.tsx
import Image from 'next/image';
import {
  ArrowUpRight,
  BarChart3,
  FileText,
  Sparkles,
  Users,
  Compass,
} from 'lucide-react';

export default function ScoutWiseSection() {
  return (
    <div className="bg-gray-900/90 border border-[#16A34A]/40 rounded-2xl p-8 md:p-10 shadow-xl flex flex-col md:flex-row gap-8 items-center">
      {/* Logo + badge */}
      <div className="flex flex-col items-center md:items-start gap-4 md:w-1/3">
        <span
          className="inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold bg-[#16A34A]/15 text-[#16A34A] border border-[#16A34A]/40 w-full max-w-[280px] text-center"
        >
          New • AI Powered Scouting &amp; Recruitment Intelligence
        </span>
        <div className="bg-black/40 rounded-2xl p-4 w-full max-w-[280px] flex justify-center">
          <Image
            src="/scoutwise_logo.png"
            alt="scoutwise.ai Logo"
            width={260}
            height={260}
            className="rounded-xl object-contain"
          />
        </div>
      </div>

      {/* Copy + features */}
      <div className="md:w-2/3 text-left">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-200">
          Your intelligent football scouting companion
        </h3>

        <p className="text-gray-300 mb-5 text-sm sm:text-base">
          ScoutWise is our AI-powered scouting assistant that turns your ideas, filters and data into
          clear, football-specific insights. It covers players from{' '}
          <span className="font-semibold text-white">113 leagues worldwide</span>.
          Define your <span className="font-semibold text-white">team strategy &amp; scouting philosophy</span>,
          then chat to discover, compare and shortlist players that truly fit your game model.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-sm text-gray-300">
          <Feature
            Icon={Compass}
            title="Strategy-aware search"
            text="Start with an optional strategy screen so every suggestion aligns with your tactical approach."
          />
          <Feature
            Icon={Users}
            title="Player Cards"
            text="Name, gender, nationality, team, age, height, weight and a 0–100 Potential score in one place."
          />
          <Feature
            Icon={BarChart3}
            title="Radar metrics that matter"
            text="Goalkeeping, Shooting, Passing, Defending, Contribution & Impact, and Errors & Discipline radars for each player."
          />
          <Feature
            Icon={FileText}
            title="Pro scouting reports"
            text="Generate in-depth reports and portfolio overviews for your tracked players with Pro subscriptions."
          />
        </div>

        <a
          href="https://www.scoutwise.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold bg-[#16A34A] hover:bg-emerald-600 transition-colors shadow-md text-black"
        >
          Explore ScoutWise.ai
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

function Feature({
  Icon,
  title,
  text,
}: {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#16A34A]/15 text-[#16A34A]">
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-white mb-0.5">{title}</h3>
        <p className="text-xs sm:text-sm text-gray-400">{text}</p>
      </div>
    </div>
  );
}
