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
  {@html "<path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"1.00108239\" d=\"M5.5 5.5H3a.5.5 0 0 0-.5.502v12c0 .277.222.498.5.498h2.5m13-13h2.501a.5.5 0 0 1 .499.502v12A.5.5 0 0 1 21 18.5h-2.5M5.998 8.901v6.197M12 8.901v6.197m6.002-6.197v6.197M9.002 8v8.004M14.998 8v8.004\"/>"}
</svg>
