import type { SVGAttributes } from 'react';
import type { IconProps } from '@rivo-icons/shared';

type RivoIconProps = IconProps & Omit<SVGAttributes<SVGSVGElement>, 'color'>;

export function createIcon(svgChildren: React.ReactNode, displayName: string) {
  function Icon({
    size = 24,
    color = 'currentColor',
    strokeWidth = 2,
    className = '',
    ...props
  }: RivoIconProps) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        {...props}
      >
        {svgChildren}
      </svg>
    );
  }

  Icon.displayName = displayName;
  return Icon;
}
