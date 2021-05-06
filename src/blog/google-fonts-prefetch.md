---
title: Performantly loading Google Fonts based on Data Saver
description: Efficiently and Asynchronously load Google Fonts based on Data Saver mode
date: 5 June, 2020 10:30
---

You. Yes you, who is loading a 50-100kbs of fonts on your site, drop them. Use Comic Sans instead.

Just Kidding. Use as many fonts as you need. I am myself loading 60kb of fonts on this very blog page, just a little more efficiently than the default approach.

# Problem

Using custom fonts isn't bad. They make a bold brand statement. Imagine Google's logo without its beautiful geometric font or Medium without its classic font.

Nowadays, advice like <mark>Don't use fonts</mark> is just impractical. Sure, <mark>Use less fonts</mark> is a good, but the prebuilt system fonts are just hideous(Looking at you, Ariel) and reading content in those is just not as appealing as it was a decade ago.

But, if you look at stats, the average website uses about <mark> 50 - 70 KiloBytes</mark> of fonts nowadays. For scale, this blog you're reading, without images, is a total of 78KB, out of which the fonts take up 60kb. We are using way too much fonts nowadays, but it can't really be helped.

So we have to figure out ways to not let the loading time of fonts get in the way of User experience, while at the same time, respecting the user's data plan. In US, 60KB is basically dust, whereas in countries like Nigeria and India, 60KB can be **real** money.

# Solution

We are going to use the amazing resource hint tag.

```html
<link rel="prefetch" href="URL" />
```

This tag simply loads the given URL and stores it in cache/memory until it is actually used. This loading happens asynchronously and doesn't delay the page's loading.

In simple terms adding this tag to a page will not make it any slower than before.

The important bit here:

> If the browser's data saver is on, this tag will be ignored, thus saving that additional request.

[Read more about Resource Hints](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf)

Let's say that our fonts' URL is:

```html
https://fonts.googleapis.com/css?family=Comfortaa|Fira+Code|Quicksand&display=swap
```

Instead of loading them the standard way

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Comfortaa|Fira+Code|Quicksand&display=swap"
/>
```

We do it like this

```html
<link
  rel="prefetch"
  href="https://fonts.googleapis.com/css?family=Comfortaa|Fira+Code|Quicksand&display=swap"
  as="style"
  onload="this.onload=null;this.rel='stylesheet'"
  onerror="this.onerror=null;this.rel='stylesheet'"
/>
```

This code above is doing multiple good things at once. The `onload` will fire when the resource has fully loaded, and replace the `rel=prefetch` with `rel=stylesheet`, making the effects of the fonts active.

But another thing is happening here.

> If somehow, due to poor connectivity, the request fails, the `onerror` will try **again** to load the resource. This solution kills 2 birds with one bullet(proverbially only, off course)

# Downsides

- Doesn't load the fonts if old browser or (at the time of writing) latest Safari.
- Slightly degrades the experience for data saver users, but honestly, people are on a site because of the content primarily. Besides, if they have data saver on, this means their data speeds are very slow and data plans quite expensive. They will thank you for making a fast loading site.

_That's it for today. Hope you liked the article. Ping me on Twitter if you have any problems or simply leave a review. Link is in the footer._
