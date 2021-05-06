<script context="module" lang="ts">
  import Icon from '$lib/components/Icon.svelte';
  import { fadeIn, fadeOut } from '$lib/fade';
  import type { IWork } from '$lib/interfaces/work.interface';
  import { mdiGithub, mdiWeb } from '@mdi/js';
  import type { Load } from '@sveltejs/kit';
  import { onMount } from 'svelte';

  export const load: Load = async ({ fetch }) => {
    try {
      const res = await fetch(`./data/works.json`);

      const data = await res.json();

      return { props: { works: data } };
    } catch (e) {
      return;
    }
  };
</script>

<script lang="ts">
  export let works: IWork[];

  onMount(() => document.body.classList.add('background'));
</script>

<svelte:head>
  <title>Works // Puru Vijay</title>
</svelte:head>

<main in:fadeIn out:fadeOut>
  {#each works as { title, image, url, repo }}
    <section>
      <div class="img-preview"><img src={image.small.webp} alt={title} /></div>
      <div class="info-section">
        <div class="title">{title}</div>
        <div class="icons">
          <a rel="noopener" target="_blank" href={url}><Icon path={mdiWeb} /></a>
          <a rel="noopener" target="_blank" href={repo.url}><Icon path={mdiGithub} /></a>
        </div>
      </div>
    </section>
  {/each}
</main>

<style lang="scss">
  main {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }

  section {
    display: flex;
    flex-direction: column;

    box-shadow: 0 0.3px 1.1px rgba(0, 0, 0, 0.017), 0 0.8px 2.5px rgba(0, 0, 0, 0.024),
      0 1.3px 4.3px rgba(0, 0, 0, 0.03), 0 2.1px 6.9px rgba(0, 0, 0, 0.035),
      0 3.3px 10.6px rgba(0, 0, 0, 0.04), 0 5.1px 16.6px rgba(0, 0, 0, 0.046),
      0 8.5px 27.5px rgba(0, 0, 0, 0.053), 0 17px 55px rgba(0, 0, 0, 0.07);

    border-radius: 1rem;

    background-color: var(--app-color-shell);
  }

  .img-preview {
    max-width: 100%;

    object-fit: contain;

    img {
      width: 100%;

      border-radius: 1rem 1rem 0 0;
    }
  }

  .info-section {
    display: flex;
    justify-content: space-between;

    padding: 1rem;
  }

  .title {
    font-family: 'JetBrains Mono', monospace;
    font-weight: 600;
  }

  a {
    fill: var(--app-color-dark);
  }
</style>
