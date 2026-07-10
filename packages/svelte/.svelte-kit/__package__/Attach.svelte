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
  {@html "<path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"1.001\" d=\"M13.2 8.46v9s0 2.002 1.999 2.002c2.002 0 2.002-2.002 2.002-2.002V4.56a.1.1 0 0 0-.1-.1H10.8a.1.1 0 0 0-.1.1v14.886l.005.03c1.508 4.984 8.996 3.151 8.996-.013v-13\"/>"}
</svg>
