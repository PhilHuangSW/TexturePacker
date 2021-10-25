<script>
  import { rectangles } from "../Store/rectangle-store";

  import Button from "../UI/Button.svelte";

  export let output;
  export let missed;

  let showCount = 20;
</script>

<!-- Displays 3 columns of information -->
<!-- FIRST: All rectangles in rectangle array with their [w,h] and index -->
<!-- SECOND: Filled rectangles in grid with their [w,h] and position in grid -->
<!-- THIRD: Unfilled rectangles with their [w,h] and index from rectangles -->
<div class="row">
  <!-- FIRST: All rectangles in rectangle array with their [w,h] and index -->
  <div class="column">
    <h2>All Rectangles</h2>
    {#each $rectangles.slice(0, showCount) as { width, height, couldNotFill }, i (i)}
      {#if couldNotFill}
        <p class="failure">
          {i + 1}: [w:{width},h:{height}]
        </p>
      {:else}
        <p class="success">
          {i + 1}: [w:{width},h:{height}]
        </p>
      {/if}
    {/each}
  </div>
  <!-- SECOND: Filled rectangles in grid with their [w,h] and position in grid -->
  <div class="column success">
    <h2>Filled Rectangles</h2>
    {#each output.slice(0, showCount) as { width, height, index, x, y }, i (i)}
      {#if width !== height}
        {#if width === $rectangles[index - 1].height && height === $rectangles[index - 1].width}
          <p style="color: blue" data-tooltip="flipped rectangle">
            {index}: [w:{width},h:{height}] - Position: [{x},{y}]
          </p>
        {:else}
          <p>
            {index}: [w:{width},h:{height}] - Position: [{x},{y}]
          </p>
        {/if}
      {/if}
    {/each}
  </div>
  <!-- THIRD: Unfilled rectangles with their [w,h] and index from rectangles -->
  <div class="column failure">
    <h2>Missed Rectangles</h2>
    {#each missed.slice(0, showCount) as { width, height, index }, i (i)}
      <p>
        {index}: [w:{width},h:{height}]
      </p>
    {/each}
  </div>
</div>

<!-- Button Component options: -->
<!-- tooltip: Adds a tooltip above that input that reads message -->
<!-- style: allows personal additional styling for the user -->
<!-- mode: outline/failure are the only 2 mode choices (attached to class for styling) -->

<!-- Semi-pagination when there are too many rectangles -->
<!-- "Show More" reveals 20 more rectangles -->
<!-- "Show Less" reveals 20 less rectangles -->
{#if showCount < $rectangles.length}
  <div class="showMoreAndAll">
    <Button
      on:click={() => (showCount += 20)}
      tooltip="Reveal 20 more rectangles">Show More</Button
    >
    {#if showCount > 20}
      <Button
        on:click={() => (showCount -= 20)}
        mode="failure"
        style="margin-left: 1.5rem"
        tooltip="Hide 20 rectangles">Show Less</Button
      >
    {/if}
    <Button
      on:click={() => (showCount += $rectangles.length)}
      style="margin-left: 1.5rem;"
      tooltip="Show all {rectangles.length} rectangles">Show All</Button
    >
  </div>
{/if}

<style>
  p {
    margin: auto;
    text-align: center;
  }

  .row {
    display: flex;
    padding-bottom: 4rem;
  }

  .column {
    flex: 1;
  }

  h2 {
    text-align: center;
  }

  .showMoreAndAll {
    display: flex;
    justify-content: center;
    padding-bottom: 4rem;
  }
</style>
