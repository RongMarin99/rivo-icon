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
  {@html "<g stroke=\"currentColor\" stroke-width=\"4.333\"><path stroke-width=\"1.43049662\" d=\"M9.497.495a6.484 6.484 0 0 1 8.324 3.859c.619 1.702.669 4.254.124 6.552a10 10 0 0 1-1.177 2.991 3.7 3.7 0 0 1-1.773 1.598 3.7 3.7 0 0 1-2.383-.074 10 10 0 0 1-2.836-1.518c-1.895-1.406-3.513-3.387-4.137-5.085A6.484 6.484 0 0 1 9.497.495Z\"/><path stroke-linecap=\"round\" stroke-width=\"1.43049662\" d=\"m13.932 15.928-.39 1.537a.712.712 0 0 0 .947.849l3.133-1.178a.712.712 0 0 0 .149-1.263l-.99-.658m-.564 2.573c-.148 3.859 2.144 5.716 2.144 5.716M8.208 8.07s.72 2.856 4.292 4.287\"/></g>"}
</svg>
