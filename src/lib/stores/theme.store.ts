import { browser } from '$app/env';
import { writable } from 'svelte/store';

export type Theme = 'light' | 'midday' | 'dark' | 'radioactive';

export const theme = writable<Theme>('light');

let initialized = false;
theme.subscribe((val) => {
  if (!browser) return;

  // Don't do anything if its first value
  if (!initialized) return (initialized = true);

  const { dataset } = document.body;
  dataset.theme = val;

  localStorage.setItem('theme', val);
});
