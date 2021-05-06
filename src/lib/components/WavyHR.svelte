<script lang="ts">
  export let width: number = 200;
</script>

<svg xmlns="http://www.w3.org/2000/svg" {width} viewBox="0 0 160 33" {...$$props}>
  <path
    stroke="var(--app-color-primary)"
    stroke-width="6"
    d="M5 16.5c10-13.333 20-13.333 30 0s20 13.333 30 0 20-13.333 30 0 20 13.333 30 0 20-13.333 30 0"
  />
</svg>

<style>
  path {
    transition: stroke var(--transition-duration) ease-in;
  }
</style>
