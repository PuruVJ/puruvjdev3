import { browser } from '$app/env';
import { writable } from 'svelte/store';

const theme = writable<'light' | 'midday' | 'dark' | 'radioactive'>('light');

export { theme };

let initVal = '';
theme.subscribe((val) => {
  if (!browser) return;

  // Don't do anything if its first value
  if (!initVal) {
    initVal = val;
    return;
  }

  const body = document.body;

  body.dataset.theme = val;

  localStorage.setItem('theme', val);

  initVal = val;
});
