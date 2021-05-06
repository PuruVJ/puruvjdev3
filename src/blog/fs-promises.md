---
title: Simple code with fs.promises and async await
description: If you've spent some time with Node's fs API, you know how huge a pain its callback based pattern can get. Read out how to flatten your code using promises and async await syntax
date: 11 Jan 2021, 12:07 PM
cover_image: media/fs-promise-requires.jpg
---

![Just some NodeJS code](../../static/media/fs-promise-requires.jpg)

Hi! I see you have jumped onto my blog. Well, buckle up, this is gonna be one helluva ride!! We're gonna explore how to use the all-time favorite <mark>async / await</mark> feature with Node's Filesystem API.

So now, let's make a super-simple program to read the username and password from a file, encrypt the password(Always do it, kids 😉), and write the username and new password to some other file.

So let's write up in plain english how our code works

```markdown
1. Read the `user-data.json` file.
2. Throw error if any.
3. Extract `username`, `password` from the file contents.
4. Encrypt the password.
5. Assemble final data to be written into the new file.
6. Write the data to the `user-data-final.json` file
7. Throw error if any.
8. Output if successful
```

Seems straightforward enough. So let's write it out in actual code.

```js
const fs = require('fs');

function main() {
  fs.readFile('user-data.json', (err, data) => {
    if (err) throw err;

    // Let's process the data
    const { username, password } = JSON.parse(data);

    // Let's encrypt
    const encryptedPassword = encrypt(password);

    const finalObject = { username, password: encryptedPassword };

    // Let's write it to another file
    fs.writeFile('user-data-final.json', JSON.stringify(finalObject), (err) => {
      if (err) throw err;

      console.log('Successful');
    });
  });
}

try {
  main();
} catch (e) {
  console.error(e);
}
```

We're just catching the errors and throwing them out to the console, in the last `try-catch` block.

This seems to work.

But something nags me here. Look at the steps I wrote out in plain english, and then look at the code. Plain english steps look very sequential, and step by step. Whereas the code we wrote, it **is** sequential, but it feels like all the steps live inside step 1, and step 7 and 8 live inside step 6. In short:

```txt
1.
  2.
  3.
  4.
  5.
  6.
    7.
    8.
```

Doesn't feel so idiomatic anymore, does it? It feels weird that all these steps in the code have to live **inside** of other steps, whereas in what we wrote, it feels idiomatic, like passing the torch in olympics(or in whatever events the torch is passed, I ain't a sports junkie 😁).

How can I make the code idiomatic, and mirror the steps it's based on?

# Solution(s)

Well, callback pattern can be replaced by using `async / await`. We can flatten our code a lot using them. But `await` works only with promises, ie.

```js
const result = await fetch('https://api.example.com');
```

`fetch` here returns a promise, so we can await the result. How do we promisify our `writeFile` and `readFile` methods then 🤔?

Well, look at this code below:

```js
const readFile = (path) =>
  new Promise((resolve, reject) =>
    fs.readFile(path, (err, data) => {
      if (err) reject(err);

      resolve(data);
    })
  );
```

This is a promise based implementation of the readFile function. We can use it as simply as this 👇

```js
const data = await readFile('user-data.json');
```

This will read the file, and move on to the next line after the data has come through. No indentation, no branching, nothing, Nada!! It looks good. So let's implement our complete code with this method.

```js
const fs = require('fs');

const readFile = (path) =>
  new Promise((resolve, reject) =>
    fs.readFile(path, (err, data) => {
      if (err) reject(err);

      resolve(data);
    })
  );

const writeFile = (path, data) =>
  new Promise((resolve, reject) =>
    fs.writeFile(path, data, (err) => {
      if (err) reject(err);

      resolve();
    })
  );

async function main() {
  const data = await readFile('user-data.json');

  // Extract
  const { username, password } = JSON.parse(data);

  // Let's encrypt
  const encryptedPassword = encrypt(password);

  const finalObject = { username, password: encryptedPassword };

  // Let's write to another file
  await writeFile('user-data-final.json', JSON.stringify(finalObject));

  console.log('Successful');
}

try {
  main();
} catch (e) {
  console.error(e);
}
```

Look at our main function here. The overall code is bigger, but our `main` function, which is the actual logic, is much more simpler and actually follows the steps we wrote, in the idiomatic way we imagined.

## Simpler way (utils.promisify)...

Our code above looks quite big, due to defining the promise-based versions of `writeFile` and `readFile`. We can make it much, much smaller by using a utility function exported by Node itself, `promisify`.

Usage 👇

```js
const { promisify } = require('util');
const fs = require('fs');

const writeFile = promisify(fs.writeFile);
```

You simply pass the callback-based function to the `promisify` function, and voila! you have a promise-based version of your original function.

So our code now becomes 👇

```js
const { promisify } = require('util');
const fs = require('fs');

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

async function main() {
  const data = await readFile('user-data.json');

  // Extract
  const { username, password } = JSON.parse(data);

  // Let's encrypt
  const encryptedPassword = encrypt(password);

  const finalObject = { username, password: encryptedPassword };

  // Let's write to another file
  await writeFile('user-data-final.json', JSON.stringify(finalObject));

  console.log('Successful');
}

try {
  main();
} catch (e) {
  console.error(e);
}
```

So much smaller 😍.

## ...Simplest Way!

Now lemme introduce you to the Ace in the sleeve! Since version 10, NodeJS exports promise based versions of its methods, **by default**. They can be accessed by `require('fs').promises`.

Here's our final code using this approach:

```js
const { writeFile, readFile } = require('fs').promises;

async function main() {
  const data = await readFile('user-data.json');

  // Extract
  const { username, password } = JSON.parse(data);

  // Let's encrypt
  const encryptedPassword = encrypt(password);

  const finalObject = { username, password: encryptedPassword };

  // Let's write to another file
  await writeFile('user-data-final.json', JSON.stringify(finalObject));

  console.log('Successful');
}

try {
  main();
} catch (e) {
  console.error(e);
}
```

Notice the first line. We're directly importing the `writeFile` and `readFile` methods from `require(fs).promises`. This is the best and the cleanest version you can find in Node currently.

# Code Conventions

Now that you've seen how to use `fs.promises`, let's find out the best patterns to use this code.

## Importing individual functions

```js
const { writeFile, readFile, access } = require('fs').promises;
```

This is probably the most convenient method, and the cleanest too. But the problem arises when you have to import something from regular `fs` module. For example 👇

```js
const { writeFile, readFile, access } = require('fs').promises;
const { writeFileSync, createReadStream, createWriteStream } = require('fs');
```

We are importing the promise based functions, as well as some functions from regular `fs`, like streams. Now you can directly use it down in your main logic, but sometimes when the code in the file gets big enough, and I'm not exactly using await with the promise-based versions, it can get pretty confusing which method is coming from where, so I have to scroll all the way to the top to see the imports.

This may not seem like a big problem, but I challenge you to write this code and comeback to it after 6 months. You'll be in the same dilemma 😂

## Importing as namespace

This is my most preferred method.

```js
const fs = require('fs');
const fsp = fs.promises; // 👈 This line

...

await fsp.writeFile();

fs.createReadStream();
```

## ES Imports

Now that we can use ES Imports in Node(with some extra tweaking), let's consider the Modular version

```js
import { promises as fsp } from 'fs';

async function main() {
  const data = await fsp.readFile('user-data.json');

  // Extract
  const { username, password } = JSON.parse(data);

  // Let's encrypt
  const encryptedPassword = encrypt(password);

  const finalObject = { username, password: encryptedPassword };

  // Let's write to another file
  await fsp.writeFile('user-data-final.json', JSON.stringify(finalObject));

  console.log('Successful');
}

try {
  main();
} catch (e) {
  console.error(e);
}
```

Also, if your node version is more than <mark>v14.8.0</mark>, you can also directly use top level await (I have an article about it, [right here](https://puruvj.dev/blog/top-level-await)).

```js
import { promises as fsp } from 'fs';

try {
  const data = await fsp.readFile('user-data.json');

  // Extract
  const { username, password } = JSON.parse(data);

  // Let's encrypt
  const encryptedPassword = encrypt(password);

  const finalObject = { username, password: encryptedPassword };

  // Let's write to another file
  await fsp.writeFile('user-data-final.json', JSON.stringify(finalObject));

  console.log('Successful');
} catch (e) {
  console.error(e);
}
```

Even smaller!!!

# Conclusion

Hope you got some good insights from this blog post.
