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
  {@html "<g stroke=\"currentColor\"><path stroke-width=\"1.001\" d=\"M3 12h18\"/><path stroke-linecap=\"round\" stroke-width=\"2.002\" d=\"M3 9.5v5m18-5v5\"/><path stroke-linecap=\"round\" stroke-width=\"2.999\" d=\"M5.998 8v8m12.004-8v8\"/></g>"}
</svg>
