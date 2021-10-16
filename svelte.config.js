// @ts-check
import preprocess from 'svelte-preprocess';
import vercel from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    target: '#svelte',
    adapter: vercel(),
    prerender: {
      crawl: true,
      enabled: true,
      entries: ['*'],
    },
  },

  preprocess: preprocess(),
};

export default config;
