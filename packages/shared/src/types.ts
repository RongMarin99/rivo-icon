export interface IconProps {
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
  className?: string;
}

export type IconVariant = 'outline' | 'filled' | 'brand';

export interface IconMeta {
  name: string;
  category: string;
  tags: string[];
  variant: IconVariant;
}

export interface IconData {
  name: string;
  svg: string;
  meta: IconMeta;
}
