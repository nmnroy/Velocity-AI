import React from 'react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export default function TestimonialCard({ quote, author, role, company }: TestimonialCardProps) {
  return (
    <div className="flex flex-col justify-between p-8 bg-card-bg rounded-2xl shadow-sm border border-ink/5 transition-transform duration-200 ease-out hover:-translate-y-[2px] hover:shadow-md h-full">
      <p className="text-ink/80 italic mb-8">&ldquo;{quote}&rdquo;</p>
      <div>
        <p className="font-bold text-ink">{author}</p>
        <p className="text-sm text-ink/60">{role} at {company}</p>
      </div>
    </div>
  );
}
