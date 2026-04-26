import type { ReactNode } from 'react';

export interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return <article className={`card-ui ${className}`.trim()}>{children}</article>;
}
