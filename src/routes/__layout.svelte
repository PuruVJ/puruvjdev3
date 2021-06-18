<script lang="ts">
  import { dev } from '$app/env';
  import { page } from '$app/stores';
  import Footer from '$lib/components/Footer.svelte';
  import Nav from '$lib/components/Nav.svelte';
  import { waitFor } from '$lib/helpers/utils';
  import { theme } from '$lib/stores/theme.store';
  import { onMount } from 'svelte';
  import '../css/global.scss';
  import '../css/fonts.scss';

  onMount(async () => {
    await waitFor(200);

    document.body.style.setProperty('--transition-duration', '200ms');
  });
</script>

<svelte:head>
  <!-- As this component is omnipresent, the script for different favicons will live here -->

  {#if dev}
    <link rel="icon" href="/icons/favicon-dev.svg" />
  {:else}
    <link rel="icon" href="/icons/favicon-{$theme}.png" />
  {/if}
</svelte:head>

<Nav page={$page.path} />

<main style="margin-top: 3.75rem">
  <slot />
</main>

<Footer />

<style lang="scss">
  main {
    flex: 1 1 auto;
  }
</style>
