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
  {@html "<path fill=\"currentColor\" d=\"M10.043 20.719a.65.65 0 0 0 .91 0l4.103-4.1a.645.645 0 1 0-.909-.909l-3.649 3.645-3.645-3.645a.645.645 0 1 0-.91.91zm.455-17.437h-.645v16.982h1.29V3.282z\"/>"}
</svg>
