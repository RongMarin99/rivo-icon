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
  {@html "<path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"1.001\" d=\"M8.732 9.95v10.167q.009.09.1.1h13.799q.09-.01.1-.1V6.318a.1.1 0 0 0-.1-.1H12.464\"/><path fill=\"currentColor\" d=\"M16.563 13.495a.538.538 0 0 1-.762.758l.381-.377zM5.763 3.9c0-.3.243-.538.538-.538l4.837.022a.537.537 0 0 1-.01 1.075l-4.29-.017-.021 4.29a.537.537 0 1 1-1.075 0zm10.419 9.976-.381.377L5.92 4.277 6.3 3.9l.382-.377 9.88 9.972z\"/>"}
</svg>
