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
  {@html "<path fill=\"currentColor\" d=\"M3.282 11.545a.65.65 0 0 0 0 .91l4.112 4.112a.65.65 0 0 0 .914-.909L4.654 12l3.654-3.654a.65.65 0 0 0-.91-.913zM20.723 12v-.65H3.741v1.3h16.982z\"/>"}
</svg>
