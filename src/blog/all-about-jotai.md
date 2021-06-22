---
title: 'Jotai: The ultimate React State Management'
description: 'Jotai is a very new way of State management, and probably the best.'
date: 2 Jul, 2021
cover_image: media/all-about-jotai--cover.jpg
---

![Cover image - Lightening](../../static/media/all-about-jotai--cover.jpg)

> Photo by [Frank Cone](https://www.pexels.com/photo/lightning-strike-2289940/)

Jotai is a relatively new state management library for React. It's a really simple, but make no mistakes, it's really robust

Jotai is based on the new [Recoil](https://recoiljs.org/) pattern and library by Facebook. More than half a decade ago, they created a pattern and library for state management in React called [Flux](https://facebook.github.io/flux/). On this pattern, some non-facebook devs created a new library of their own, which was even more robust, simpler to use and overall took the React world by a storm. This library is [Redux](https://redux.js.org/). You might have heard of it 😉.

Now Facebook has **Recoil**, which has different ideologies than **Flux**. Same is the case with **Jotai** and **Redux**. Let's explore some of these.

# Why Jotai?

1. **Minimalistic API** - Jotai has a very simply API design and is a joy to work with
2. **Tiny bundle size** - According to [Bundlephobia](https://bundlephobia.com/package/jotai@1.0.0), Jotai's core size minified + GZipped is just <mark>2.4KB</mark> which is crazy 🤯 (And that's when you include every single thing from the core module).
3. **Loaded to the brim** - This goes against the point above, but it ships lot of helper functions and integrations, which are **100%** optional to use, and make Dev Experience a breeze, while not being large in size.
4. **Performant** - Jotai is **BLAZING FAST**. It's runtime performance is insane!
5. **TYPESCRIPT!! 🥳🥳** - First class TypeScript Support!! Comes with Typings pre-installed, and TypeScript authoring experience is beyond heavenly.

# Ideological differences from Redux

Jotai is very very different from redux and [React Context API](https://reactjs.org/docs/context.html) in almost every way, and you might as well forget redux while using Jotai. But there's one main concept that is the catch-all, the one that you need to internalize.

Redux stores are monolithic, but Jotai is atomic.

As in, in Redux, it's a pattern to store all the needed global state in the app in one single big object. In Jotai, it is opposite. You break your state into atoms, that is, one store for one single store, or for closely related state.

# Getting started with Jotai

## Installing Jotai

```bash
npm install jotai

# Or if you're a yarn person
yarn add jotai
```

## Setting it up in the app

Jotai requires a provider to be present in the parent of the current component it is being used. The simplest way to do would be to wrap whole app in the Provider, like this 👇

```js
// index.jsx (or index.tsx)
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

// Jotai provider
import { Provider } from 'jotai';

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
```

Now you can use jotai anywhere in your app!

# Basic syntax

Now that our basic setup is done, let's have a look at the basic syntax!

## Creating your first atom

~~Atoms are the building blocks of universe and clump together into mole--~~

No not that atom 😅.

Jotai atoms are small isolated pieces of state. One atom contains ideally, very small data(Though it's just a convention, you could still put all your state in one atom, thought that would be very slow).

So here's how you create your first atom 👇

```js
import { atom } from 'jotai';

const themeAtom = atom('light');
```

And that's it! You have your very first piece of state in!!

> Notice I sufficed my atom name with `Atom`, as in `themeAtom`. It's not a rule or an official convention, I simply choose to name my atoms like this, for clarity in a big project. You can name it just `theme` rather than `themeAtom` 🙂.

Now, how to use it? Well, using it is a cross between the `useState` and `useContext` hooks.

```js
import { useAtom } from 'jotai';

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useAtom(themeAtom);

  return <main>{theme}</main>;
};
```

See? Exactly like `useState`, just we pass `useAtom` the atom we created. useAtom returns an array of size 2, where 1st element is a value. 2nd element is a function, to set the value of the atom, which makes all the components relying on this atom update and re-render.

So if we put it all together, the complete code would look like this 👇

```js
import { atom, useAtom } from 'jotai';

const themeAtom = atom('light');

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useAtom(themeAtom);

  return <main>{theme}</main>;
};
```

And notice the `setTheme` isn't used yet. Let's change that 👇

```js
import { atom, useAtom } from 'jotai';

const themeAtom = atom('light');

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useAtom(themeAtom);

  return (
    <main>
      <p>Theme is {theme}</p>

      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Toggle Theme</button>
    </main>
  );
};
```

![Jotai toggling theme atom button](../../static/media/all-about-jotai--jotai-basic-theme-toggle-example.gif)

Check it out @ [CodeSandbox](https://codesandbox.io/s/white-glade-38c6l?file=/src/ThemeSwitcher.js)

This, my friend, is just the beginning. Jotai can do way so much more!

But this alone doesn't give much perspective. What's special about a button that toggles value 🙄? And I agree. This example is pretty boring. Let's use Jotai to make an actual theme switcher.

# Jotai In Practice: Theme Switcher hook

Theme Switching is nowadays needed in every single app, website, and heck, even blog sites(Esp blogs). And it can be quite a headache to make theme switching. First you have to set up your CSS Variables. Then you have to start with a theme Then you have to make a button that actually switches the theme. Then you have to make sure to remember the preference using `localstorage` API. But that brings you full circle to picking up the right value when the page loads, and also not messing with SSR and prerendering and...

![A tired little girl drops head on a table and says kill me now](../../static/media/all-about-jotai--kill-me-now.gif)

Yeah, it's pretty complicated. A problem any developer would shiver before attempting(I did 👀).

So, that's the best kind of thing to make, and let's use Jotai to do it. You'll be astonished at how simpler Jotai can make it.

So, here are our goals.

- Works on server side(As in not referring to `document` or `window` without protection).
- Picks up locally stored value in `localstorage`.
- If no local value, tries to get the device preference, whether device theme is `light` or `dark`.
- Current `theme` should be available as a state that re-renders components it is being used in.
- Changing the state should update localstorage accordingly.

So now our list is complete, let's look at the code 👇

```js
import { atom, useAtom } from 'jotai';
import { useEffect, useLayoutEffect, useRef } from 'react';

const browser = typeof window !== 'undefined';

const localValue = (browser ? localStorage.getItem('theme') : 'morning');
const systemTheme =
  browser && matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'morning';

// The atom to hold the value goes here
const themeAtom = atom(localValue || systemTheme);

// This is needed here
let initialized = true;

/** Sitewide theme */
export function useTheme() {
  const [theme, setTheme] = useAtom(themeAtom);

  if (typeof window === 'undefined') return [theme, setTheme] as const;

  useEffect(() => {
    if (!initialized) return;

    setTheme(localValue || systemTheme);
    initialized = false;
  }, []);

  /**
   * Don't use `useLayoutEffect` here, as it runs before `useEffect`, so it persists to the initial value of
   * the `theme` atom provided, and by the time the onMount useEffect runs, `initialized` is already false,
   * hence initial theme is not set
   */
  useEffect(() => {
    localStorage.setItem('theme', theme);

    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);

  return [theme, setTheme] as const;
}
```

And I got my TypeScript kin covered too 😉👇

```ts
import { atom, useAtom } from 'jotai';
import { useEffect, useLayoutEffect, useRef } from 'react';

export type Theme = 'light' | 'dark';

const browser = typeof window !== 'undefined';

const localValue = (browser ? localStorage.getItem('theme') : 'morning') as Theme;
const systemTheme: Theme =
  browser && matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'morning';

// The atom to hold the value goes here
const themeAtom = atom<Theme>(localValue || systemTheme);

// This is needed here
let initialized = true;

/** Sitewide theme */
export function useTheme() {
  const [theme, setTheme] = useAtom(themeAtom);

  if (typeof window === 'undefined') return [theme, setTheme] as const;

  useEffect(() => {
    if (!initialized) return;

    setTheme(localValue || systemTheme);
    initialized = false;
  }, []);

  /**
   * Don't use `useLayoutEffect` here, as it runs before `useEffect`, so it persists to the initial value of
   * the `theme` atom provided, and by the time the onMount useEffect runs, `initialized` is already false,
   * hence initial theme is not set
   */
  useEffect(() => {
    localStorage.setItem('theme', theme);

    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);

  return [theme, setTheme] as const;
}
```
