<script>
  import { mdiOpenInNew } from '@mdi/js';
  import Icon from './Icon.svelte';
</script>

<a href="https://bh0r2vt8n2f.typeform.com/to/tVdjlnjE" target="_blank" rel="noopener noreferrer">
  <span>Contact Me</span>
  <Icon path={mdiOpenInNew} />
</a>

<style lang="scss">
  a {
    display: flex;
    justify-content: flex-start !important;
    align-items: center;
    gap: 0.5rem;

    padding: 1.5rem;

    cursor: pointer;

    border-radius: 1rem;
    border: 0;

    background-color: rgba(var(--app-color-primary-rgb), 0.15);

    font-family: 'Quicksand', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--app-color-primary);

    fill: var(--app-color-primary);

    transition: background-color var(--transition-duration) ease-out,
      box-shadow var(--transition-duration) ease-out;

    :global(svg) {
      display: block;
    }

    &:hover,
    &:focus {
      background-color: rgba(var(--app-color-primary-rgb), 0.3);
      color: var(--app-color-primary);
    }

    &:focus-visible {
      box-shadow: 0 0 0 0.25rem rgba(var(--app-color-primary-rgb), 0.75);
    }
  }
</style>
