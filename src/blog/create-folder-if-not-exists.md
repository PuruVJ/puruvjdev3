---
title: NodeJS Create folder if not exists in 3 lines - No dependencies
description: The simplest and dependency-free way to create a folder in NodeJS if it doesn't exist
date: 18 Jan, 2021 2:38 AM
---

Here's a very simple trick to create a folder if it doesn't exists (Or ensure if a folder exists) in NodeJS. **Just 3 lines, no dependencies**

# Minimum requirements

1. NodeJS >= v10 LTS.
2. Working knowledge of `promises` and `async await`.

That's it 😊

# TLDR Code:

```js
const { mkdir } = require('fs').promises;

try {
  await mkdir('folderPath');
} catch (e) {}
```

# Explanation

1. We import promise-based version of mkdir from `fs.promises`. Read my article about [Simple code with fs.promises and async await](https://puruvj.dev/blog/fs-promises).

2. We actually create the folder with the `await mkdir('folderPath')`.

> Note: We are using an await here, so it's necessary for this code to be in an async function, or you can also use the <mark>Top Level Await</mark> feature in NodeJS >= 14.8.0. Read my article about why [Top level Await is AWESOME!! 😍](https://puruvj.dev/blog/top-level-await)

## Why wrap it in try-catch?

Remember: We're trying to create a folder if it doesn't exists. That means there's a fair chance it may already exists, in which case mkdir will throw an error, and will stop the rest of code from executing. We don't want that now, do we? 😉

So if `mkdir` works perfectly, good, means the folder didn't exist, so it was created. But if it throws error, try catch will simply catch the error, ignore it, and move on to the rest of the code.

Simple!

# As a utility function

Make this snippet part of your utility belt 👇

```js
/**
 * Ensure that a folder exists
 * @param {string} folderPath
 */
async function ensureFolder(folderPath) {
  try {
    await mkdir(folderPath);
  } catch (e) {}
}
```

Hope it helped!
