---
title: Simplify code by promisifying `setTimeout`
description: Simplify and clean your codebase by making setTimeout more idiomatic using Promises
date: 28 Sep, 2020 2:34 PM
cover_image: media/timer.jpg
---

![Alt text](../../static/media/timer.jpg)

Recently, when I was working on my practice project [Microsoft Todo Clone](https://ms-todo.vercel.app), I needed to implement code like this:

```txt
#1 Do Task 1
#2 Wait for 200ms
#3 Do task 2
#4 Wait for 200ms
#5 Do Task 3
```

Notice `#2` and `#4`. They smell of `setTimeout` 😖. `setTimeout` takes in a callback, meaning there will be an indentation. Whenever those appear, means the code's gonna get ugly.

So I wrote this code in JS

```js
doTask1();

setTimeout(() => {
  doTask2();

  setTimeout(() => {
    doTask3();
  }, 200);
}, 200);
```

Now you can see for yourself, this code SMELLS. BAD.

The moment I wrote it, I knew it wouldn't work in long-term. What if I needed to an extra step of waiting and doing a Task #4? Or rearranging the order.

So, I declared a utility function and it solved the problem completely.

```js
/**
 * @param {number} time Time to wait for in milliseconds
 */
function waitFor(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
```

Here we're returning a `Promise`, which resolves when the `setTimeout` function inside runs.

It's usage would be as simple as

```js
await waitFor(200);
```

So the spaghetti code above could be rearranged like this:

```js
doTask1();

await waitFor(200);

doTask2();

await waitFor(200);

doTask3();
```

See how simple it became? It reads exactly like the text version I wrote at the top. It's very idiomatic 😎.

## Shorter code

That code snippet could be simplified further

```js
const waitFor = (time) => new Promise((resolve) => setTimeout(resolve, time));
```
