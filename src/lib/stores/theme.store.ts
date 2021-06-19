import { browser } from '$app/env';
import { writable } from 'svelte/store';

export type Theme = 'light' | 'midday' | 'dark' | 'radioactive';

export const theme = writable<Theme>('light');

let initVal = '';
theme.subscribe((val) => {
  if (!browser) return;

  // Don't do anything if its first value
  if (!initVal) {
    initVal = val;
    return;
  }

  const { dataset } = document.body;

  dataset.theme = val;

  localStorage.setItem('theme', val);

  initVal = val;
});
