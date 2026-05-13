// app/ScoutWiseSection.tsx
import Image from 'next/image';
import {
  ArrowUpRight,
  Compass,
  Database,
  FileText,
  MessageCircle,
  TrendingUp,
  UsersRound,
} from 'lucide-react';
import { getStrings, type Lang } from './i18n';

export default function ScoutWiseSection({ lang }: { lang: Lang }) {
  const t = getStrings(lang);

  return (
    <div className="bg-gray-900/90 border border-[#16A34A]/40 rounded-2xl p-8 md:p-10 shadow-xl flex flex-col md:flex-row gap-8 items-center">
      {/* Logo + badge */}
      <div className="flex flex-col items-center md:items-start gap-4 md:w-1/3">
        <span className="inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold bg-[#16A34A]/15 text-[#16A34A] border border-[#16A34A]/40 w-full max-w-[280px] text-center">
          {t.scoutwise.badge}
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

        <a
          href="https://www.scoutwise.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full max-w-[280px] items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold bg-[#16A34A] hover:bg-emerald-600 transition-colors shadow-md text-black"
        >
          {t.scoutwise.cta}
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      {/* Copy + features */}
      <div className="md:w-2/3 text-left">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-200">
          {t.scoutwise.title}
        </h3>

        <p className="text-gray-300 mb-5 text-sm sm:text-base">
          {t.scoutwise.desc.beforeLeagues}{' '}
          <span className="font-semibold text-[#16A34A]">
            {t.scoutwise.desc.leaguesHighlight}
          </span>
          {t.scoutwise.desc.afterLeagues}
          <span className="font-semibold text-[#16A34A]">
            {t.scoutwise.desc.playersHighlight}
          </span>
          {t.scoutwise.desc.afterPlayers}
          <span className="font-semibold text-[#16A34A]">
            {t.scoutwise.desc.statsHighlight}
          </span>
          {t.scoutwise.desc.afterStats}{' '}
          <span>
            {t.scoutwise.desc.strategyHighlight}
          </span>
          {t.scoutwise.desc.afterStrategy}
        </p>
        <div className="mb-6 space-y-3 text-sm text-gray-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <Feature
              Icon={TrendingUp}
              title={t.scoutwise.features.weekly.title}
              text={t.scoutwise.features.weekly.text}
            />
            <Feature
              Icon={Database}
              title={t.scoutwise.features.pool.title}
              text={t.scoutwise.features.pool.text}
            />
            <Feature
              Icon={UsersRound}
              title={t.scoutwise.features.matchup.title}
              text={t.scoutwise.features.matchup.text}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 items-center">
            <div className="relative rounded-xl border border-[#16A34A]/35 bg-[#16A34A]/5 p-3 lg:col-span-2">
              <span className="absolute -top-2 left-3 rounded-full border border-[#16A34A]/40 bg-gray-900 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#16A34A]">
                ScoutWise Pro
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <Feature
                  Icon={Compass}
                  title={t.scoutwise.features.pro.title}
                  text={t.scoutwise.features.pro.text}
                />
                <Feature
                  Icon={MessageCircle}
                  title={t.scoutwise.features.chat.title}
                  text={t.scoutwise.features.chat.text}
                />
              </div>
            </div>
            <div>
              <Feature
                Icon={FileText}
                title={t.scoutwise.features.reports.title}
                text={t.scoutwise.features.reports.text}
              />
            </div>
          </div>
        </div>

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
