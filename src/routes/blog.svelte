<script context="module" lang="ts">
  import BlogList from '$lib/components/BlogList.svelte';
  import { fadeIn, fadeOut } from '$lib/fade';
  import type { IBlog } from '$lib/interfaces/blog.interface';
  import type { Load } from '@sveltejs/kit';
  import { onMount } from 'svelte';

  export const load: Load = async ({ fetch }) => {
    const res = await fetch('/data/blogs-list.json');
    const data = await res.json();

    return { props: { blogsList: data } };
  };

  export const prerender = true;
</script>

<script lang="ts">
  import { browser } from '$app/env';

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

<div>
  <main tabindex="-1" in:fadeIn out:fadeOut>
    <h1>Blog</h1>

    {#each blogsList as { id }}
      <!-- svelte-ignore a11y-missing-content -->
      <a hidden={browser} href="/blog/{id}" />
    {/each}
    <BlogList {blogsList} />
  </main>
</div>
