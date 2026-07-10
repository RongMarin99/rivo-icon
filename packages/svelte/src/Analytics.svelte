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
  {@html "<path stroke=\"currentColor\" stroke-width=\"1.001\" d=\"m5.192 16.71 3.9-4.554m1.842-.065 2.626 2.201m1.062-.36 3.9-4.554M4.715 16.29a1.213 1.213 0 1 1 0 2.427 1.213 1.213 0 0 1 0-2.427Zm14.57-8.577a1.216 1.216 0 1 1 0 2.432 1.213 1.213 0 0 1 0-2.427Zm-9.43 2.575a1.213 1.213 0 1 1 0 2.427 1.213 1.213 0 0 1 0-2.427Zm4.286 3.428a1.216 1.216 0 1 1 0 2.43 1.213 1.213 0 0 1 0-2.426Z\"/>"}
</svg>
