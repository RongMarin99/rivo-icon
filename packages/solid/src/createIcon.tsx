import { mergeProps, type JSX, type Component } from 'solid-js';
import type { IconProps } from '@rivo-icons/shared';

type SolidIconProps = IconProps & Omit<JSX.SvgSVGAttributes<SVGSVGElement>, 'color'>;

export function createIcon(svgContent: string, displayName: string): Component<SolidIconProps> {
  function Icon(rawProps: SolidIconProps) {
    const props = mergeProps(
      { size: 24, color: 'currentColor', strokeWidth: 2, className: '' },
      rawProps,
    );

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.size}
        height={props.size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={props.color}
        stroke-width={props.strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
        class={props.className}
        innerHTML={svgContent}
      />
    );
  }

  return Icon;
}
