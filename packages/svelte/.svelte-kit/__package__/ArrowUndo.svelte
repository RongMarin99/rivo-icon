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
  {@html "<path stroke=\"currentColor\" stroke-width=\"1.229\" d=\"M8.868 2.481 1.84 11.928a.107.107 0 0 0 0 .149l7.027 9.447a.123.123 0 0 0 .223-.07v-5.462q.01-.107.117-.122c8.914-.393 11.436 1.053 12.718 5.536.032.118.202.123.233 0 1.47-5.339-.744-13.27-6.42-13.286-5.727-.022-4.11 0-6.526 0a.13.13 0 0 1-.123-.123V2.55a.123.123 0 0 0-.222-.074Z\"/>"}
</svg>
