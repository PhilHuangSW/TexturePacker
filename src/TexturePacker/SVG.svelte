<script>
  import { width, height } from "../Store/rectangle-store";

  import RectTooltip from "../UI/RectTooltip.svelte";

  export let scale;
  export let output;
</script>

<!-- SVG that scales based on the scale property, a better calculator can improve on how well it responds to width/height changes as well as window reactivity changes -->
<div
  style="display: flex; justify-content:center; margin: auto; padding-bottom: 5rem;"
>
  <svg
    width={$width * scale}
    height={$height * scale}
    style="stroke:black; margin: auto; border: 1px solid black;"
  >
    <defs>
      <pattern
        id="grid"
        width={scale}
        height={scale}
        patternUnits="userSpaceOnUse"
      >
        <rect width={scale} height={scale} fill="url(#tenthGrid)" />
        <path
          d="M 100 0 L 0 0 0 100"
          fill="none"
          stroke="gray"
          stroke-width="1"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
    {#each output as { width, height, x, y, color }, i (i)}
      <g>
        <RectTooltip
          {width}
          {scale}
          {height}
          {color}
          {x}
          {y}
          title="[{x},{y}] -- [width: {width}, height: {height} -- rectangle #{i +
            1}]"
        />
        <text
          font-size="15"
          fill="black"
          font-family="Arial"
          x={x * scale + 5}
          y={y * scale + 15}>{i + 1}</text
        >
      </g>
    {/each}
  </svg>
</div>
