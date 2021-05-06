---
title: "Web Workers: Intro and Basic Usage"
description: Have you ever heard this term "Web Workers" mentioned somewhere and wondered what the hell is this new thing? let me introduce you to this great tech.
date: June 5, 2020 02:00
cover_image: media/road-grey-asphalt.jpg
---

![](../../static/media/road-grey-asphalt.jpg)

What are Web Workers, you might ask. The technical definition is this:

> Web Workers are a simple means for web content to run scripts in background threads
>
> ~ [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

Cool. But what does that exactly mean? Lemme explain using an example of roads and cars.

Javascript is, by nature, a single threaded language. That means every process, from handling button clicks to loading an image happens in a single channel.

Think of it like this. Imagine the JS process is a single lane road, and all of its processes are cars. Let's take 2 cars, one a very fast Ferrari, and other a beat up 20 year old Toyota. The Ferrari can easily blaze through at the speed of 150kmph, whereas the safe zone for the Toyota is 40kmph.

If the Ferrari is behind the Toyota, it can't run up to its full speed.

That is, if a very heavy process is running, it may block up other resources. They won't necessarily stop, just become slow and unresponsive.

You would have experienced it sometime, when you go to a website, click a button, and it does something so heavy, the scrolling just stops temporarily, the cursor may stop moving around for a few seconds.

So how do we prevent such situations? Is there a way to have the Ferrari go faster? Well there is.

We'll just create another lane. The Ferrari can go into that lane, and just blaze through the road.

Web Workers allow us to create that lane, or in this context, another thread.

> Using a Web Worker to create another thread enables us to have multiple threads. This process is called Multithreading. Here is a [<strike>Boring</strike> Technical Definition](<https://en.wikipedia.org/wiki/Multithreading_(computer_architecture)>).

# How to use them

Using web workers is quite simple. Let's create a `index.js` file. This is where we'll initialize our worker.

```javascript
// index.js
const worker = new Worker("worker.js");
```

This is the bare-bones code for initializing the worker. Let's create the `worker.js`

```javascript
// worker.js
```

Let's keep our worker file empty for now.

Add this code to `index.js`

```javascript
worker.postMessage("Hello");
```

The `postMessage` method simply passes in a value to our web worker. Now let's recieve that value in our worker file.

```javascript
// worker.js
self.onmessage = (e) => {
  const message = e.data;
  console.log(message);
};
```

`e` is here the event argument passed by the `self.onmessage`.

```javascript
const message = e.data;
```

Here we are accessing the data we passed to the web worker using `worker.postMessage` method.

And surely, the output comes out in the console.

```html
> Hello
```

> There is no `window` global object in a Web Worker. Everything is available under `self`.

That's it.

# What values can I pass into a worker?

Any JSON Serializable value, like

- `string`
- `number`
- `boolean`
- `null`
- `undefined`,
- `Object` (without any methods)
- `Arrays`

What you **can't** pass:

- `Function`
- `Class`

Though there are amazing libraries like [Comlink](https://davidea.st/articles/comlink-simple-web-worker) that allows you to pass any value to a web worker. Check it out!

This is it for today! Ping me on Twitter if you have any problems or simply leave a review. Link is in the footer.

Thank you for reading.
