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

Installing Jotai is fairly easy 👇

```bash
npm install jotai

# Or if you're a yarn person
yarn add jotai
```
