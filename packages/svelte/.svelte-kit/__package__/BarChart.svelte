<script lang="ts">
  export let size: number | string = 24;
  export let color: string = 'currentColor';
  export let strokeWidth: number | string = 2;
  let className: string = '';
  export { className as class };
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke={color}
  stroke-width={strokeWidth}
  stroke-linecap="round"
  stroke-linejoin="round"
  class={className}
>
  {@html "<g stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"4.333\"><path stroke-width=\"1.35765889\" d=\"M.47 1.149v21.027c0 .376.306.675.676.675H23.53\"/><path stroke-width=\"1.35765889\" d=\"M3.185 19.466v-8.142a.68.68 0 0 1 .677-.682h2.715c.37 0 .676.307.676.682v8.136a.68.68 0 0 1-.676.682H3.862a.68.68 0 0 1-.677-.682Zm6.784 0V8.609c0-.377.3-.677.676-.677h2.71a.68.68 0 0 1 .68.677V19.46a.68.68 0 0 1-.68.682h-2.711a.68.68 0 0 1-.677-.682Zm6.778 0V4.534c0-.37.306-.675.682-.675h2.71c.376 0 .68.305.68.682V19.46a.68.68 0 0 1-.68.681h-2.71a.68.68 0 0 1-.682-.681Z\"/></g>"}
</svg>
