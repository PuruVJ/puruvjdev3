<script context="module" lang="ts">
  import BlogList from '$lib/components/BlogList.svelte';
  import { fadeIn, fadeOut } from '$lib/fade';
  import type { IBlog } from '$lib/interfaces/blog.interface';
  import type { Load } from '@sveltejs/kit';
  import { onMount } from 'svelte';

  export const load: Load = async ({ fetch }) => {
    const res = await fetch('./data/blogs-list.json');
    const data = await res.json();

    return { props: { blogsList: data } };
  };
</script>

<script lang="ts">
  onMount(() => {
    document.body.classList.add('background');
  });

  export let blogsList: IBlog[];
</script>

<svelte:head>
  <title>Blog // Puru Vijay</title>

  <meta
    name="description"
    content="Read about web development, designing and programming on Puru Vijay's blog."
  />

  <meta property="og:title" content="Blog // Puru Vijay" />
  <meta
    property="og:description"
    content="Read about web development, designing and programming on Puru Vijay's blog."
  />
  <meta property="og:image" content="https://puruvj.dev/media/blog-social-intro.png" />
  <meta property="og:url" content="https://puruvj.dev/blog/" />

  <link rel="canonical" href="https://puruvj.dev/blog/" />
</svelte:head>

<main tabindex="-1" in:fadeIn out:fadeOut>
  <h1>Blog</h1>

  <BlogList {blogsList} />
  <slot />
</main>

<!-- <style lang="scss">
  h1 {
    width: 100%;
    text-align: center;
    font-size: 2.618rem * 1.618;
  }
</style> -->
