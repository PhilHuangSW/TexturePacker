<script>
  import {
    rectangles,
    width,
    height,
    stats,
    missedOrFilled,
    reset,
    fits,
  } from "./Store/rectangle-store.js";

  import LoadingSpinner from "./UI/LoadingSpinner.svelte";
  import Navbar from "./UI/Navbar.svelte";
  import Footer from "./UI/Footer.svelte";
  import ConfigureInputs from "./TexturePacker/ConfigureInputs.svelte";
  import MainButtons from "./TexturePacker/MainButtons.svelte";
  import ResetButtons from "./TexturePacker/ResetButtons.svelte";
  import InformationText from "./TexturePacker/InformationText.svelte";
  import SVG from "./TexturePacker/SVG.svelte";
  import RectanglesText from "./TexturePacker/RectanglesText.svelte";

  let executionTime;
  let area = 1600;
  let filledArea = 0;
  let output = [];
  let missed = [];
  let scale = 25;
  let timedIndex = 0;
  let showTimer = true;
  let loading = false;
  let firstRunForTimed = true;

  class Grid {
    constructor(width, height, x, y) {
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
    }

    fitsIn(gridSection) {
      if (
        gridSection.width >= this.width &&
        gridSection.height >= this.height
      ) {
        return true;
      } else if (
        gridSection.height >= this.width &&
        gridSection.width >= this.height
      ) {
        return true;
      }
      return false;
    }

    // Allows for rotation in rectangle IF AND ONLY IF the width === height and height === width of the node you are looking at
    sameSizeAs(currentRect) {
      if (
        currentRect.width === this.width &&
        currentRect.height === this.height
      ) {
        return true;
      } else if (
        currentRect.width === this.height &&
        currentRect.height === this.width
      ) {
        return 1;
      }
      return false;
    }
  }

  // Algorithm is a binary search tree that slices parts of the grid until eventually you have the perfect size your current rectangle
  // Example:
  // 5x5 grid -- 2x4 rectangle
  // first pass -> no partition that fits the 2x4, calculate the differences in height and width --> 3 width vs 1 height ---> since width is greater than height, we will make a HEIGHT cut and split the new nodes by the 2 separated sections ----> leftNode: 2x5, rightNode: 3x5
  // second pass -> no partition that fits the 2x4 (compare 2x5), calculate the differences in height and width --> 0 width vs 1 height ---> since height is greater than width, we will make a WIDTH cut and split the new nodes by the 2 separated sections ----> leftNode: 2x4, rightNode: 2x1
  // third pass -> find exactly 2x4 and 2x4, fill in the grid and mark that node as FILLED. We now also have nodes 3x5 and 2x1 that can later be filled
  class Node {
    constructor() {
      this.left = null;
      this.right = null;
      this.rect = null;
      this.filled = false;
    }

    insertRect(currRect) {
      if (this.left !== null) {
        return (
          this.left.insertRect(currRect) || this.right.insertRect(currRect)
        );
      }
      if (this.filled) {
        return null;
      }
      if (!currRect.fitsIn(this.rect)) {
        return null;
      }
      let filledRegularOrSideways = currRect.sameSizeAs(this.rect);
      if (filledRegularOrSideways) {
        this.filled = true;
        return this;
      }

      this.left = new Node();
      this.right = new Node();

      const widthDifference = this.rect.width - currRect.width;
      const heightDifference = this.rect.height - currRect.height;
      const gridCut = this.rect;

      if (widthDifference > heightDifference) {
        this.left.rect = new Grid(
          currRect.width,
          gridCut.height,
          gridCut.x,
          gridCut.y
        );
        this.right.rect = new Grid(
          gridCut.width - currRect.width,
          gridCut.height,
          gridCut.x + currRect.width,
          gridCut.y
        );
      } else {
        this.left.rect = new Grid(
          gridCut.width,
          currRect.height,
          gridCut.x,
          gridCut.y
        );
        this.right.rect = new Grid(
          gridCut.width,
          gridCut.height - currRect.height,
          gridCut.x,
          gridCut.y + currRect.height
        );
      }
      return this.left.insertRect(currRect);
    }
  }

  const randomColor = () => {
    let color = [0, 0, 0];
    for (let i = 0; i <= 2; i++) {
      if (Math.random() < 0.66666) {
        color[i] = 32 + parseInt(Math.random() * 192);
      }
    }
    return "rgba(" + color[0] + "," + color[1] + "," + color[2] + ", 85%)";
  };

  let root = new Node();
  root.rect = new Grid($width, $height, 0, 0);

  const fillGrid = (w, h, idx) => {
    let color = randomColor();
    const rect = new Grid(w, h, 0, 0);
    const node = root.insertRect(rect);
    if (node) {
      node.rect["color"] = color;
      node.rect["index"] = idx + 1;
      output = [...output, node.rect];
      const r = node.rect;
      filledArea += r.width * r.height;
    } else {
      missed = [
        ...missed,
        { width: rect.width, height: rect.height, index: idx + 1 },
      ];
      $rectangles[idx].couldNotFill = true;
    }
  };

  const compute = () => {
    let start = performance.now();
    showTimer = true;
    root = new Node();
    root.rect = new Grid($width, $height, 0, 0);
    output = [];
    missed = [];
    filledArea = 0;
    for (let i = 0; i < $rectangles.length; i++) {
      fillGrid($rectangles[i].width, $rectangles[i].height, i);
    }
    console.log("Below is the filled rectangles into grid array");
    console.log(output);
    console.log("---------------");
    console.log("Below is the unfilled rectangles array");
    console.log(missed);
    if (missed.length === 0) {
      $fits = 1;
    } else {
      $fits = -1;
    }
    $reset = true;
    let end = performance.now();
    executionTime = end - start;
  };

  const timedCompute = () => {
    if (firstRunForTimed) {
      root = new Node();
      root.rect = new Grid($width, $height, 0, 0);
      firstRunForTimed = false;
    }
    showTimer = false;
    loading = true;
    $reset = true;
    fillGrid(
      $rectangles[timedIndex].width,
      $rectangles[timedIndex].height,
      timedIndex
    );
    timedIndex += 1;
    if (timedIndex < $rectangles.length) {
      setTimeout(timedCompute, 25);
    } else {
      loading = false;
      if (missed.length === 0) {
        $fits = 1;
      } else {
        $fits = -1;
      }
      console.log("Below is the filled rectangles into grid array");
      console.log(output);
      console.log("---------------");
      console.log("Below is the unfilled rectangles array");
      console.log(missed);
    }
  };

  const resetting = () => {
    output = [];
    missed = [];
    filledArea = 0;
    $fits = 0;
    $reset = false;
    timedIndex = 0;
    firstRunForTimed = true;
    console.clear();
  };

  const showTextOrGrid = () => {
    $stats = !$stats;
    $missedOrFilled = !$missedOrFilled;
  };

  const calculateArea = () => {
    area = $width * $height;
  };

  $: {
    if ($width < 10 && $height < 10) {
      scale = 50;
    } else if ($width < 30 && $height < 30) {
      scale = 25;
    } else if ($width < 55 && $height < 55) {
      scale = 20;
    } else if ($width < 185 && $height < 185) {
      scale = 10;
    } else if ($width < 350 && $height < 350) {
      scale = 5;
    } else if ($width < 500 && $height < 500) {
      scale = 2;
    } else {
      scale = 1;
    }
  }
  $: $width && calculateArea();
  $: $height && calculateArea();
</script>

<!-- Simple navbar, unfortunately the anchor tag renders the entire navbar as a link, will need to further look into css to change -->
<Navbar title="Texture Packer" />

{#if !$reset}
  <!-- Input Options -->
  <ConfigureInputs />

  <!-- Buttons for Calculate, Show Options, Show Text/Grid, Timed Intervals -->
  <MainButtons
    on:compute={compute}
    on:timedCompute={timedCompute}
    on:showTextOrGrid={showTextOrGrid}
  />
{:else if loading}
  <!-- Only displays spinner when doing a Timed Interval calculation -->
  <LoadingSpinner {showTextOrGrid} />
{:else}
  <!-- Buttons for Reset and Show Text/Grid -->
  <ResetButtons on:resetting={resetting} on:showTextOrGrid={showTextOrGrid} />
{/if}

<!-- Information text display -->
<!-- ALWAYS displays Total rectangle area and grid area -->
<!-- Displays statistics once a compute is completed -->
<InformationText
  {area}
  {output}
  {filledArea}
  {executionTime}
  {showTimer}
  {missed}
/>
<!-- Displays either Grid or Text to display data -->
{#if !$stats}
  <!-- Grid based display -->
  <SVG {scale} {output} />

  <!-- Text based display -->
{:else}
  <RectanglesText {output} {missed} />
{/if}

<Footer footerInformation="Made with Svelte. Created by Philip Huang 2021." />
