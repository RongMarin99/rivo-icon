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
  {@html "<path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"1.001\" d=\"M6.582 13.929V3.762q.009-.091.1-.1h13.799q.09.009.1.1v13.799q-.01.09-.1.1H10.314\"/><path fill=\"currentColor\" d=\"M14.461 10.683a.537.537 0 1 0-.758-.758l.377.38zM3.618 20.239c0 .294.238.537.533.537h4.832a.537.537 0 1 0 0-1.075h-4.29v-4.294a.537.537 0 0 0-1.075 0zM14.08 10.31l-.377-.381-9.929 9.928.377.382.382.377 9.928-9.924z\"/>"}
</svg>
