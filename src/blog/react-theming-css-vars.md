---
title: Highly Performant React theming with CSS variables(With Intellisense 😉)
description: Theme your React app with confidence, while also keeping the performance high
date: 23 July, 2021
---

Theming in React is an enigma. You'll find a thousand articles on different ways of theming in React. Some suggest going full JavaScript, using the context API. Some suggest going full CSS with just CSS Variables. All these are really great approaches in some very fine articles. So why another article on this topic then?

This article aims to marry both the JS and CSS approaches into one single approach: **The performance of raw CSS, and the great Developer Experience of JavaScript 🔥**

![I request elaboration meme](../../static/media/react-theming-css-vars--i-request-elaboration-vision.gif)

# Elaboration

## CSS Variables method

This is how you would theme your site using just CSS variables

```css
body.light {
  --app-color-primary: blue;
  --app-color-primary-rgb: 0, 0, 255;
  --app-color-primary-contrast: white;

  --app-color-light: white;
  --app-color-light-rgb: 255, 255, 255;
  --app-color-light-contrast: black;

  --app-color-dark: black;
  --app-color-dark-rgb: 0, 0, 0;
  --app-color-dark-contrast: white;
}

body.dark {
  --app-color-primary: blue;
  --app-color-primary-rgb: 0, 0, 255;
  --app-color-primary-contrast: white;

  --app-color-light: black;
  --app-color-light-rgb: 0, 0, 0;
  --app-color-light-contrast: white;

  --app-color-dark: black;
  --app-color-dark-rgb: 0, 0, 0;
  --app-color-dark-contrast: white;
}
```

Theming using CSS variables is extremely fast. It's as if you're reaching into the internals of browser and manually repainting the DOM, without the tediousness that a process as complex as manually repainting requires. All you have to do is change the variables, and the whole page repaints itself extremely fast, totally jank-free.

But one drawback here is the fact that you have to remember these variables' names, because at the time of writing, VSCode doesn't autocomplete variables from other files, you're basically typing blind, without any support from the editor.

## React Context(AKA JS only approach)

The other way is using React Context to change themes, so you have a big JS object containing your colors:

```ts
const themes = {
  light: {
    primary: {
      main: 'blue',
      rgb: '0, 0, 255',
      contrast: 'white',
    },
    light: {
      main: 'white',
      rgb: '255, 255, 255',
      contrast: 'black',
    },
    dark: {
      main: 'black',
      rgb: '0, 0, 0',
      contrast: 'white',
    },
  },
  dark: {
    primary: {
      main: 'blue',
      rgb: '0, 0, 255',
      contrast: 'white',
    },
    light: {
      main: 'black',
      rgb: '0, 0, 0',
      contrast: 'white',
    },
    dark: {
      main: 'white',
      rgb: '255, 255, 255',
      contrast: 'black',
    },
  },
};
```

Then you basically put together Context and Providers, and have theme switching working. There's more boilerplate here, but the developer experience ultimately is really good. If you're using Context for theming, you're most probably using CSS-in-JS.

But the drawback here: Not-so-good User experience. JavaScript is a single threaded language. When you switch your theme, all components relying on the values will re-render, that is quite a bit of their DOM will be nuked and re-created with new values. Combine this with the fact that browser will try to re-layout, and repaint at the same time as the re-rendering will be going on, this whole process can actually make the theme switching animation jankier: The user's mouse might stop moving, the animation itself won't happen in 60fps, elements might become un-interactive for a moment.

This can make the user experience feel suboptimal!

Summarizing both approaches 👇

![Summary of both CSS and JS approaches](../../static/media/react-theming-css-vars--css-way-vs-js-way.png)

But it doesn't have to be this way! If you use CSS Variables and JavaScript in the right way, you can get blazing fast performance out of them, and still have superb Developer experience.

![Arms meme applied to CSS variables and JavaScript](../../static/media/react-theming-css-vars--arms-meme.png)

# Setting up the CSS Variables

Let's set up the basic CSS variables first. These are just the ones defined in the **CSS Modules Elaboration** section above

```css
body.light {
  --app-color-primary: blue;
  --app-color-primary-rgb: 0, 0, 255;
  --app-color-primary-contrast: white;

  --app-color-light: white;
  --app-color-light-rgb: 255, 255, 255;
  --app-color-light-contrast: black;

  --app-color-dark: black;
  --app-color-dark-rgb: 0, 0, 0;
  --app-color-dark-contrast: white;
}

body.dark {
  --app-color-primary: blue;
  --app-color-primary-rgb: 0, 0, 255;
  --app-color-primary-contrast: white;

  --app-color-light: black;
  --app-color-light-rgb: 0, 0, 0;
  --app-color-light-contrast: white;

  --app-color-dark: black;
  --app-color-dark-rgb: 0, 0, 0;
  --app-color-dark-contrast: white;
}
```

> If this theming system's way of changing the `light` variable to a dark color feels counter-intuitive to you, you can create your own system too. I have personally used this theming system in half a dozen apps and it's extremely effective. Just my opinion 🙂

# Setting them up in a JS Object

Now, we'll do the same thing we did in the JS object, referencing colors, but this time we'll store the CSS Variable references here.

Create a separate `themes.js` or `themes.ts` file and put this in there

```ts
const theme = {
  colors: {
    primary: {
      main: 'var(--app-color-primary)',
      rgb: 'var(--app-color-primary-rgb)',
      contrast: 'var(--app-color-primary-contrast)',
    },
    light: {
      main: 'var(--app-color-light)',
      rgb: 'var(--app-color-light-rgb)',
      contrast: 'var(--app-color-light-contrast)',
    },
    dark: {
      main: 'var(--app-color-dark)',
      rgb: 'var(--app-color-dark-rgb)',
      contrast: 'var(--app-color-dark-light)',
    },
  },
};
```

> ATTENTION 🛑: Do not make this object in a component or context or anywhere! It has to be in a separate JavaScript object, entirely out of React's clutches.

# Putting into practice!

Now, here's the best part: Using our theme config JS variable!

Here's a demo of using it in two of very famous CSS in JS libraries: **Styled Components** & **JSS**

## Styled Components

Say you have a button element 👇

```js
import styled from 'styled-components';

const Button = styled.button`
  display: flex;

  font-size: 1rem;
`;
```

We wanna give it the primary color. That's as simple as 👇

```js
import styled from 'styled-components';
import { theme } from './theme';

const Button = styled.button`
  display: flex;

  font-size: 1rem;

  background-color: ${theme.colors.primary.main};
`;
```

## JSS

Same example as Styled components in JSS 👇

```js
import { createUseStyles } from 'react-jss';
import { theme } from './theme';

const useStyles = createUseStyles({
  button: {
    display: 'flex',
    fontSize: '1rem',
    backgroundColor: theme.colors.primary.main,
  },
});
```

The usage is pretty consistent across different CSS in JS libraries.

Ultimately the final CSS that reaches the browser is

```css
.button-[HASH] {
  display: flex;
  font-size: 1rem;
  background-color: var(--app-color-primary);
}
```

We're only passing references to the CSS variables in our `theme.colors.primary.main` JS expressions. Because this object lives out of React, and is ultimately never changed, the theme switching triggers no re-renders. All the repainting is taken care of smoothly by the browser, because we change the CSS variables directly based on `body.[class]`, no JavaScript required other changing the class.

And as you type out the `theme.colors.*` part, VSCode auto fills it in for you, so you simply **can't** mistype a variable at all. Simply not possible.

# Where it falls apart...

The main focus here is on the intellisense provided by the editor. But that is simply not possible if you're using something like **CSS Modules**, where it's just **plain CSS**. There, you'll have to remember CSS variables names and hope you don't mess em up 🤐.

# Bonus: Theme Switcher hook

All this is good enough, but it's nothing without a handy theme switcher hook. So I'll drop a simple TypeScript hook that uses [Jotai](https://github.com/pmndrs/jotai) for maintaining global store value, switching themes, storing in localstorage, picks up user's device theme to start and SSR compliant.

```js
import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';

const browser = typeof window !== 'undefined';

const localValue = browser ? localStorage.getItem('theme') : 'light';
const systemTheme =
  browser && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

// The atom to hold the value goes here
const themeAtom = atom(localValue || systemTheme);

/** Sitewide theme */
export function useTheme() {
  const [theme, setTheme] = useAtom(themeAtom);

  useEffect(() => {
    if (!browser) return;

    localStorage.setItem('theme', theme);

    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);

  return [theme, setTheme];
}
```

A lot going here. So here's the breakdown.

Checking whether the code is running in browser or not by checking `typeof window !== 'undefined';`

We get the value stored in localstorage. If localstorage has the theme in it, then we'll consider it the highest priority, as it would be the one chosen by the user. Also, because there's no localstorage in Node, We have to fallback to default value of `light` if it's running in SSR mode.

We also retrieve the device preference using `prefers-color-scheme: dark`, in case the localstorage value doesn't exist. Again, this falls back to value `light` if device preference is `dark` or code is running in SSR.

Finally, create the atom. This will be our main store where we actually store the current theme, usable and changeable as state. Notice the value we give it: `localValue || systemTheme`. Here's what can happen with these values:

> If running in SSR/Prerendering mode, `localValue = 'light'` and `systemTheme = 'light'`, `localValue || systemTheme` will turn out to be `light`. So, important point here: Your app in SSR will be themed with light theme, so if you prerender your app, it will end up with light theme, in terms of plain HTML. As the JavaScript loads, it will sync to the most relevant theme possible.

> Why didn't I just put the `localValue` and `systemTheme` variables inside the hook? The reason: If I put them in the hook, everytime the hooks is initialized in any component, or a component re-renders, this hooks will run again, and will fetch these values again from localstorage and media queries. These are pretty fast, but localstorage is blocking, and when used a lot, can introduce jank. So we initialize these 2 vars once in the lifetime of the app, because we need these only to get the initial value.

Finally let's begin our hook:

Let's make this atom a local state using `useAtom`: `const [theme, setTheme] = useAtom(themeAtom);`. These will be our theme in the form of state. Themes can be modified using `setTheme`.

Next thing, we got the most important part of our hook that will actually make the current theme known to our CSS.

```ts
useEffect(() => {
  if (!browser) return;

  localStorage.setItem('theme', theme);

  document.body.classList.remove('light', 'dark');
  document.body.classList.add(theme);
}, [theme]);
```

It's `useEffect` that runs whenever `theme` changes, as you can see in the array in the 2nd argument. When this runs, it checks if the code is running in browser. If it isn't, it simply stops further execution by putting a `return`.

If it is successful, it goes on, and removes all the classes corresponding to out themes on `<body>`, then it adds the class corresponding to the latest value of `theme` variable.

Finally, we return the `[theme, setTheme]` pair as it is, so we can use it just like we use `useState`. You could also return these as objects `{ theme, setTheme }` giving them explicit naming.

This is it for this hook!!

And I got my TypeScript kin covered too 😉👇

```ts
import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';

export type Theme = 'light' | 'dark';

const browser = typeof window !== 'undefined';

const localValue = (browser ? localStorage.getItem('theme') : 'light') as Theme;
const systemTheme: Theme =
  browser && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

// The atom to hold the value goes here
const themeAtom = atom<Theme>(localValue || systemTheme);

/** Sitewide theme */
export function useTheme() {
  const [theme, setTheme] = useAtom(themeAtom);

  useEffect(() => {
    if (!browser) return;

    localStorage.setItem('theme', theme);

    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);

  return [theme, setTheme] as const;
}
```

So this is the final code we got for switching themes robustly. This hook is simple and understandable (I hope 😅), due to the simplicity of Jotai.

Note that you don't have to use Jotai here only!. You could recreate the same global store value with **React Context**, but that includes some more boilerplate.

# Conclusion

Hoped this articles helps you make a more informed decision for when you implement your own theme switching system, in terms of squeezing out more performance from the app!

Peace out!