<script>
  import { missedOrFilled } from "../Store/rectangle-store";
  import { createEventDispatcher } from "svelte";

  import Button from "./Button.svelte";

  const dispatch = createEventDispatcher();
</script>

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
