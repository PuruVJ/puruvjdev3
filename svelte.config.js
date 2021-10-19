// @ts-check
import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-cloudflare-workers';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    target: '#svelte',
    adapter: adapter({ esbuild: ({}) => ({ treeShaking: true }) }),
    prerender: {
      crawl: true,
      enabled: true,
      entries: ['*'],
    },
  },

  preprocess: preprocess(),
};

export default config;
