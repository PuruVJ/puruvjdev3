---
title: Split Array into `n` number of chunks
description: Split an array into `n` number of multiple arrays with JavaScript
date: 27 sep, 2020 10:45 AM
---

Recently, while making my blog, I ran into a problem. I was using headless chrome to take snapshot of the URLs provided on the <mark>Works</mark> page, and it was turning out to be quite slow, even on Cloud Servers, which have top-notch internet and processing speed.

I was passing it a URL at a time, it would go to it, take a snapshot, then move to the next URL, and so on. It was a very linear process.

But those servers being so powerful, they could've snapshot 5 pages at once at the speed it takes for 1 page. So I decided to split the work up in chunks. I broke the urls up in chunks of 5. Chrome would snapshot those 5 simultaneously, and when it was done with all, it would move on to the next 5, and so on. The times reduced to a `third` of the time.

Consider this array `list`. For our purposes, let's just deal simply with numbers rather than URLs.

```js
const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
```

Now I want to split it into chunks of 5, like this,

```js
const splitList = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12],
];
```

Or chunks of 4:

```js
const SplitList = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
];
```

You get the idea.

# Code

The code for splitting an array in its simplest form would be:

```js
/**
 * @param {Array} arr The array to be broken into chunks
 * @param {number} n The number of items in each chunk
 */
function chunks(arr, n) {
  let items = [...arr];
  return new Array(Math.ceil(items.length / n))
    .fill()
    .map(() => items.splice(0, n));
}
```

Let's break it down piece by piece:

- We're returning an `Array` with the number of items defined by `Math.ceil(items.length / n)`. if `items.length` is 12, and `n` is 5, we would get the devision as 2.4 . More than 2, less than 3. 2 items(11, 12) will be leftover, and will need to be accomodated in 3rd array, so `Math.ceil` the division.

- `.fill()` simply fills the array up with `undefined`. This is to get an array with the required size, and we can modify those values later. The example above would return `[undefined, undefined, undefined]`.

- `.map()` We're traversing over every value in the array of `undefined` and replacing it with a chunk of the `items` array. `splice` removes a chunk from the given array and returns as the value for the `.map`

- Lastly, notice we're cloning `arr` into `items`. This is required to not mutate the original value.

## Explanation

Let's see how `splice` works

```js
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const spliced = arr.splice(0, 3);

// let's print both the original array and spliced array
console.log(spliced); // Output: [1, 2, 3]

console.log(arr); // [4, 5, 6, 7, 8, 9]
```

`splice` mutated the original array.

That's what would happen in the `chunks` function.

```js
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const chunked = chunks(arr, 5);

console.log(arr); // Output: []
```

`chunks` would remove all the values from the original array. However due to cloning the passed array and working on it, we avoid this problem.

# Conclusion

Go chunk it up 😉 😜 🤣
