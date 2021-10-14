<script context="module" lang="ts">
  import BlogList from '$lib/components/BlogList.svelte';
  import ContactMeLink from '$lib/components/ContactMeLink.svelte';
  import ContactMeSvg from '$lib/components/ContactMeSVG.svelte';
  import WavyHr from '$lib/components/WavyHR.svelte';
  import { fadeIn, fadeOut } from '$lib/fade';
  import type { IBlog } from '$lib/interfaces/blog.interface';
  import type { Load } from '@sveltejs/kit';
  import { onMount } from 'svelte';

  export const load: Load = async ({ fetch }) => {
    const res = await fetch('/data/homepage-blogs-list.json');
    const data = await res.json();

    return { props: { blogsList: data } };
  };

  export const prerender = true;
</script>

<script lang="ts">
  export let blogsList: IBlog[];

  onMount(async () => {
    import('lazysizes');

    document.body.classList.add('background', 'animated');
  });
</script>

<svelte:head>
  <title>Puru, Developer and Designer</title>
  <meta
    name="description"
    content="Read about web development, designing and programming on Puru Vijay's blog."
  />
  <meta property="og:title" content="Puru, Developer and Designer" />
  <meta
    property="og:description"
    content="Read about web development, designing and programming on Puru Vijay's blog."
  />
  <meta property="og:image" content="https://puruvj.dev/media/blog-social-intro.png" />
  <meta property="og:url" content="https://puruvj.dev" />

  <link rel="canonical" href="https://puruvj.dev/" />
</svelte:head>

<main in:fadeIn out:fadeOut>
  <br />
  <br /><br />
  <section class="puru-intro">
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <div class="photo-area">
      <figure>
        <img
          src="/photos/puru-profile.jpg"
          alt="Puru Vijay Profile Photo"
          width="100"
          height="100"
        />
      </figure>
    </div>

    <div id="written">
      <h1>Hi, I'm <mark>Puru</mark></h1>
      <h2 id="about-me">
        I am a 19 y/o
        <mark>self-taught fullstack web developer</mark>
        based in India with 6 years of experience. I make
        <mark>blazing fast and performant</mark>
        web apps. Like this blog.
      </h2>
    </div>
  </section>

  <br />

  <br />
  <br />
  <div class="hr"><WavyHr style="fill: transparent" /></div>
  <br />
  <br />
  <section class="popular-blogs">
    <h1>Popular posts</h1>
    <BlogList seeMore {blogsList} />
  </section>
  <br /><br />
  <!-- TODO -->
  <div class="hr"><WavyHr style="fill: transparent" /></div>
  <br /><br />
  <section class="contact-me">
    <div class="cm-svg">
      <ContactMeSvg />
    </div>
    <div>
      <ContactMeLink />
    </div>
  </section>
</main>

<style lang="scss">
  img,
  figure {
    border-radius: 50%;

    margin: 0;
  }

  .photo-area,
  figure {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: flex-start;
  }

  img {
    width: 25vmax;
    height: 25vmax;
    min-height: 0;

    box-shadow: 0 0 0 1rem var(--app-color-primary);

    transition: box-shadow 200ms ease-out;
  }

  .puru-intro {
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
  }

  #written {
    max-width: 50%;
  }

  #about-me {
    font-family: 'JetBrains Mono', monospace;
    font-weight: 550 !important;
  }

  mark {
    background-color: transparent;
    color: var(--app-color-primary);
    font-weight: 500;
  }

  h1,
  h2 {
    line-height: 1.618;
  }

  .hr {
    width: 100%;

    display: flex;
    justify-content: center;
  }

  .contact-me {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: stretch;

    & > div {
      display: flex;
      align-items: center;
      justify-content: center;

      flex: 1;
    }

    :global(path),
    :global(rect) {
      transition: fill 200ms ease-in;
      // transition-delay: -100ms;
    }

    .cm-svg :global(svg) {
      --size: 100%;
      width: var(--size);
      height: auto;
      min-height: 0;
    }
  }

  @media screen and (max-width: 600px) {
    .puru-intro {
      flex-direction: column;
    }

    img {
      width: 90%;
      height: auto;
    }

    #written {
      max-width: 100%;

      margin-top: 2rem;
    }

    .contact-me {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }
</style>
