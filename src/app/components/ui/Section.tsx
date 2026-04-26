import type { ReactNode } from 'react';

export interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

export function Section({ children, id, className = '' }: SectionProps) {
  return (
    <section id={id} className={`section-ui ${className}`.trim()}>
      {children}
    </section>
  );
}
