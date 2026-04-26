export type BadgeVariant = 'tech' | 'tag' | 'status';

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
}

function getBadgeVariantClass(variant: BadgeVariant): string {
  switch (variant) {
    case 'tag':
      return 'badge-ui-tag';
    case 'status':
      return 'badge-ui-status';
    default:
      return 'badge-ui-tech';
  }
}

export function Badge({ label, variant = 'tech' }: BadgeProps) {
  return <span className={`badge-ui ${getBadgeVariantClass(variant)}`}>{label}</span>;
}
