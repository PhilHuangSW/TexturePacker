<script>
  import { width, height } from "../Store/rectangle-store.js";

  import Input from "../UI/Input.svelte";
</script>

<div class="input-div">
  <Input
    tooltip="Disabled during window mode, resize the window to change size"
    labelFor="columns"
    value={$width}
    min="1"
    disabled="true"
    on:input={(event) => ($width = event.target.valueAsNumber)}
    >Width
  </Input>
  <!-- height -->
  <Input
    tooltip="Disabled during window mode, resize the window to change size"
    labelFor="rows"
    value={$height}
    min="1"
    disabled="true"
    on:input={(event) => ($height = event.target.valueAsNumber)}
    >Height
  </Input>
</div>

<style>
  .input-div {
    display: flex;
    justify-content: center;
    text-align: center;
    margin: auto;
    flex-wrap: wrap;
  }
</style>
