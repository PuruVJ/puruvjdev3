// @ts-check
import preprocess from 'svelte-preprocess';
import staticAdapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    target: '#svelte',
    adapter: staticAdapter({}),
    prerender: {
      crawl: true,
      enabled: true,
      force: false,
      pages: ['*'],
    },
  },

  preprocess: preprocess(),
};

export default config;
