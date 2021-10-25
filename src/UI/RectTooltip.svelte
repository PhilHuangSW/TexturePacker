<script>
  export let width;
  export let height;
  export let scale;
  export let color;
  export let x;
  export let y;
  export let title;
</script>

<!-- Shows the tooltip for EACH rectangle in grid, hover over it and after a second or so will display the information -->
<rect
  width={width * scale}
  height={height * scale}
  style="fill:{color}; stroke:black;"
  x={x * scale}
  y={y * scale}
>
  <title>{title}</title>
</rect>
