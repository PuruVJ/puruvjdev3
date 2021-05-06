// @ts-check
import preprocess from 'svelte-preprocess';
import staticAdapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    target: '#svelte',
    adapter: staticAdapter({}),
    paths: { base: '/', assets: '/static' },
    prerender: {
      force: true,
    },
  },

  preprocess: preprocess(),
};

export default config;
