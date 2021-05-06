---
title: Top level Await is AWESOME!! 😍
description: Top level await is literally the GOAT (Greatest of All Time). In every way. Read on to know why, how to use it, and its implications
date: 28 Dec, 2020 8:51 AM
cover_image: media/top-level-await-top-of-the-world.jpg
---

![Top of the world](../../static/media/top-level-await-top-of-the-world.jpg)

<mark>Top Level Await</mark> is literally awesome. It's the GOAT!!(**G**reatest **o**f **A**ll **T**ime, in case you couldn't guess 😉)

# The Dark Times...

There was an era, where if you tried to pull a stunt like this 👇 at the top level(i.e. not in any `async` function),

```js
const data = await fetch(URL);
```

JS would scream at you 👉 `SyntaxError: await is only valid in async function`

It was super frustrating. But what could you do then?

## The Hack

**Wrap it in IIFE**

> <mark>IIFE</mark>: Immediately Invoked Function expressions. [Flavio Copes has a really good article about it.](https://flaviocopes.com/javascript-iife/)

```js
(async () => {
  const data = await fetch(URL);
})();
```

> Not really a hack as far as official spec is concerned, but to the code author, it definitely feels like one.

Just look at the code. So many brackets, so much boilerplate. The last line with `})();` makes me nauseous even after 5 years of JS development. So many weird brackets!!

But wait, it gets even better 😑

```js
(async () => {
  const response = await fetch(URL);
  const jsonData = await response.json();

  const finalData = await processJsonData(jsonData);

  if (finalData.propA.propB === 'who-cares') {
    // Do stuff
  }
})();
```

This code gets messier. And that code above is still very clean. Wait till you try to create your version of MacOS Desktop for Web (Shameless Plug! I'm working on it 😁 [macos.now.sh](https://macos.now.sh)). It's gonna get outright ugly, and you don't want ugly code. Nobody wants ugly code.

# A New Hope

> If you're wondering why I'm using Star Wars related words a lot, Mandalorian episode 16 dropped a few days ago, and literally, \*\*\*\*\*\*\*\*\*\*\*\*\*\* appeared 😭. I'm still shaking from how good that episode was.

In comes Top Level await, ~~slashing droids with his lightsaber~~, taking the pains of IIFE hacks away.

Using it is as simple as the first code snippet on top:

```js
const data = await fetch(URL);
```

And it will work perfectly.

And that second snippet, see this 👇

```js
const response = await fetch(URL);
const jsonData = await response.json();

const finalData = await processJsonData(jsonData);

if (finalData.propA.propB === 'who-cares') {
  // Do stuff
}
```

Perfection 👌.

But, there are certain requirements to use it.

# Requirements

It can be used only in <mark>ES Modules</mark>.

That is, in scripts that are marked as modules in your HTML or in your package.json in Node

## Browser

In browser, JS alone is nothing. It needs to be linked to by the HTML file.

In your `index.html`:

```html
<script type="module" src="index.js" />
```

`type="module"` is necessary for it to be interpreted as an ES Module

## NodeJS

You need to have minimum of Node **14.8.0** for this feature to work. Modules were available in 13.9.0, but the top level await was unlocked at 14.8.0 only. The current LTS is v14.15, and I recommend most users to always choose the LTS version. If you're reading this in 2025, and the LTS is v24, go for it, not 14.15. (I hope Node survives that long, what with [Deno](https://deno.land/) and [Elsa](https://github.com/elsaland/elsa) being there now 😅)

> Note: I'm aware that you could use ES Modules long before 13.9.0 in NodeJS, but you had to pass the flag `--experimental-module`, as in `node index.js --experimental-module`, and these modules were highly experimental and unstable and subject to change then, so I didn't even bother with them.

These below are some steps to get ES Modules in Node working. Note that these aren't the only methods for that. There are total of 2 or 3 right now, but I will explore the most common one only.

### Step 0

Have npm installed. If you already have node installed, you need not worry, you already have it.

Check Node version:

```bash
node -v
```

Check npm version:

```bash
npm -v
```

npm should be higher than `6.14.8` at this point of time.

But the Linux users might have some issues, as running `sudo apt install nodejs` downloads a super-old version of Node, and even without npm, that is (The Blasphemy 😤).

In that case i recommend you to install nodeJS and npm using this [very good article](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04).

But beware, your problems won't be over because of the permissions issues. I recommend you to install `nvm` (Nope I didn't misspell `npm`), which will take care of all these problems for you. [Read how to install nvm](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04).

After you have installed nvm, Run `nvm install --lts` to install the latest LTS version.

It's slightly longer method, but much less painful, both in short and long term

### Step 1

Create `package.json`

Most Node projects will already have the `package.json` ready, but in case you don't, make one. It's as simple as typing this command:

```bash
npm init -y
```

This should output a file of this format. Values may be different, but format stays the same:

```json
{
  "name": "snippets",
  "version": "1.0.0",
  "description": "",
  "main": "promise-arr.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

### Step 2

Add `"type": module"` in the JSON file. Like this:

```diff
{
  "name": "snippets",
  "version": "1.0.0",
  "description": "",
  "main": "promise-arr.js",
+ "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

And you're good to go!

# Use Cases

Here are some common use cases for top level await:

> Note: These use cases are quite simple, and will be most probably composed inside functions, where you can already use `async`. The most use of top level await would be to consume these higher order functions in the main code.

## Timer

Whenever I jump onto any project, I carry some utility functions with me. One such utility functions is the simpler alternative to using the ugly `setTimeout`, and it gets rids of some weird use cases that comes with `setTimeout`. It's the `waitFor` utility function:

```js
/**
 * @param {number} time Time to wait for in milliseconds
 */
function waitFor(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
```

I use it simply as:

```js
doTask1();

await waitFor(200);

doTask2();

await waitFor(200);

doTask3();
```

I can use it directly in modules with top level await like this:

```js
import { waitFor } from '../utils.js';

console.log(1);

// Wait for 200ms
await waitFor(200);

console.log(2);
```

I have written a blog post about this utility function too. [Check it out here](https://puruvj.dev/blog/flatten-settimeout)

## Dependency fallbacks

Let's say you're using your own remote server for importing Modules directly. You have come up with some superb optimization algorithms to make those imports from remote server even faster than locally bundled imports, and are willing to rely more on that server.

But it's **your** server. You have to maintain it. 24/7!! What if it goes down? It would be a huge bummer then, wouldn't it?

So you come with a clever solution: Import from your own server, but if it fails, import from <mark>unpkg</mark>. Seems smart. So you write this code:

```js
try {
  import jquery from 'https://my-server.com/api/jquery.js';
} catch {
  import jquery from 'https://unpkg.com/jquery@3.3.1/dist/jquery.js';
}

const $ = jquery.default;
```

Ahem! One catch here. This code is invalid. You can't use `import package from "somewhere"` inside any block. It has to be used in the top level only (This seems like the inverse problem of Top Level Await, isn't it 🤔).

Luckily, we can use the dynamic `import` statement, which can be used anywhere.

So our new code becomes.

```js
let jquery;

try {
  jquery = await import('https://my-server.com/api/jquery.js');
} catch {
  jquery = await import('https://unpkg.com/jquery@3.3.1/dist/jquery.js');
}

const $ = jquery.default;
```

That's it! See, we used await without any async function wrapping it. It's on the top-most level. The code will wait for the `import` in the `try` block to resolve, then if it fails, will go fetch from `unpkg`, and waiting while it happens, but not stopping the execution altogether.

## Internationalization (i18n)

> Had to search Google for the spelling of this word 😅

Say you have some JS files in which you're storing common strings for different languages.

Now you wish to access those strings right on top, without any other wrapper or function. You can do it simply like this:

```js
const strings = await import(`../i18n/${navigator.language}`);

paragraph.innerHTML = strings.paraGraph;
```

See how simple it is?

And most bundlers like Webpack/Rollup will recognize that you're trying to fetch some files from the `../i18n` folder, so they'll just create separate, individual bundles of the files in the `../i18n` folder, and you can import the right, optimized bundle.

> This has traditionally been done with JSON files and `fetch`ing them, but these dynamic imports open up new possibilities

## Resource initialization

Let's consider a backend-related example for this. Say you have a Database implementation with lots of initialization code. Well, you'd need to initialize your database someway, and most of these databases take some amount of time, so they're always callback or promise based. Let's assume, in our case, the database instance is promise based (You can convert callback based functions to promises in NodeJS too, using `require('util').promisify`).

So you initialize it:

```js
import { dbInstance } from '../db';

const connection = await dbInstance();

// Now we can simply pass the database instance to the function below
const userData = await getUserData(connection);
```

See how simple and idiomatic it is?

# Conclusion

Top Level Await is an awesome addition to JavaScript, and is here to stay. Heck, even Darth Vader agrees

![Darth Vader: The force is strong with this one](../../static/media/top-level-await-force-strong-darth-vader.gif)

Signing off! 😁
