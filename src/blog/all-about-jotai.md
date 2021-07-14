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

We check whether the current code is running in browser or not. If we're running the code in SSR or prerendering, this value will be false.

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

But here's the thing. We haven't saved much code using Jotai, compared to using Context API. That code would be almost this simple, just have a little more boilerplate. So there really isn't much difference here.

But, here comes a twist: We can get rid of **even more** code by using something that Jotai provides: `atomWithStorage`

We can move the logic of syncing to localstorage completely, both from inside the hook as well as outside.

## Rewriting the hook with atomWithStorage

`atomWithStorage` is a special kind of atom that automatically syncs the value provided to it with `localstorage` or `sessionStorage` (Or `AsyncStorage`, if used with React Native), and picks the value up on first load automatically! It's available in the `jotai/utils` module, and adds some bytes other than the `2.4KB` of Jotai Core.

So here's how we would rewrite it:

```ts
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useEffect } from 'react';

const browser = typeof window !== 'undefined';

// The atom to hold the value goes here
const themeAtom = atomWithStorage(
  'theme',
  browser && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
);

/** Sitewide theme */
export function useTheme() {
  const [theme, setTheme] = useAtom(themeAtom);

  useEffect(() => {
    if (!browser) return;

    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);

  return [theme, setTheme];
}
```

As you can see, we've completely got rid of `localstorage` from the code, and we have a new thing `atomWithStorage`. First argument is the key to store it in `localstorage`. As in, if you specified `theme` as value here, you would retrieve it from localstorage using `localstorage.getItem('theme')`.

As you can see, the code itself isn't much smaller in terms on lines of code. It's just 20% smaller, which isn't a big number in case of this already-small file. The main part here is that we got to hide the complexity away thanks to `atomWithStorage`. Now we don't have to keep the local value storage in mind, just have to focus on our main logic and remember that this value is synchronized locally, and that's it.

And using this hook ultimately is super simple,

```js
import { useTheme } from './use-theme';

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useTheme();

  return (
    <main>
      <p>Theme is {theme}</p>

      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Toggle Theme</button>
    </main>
  );
};
```

And it just works!! 🪄

# More about Jotai

So this was the basic intro to Jotai. I added in the `atomWithStorage` utility function to show how powerful and simple it can make your code. I will touch these utilities later on. For now, let's explore more about the basic `atom` and `useAtom` and how it gives you superpowers.

## Derived atoms

Sometimes you want to make an atom rely on another atom(s), as in you wanna compose multiple atoms together into one big computed atom. That is extremely simple with Jotai.

### Readonly atoms

Readonly atoms are derived atoms that rely on other atoms, and we can't change their values directly.

For example, these atoms' usage would be like this 👇

```js
const [derivedValue] = useAtom(derivedAtom);
```

There's no `setDerivedValue` here, no setter function. We can only read this atom. Changing the atoms it is derived from will automatically update this value.

But enough talk! Now let's see how to create these derived atom.

You have seen this atom until now 👇

```js
const store = atom('someValue');
```

But guess what, atom can take a function as a parameter 👇

```js
const store = atom((get) => get(someAtomDefinedSomewhere));
```

Here, it's function, with the first parameter named `get`. `get` is a helper function that you pass an atom to, and it gets the atom's value as a raw value that you can do operations on just like any other variable.

And you can do a hell lot more with this. For example, one simple example would be to have a list of all the keys of an object match a specific criteria to be in an array.

Here's the object

```js
export const appsStateStore = atom({
  finder: false,
  launchpad: false,
  safari: false,
  messages: false,
  mail: true,
  maps: true,
  photos: false,
  facetime: true,
  calendar: false,
});
```

Define the atom that will hold the open apps in an array 👇

```js
const openAppsStore = atom((get) => {
  const apps = get(openAppsStore); // Gives the raw value { finder: false, launchpad: false, ...

  // Filter out the values who are marked as false
  const openAppsList = Object.keys(apps).filter((appName) => apps[appName]);

  return openAppsList;
});
```

And this is it!! As you tweak the values in the `appStateStore`, setting them to `true` and `false`, the `openAppsStore` will reflect the changes and the components using this store will also be updated with new values.

You can also compose together many different atoms together 👇

```js
const xCoordinateAtom = atom(0);
const yCoordinateAtom = atom(0);

// Compose 'em all
const distanceFromOriginAtom = atom((get) =>
  Math.sqrt(get(xCoordinateAtom) ** 2 + get(yCoordinateAtom)),
);
```

You can tweak the `xCoordinateAtom` atom and `yCoordinateAtom`,and the `distanceFromOriginAtom` will update with the new values!! To me, a super math geek 🤓, this feels very magical and close to the raw math(Don't know how to explain, it just does ¯\\\_(ツ)\_/¯)

> It's a mathematical formula to calculate distance of a point from origin (0, 0). If you didn't get it, no worries, I just wanna get the point across that you can compose together different atoms seamlessly. That's it! 🙂

### Readable & Writable atoms

These are atoms that are derived from other atoms, but can also be modified on their own by the user.

```ts
const readWriteAtom = atom(
  (get) => get(priceAtom) * 2,
  (get, set, newPrice) => {
    set(priceAtom, newPrice / 2);
    // you can set as many atoms as you want at the same time
  },
);
```

This atom, when you set its value, triggers the custom `write` function we provide, and can modify the atoms it relies on. It's basically **two-way data binding**. You change `priceAtom`, this `readWriteAtom` gets updated. You update `readWriteAtom`, `priceAtom` gets updated!! Mindblowing, right 🤯🤯?!?

> Beware though: As magical as this seems, it's two-way data binding. There have been controversies in past about it, and rightfully so, as debugging and keeping the flow of data sane becomes extremely hard with these. That's why React itself has only one-way data binding. So use this atom carefully.

# Async Atoms

From this point, we enter very dangerous territory: **Async rendering, aka React Suspense aka Concurrent Mode**.

Sometimes you atoms have to be asynchronous, that is, rather than getting values instantly, they pull from a remote source using `fetch`, which is when you have to suspend the rendering and wait for the data to come back.

Here's a little code demonstration of using async atom 👇

```js
const fetchCountAtom = atom(
  (get) => get(countAtom),
  async (_get, set, url) => {
    const response = await fetch(url);
    set(countAtom, (await response.json()).count);
  },
);

function Controls() {
  const [count, compute] = useAtom(fetchCountAtom);
  return <button onClick={() => compute('http://count.host.com')}>compute</button>;
}
```

But this above won't work if you don't wrap `Controls` in a `Suspense` 👇

```js
<Suspense fallback={<span />}>
  <Controls />
</Suspense>
```

Async Atoms are extremely useful in building real world apps, cuz these apps are mostly CRUD apps with data fetching added in.

> Note: At the time of writing, the latest React version is v17. React 18 will have a different kind of concurrent mode/Suspense, the usage may differ for you if your world has a React 18 😉

# The Best of Utils

If you loved `atomWithStorage` and your head is spinning with all the possibilities it could unlock, I got many more awesome Jotai utils for you.

## atomWithStorage

I covered this one in the very beginning of the article, when I refactored the `useTheme` hook to use this special atom. It accepts a key(With which it is stored in localstorage), and the initial value. Then you change this atom, and its value will be persisted locally, and picked up after the page reloads.

```js
import { atomWithStorage } from 'jotai/utils';

const darkModeAtom = atomWithStorage('darkMode', false);
```

This atom is also SSR friendly, so you can SSR your app away with absolutely no issues!

Not only that, this atom can store value in `sessionStorage` too, so the atom's value will be persisted until the browser is closed. Handy if you're building a banking web app, where having short sessions is preferable.

It also works with React Native, so it's much pretty much universal 😉

## atomWithReset

Sometimes you need to reset your state to what it was originally. Traditionally, the way to do that has been to store initial value in a variable, create state with that variable as the value, and when needed, `setState` back to that initial value! The code would look like this 👇

```js
import { atom, useAtom } from 'jotai';

const initialValue = 'light';

const themeAtom = atom(initialValue);

function ThemeSwitcher() {
  const [theme, setTheme] = useAtom(themeAtom);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const resetTheme = () => setTheme(initialValue);

  return (
    <>
      <button onClick={toggleTheme}>Toggle theme</button>

      <button onClick={resetTheme}>Reset theme</button>
    </>
  );
}
```

This is fairly easy, but here's a more Jotai-ish way of doing the same thing 👇

```js
import { useAtom } from 'jotai';
import { atomWithReset, useResetAtom } from 'jotai/utils';

const themeAtom = atomWithReset('light');

function ThemeSwitcher() {
  const [theme, setTheme] = useAtom(themeAtom);
  const reset = useResetAtom(themeAtom);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <>
      <button onClick={toggleTheme}>Toggle theme</button>

      <button onClick={reset}>Reset theme</button>
    </>
  );
}
```

As you can see, we simplified our component a little. Not much, in this case, as it's a very simple example. But I personally have used this reset atom in my apps with full blown complex logic based components, and it just makes the code much more sane and idiomatic and bug-free. Yes, this simple atom which only resets to its initial value.

## selectAtom

If there was a coolness counter for libraries and frameworks, Jotai alone would've broken it with this little util.

Say you have this big object.

```js
const defaultPerson = {
  name: {
    first: 'Jane',
    last: 'Doe',
  },
  birth: {
    year: 2000,
    month: 'Jan',
    day: 1,
    time: {
      hour: 1,
      minute: 1,
    },
  },
};

// Original atom.
const personAtom = atom(defaultPerson);
```

And say, a lot of components rely on this specific atom, but need only parts of this.

The thing, is when you update this atom, all the components relying on this atom will **rerender**. Even if you change just the `birth.time.minute`, whole thing is gonna count as update and all the components will re-render. This is how React works, unfortunately.

But worry not, for Jotai has a solution for this too! `selectAtom` allows you to create a derived atom with only a subpath of the whole object.

Watch 👇

```js
const firstNameAtom = selectAtom(personAtom, (person) => person.name.first);
```

`firstNameAtom` is a **readonly** derived atom, which will only trigger when the `person.name.first` property will change, and it itelf will hold the value of `person.name.first`.

You can update `birth.time.hour` field(By updating whole atom with new values), and the component relying on `firstNameAtom` will remain unchanged. Magical, right?

### Applying on Objects

There arises a problem: If you listen to a field that is an object, `person.birth`, this atom isn't gonna be very efficient. Jotai uses the equality check(`===`) to check if the atom's part is changed or not and should be re-rendered. The thing is, no 2 objects are ever the same. The `===` checks objects by reference, not values. So basically, this atom is pretty useless in that scenario. But not quite!

You can provide a 3rd argument to this `selectAtom`, which is your own version of an equality check. You can write your custom function to check the objects.

```js
const birthAtom = selectAtom(personAtom, (person) => person.birth, deepEqual);
```

OFC, writing your own `deepEqual` is hard, so it's recommended to go with `lodash-es`'s `isEqual` function.

```js
import { isEqual } from 'lodash-es';

const birthAtom = selectAtom(personAtom, (person) => person.birth, isEqual);
```

> If seeing lodash gives you anxiety about bundle size, I assure you, `isEqual` of `lodash-es` is tree-shakeable, just **4.4KB** minified, and even smaller in gzip/brotli. So no worries 😁

This can take the performance of your app from zero to hero, literally!

## freezeAtom

```js
import { atom } from 'jotai';
import { freezeAtom } from 'jotai/utils';

const objAtom = freezeAtom(atom({ count: 0 }));
```

freezeAtom takes an existing atom and returns a new derived atom. The returned atom is **"frozen"** which means when you use the atom with `useAtom` in components or get in other atoms, the atom value will be deeply frozen with `Object.freeze`. It would be useful to find bugs where you accidentally tried to mutate objects which can lead to unexpected behavior.

This atom is mostly for debugability, for when you mutate an object state(which you aren't supposed to in React, but hey, we're all humans 😁). This is such a common case, that I'm really glad Jotai folks are providing such high quality debugging tools.

## waitForAll

Remember the section above about Async atoms? This util is for that, and quite a handy one it is.

```js
const dogsAtom = atom(async (get) => {
  const response = await fetch('/dogs');
  return await response.json();
});

const catsAtom = atom(async (get) => {
  const response = await fetch('/cats');
  return await response.json();
});

const App = () => {
  const [dogs] = useAtom(dogsAtom);
  const [cats] = useAtom(catsAtom);
  // ...
};
```

So you have these 2 async atoms, and you're using them in the app. All fine. But there's a little problem here: The component will wait for first atom `dogsAtom` to go fetch data, return, then it will move to the next atom `catsAtom`. We don't want this. Both these atoms are independent of each other, we should rather fetch them in parallel(Or concurrently, if you are a hardcore JavaScripter 😉)

So, we basically wanna do something like a `await Promise.all(...)` on these atoms. The way to do that is using the `waitForAll` util.

After using, our code becomes something like this 👇

```js
const dogsAtom = atom(async (get) => {
  const response = await fetch('/dogs');
  return await response.json();
});

const catsAtom = atom(async (get) => {
  const response = await fetch('/cats');
  return await response.json();
});

const App = () => {
  const [[dogs, cats]] = useAtom(waitForAll([dogsAtom, catsAtom]));
  // ...
};
```

Now it waits for both of them to resolve, and then returns an array of the data returned by both. Kinda like a `await Promise.all`.

Literally, at this point, React should absorb Jotai into itself, it's way too good!!

And these are only half of all utils provided by Jotai. There are so many, I'd could write a whole book about it 🤯. Head over to [Jotai Documentation](https://docs.pmnd.rs/jotai/api/utils) to learn about em.

# Jotai is good with relatives 🤝

Jotai isn't like a lot of other libraries which are like: "You shall only have me in thy `package.json`!!!"

No, Jotai doesn't work like that! Jotai itself is a great state management libraries, but it allows you to seamlessly integrate with other state management libraries!!

Here are all the official integrations that come with jotai:

- Immer
- Optics
- React Query
- XState
- Valtio
- Zustand
- Redux
- URQL

Now, at this point, the blog post is way too big to cover these integrations too, but I wanna cover `immer`. I absolutely love this library. Why? Because of the biggest pain point with React state: **Immutability**

Immutability is great, and it makes wrapping your head around React State easy, but it can make things very hard when your state is an object. Then you have to do the whole song and dance of spreading the object and merging with the properties you wanna update

```js
function UpdateUser() {
  const [user, setUser] = useState({
    id: 23,
    name: 'Luke Skywalker',
    dob: new Date('25 December, 19 BBY'),
  });

  // Update the dob
  const updateDob = () => setUser({ ...user, dob: new Date('25 November, 200ABY') });

  return <button onClick={updateDob}>Update DOB</button>;
}
```

As you can see in the `updateDob` method, we have to spread original object, and pass the field we wanna update. This is OK. But what if the object is many levels deep and we wanna update an object very deep.

It becomes **soooo** convoluted that I personally never even tried it, I just rearchitechted my state to be shallower in some way and then update that. I can't even write it in this blog posts, don't have the brains for it!!

I am more of a Svelte version than a React person, and in Svelte, you can simply mutate the state and it just works

```js
user.dob = new Date('25 November, 200ABY');
```

And it goes extremely deep too!!

```js
state.depth1.depth2.depth3.depth4 = 'seomthing';
```

So all the song and dance required in React always feels wrong to me.

But this is where **Immer** comes in. Immer allows you to directly mutate the state, and it just works. Here's how it works 👇

```js
import { atomWithImmer } from 'jotai/immer';

const userAtom = atomWithImmer({
  id: 23,
  name: 'Luke Skywalker',
  dob: new Date('25 December, 19 BBY'),
});

function UpdateUser() {
  const [user, setUser] = useAtom(userAtom);

  // Update the dob
  const updateDob = () =>
    setUser((user) => {
      user.dob = new Date('25 November, 200ABY');
      return user;
    });

  return <button onClick={updateDob}>Update DOB</button>;
}
```

Here, the `setUser` works differently. It's a callback, which passes you the current value of the state. This value is a copy of the original value. You can mutate this copy as much as you want inside the callback, and finally just return it, jotai & immer will automatically reconcile the changes without any of the bugs that come with mutating! So great, right?! 🤩🤩
