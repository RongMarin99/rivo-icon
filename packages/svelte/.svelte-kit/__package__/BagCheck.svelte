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
  {@html "<g stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"bevel\" stroke-width=\"1.439\"><path d=\"M.498 4.812v11.502a2.88 2.88 0 0 0 2.873 2.875H20.63a2.866 2.866 0 0 0 2.872-2.875V4.812m-17.253 0c.561-7.078 10.936-7.078 11.502 0m-17.253 0h23.004\"/><path d=\"m9.128 12.718 2.156 3.594 4.31-8.623\"/></g>"}
</svg>
