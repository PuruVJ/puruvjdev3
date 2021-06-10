<script context="module" lang="ts">
  import LikeButton from '$lib/components/LikeButton.svelte';
  import { fadeIn, fadeOut } from '$lib/fade';
  import { formatDate } from '$lib/helpers/format-date';
  import type { IBlog } from '$lib/interfaces/blog.interface';
  import { readingProgress } from '$lib/stores/progress.store';
  import type { Load } from '@sveltejs/kit';
  import { onDestroy, onMount } from 'svelte';
  import { throttle } from 'throttle-debounce';
  import '../../css/blog-page-style.scss';

  export const load: Load = async ({ page, fetch }) => {
    const { slug } = page.params;

    try {
      const res = await fetch(`/blog/${slug}.json`);

      const data = await res.json();

      return { props: { blogData: data } };
    } catch (e) {
      return;
    }
  };
</script>

<script lang="ts">
  export let blogData: IBlog;
  let { title, body, date, description, cover_image, id, reading_time, series } = blogData;

  const browserTitle = title.replace(/<img.*?alt="(.*?)"[^\>]+>/g, '$1');

  function handleProgressBar() {
    let height = document.body.scrollHeight - document.documentElement.clientHeight;
    const currentY = document.body.scrollTop;
    // console.log({ currentY, height, sh: document.body.scrollHeight });

    $readingProgress = currentY / height;
  }

  onMount(async () => {
    document.body.classList.remove('background');

    await import('lazysizes');
  });

  onDestroy(() => {
    $readingProgress = 0;
  });
</script>

<svelte:head>
  <title>{browserTitle} // Puru Vijay</title>
  <meta name="description" content={description} />

  <meta property="og:title" content="{browserTitle} // Puru Vijay" />
  <meta property="og:description" content={description} />
  <meta property="og:image" content="https://puruvj.dev/{cover_image}" />
  <meta property="og:url" content="https://puruvj.dev/blog/{id}" />

  <link rel="canonical" href="https://puruvj.dev/blog/{id}" />
</svelte:head>

<svelte:window on:scroll={throttle(10, false, handleProgressBar)} />

<main class="" in:fadeIn out:fadeOut>
  <LikeButton blogID={id} />
  <div class="progress" aria-roledescription="progress">
    <div class="indicator" style="transform: scaleX({$readingProgress})" />
  </div>
  <span class="series">
    {#if series}
      <mark>SERIES</mark> {series}
    {/if}
  </span>
  <h1>{@html title}</h1>
  <p><time>{formatDate(date)}</time> &bull; <span>{Math.ceil(reading_time)} min read</span></p>
  <article id="blog-content">
    {@html body}
  </article>
</main>

<style lang="scss">
  p {
    margin: 0;
    font-family: 'JetBrains Mono', monospace;
    font-weight: 500;
    font-size: 1.2rem;
    color: var(--app-color-primary);

    text-align: center;
  }

  #blog-content {
    font-size: 1.3rem;
    font-weight: 500 !important;
  }

  div.progress {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 21;

    margin: 0;

    width: 100%;
    height: 4px;

    .indicator {
      height: 100%;
      width: 100%;

      background-color: var(--app-color-primary);

      transform: scaleX(0);
      transform-origin: 0 0;
    }
  }

  .series {
    font-size: 1.3rem;

    color: rgba(var(--app-color-dark-rgb), 0.6);

    letter-spacing: 1px;
    font-family: 'JetBrains Mono', monospace;

    mark {
      font-family: 'Quicksand', sans-serif;
    }
  }

  // :global(#blog-content a:not(.heading-link)) {
  // }
</style>
