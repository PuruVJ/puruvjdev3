<script>
  import { mdiRss } from '@mdi/js';

  import Icon from './Icon.svelte';
</script>

<a href="/rss.xml" aria-label="RSS Feed" rel="noopener" target="_blank">
  <Icon path={mdiRss} />
</a>

<style lang="scss">
  a {
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 50%;

    padding-left: 0.2rem;
    padding-bottom: 0.2rem;

    transition: background-color 150ms ease-in;

    height: 2.3rem;
    width: 2.3rem;
  }

  a:hover,
  a:focus {
    background-color: rgba(var(--app-color-dark-rgb), 0.2);
  }
</style>
