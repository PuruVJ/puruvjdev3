<script lang="ts">
  export let path: string;
  export let size: number = 24;
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 24 24">
  <path d={path} />
</svg>
