---
title: Async Await usage and pitfalls in Array.prototype.map() and chaining
description: Using async await in array methods is quite tricky. But it gets even trickier when you chain multiple array methods. Find out how.
date: 29 Sep, 2020 3:35 PM
published: true
---

Let's consider the code below

```js
const IDs = [1, 2, 3];

const usersData = IDs.map(async (id) => await getUserData(id));

console.log(usersData);
```

What would this output?

```js
[Promise, Promise, Promise];
```

All these are promises. But we are expecting data as objects(or whatever other format you can think of) here. How do `await` every single array item?

The solution here is `Promise.all`. Quick recap:

`Promise.all` takes in an array of promises, runs them concurrently until they `all` resolve, and return a bigger `promise` with the outcomes from those promises as resolved values as an Array

For example

```js
await Promise.all([getUserData(1), getUserData(2), getUserData(3)]);
```

will return

```js
[
  { id: 1, ...otherData },
  { id: 2, ...otherData },
  { id: 3, ...otherData },
];
```

If you think about it, the code snippet where we're mapping over IDs is just an Array of Promises. We can directly `Promise.all` that array

```js
const IDs = [1, 2, 3];

const usersDataPromises = IDs.map(async (id) => await getUserData(id));

const usersData = await Promise.all(usersDataPromises);

console.log(usersData);
```

That would output us the same object as above

```js
[
  { id: 1, ...otherData },
  { id: 2, ...otherData },
  { id: 3, ...otherData },
];
```

# Tricky part

The trick above works like a charm. However, difficulty arises when you chain another array method to the existing array, like this

```js
const IDs = [1, 2, 3];

const usersDataPromise = IDs.map(async (id) => await getUserData(id)).map(
  async (data) => await getPosts(data)
);

const usersData = Promise.all(usersDataPromise);

console.log(usersData);
```

It will return an error. Why?

`Promise.all` tries to run all promises at once. And I mean, **All of them**. It will try to run the 2nd `map` **alongside** the first map. You can see for yourself this is a problem, as the second `map` depends on the value from the first.

How do we resolve this (Pun intended 😎)?

# Solutions

There can be many ways to solve this problem. I will share 2 here

## 1st

`Promise.all` at every single step

```js
const IDs = [1, 2, 3];

const usersData = await Promise.all(
  IDs.map(async (id) => await getUserData(id))
);

const usersPosts = await Promise.all(
  usersData.map(async (userData) => await getPosts(userData))
);
```

## 2nd

A plain old `for of` loop:

```js
const IDs = [1, 2, 3];

const usersPosts = [];

for (let id of IDs) {
  const userData = await getUsersData(id);

  const userPosts = await getPosts(userData);

  usersPosts.push(userPosts);
}
```

I prefer the 2nd approach. If you wanna add an extra step, you simply add an extra line, whereas the 2st will require a whole extra `Promise.all(array map)`, which ultimately is just code redundancy.
