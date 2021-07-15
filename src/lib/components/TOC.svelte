<!-- Table of Contents component for Blog page -->
<script lang="ts">
  import type { TOC } from '$lib/interfaces/blog.interface';

  export let toc: TOC[];
</script>

<div class="container" tabindex="0">
  <ul>
    {#each toc as { id, title, length }}
      <li>
        <a href="#{id}">{@html title}</a>
        <hr style="--width: {length}" />
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  .container {
    position: fixed;
    top: 0;
    left: 0;

    display: flex;
    align-items: center;

    height: 100vh;
    width: calc((100% - 61.8%) / 2);
  }

  ul {
    list-style-type: none;

    margin: 0;
    padding: 0rem;

    font-size: 0.9rem;
    line-height: 1.6;

    &:hover {
      a {
        opacity: 1;
      }

      hr {
        opacity: 0;

        z-index: -1;
      }
    }

    a {
      opacity: 0;

      margin-left: 0.5rem;

      white-space: nowrap;
      color: rgba(var(--app-color-dark-rgb), 0.9);
      font-weight: 400;

      &:hover {
        color: var(--app-color-primary);
      }
    }
  }

  li {
    position: relative;
  }

  hr {
    position: absolute;
    top: 50%;
    z-index: 1;

    background-color: rgba(var(--app-color-dark-rgb), 0.3);

    height: 4px;
    width: calc(4px * var(--width));

    border-radius: 0 10rem 10rem 0;

    margin: 0;
    padding: 0;

    border: none;
  }

  a,
  hr {
    transition: opacity 100ms ease-in, color 100ms ease-in;
  }

  @media screen and (max-width: 1100px) {
    .container {
      display: none;
    }
  }
</style>
