import Link from 'next/link';
import type { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  href?: string;
  className?: string;
  ariaLabel?: string;
}

function getVariantClass(variant: ButtonVariant): string {
  switch (variant) {
    case 'primary':
      return 'btn-primary-ui';
    case 'secondary':
      return 'btn-secondary-ui';
    default:
      return 'btn-ghost-ui';
  }
}

export function Button({
  children,
  variant = 'primary',
  href,
  className = '',
  ariaLabel,
}: ButtonProps) {
  const mergedClassName = `btn-ui ${getVariantClass(variant)} ${className}`.trim();

  if (href) {
    if (href.startsWith('/')) {
      return (
        <Link href={href} aria-label={ariaLabel} className={mergedClassName}>
          {children}
        </Link>
      );
    }

    return (
      <a href={href} aria-label={ariaLabel} className={mergedClassName}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" aria-label={ariaLabel} className={mergedClassName}>
      {children}
    </button>
  );
}
