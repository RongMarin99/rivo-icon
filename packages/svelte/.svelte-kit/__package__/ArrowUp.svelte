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
  {@html "<path fill=\"currentColor\" d=\"M12.385 7.311a.54.54 0 0 0-.77 0L8.16 10.766a.543.543 0 1 0 .77.766L12 8.458l3.074 3.074a.542.542 0 1 0 .766-.766zM12 16.688h.541V7.696H11.46v8.992z\"/>"}
</svg>
