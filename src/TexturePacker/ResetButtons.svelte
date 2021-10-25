<script>
  import { missedOrFilled } from "../Store/rectangle-store";
  import { createEventDispatcher } from "svelte";

  import Button from "../UI/Button.svelte";

  const dispatch = createEventDispatcher();
</script>

<!-- Button Component options: -->
<!-- tooltip: Adds a tooltip above that input that reads message -->
<!-- style: allows personal additional styling for the user -->
<!-- mode: outline/failure are the only 2 mode choices (attached to class for styling) -->
<div class="reset-div">
  <Button
    on:click={() => dispatch("resetting")}
    tooltip="Resets all data. Try again!"
    style="margin-right: 1rem;"
    mode="failure">Reset</Button
  >
  {#if !$missedOrFilled}
    <Button
      on:click={() => dispatch("showTextOrGrid")}
      tooltip="Shows all rectangles in text format"
      mode="outline">Show Text</Button
    >
  {:else}
    <Button
      on:click={() => dispatch("showTextOrGrid")}
      tooltip="Shows all rectangles filled in the grid"
      mode="outline">Show Grid</Button
    >
  {/if}
</div>

<style>
  .reset-div {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: auto;
  }
</style>
