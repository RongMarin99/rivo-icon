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
  {@html "<path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"bevel\" stroke-width=\"1.001\" d=\"M4 8v8c0 1.105.897 2.002 1.998 2.002h12.004A1.993 1.993 0 0 0 20 16V8M8 8c.39-4.923 7.606-4.923 8 0M4 8h16\"/>"}
</svg>
