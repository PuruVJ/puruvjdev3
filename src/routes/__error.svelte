<script>
  import NotFoundSvg from '$lib/components/NotFoundSVG.svelte';
  import { fadeIn, fadeOut } from '$lib/fade';
  import { onMount } from 'svelte';

  onMount(() => document.body.classList.add('background'));
</script>

<svelte:head>
  <title>Not found</title>
</svelte:head>

<main in:fadeIn out:fadeOut>
  <h1>
    <span style="color: var(--app-color-primary)">404</span> - Not Found
  </h1>
  <NotFoundSvg />
</main>

<style lang="scss">
  main {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    width: 100%;
    height: 100%;
  }

  main :global(svg) {
    width: 100%;
    max-width: 40rem;
    height: auto;
  }

  main :global(path) {
    transition: fill var(--transition-duration) ease-in;
  }

  @media screen and (min-width: 600px) {
    h1 {
      font-size: 2.618rem * 1.618;
    }
  }
</style>
