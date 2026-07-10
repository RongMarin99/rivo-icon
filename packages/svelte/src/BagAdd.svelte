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
  {@html "<g stroke=\"currentColor\" stroke-linecap=\"round\"><path stroke-linejoin=\"bevel\" stroke-width=\"1.001\" d=\"M4 7v8c0 1.103.897 2 1.998 2h12.004A1.993 1.993 0 0 0 20 15V7M8 7c.39-4.923 7.606-4.923 8 0M4 7h16\"/><path stroke-width=\"1.3\" d=\"M11.953 9.149v5.703m-2.9-3.103h5.7\"/></g>"}
</svg>
