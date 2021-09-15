<script lang="ts">
  import { mdiChevronRight, mdiOpenInNew } from '@mdi/js';
  import { formatDate } from '$lib/helpers/format-date';
  import type { IBlog } from '$lib/interfaces/blog.interface';
  import Icon from './Icon.svelte';

  export let blogsList: IBlog[];
  export let seeMore: boolean = false;
</script>

{#each blogsList as { title, id, description, date, series, redirectTo, platform }}
  <a
    class="blog-link"
    href={redirectTo ?? `/blog/${id}`}
    aria-label={title}
    {...redirectTo ? { target: '_blank' } : { 'sveltekit:prefetch': true }}
  >
    <span class="series">
      {#if series}
        <mark>SERIES</mark> {series}
      {/if}
    </span>
    <h2 class="title">{@html title}</h2>
    <p class="description">{@html description}</p>
    <p class="more-info">
      {#if redirectTo}
        <span class="published-tagline">
          Published on {platform}
          <Icon path={mdiOpenInNew} size={18} />
        </span>
      {/if}

      <span />

      <time>{formatDate(date)}</time>
    </p>
  </a>
{/each}

{#if seeMore}
  <br />
  <a aria-label="See More Blog Posts" class="blog-link show-more" rel="prefetch" href="blog">
    <p aria-hidden="true" class="title end">See more <Icon size={40} path={mdiChevronRight} /></p>
  </a>
{/if}

<style lang="scss">
  .title {
    color: var(--app-color-primary);
    fill: var(--app-color-primary);

    // display: flex;
    // align-items: center;

    :global(.emoji) {
      margin: 0 0.5rem;

      vertical-align: middle;

      display: inline;

      height: 1.2em;
      width: 1.2em;
    }
  }

  .show-more .title {
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 1.618rem;
  }

  .description {
    color: var(--app-color-dark);
    font-family: 'JetBrains Mono', monospace;
  }

  p {
    margin: 0;
  }

  p.more-info {
    display: flex;
    justify-content: space-between;

    color: var(--app-color-primary);
    font-family: 'JetBrains Mono', monospace;
    margin-top: 0.3rem;
    font-weight: 500;

    .published-tagline {
      --color: rgba(var(--app-color-dark-rgb), 0.6);

      color: var(--color);
      fill: var(--color);

      display: flex;
      align-items: center;
      gap: 0.3rem;
    }
  }

  .blog-link {
    --bgc-opacity: 0;
    background-color: rgba(var(--app-color-primary-rgb), var(--bgc-opacity));

    display: block;

    transition: background-color var(--transition-duration) ease-out,
      box-shadow var(--transition-duration) ease-out;

    border-radius: 1rem;
    padding: 1rem 0.5rem;

    // font-weight: 400;

    &.show-more {
      --bgc-opacity: 0.15;

      &:hover,
      &:focus-visible {
        --bgc-opacity: 0.3;
      }
    }

    &:hover,
    &:focus-visible {
      --bgc-opacity: 0.1;
    }

    &:focus-visible {
      box-shadow: 0 0 0 0.25rem rgba(var(--app-color-primary-rgb), 0.75);
    }
  }

  h2 {
    line-height: 1.618;
  }

  .series {
    color: rgba(var(--app-color-dark-rgb), 0.6);

    letter-spacing: 1px;
    font-family: 'JetBrains Mono', monospace;

    mark {
      font-family: 'Atkinson Hyperlegible', sans-serif;
    }
  }
</style>
