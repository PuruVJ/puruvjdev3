<script lang="ts">
  import { mdiHeart, mdiHeartOutline } from '@mdi/js';

  import { onMount } from 'svelte';
  import { API } from '../constants';
  import { emoStates } from '../stores/emos.store';
  import { theme } from '../stores/theme.store';
  import { fadeIn } from '../fade';
  import Icon from './Icon.svelte';

  // The ID of the blog
  export let blogID: string;

  // Whether this component is marked
  let marked: boolean;

  async function getLikes() {
    // Do nothing if it's already here
    if (blogID in $emoStates) {
      return;
    }

    // Fetch and conquer
    const req = await fetch(`${API.getEmos}?blogID=${blogID}`);

    const data = await req.json();

    $emoStates[blogID] = data;
  }

  async function toggleLikes() {
    const incrementer = marked ? -1 : 1;

    $emoStates[blogID].likes += incrementer;

    marked = !marked;

    try {
      // Make the request
      const req = await fetch(API.setEmos, {
        body: JSON.stringify({ ...$emoStates[blogID], blogID }),
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
      });

      const res = await req.text();

      if (res === 'fail') {
        $emoStates[blogID].likes -= incrementer;
        marked = !marked;
      }
    } catch (e) {
      $emoStates[blogID].likes -= incrementer;
      marked = !marked;
    }

    if (incrementer === 1) {
      localStorage.setItem(`like:${blogID}`, 'true');
    } else {
      localStorage.removeItem(`like:${blogID}`);
    }
  }

  onMount(async () => {
    await getLikes();

    marked = !!localStorage.getItem(`like:${blogID}`);
  });
</script>

{#if blogID in $emoStates}
  <div id="container" in:fadeIn>
    <button on:click={toggleLikes} class:marked class:dark={$theme === 'dark'}>
      <Icon size={30} path={marked ? mdiHeart : mdiHeartOutline} />
      <span>{$emoStates[blogID].likes}</span>
    </button>
  </div>
{/if}

<style lang="scss">
  button {
    background: transparent;

    border: none;
    border-radius: 30px;

    cursor: pointer;

    display: flex;
    align-items: center;
    gap: 5px;

    padding: 0.5rem 0.9rem;

    fill: #dd2e44;
    font-size: 1.3rem;
    color: var(--app-color-dark);
    font-weight: 600;
    font-family: 'JetBrains Mono', monospace;

    transition: all 200ms ease-in;

    &.marked {
      box-shadow: 0 0 0 2px var(--app-color-primary);
    }

    &:hover,
    &:focus {
      background: var(--app-color-primary-tint);
      box-shadow: 0 7.9px 8.6px rgba(0, 0, 0, 0.085), 0 63px 69px rgba(0, 0, 0, 0.17);
    }
  }

  #container {
    position: fixed;
    z-index: 100;

    left: calc(61.8% + 19.1%);
    top: 50%;

    margin-top: -17px;
    width: calc((100% - 61.8%) / 2);

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  @media screen and (max-width: 1100px) {
    #container {
      left: auto;
      top: auto;
      right: 0 !important;
      bottom: 0 !important;

      height: 120px;
      width: 140px;
    }

    button {
      background: var(--app-color-shell);

      box-shadow: 0 3px 8.6px rgba(0, 0, 0, 0.27), 0 24px 69px rgba(0, 0, 0, 0.54);

      &.dark {
        background-color: #383a3e;
      }
    }
  }
</style>
