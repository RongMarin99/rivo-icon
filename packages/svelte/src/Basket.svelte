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
  {@html "<g stroke=\"currentColor\" transform=\"translate(-53.785 -52.54)scale(1.25905)\"><path stroke-linecap=\"round\" d=\"M48.5 49h-3.806a.5.5 0 0 0-.475.658l2.667 8a.5.5 0 0 0 .474.342h9.78a.5.5 0 0 0 .474-.342l2.667-8a.5.5 0 0 0-.475-.658H56m-7.5 0 3.583-4.479a.5.5 0 0 1 .8.026L56 49m-7.5 0H56\"/><circle cx=\"52.5\" cy=\"53.5\" r=\"1.5\"/></g>"}
</svg>
