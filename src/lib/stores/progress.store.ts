import { quintOut } from "svelte/easing";
import { tweened } from "svelte/motion";

export const readingProgress = tweened(0, {
  easing: quintOut,
});
