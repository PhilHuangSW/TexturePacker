<script>
  import {
    numRectangles,
    upperBound,
    lowerBound,
    totalRectangleArea,
    reset,
    rectangleGreaterThanGrid,
    randomizeRectangles,
    showOptions,
    fits,
  } from "../Store/rectangle-store";

  export let output;
  export let area;
  export let filledArea;
  export let showTimer;
  export let executionTime;
  export let missed;
  export let windowMode;
</script>

<div>
  <!-- Displays total rectangle area vs grid area -->
  <!-- This is ALWAYS SHOWING -->
  <p
    style="font-size: 20px; font-weight: bold; color: {$totalRectangleArea >
    area
      ? 'red'
      : 'green'};"
  >
    Total rectangle array area: {$totalRectangleArea} -- Grid area: {area}
  </p>
  {#if !$reset}
    <!-- Will give a warning telling the user they have a rectangle that is larger than the dimensions of the grid and offer options via anchor tags -->
    {#if $totalRectangleArea > area}
      <p class="failure">
        NOTE: this <span style="font-weight:bolder;">will</span> fail, {#if $rectangleGreaterThanGrid}
          <span>a rectangle has greater dimensions than grid, </span>
        {/if}
        <!-- svelte-ignore a11y-missing-attribute -->
        <a
          on:click={() =>
            randomizeRectangles($numRectangles, $lowerBound, $upperBound)}
          >click here</a
        >
        to refresh or consider changing some
        <!-- svelte-ignore a11y-missing-attribute -->
        <a on:click={() => ($showOptions = !$showOptions)}>options</a>
      </p>
    {/if}
  {/if}

  <!-- This displays IF AlL rectangles fit inside grid and useful information about the compute -->
  {#if $fits === 1}
    <p class="success">
      Everything Fits! Total Rectangles: {output.length}
    </p>
    <p class="success">
      Total area used: {filledArea} out of {area} ({(
        (filledArea / area) *
        100
      ).toFixed(2)}%)
    </p>
    {#if showTimer}
      <p class="success">
        Time it took to create and fill grid with {$numRectangles} rectangles: {executionTime.toFixed(
          2
        )}
        milliseconds
      </p>
    {/if}

    <!-- This displays IF ANY rectangles did not fit inside grid and useful information about the compute -->
  {:else if $fits === -1}
    <p class="failure">
      Couldn't Fit Everything...{missed.length} out of {output.length +
        missed.length} couldn't fit
    </p>
    <p class="failure">
      Total area used: {filledArea} out of {area} ({(
        (filledArea / area) *
        100
      ).toFixed(2)}%)
    </p>
    {#if showTimer}
      <p class="failure">
        Time it took to create and fill grid with {$numRectangles} rectangles: {executionTime.toFixed(
          2
        )}
        milliseconds
      </p>
    {/if}
  {/if}
  {#if windowMode}
    <p class="failure">
      NOTE: You can change the rectangle array by going back to Input Mode and
      Going to Options
    </p>
  {/if}
</div>

<style>
  a {
    cursor: pointer;
  }

  p {
    margin: auto;
    text-align: center;
  }
</style>
