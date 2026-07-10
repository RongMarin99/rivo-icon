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
  {@html "<g stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\".231\"><path stroke-width=\"1.00108239\" d=\"M3.501 4v15.502c0 .277.226.498.499.498h16.502\"/><path stroke-width=\"1.00108239\" d=\"M5.503 17.504v-6.002a.5.5 0 0 1 .499-.503h2.002c.273 0 .498.226.498.503V17.5a.5.5 0 0 1-.498.502H6.002a.5.5 0 0 1-.499-.502Zm5.001 0V9.5c0-.278.221-.499.499-.499H13a.5.5 0 0 1 .502.499v8a.5.5 0 0 1-.502.502h-1.998a.5.5 0 0 1-.499-.502Zm4.997 0V6.496c0-.273.226-.498.503-.498h1.998c.277 0 .502.225.502.503V17.5a.5.5 0 0 1-.502.502h-1.998a.5.5 0 0 1-.503-.502Z\"/></g>"}
</svg>
