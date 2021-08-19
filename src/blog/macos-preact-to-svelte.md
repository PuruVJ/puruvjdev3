---
title: 'macOS Web: From Preact to Svelte'
description: I recently moved macOS web from Preact to Svelte. Here's the firsthand account of my experience.
date: '24 Aug, 2021'
---

macOS is an amazing operating system. It looks really good, works really fast(Thanks to Apple's hardware), is very consistent, and overall an amazing experience.

Personally, I have never been much infatuated with macOS. That changed last year, when macOS Big Sur came out with the super sleek and modern design with those beautiful blurs. I instantly fell in love with it 😍. Just look how beautiful it is 😌.

Unfortunately, I couldn't afford to buy the MacBook(You're overpriced, Apple 😑), but I couldn't not want it. I spent weeks just watching review videos, screenshots of it. I am not a designer, but I have a good taste in design, and Big Sur was it! Finally when the craving became too much, I was like, _"Screw it! I'll just make it myself"_

![Fine... I'll do it myself, quoted by Thanos](../../static/media/macos-preact-to-svelte--fine-i-will-do-it-myself.gif)

So that's what I did 😁. I recreated the interface of macOS Big Sur for Web. You can see it @ [macos.vercel.app](https://macos.vercel.app).

# Early days (React)!

I began working on this project back in November 2020, where I created just the topbar(without the opening menus), the animated dock, and the background. Nothing much, really. Quite easy to do. You can visit it here [macos-web-mmo5af3r6.vercel.app](https://macos-web-mmo5af3r6.vercel.app/)

If you look closely, the dock animation isn't as smooth as it is in the latest iteration. Not to mention, this very simple app is using loads of dependencies. It loaded <mark>146KB</mark> min+brotli of JS, and 0KB of CSS(It was CSS-in-JS, so no separate JS file). For reference, the current version in Svelte loads only <mark>28.5KB</mark> of JS, and <mark>3.6KB</mark> of CSS, and it does a **lot** more than the November version.

Here's the `package.json` dependencies of the November version 👇

```json
{
  "@material-ui/core": "^4.11.0",
  "@mdi/js": "^5.8.55",
  "@rooks/use-raf": "^4.0.2",
  "@tippyjs/react": "^4.2.0",
  "date-fns": "^2.16.1",
  "framer-motion": "^2.9.4",
  "react": "^17.0.1",
  "react-dom": "^17.0.1",
  "react-helmet-async": "^1.0.7",
  "restater": "0.0.12",
  "use-sound": "^2.0.1"
}
```

See?! So much stuff for so little!

So this was the state of the app. Then I didn't work on it. I was bored of it. . Then I had a road accident, broke my spine, was prescribed to bedrest for 3 months. I was bored out of my mind, so I thought, what the heck, I'll just continue working on it. So revived the project, made some heavy changes. Like I threw away `restater` library to use [Jotai](https://github.com/pmndrs/jotai), because it was much more simpler.

Fast forward two months, I made some drastic changes. I replaced Snowpack(Bundler and dev server) with [ViteJS](https://vitejs.dev/). Why? No specific reason, I just felt it was more polished and had some superb features which I could use to make the app smaller in size.

I replaced the existing JSS style with `styled-components`. Not perf related really, just that writing CSS as JS objects wasn't fun.

I also got rid of some dependencies to reduce bundle size.
