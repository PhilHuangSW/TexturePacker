<script>
  import {
    rectangles,
    width,
    height,
    numRectangles,
    lowerBound,
    upperBound,
    randomizeRectangles,
    rectangleGreaterThanGrid,
    showOptions,
  } from "../Store/rectangle-store";

  import Input from "../UI/Input.svelte";

  const checkMin = () => {
    if ($lowerBound >= $upperBound) {
      $lowerBound = $upperBound - 1;
    }
  };

  const checkMax = () => {
    if ($upperBound <= $lowerBound) {
      $upperBound = $lowerBound + 1;
    }
  };

  const checkRectangle = () => {
    if ($rectangles[0].height > $height) {
      $rectangleGreaterThanGrid = true;
    } else {
      $rectangleGreaterThanGrid = false;
    }
  };

  $: $numRectangles &&
    randomizeRectangles($numRectangles, $lowerBound, $upperBound);
  $: $lowerBound &&
    randomizeRectangles($numRectangles, $lowerBound, $upperBound);
  $: $upperBound &&
    randomizeRectangles($numRectangles, $lowerBound, $upperBound);
  $: $upperBound && checkRectangle();
</script>

<!-- Input Component prop options: -->
<!-- *****NOTE***** This component is only type="number" -->
<!-- tooltip: Adds a tooltip above that input that reads message -->
<!-- labelFor: <===> <label for=""> -->
<!-- value: The value passed as input for the algorithm -->
<!-- min: Minimum value an input can have -->
<!-- on:input and on:change event handlers -->
<div class="input-div">
  <!-- width -->
  <Input
    tooltip="Minimum 1"
    labelFor="columns"
    value={$width}
    min="1"
    on:input={(event) => ($width = event.target.valueAsNumber)}
    >Width
  </Input>
  <!-- height -->
  <Input
    tooltip="Minimum 1"
    labelFor="rows"
    value={$height}
    min="1"
    on:input={(event) => ($height = event.target.valueAsNumber)}
    >Height
  </Input>

  <!-- More options such as number of rectangles, min/max size of rectangles -->
  {#if $showOptions}
    <!-- number of rectangles -->
    <Input
      tooltip="Press Show Text below to display current rectangles"
      labelFor="numRect"
      value={$numRectangles}
      min="1"
      on:input={(event) => ($numRectangles = event.target.valueAsNumber)}
      >Number of Rectangles
    </Input>
    <!-- lower bound of each rectangle size -->
    <Input
      tooltip="Cannot be greater than max size"
      labelFor="lowerBound"
      value={$lowerBound}
      min="1"
      on:input={(event) => ($lowerBound = event.target.valueAsNumber)}
      on:change={checkMin}
      >Min Size of Rectangle
    </Input>
    <!-- upper bound of each rectangle size -->
    <Input
      tooltip="Cannot be less than min size"
      labelFor="upperBound"
      value={$upperBound}
      min="2"
      on:input={(event) => ($upperBound = event.target.valueAsNumber)}
      on:change={checkMax}
      >Max Size of Rectangle
    </Input>
  {/if}
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
