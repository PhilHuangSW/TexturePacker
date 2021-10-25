import { writable } from "svelte/store";

export let rectangles = writable([{
  width: 5,
  height: 5,
  filled: false,
  area: 25
}]);
export let width = writable(40);
export let height = writable(40);
export let numRectangles = writable(50);
export let lowerBound = writable(1);
export let upperBound = writable(10);
export let totalRectangleArea = writable(25);
export let rectangleGreaterThanGrid = writable(false);
export let showOptions = writable(false);
export let stats = writable(false);
export let missedOrFilled = writable(false);
export let reset = writable(false);
export let fits = writable(0);

export const randomizeRectangles = (numRects, lowerB, upperB) => {
  let newRectangles = [];
  let totalRectArea = 0;
  for (let i = 0; i < numRects; i++) {
    newRectangles.push({
      width:
        Math.floor(Math.random() * (upperB - lowerB + 1)) +
        lowerB,
      height:
        Math.floor(Math.random() * (upperB - lowerB + 1)) +
        lowerB,
      filled: false,
    });
    newRectangles[i]["area"] =
      newRectangles[i].width * newRectangles[i].height;
    totalRectArea += newRectangles[i].area;
  }

  newRectangles.sort(function (a, b) {
    return b.height - a.height;
  });

  rectangles.set(newRectangles);
  totalRectangleArea.set(totalRectArea);
};