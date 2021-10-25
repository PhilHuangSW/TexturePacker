<script>
  import {
    width,
    height,
    numRectangles,
    lowerBound,
    upperBound,
    showOptions,
    missedOrFilled,
  } from "../Store/rectangle-store.js";
  import { createEventDispatcher } from "svelte";

  import Button from "../UI/Button.svelte";
  import TextOrGridButton from "../UI/TextOrGridButton.svelte";

  const dispatch = createEventDispatcher();
</script>

<!-- Button Component options: -->
<!-- tooltip: Adds a tooltip above that input that reads message -->
<!-- style: allows personal additional styling for the user -->
<!-- mode: outline/failure are the only 2 mode choices (attached to class for styling) -->
<div class="button-div">
  <Button
    on:click={() => dispatch("compute")}
    tooltip="w:{$width},h:{$height} - {$numRectangles} rectangles between sizes [{$lowerBound},{$upperBound}]"
    style="margin-right: 1.5rem;"
  >
    Calculate
  </Button>
  {#if $showOptions}
    <Button
      on:click={() => ($showOptions = !$showOptions)}
      tooltip="Hides additional options"
      style="margin-right: 1.5rem;"
      mode="outline"
    >
      Hide Options
    </Button>
  {:else}
    <Button
      on:click={() => ($showOptions = !$showOptions)}
      tooltip="Options for changing number of rectangles, min/max sizes of rectangles"
      style="margin-right: 1.5rem;"
      mode="outline"
    >
      Show Options
    </Button>
  {/if}
  <TextOrGridButton on:showTextOrGrid={() => dispatch("showTextOrGrid")} />
  <Button
    on:click={() => dispatch("timedCompute")}
    tooltip="Places a rectangle every 25 milliseconds"
    style="margin-left: 1.5rem;"
  >
    Timed Intervals
  </Button>
</div>

<style>
  .button-div {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: auto;
  }
</style>
