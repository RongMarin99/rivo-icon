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
  {@html "<g transform=\"matrix(1.2 0 0 1.2 -50.4 -50.4)\"><path fill=\"currentColor\" d=\"m53.72 48.226 2.931 3.712a.1.1 0 0 1 0 .124l-2.93 3.712a.1.1 0 0 1-.18-.062v-2.036a.1.1 0 0 0-.096-.1c-3.713-.15-4.841.407-5.407 2.111-.031.094-.162.096-.187 0-.553-2.17.415-5.26 2.815-5.267 2.44-.008 1.798 0 2.776 0a.1.1 0 0 0 .1-.1v-2.032a.1.1 0 0 1 .178-.062\"/><circle cx=\"52\" cy=\"52\" r=\"8.5\" stroke=\"currentColor\"/></g>"}
</svg>
