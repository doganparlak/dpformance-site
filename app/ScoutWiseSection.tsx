// app/ScoutWiseSection.tsx
import Image from 'next/image';
import { ArrowUpRight, BarChart3, FileText, Users, Compass } from 'lucide-react';
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
      </div>

      {/* Copy + features */}
      <div className="md:w-2/3 text-left">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-200">
          {t.scoutwise.title}
        </h3>

        <p className="text-gray-300 mb-5 text-sm sm:text-base">
          {t.scoutwise.desc.beforeLeagues}{' '}
          <span className="font-semibold text-white">{t.scoutwise.desc.leaguesHighlight}</span>
          {t.scoutwise.desc.afterLeagues}{' '}
          <span className="font-semibold text-white">{t.scoutwise.desc.strategyHighlight}</span>
          {t.scoutwise.desc.afterStrategy}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-sm text-gray-300">
          <Feature
            Icon={Compass}
            title={t.scoutwise.features.strategy.title}
            text={t.scoutwise.features.strategy.text}
          />
          <Feature
            Icon={Users}
            title={t.scoutwise.features.cards.title}
            text={t.scoutwise.features.cards.text}
          />
          <Feature
            Icon={BarChart3}
            title={t.scoutwise.features.radar.title}
            text={t.scoutwise.features.radar.text}
          />
          <Feature
            Icon={FileText}
            title={t.scoutwise.features.reports.title}
            text={t.scoutwise.features.reports.text}
          />
        </div>

        <a
          href="https://www.scoutwise.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold bg-[#16A34A] hover:bg-emerald-600 transition-colors shadow-md text-black"
        >
          {t.scoutwise.cta}
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
