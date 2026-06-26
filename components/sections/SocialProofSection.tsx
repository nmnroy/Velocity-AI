import { testimonials } from '@/lib/social-proof-data';
import LogoMarquee from '@/components/social-proof/LogoMarquee';
import TestimonialCard from '@/components/social-proof/TestimonialCard';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

export default function SocialProofSection() {
  return (
    <section id="proof" aria-labelledby="proof-heading" className="scroll-mt-20 py-24 sm:py-32 overflow-hidden bg-background">
      <RevealOnScroll delay={0} className="max-w-7xl mx-auto px-4 mb-16 text-center">
        <h2 id="proof-heading" className="text-3xl md:text-4xl font-bold font-mono tracking-tight text-ink mb-4">
          Trusted by teams who automate at scale
        </h2>
        <p className="text-lg text-ink/70 max-w-2xl mx-auto">
          Join thousands of engineers who have eliminated manual data workflows.
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={60} className="mb-24">
        <LogoMarquee />
      </RevealOnScroll>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
          {testimonials.map((t, idx) => (
            <RevealOnScroll key={idx} delay={120 + idx * 60} className="h-full">
              <TestimonialCard 
                quote={t.quote}
                author={t.author}
                role={t.role}
                company={t.company}
              />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
