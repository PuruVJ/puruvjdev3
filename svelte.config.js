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
      force: false,
      pages: ['*', '/blog', '/works'],
    },
  },

  preprocess: preprocess(),
};

export default config;
