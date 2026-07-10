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
  {@html "<g stroke=\"currentColor\" transform=\"translate(-49.402 -49.21)scale(1.18081)\"><circle cx=\"52\" cy=\"52\" r=\"8.5\"/><path d=\"M43.66 50.458c4.44 2.423 6.147 4.662 8.01 9.983\"/><path stroke-linecap=\"round\" d=\"m45.738 53.159.987-2.297m.215 3.411 1.61-1.912m-.478 3.452 2.145-1.285M49.1 57.561l2.35-.852\"/><path d=\"M51.96 43.175c1.51 4.827 3.374 6.938 8.23 9.803\"/><path stroke-linecap=\"round\" d=\"m54.203 45.74-2.445.52m3.304.875-2.19 1.207m3.479.204L54.673 50.4m3.193-.505-1.294 2.14\"/></g>"}
</svg>
