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
  {@html "<g transform=\"matrix(1.2 0 0 1.2 -50.4 -50.4)\"><circle cx=\"52\" cy=\"52\" r=\"8.5\" stroke=\"currentColor\"/><path fill=\"currentColor\" d=\"M51.616 56.884a.543.543 0 0 0 .768 0l3.458-3.458a.543.543 0 1 0-.768-.768L52 55.732l-3.074-3.074a.543.543 0 1 0-.768.768zM52 47.5h-.543v9h1.086v-9z\"/></g>"}
</svg>
