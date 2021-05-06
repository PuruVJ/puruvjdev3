<script>
  import { mdiDevTo, mdiGithub, mdiTwitter } from '@mdi/js';

  import Icon from './Icon.svelte';
</script>

<!-- hehe -->
<footer>
  <div class="copy-area">
    Made with&nbsp;<img src="emojis/love.svg" alt="❤" />&nbsp;by Puru Vijay
  </div>
  <div class="social-links">
    <a
      href="https://twitter.com/puruvjdev"
      rel="noopener"
      target="_blank"
      id="twitter"
      aria-label="Puru Vijay's Twitter Profile"
    >
      <Icon path={mdiTwitter} />
    </a>
    <a
      href="https://github.com/puruvj"
      rel="noopener"
      target="_blank"
      id="github"
      aria-label="Puru Vijay's Github Profile"
    >
      <Icon path={mdiGithub} />
    </a>
    <a
      href="https://dev.to/puruvj"
      rel="noopener"
      target="_blank"
      id="devto"
      aria-label="Puru Vijay's Dev.to Profile"
    >
      <Icon path={mdiDevTo} />
    </a>
    <a
      href="https://hashnode.com/@puruvjdev"
      rel="noopener"
      target="_blank"
      id="devto"
      aria-label="Puru Vijay's Hashnode Profile"
    >
      <svg width="20" height="20" viewBox="0 0 337 337">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M23.155 112.598c-30.873 30.874-30.873 80.93 0 111.804l89.443 89.443c30.874 30.873 80.93 30.873 111.804 0l89.443-89.443c30.873-30.874 30.873-80.93 0-111.804l-89.443-89.443c-30.874-30.873-80.93-30.873-111.804 0l-89.443 89.443zm184.476 95.033c21.612-21.611 21.612-56.651 0-78.262-21.611-21.612-56.651-21.612-78.262 0-21.612 21.611-21.612 56.651 0 78.262 21.611 21.612 56.651 21.612 78.262 0z"
        />
      </svg>
    </a>
  </div>
</footer>

<style lang="scss">
  footer {
    padding: 1rem;

    display: flex;

    font-family: 'JetBrains Mono', monospace;

    font-size: 1rem;
  }

  img {
    height: 1em;
    vertical-align: middle;
  }

  .copy-area {
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .social-links {
    display: flex;
    align-items: center;
  }

  .social-links a {
    fill: var(--app-color-dark);

    display: flex;
    align-items: center;

    transition: fill 120ms ease-out;

    margin: 0 4px;

    transition: transform 200ms ease-in;

    &:hover,
    &:focus-visible {
      transform: scale(1.2);
    }
  }
  @media screen and (max-width: 600px) {
    .copy-area {
      font-size: 0.7rem;
    }
  }
</style>
