---
title: Near-native TypeScript in NodeJS
description: "It's hard to get TypeScript working in NodeJS. You got tons of config to set up, and it can get irritating with the build times."
date: 26 July, 2021
---

Have you worked with NodeJS in past? Have you tried to add TypeScript to the project, and realized how bad the Developer Experience suddenly becomes?

Sure, you have the great DX that **writing TypeScript code** provides, but get lost into the rabbit hole, that is to make sure the various build tools you pull in play nicely with each other & provide the correct output you want.

If it's a web based project, you don't need to worry at all. [Create React App](https://reactjs.org/docs/create-a-new-react-app.html), [Vite](https://vitejs.dev/), [Snowpack](https://www.snowpack.dev/) and many such build-and-server tools have got your back and work seamlessly.

But for browser, it isn't as big of an issue adding all these tools, because

- They provide **marvelous** Developer Experience, from setup to starting server to building the final app
- It's expected on the web. You always need to have a web server running in the background, so integrating some extra build tools in the same process doesn't really hurt.

But for NodeJS, it's a whole **new** story. Writing code for NodeJS at its very base is just writing a JS file, and executing it via `node index.js`. That's how it's been since the beginning.

So, to visualize this whole pain, let's introduce a character to the story: **Annabeth**. Annabeth is a frontend web developer, and now she's trying to get into writing NodeJS code. She thinks: **Easy peasy, it's just JavaScript, how different it can be!**. And that is true, after 2 weeks of reading article after article, she cracks NodeJS development enough to be able to write full fledges programs in it.

But after just 2 weeks, she's already heartsick for her most favorite part of programming: **TypeScript**. She had been very disciplined and focused, and focused only on raw NodeJS-edition of JavaScript.

So she searches on Google "TypeScript with NodeJS". She looks, and finds this out 👇

```bash
tsc
node index.js
```

> Let's just skip over the whole crazy getting-tsconfig-right song and dance, that's out of scope of this article. Let's just assume the entrypoint files are specified, and outputted as one single `index.js` file

So now she can just write TypeScript and it will just work!!! All she needs to do is `tsc && node index.js` everytime she wants to run the script, and bam!! It just works!! There's a sparkle in her eyes, writing her favorite language!! She just can't get enough of this awesomeness 😌.

But the sparkle is gone very soon. Why? Cuz this `tsc && node index.js` command is slow. Excruciatingly slow!!! She enters this command everytime, and then has to wait for seconds, literally, to have the code run. Soon she is just irritated at the speed.

She thinks, "It wasn't so irritating doing web dev with local server and all."

Her conscience replies back, "Off course dummy, the setup there is superb, and very smart, the moment you change your code, it recompiles everything! It's a watcher!!!"

Her eyes flew open!!! How did she not think of putting a code watcher here.

She scrambles for her keyboard, types "TypeScript watch code" in the search box, and instantly find a super simple flag: `--watch`.

![Running tsc --watch in split terminals](../../static/media/native-ts-in-node--split-terminals-tsc-watch.png)

She is instantly delighted!! She opens up split terminals, and type `tsc -- watch` in one, and `node index.js` in other terminal whenever she wishes to run the code. She doesn't have to wait for it to compile anymore, as it's compiling in real time in background. It feels as if she's writing TypeScript, and it is running almost natively!! She's really happy with it

## A week passes by...

A week has passed by. She's pretty happy with her setup. Just start the `tsc --watch` command, open another terminal and execute node there. Life's good.

Then one day, she comes in to work, starts writing the code and running `node index.js` as usual. She notices it isn't working. Whatever code she wrote, it doesn't seem to be working. She puts `console.log` every ten lines, every file, every conditional and keeps checking. She's on the verge of pulling her hair out, but then she opens the generated `index.js` to inspect what is happening. There, she finds, all the code she wrote today isn't even there. None of the logic, no `console.log`s she added.

The revelation hits her hard, and she reciprocates the favor by hitting her head repeatedly.

She realized she hadn't started the `tsc --watch` command today. So technically, her code wasn't compiled to the output, the output folder still had code from previous day.

The sweet spot she had been with this approach is now fading away. After that debacle, she doesn't like this approach anymore. She admits it's a human mistake, anyone can do it, but she still seethes inside. The way this whole **running-the-program-in-command-line** works, makes starting a watcher feel unnatural.

She's even considering dropping TypeScript now. Which alone is quite tragic. Even if uses the [JSDoc sugar to get TypeScript like features working in JavaScript](https://www.puruvj.dev/blog/get-to-know-typescript--using-typescript-without-typescript), it still isn't as good a an experience as writing TypeScript directly is.

So she's just browsing around on net, searching for possible solutions, and comes across this little package called [ts-node](https://www.npmjs.com/package/ts-node).

## ts-node

`ts-node` allows you to directly run your TypeScript files, kinda like this 👇

```bash
ts-node index.ts
```

It creates no output files at all, it simply runs the file specified, in the same way as `node index.js`, so it completely eliminates that blunder of you running the old output code, cuz there's no output at all.

Annabeth gets excited, straight away does an `npm install ts-node` in her project, and runs this command. And it works!! No more stale output file problem, no need to run 2 different terminals, or 2 different terminals.

But she notices a bigger problem: `ts-node` is still **SLOW**. Almost as slow as `tsc && node index.js`.

Her excitement trickles away. She's back to square one. Ok, maybe a little more than square one, considering that the whole extra command or extra terminal issue is gone.

But she is considering going back to starting `tsc --watch` in one terminal and running `node index.js` in another. It doesn't feel so bad. She'll just have to make sure to remember to run the watcher before she starts coding in the project. Or she could set up a script to open both terminals with the commands in one click.

She accepts her predicament, and goes on writing code like this. But this mistake, of forgetting to turn on `tsc --watch` still keeps happening to her. It's really annoying. She has even automated it with a bash script, but even then she sometimes forgets to run the script to set up the environment, so she basically still is running stale code sometimes. She certainly has gotten better at realising that, but it still doesn't make it much pleasant.

So she continues 2 weeks with this approach.

Then one day, she's browsing twitter, and sees a post about this new tool called [esno](https://github.com/antfu/esno). She opens up the link, reads about it. She thinks _"This is just like `ts-node`"_. She is ready to shrug it off, but one word stops her in her tracks: **esbuild**.

It's written right in the very heading of the page: **TypeScript / ESNext node runtime powered by esbuild**

She knows <mark>esbuild</mark>. She hasn't used it directly, but she has used tools built on it, like Vite and Snowpack, and she has firsthand felt the speed these marvelous tools brought to developer experience.

So she decides to try it.

## Trying esno

She opens up her terminal, runs

```bash
npm i esno
```

then runs the command:

```
npx esno index.ts
```

She starts to get up from her chair to get some water, then notices some movement from the side of her eye. There's text on her terminal where she ran the code.

She couldn't believe her eyes!!! The code had run in just 2 seconds!! This was nothing like `ts-node`, which took 6-7 seconds. This was near instant. She sat back in a hurry, and re-run the command, This time, it didn't even take 2 seconds. it was instantaneous!! Her mind was blown!!! She opened her code editor, changed some code, and re-run it. Again, 100% instantaneous.

![Eyes wide open; cat](../../static/media/native-ts-in-node--eyes-wide-open-cat.gif)

She felt so joyful in the moment she couldn't express it. Now she could use TypeScript in Node in a very natural way. No more extra terminal watchers, no more waiting 10 seconds for the code to run, nothing nada!!! It just worked!!

We developers generally don't get a happy ending. It's one thing after the other for us. There's no ending.

But what Annabeth got here in this story was no less than a happy ending.

# Technical breakdown

I hope you loved this story, and got something good out of it.

But if you're all serious and just looking for a direct answer, I got that for you!

Here's a technical breakdown 👇

## tsc && node index.js

**Advantages:**

1. Simple

(Pretty much it 😁)

**Disadvantages:**

1. Slow - This can become excruciatingly slow as codebase grows, even going into 20-30 seconds for each time, if big enough codebase

2. Generates output files - This can be bad. It's very easy to forget to run `tsc && node index.js`, and rather directly run `node index.js`, in which case you'd be running stale code without knowing about it for some time

## tsc --watch || node index.js

This means running `tsc --watch` separately in a terminal, and running `node index.js` in a separate terminal whenever you need to run your code.

**Advantages:**

1. Fast - No need to wait for tsc to complete compilation, as `--watch` has incremental generation, meaning it recompiles the changed code within seconds

**Disadvantages:**

1. Easy to forget to start watcher - It's very easy to forget to run `tsc --watch` in a terminal before you start to run your code in Node. This extends the _Generates Output Files_ problem I listed above in `tsc && node index.js`. Because the output files already exist, you won't get an error either that you're running stale code

2. **Mental and Memory overhead of starting the watcher** - You have to remember to start the watcher everyday. And having an extra terminal is also more memory consumption.

## ts-node

**Advantages:**

1. Feels very native - It's just `ts-node index.ts`, extremely close to writing `node index.js`. It feels better than concatenating 2 commands(`tsc && node index.js`) or starting 2 terminals which consume quite some memory and there's mental overhead.

2. Does not generate any files - This is really good, cuz this time, if you run `node index.js`, it will fail, cuz `index.js` file doesn't even exists!! That's the beauty of it!! All the compilation and running the code happens in memory, the filesystem is left untouched, so it's impossible to run stale code.

**Disadvantages:**

1. Slow 😕 - As great as this approach is, it has the same problem as `tsc && index.js`, where the code is compiled every single time

## esno

[esno](https://github.com/antfu/esno) is exactly the same thing `ts-node`, but it's magnitudes faster!! Almost feels like you're running JS directly in Node without any intermediate step!

Installing in your project 👇

```bash
npm i esno -D

# Yarn
yarn add esno -D
```

Running it 👇

```bash
npx esno index.ts

# Yarn
yarn esno index.ts
```

## esmo

If your project is running in Module mode, that is you have a `"type": "module"` in your `package.json`, then `esno` won't work. `esno` converts your code into <mark>CommonJS</mark>, which won't work in Module context.

So for that, you can use `esmo`. `esmo` is the exact same as `esno`, but it transpiles code to <mark>ES Modules</mark>.

> `esmo` needs to be installed separately

Installing in your project 👇

```bash
npm i esmo -D

# Yarn
yarn add esmo -D
```

Running it 👇

```bash
npx esmo index.ts

# Yarn
yarn esmo index.ts
```

# Bonus: tsup

I know your weird-names-in-a-day meter would be overflowing just by `esno` and `esmo`, now what the hell is this `tsup`?
