import { logos } from '@/lib/social-proof-data';

export default function LogoMarquee() {
  return (
    <div className="flex w-full overflow-hidden" aria-hidden="true">
      <div className="flex min-w-full shrink-0 animate-[scrollMarquee_40s_linear_infinite] motion-reduce:[animation-play-state:paused] items-center justify-around gap-16 md:gap-32 pr-16 md:pr-32">
        {logos.map((logo, idx) => (
          <span key={`first-${idx}`} className="font-mono text-xl md:text-2xl font-bold text-ink/30 uppercase tracking-widest">
            {logo.name}
          </span>
        ))}
      </div>
      <div className="flex min-w-full shrink-0 animate-[scrollMarquee_40s_linear_infinite] motion-reduce:[animation-play-state:paused] items-center justify-around gap-16 md:gap-32 pr-16 md:pr-32">
        {logos.map((logo, idx) => (
          <span key={`second-${idx}`} className="font-mono text-xl md:text-2xl font-bold text-ink/30 uppercase tracking-widest">
            {logo.name}
          </span>
        ))}
      </div>
    </div>
  );
}
