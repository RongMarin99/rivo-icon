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
  {@html "<path fill=\"currentColor\" d=\"M20.719 13.953a.65.65 0 0 0 0-.91l-4.1-4.1a.645.645 0 1 0-.909.91l3.645 3.645-3.645 3.645a.645.645 0 1 0 .91.91zm-17.437-.455v.645h16.982v-1.29H3.282z\"/>"}
</svg>
