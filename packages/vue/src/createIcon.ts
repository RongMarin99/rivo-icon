import { defineComponent, h, type PropType } from 'vue';

export function createIcon(svgContent: string, displayName: string) {
  const component = defineComponent({
    name: displayName,
    props: {
      size: {
        type: [Number, String] as PropType<number | string>,
        default: 24,
      },
      color: {
        type: String,
        default: 'currentColor',
      },
      strokeWidth: {
        type: [Number, String] as PropType<number | string>,
        default: 2,
      },
      class: {
        type: String,
        default: '',
      },
    },
    setup(props) {
      return () =>
        h('svg', {
          xmlns: 'http://www.w3.org/2000/svg',
          width: props.size,
          height: props.size,
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: props.color,
          'stroke-width': props.strokeWidth,
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          class: props.class,
          innerHTML: svgContent,
        });
    },
  });

  return component;
}
