---
title: "GIF to MP4 conversion for web using NodeJS"
description: "GIF to MP4 conversion for performance is all the rage nowadays. But doing so in practice is really difficult, especially for cross-browser compatibility. Learn how to do it right"
date: Sep 25, 2020 1:09 AM
---

![](../../static/media/harry-firebolt-eats-cupcake.gif)

Who doesn't love these awesome GIFs? These are used heavily on social media, and many among us(\*cough* Myself \*cough*) couldn't live without these (Prove me wrong 😎)

However, these GIFs are costly. They eat up loads of CPU and GPU power, are huge in file size. This GIF above 👆 is <mark>890kb</mark> when downloaded. This number may not seem huge, but it's MP4 version is only <mark>132kb</mark>.

> It's **85%** smaller 😮

And it barely eats any CPU. Even the oldest of devices will play it easily

# How to convert

You can convert a GIF to MP4 by running this command

```powershell
ffmpeg -i harry-eats-cupcake.gif -pix_fmt yuv420p -c:v libx264 -movflags +faststart -filter:v crop='floor(in_w/2)*2:floor(in_h/2)*2' output.mp4
```

What are those weird options? I'll explain later.

However, you'll have to manually run this on every single GIF.

But we, the developers don't like to do that🙄. So let's automate the process.

![](../../static/media/dev-automation-10-min.jpg)

# Install dependencies

We'll require a binary of `ffmpeg` and will have to figure how to use it. And we'll need to download the **right** binary. What I mean by this is that in a real world application, you'll be deploying the code on cloud/servers, and you'd need FFMPEG there too.

If it's your own server, you can upload it there manually and it'll work. But you can't directly upload the binary to Cloud environments like Google Cloud Functions/AWS lambda without a lot of preprocessing and testing on your end. You'd have to keep a Ubuntu compatible FFMPEG binary alongside your own OS based binary, and still it won't work properly.

But thank the NPM Gods, we have the package [@ffmpeg-installer/ffmpeg](https://www.npmjs.com/package/@ffmpeg-installer/ffmpeg) that installs the **right** binary based on the operating system. If you are running Windows, it'll download the `ffmpeg.exe` file. If the OS is linux based, it'll download specific binary for that.

And there's also an amazing package called [fluent-ffmpeg](https://www.npmjs.com/package/fluent-ffmpeg) which provides a very declarative, callback-based API to interact with FFMPEG.

So let's download these. Make sure you have npm setup.

```powershell
npm i -D @ffmpeg-installer/ffmpeg fluent-ffmpeg @ffprobe-installer/ffprobe
```

The `@ffprobe-installer/ffprobe` package is also required by FFMPEG.

# Code

First, let's set up FFMPEG paths in our `index.js` file:

```js
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
const ffprobe = require("@ffprobe-installer/ffprobe");

const ffmpeg = require("fluent-ffmpeg")()
  .setFfprobePath(ffprobe.path)
  .setFfmpegPath(ffmpegInstaller.path);
```

> The code snippet above ☝ is not optional. Not having this config will break your program

Now, the code to convert GIF to MP4

```js
ffmpeg
  .input(gifPath)
  .noAudio()
  .output(`vidgif.mp4`)
  .on("end", () => {
    console.log("Finished");
  })
  .on("error", (e) => console.log(e))
  .run();
```

- `.input(gifPath)` is inputting the GIF file by its path. Relative paths will work here like `../../harry-eats-cupcake.gif`.

- `.noAudio()` will remove all the audio from the file. Makes sense. GIFs don't speak 😉.

- `.output('vidgif.mp4')` is the path where the output file has to be written. FFMPEG will look at the output file's format(`.mp4` here) and automatically choose the currect library for encoding, `libx264` for mp4 files.

> `libx264` is a video encoding library that encodes the video file into H.264 encoding, the most widely supported video codec. [See here: Caniuse H.264](https://caniuse.com/mpeg4)

- `.on("end")` and `.on("error")` are events that fire when the process finishes or throws an error and shuts down respectively.

- `.run()` is the most important line here. Without it, the process will not start and you'll staring at your blank terminal waiting for anything to happen, which it won't 😏.

When this process finishes, you'll have a `vidgif.mp4` sitting right where you intended. It'll be much smaller in size, and will play perfectly fine.

Just replace

```html
<img src="harry-eats-cupcake.gif" />
```

with

```html
<video autoplay loop muted playsinline>
  <source src="vidgif.mp4" type="video/mp4" />
  Your browser doesn't support HTML5 video playback.
  <a href="harry-eats-cupcake.gif" target="_blank" rel="noopener"
    >See the gif here</a
  >
</video>
```

Now this will play just like GIF! `playsinline` is necessary for it to run automatically on IOS Safari, and is also good for performance.

But wait! There's a catch!

If you push this file to production, and try to view it on Android or IOS, you'll see a blank area where the GIF should be visible. Why?

# Compatibility

The code above doesn't encode the new MP4 video for maximum compatibility.

The file you generated will work fine on a computer which comes with all kinds of codecs preinstalled. But your phone's browser won't be able to parse the video file.

# Solution

Remember the code snippet on top? Here it is again 👇

```powershell
ffmpeg -i harry-eats-cupcake.gif -pix_fmt yuv420p -c:v libx264 -movflags +faststart -filter:v crop='floor(in_w/2)*2:floor(in_h/2)*2' output.mp4
```

This code snippet works perfectly. The output.mp4 here works on phones too. But how do we translate it to `fluent-ffmpeg` format 🤔?

`fluent-ffmpeg` has an `outputOptions` method which takes in an array of the all the output options. Simply put, every option after the `-i inputFile.gif` is an `outputOption`.

Here's the code

```js
ffmpeg
  .input(gifPath)
  .outputOptions([
    "-pix_fmt yuv420p",
    "-c:v libx264",
    "-movflags +faststart",
    "-filter:v crop='floor(in_w/2)*2:floor(in_h/2)*2'",
  ])
  .noAudio()
  .output(`vidgif.mp4`)
  .on("end", () => {
    console.log("Ended");
  })
  .on("error", (e) => console.log(e))
  .run();
```

- output mp4 is encoded with h264, support Firefox/Chrome/Safari in Windows, Mac OSX, Android, and iOS.
- one mp4 file for all platforms, there is no need to encode an extra `webm` movie, which encoding speed is pretty slow.
- format as `yuv420p` for Firefox compatibility, the downside is color becomes less-saturate than original gif.
- yuv420p only support even width/height, so crop filter is required
- `-movflags +faststart` flags are optimized for online view in browser
- compression ratio typically 10:1, pretty awesome. note that if original gif is < 512KB, convert as mp4 is less efficient.

[Courtesy of this gist](https://gist.github.com/ingramchen/e2af352bf8b40bb88890fba4f47eccd0)

# Complete Code

JS:

```js
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
const ffprobe = require("@ffprobe-installer/ffprobe");

const ffmpeg = require("fluent-ffmpeg")()
  .setFfprobePath(ffprobe.path)
  .setFfmpegPath(ffmpegInstaller.path);

ffmpeg
  .input(gifPath)
  .outputOptions([
    "-pix_fmt yuv420p",
    "-c:v libx264",
    "-movflags +faststart",
    "-filter:v crop='floor(in_w/2)*2:floor(in_h/2)*2'",
  ])
  .noAudio()
  .output(`vidgif.mp4`)
  .on("end", () => {
    console.log("Ended");
  })
  .on("error", (e) => console.log(e))
  .run();
```

HTML:

```html
<video autoplay loop muted playsinline>
  <source src="vidgif.mp4" type="video/mp4" />
  Your browser doesn't support HTML5 video playback.
  <a href="harry-eats-cupcake.gif" target="_blank" rel="noopener"
    >See the gif here</a
  >
</video>
```
