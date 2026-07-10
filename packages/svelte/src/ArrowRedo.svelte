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
  {@html "<path stroke=\"currentColor\" stroke-width=\"1.229\" d=\"m15.127 2.481 7.032 9.447a.107.107 0 0 1 0 .149l-7.033 9.447a.123.123 0 0 1-.217-.07v-5.462a.123.123 0 0 0-.123-.122C5.87 15.477 3.35 16.923 2.074 21.406c-.037.118-.203.123-.233 0C.367 16.067 2.58 8.136 8.255 8.12c5.728-.022 4.112 0 6.526 0a.123.123 0 0 0 .128-.123V2.55c0-.123.15-.17.218-.074Z\"/>"}
</svg>
