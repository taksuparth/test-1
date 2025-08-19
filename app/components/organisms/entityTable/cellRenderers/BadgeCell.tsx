import { Badge, badgeVariants } from '@/components/ui/badge';

// A renderer for status fields, using a Badge component
export const BadgeCell = ({
  value,
  variantMap,
}: {
  value: string;
  variantMap: Record<string, keyof typeof badgeVariants>;
}) => {
  const variant = variantMap[value?.toLowerCase()] || 'default';
  return <Badge variant={variant}>{value}</Badge>;
};
