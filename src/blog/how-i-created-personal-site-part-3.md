---
title: Image Optimization Automation with Incremental builds
date: 29 June, 2020 9:50
description: In this post, I delve deep into how I automated image optimization on my blog.
cover_image: media/camera-scenery.jpg
published: true
series: "How I created my personal site"
---

![](../../static/media/camera-scenery.jpg)

{{ series-links }}

Image Optimization. Ah, The bane of frontend devs! All that is slow with a site is responsible mostly because of images. These take up 100s of Kilobytes, and slow up the site heavily. What if we could just optimize our images so they wouldn't make the page slow?

I know the perfect solution to this problem. **REMOVE ALL THE IMAGES!**

Just kidding. Don't remove images. They're important. Very Important. They breathe life and fun into a page. Keep as many images you want.

But this image problem, it's real. And it's important. A lot of people in the world don't enjoy as good network connections as those in US, UK do, like India and Nigeria. Also, data plans per GB on slower connections are much more expensive.

For example, in India, before the 4g revolution brought on by Reliance Jio, the data plan for 1GB 3G data was **Rs. 345 (4.6 USD)**. That's **4.6 USD / GB**! ON 3G! And now, it's **Rs. 150 (2 USD)** for **30GB** 4G data! That's just **Rs. 5 (6 cents) / GB**. And that's for 4G.

And data prices are even worse in countries like Thailand, where due to strict Government regulations, prices for even voice calls are astronomically high!

So you see, image optimization is important not for just User Experience, but also for their Wallets. So let's see how I achieved it in this blog.

But first, let's get this question out of the way:

## Why do it myself?

Why should I spend so many hours working on something so trivial and for which there are thousands of platforms and plugins?

That's a valid question. Why? I mean if you have ever used [Gatsby](https://www.gatsbyjs.org/), you would know that there is a plugin which does that specifically for you. It's extremely flexible, requires very little amount code, and works like a charm.

And what about [Cloudinary](https://cloudinary.com/)? Ah Cloudinary, the Dumbledore of image optimization. The most magical thing I've very seen in the image optimization department. Why not simple use it?

And fair point. Cloudinary gives you such a granular control, just in the URL. You can ask for the image with specific dimensions, or aspect-ratio or any level of quality, simply by specifying some parameters in the URL. So magical!

But I didn't choose Cloudinary. Or the Gatsby image plugin (cuz I'm not using Gatsby, I'm using [StencilJS](https://stenciljs.com)).

I long thought about Cloudinary. Sounds simple ... well, simple, but what is the fun in that?

The reason is simple:

> I wanted to get my hands dirty!

This blog wasn't just meant to have a personal site or online presence, it's an exercise. A leap of faith. To do something I've never done before.

Before I ever worked on this blog, I was dead scared of automating image optimization by myself. It sounded very complicated (cuz it is), and something that I could never do.

I had done image optimization before, but it was all by hand. It was on the website of my father's hospital I had made, [Puru Eye Hospital](https://purueyehospital.com). I made 4 different variations of every single image, all by myself. I myself made **44** images!

So when I started work on this project, I made up my mind: I was going to do it. ALL. BY. MYSELF.

These are my reasons. These are, you could say, a bit naive, but that's all right.

<mark>A Note though</mark>: If you're a company or someone who wants to save time and money, go with Cloudinary or some other similar solution. Cloudinary optimized images are much smaller too.

So, up and at 'em.

# Expectations

Ok, so these are the expectations I have from the the images on my blog:

## Next gen formats

JPEGs and PNGs are fine, but I need to squeeze out more from my images. I want the images to be high quality and small in size at the same time.

<mark>WebP</mark> to the rescue!

WebP is a relatively newer image format which can give 20-30% decrease in size, at same quality. And it even supports transparency like PNG, and animatability like a GIF. It's an amazing image format.

But WebP doesn't has universal support as of now (Looking at you iOS Safari and IE 11). So we need a fallback.

This is the strategy: Show WebP for browsers which support it, and JPEG or PNG for older browsers. This sounds tough, but trust me, it isn't.

The only hard part is generating all these images

## Responsive images

This sounds like setting `width: 100%` on your images, but trust me, its much more cooler.

So, food for thought. Say you are visiting a website on desktop. If the image you are looking at looks fine (that is, not broken or pixelated), it is probably quite wide, like maybe `1200px` wide (If it's a full width image). And that's fine. That's a good size for desktops.

But then you visit it on mobile. The image still looks high quality, cuz its still the same `1200px` wide image, and your viewport is like `500px` wide. But just think, how much better it would have been if that image was close to your viewport's size, say `600px`. That image would be half the file size (Like <mark>60kb</mark> instead of <mark>120kb</mark>). That would have been some massive savings. And there wouldn't be any quality loss, cuz you can't look at much detail on a small screen, so its a total win-win!

So that's what I did. The pipeline would generate 2 images, one `large.jpg` of width `1200px`, and a `small.jpg` of width `600px` for smaller screens. And then my algorithm will convert those 2 into their `webp` counter-parts `large.webp` and `small.webp`, which would be much smaller in size.

So finally, I would end up with 4 images. And don't worry, getting the browsers to choose between one of them is quite simple. Just read on!

PS: Here's a very good article about [responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images).

## Lazy-loading

This term is all the rage nowadays. Lazy loading is a technique, in which you load images only when you need them. Think about your twitter or instagram feed. Those images load only when you scroll down to them.

This doesn't only make browser's native loading spinner stop earlier, it can also save the user's data. If a user doesn't read through to the end, they don't need to load all the images, hence saving some bandwidth, and will also remove the jank by not trying to load all the images at once.

## Graceful

All the above hi-fi techniques are good, but if they lead to worse user experience, the whole purpose is defeated.

What I do **not** consider graceful is an image popping out of nowhere and pushing all the content around. That's just plain bad, removes the user's focus from what they were reading, and just frustates them.

A graceful image showing technique is to show a placeholder the size of the image, resulting in no pushing of content. The placeholder can be anything, but I decided on using the dominant color of the image as the background of the placeholder. And lastly, toss in some fade-in animation, to smoothen the overall experience.

To get a feeling, reload the page and just look at the image on top. It fades-in gracefully rather than pop-in out of nowhere, doesn't push the content around, and looks smooth overall.

> It's a graceful image!

# Process

This part will be quite short, cuz I won't be going into code a lot. Rather I'll simply explain **how** I made the processes and their gotchas You can always check out the code at my [Github Repo](https://github.com/puruvj/). [The exact code for image processing is in this file](https://github.com/PuruVJ/puruvjdev/blob/main/scripts/optimize-images.js).

> Beware though! The code is messy and may result in brain damage for a whole day!! Read at your own risk.

## Get the image referenced in the markdown

This one is quite easy. `markdown-it`(The tool I use for rendering markdown to html. Check out my [previous post](https://puruvjdev.now.sh/blog/how-i-created-personal-site-part-2) for more) has hooks which give you the `src` for an image.

## Check whether this image has already been processed

This step is necessary for incremental builds. Image processing is a very CPU-intensive and time-taking task. In the beginning, the build times won't be more than a few seconds, but after a year of writing, I would have to wait 10 minutes for the blog to build! That's quite a drag.

That's why it doesn't make sense to process every single image every time. Just process the new ones and leave the old ones as they were.

But how do I check if the image has already been built? Do I store references in database? In a JSON file?

Not really, the solution is quite simple. If my image is, say `check-mate.jpg`, I check if the folder `check-mate` exists or not. Why a folder? Cuz when I process `check-mate.jpg`, I will create 4 versions of it:

- large.jpg
- large.webp
- small.jpg
- small.webp

and store them in `check-mate` folder. This makes things very easy for me. I don't have to maintain any database of all the images and their states. Also, if I update any photo, all I have to do is to just delete the folder corresponding to its name, and it will be rebuilt. Easy Peasy!

If the folder exists, I simply return the required data fore-hand and return early

## Generating images of different sizes

It doesn't make any sense to serve a `2000px` wide image to screens of all sizes, so I generate 2 sizes:

- `1000px` for desktops and tablets
- `600px` for mobiles

I use 2 packages for this:

- [image-size](https://www.npmjs.com/package/image-size) to get the aspect ratio of the image. `resize-img` requires absolute height and width, so the height has to be calculated based on the width and the aspect ratio.

- [resize-image](https://www.npmjs.com/package/resize-img) for actually resizing the image.

And the images resized by `resize-img` are saved as `large.jpg` and `small.jpg` in the folder(`check-mate` in the above example).

These images are only resized, not optimized. The next step is the interesting part.

## Converting to webp

Before optimizing the JPEGs themselves, first we'll make their webp counterparts.

For optimizing, I use the amazing `imagemin` package from NPM. It's the most versatile image optimization package I have ever seen, because of its vast plugin ecosystem. Whatever algorithm you want to use for image optimization, there is a plugin for that, whether it be `optiPNG` or `oxiPNG`.

For converting to `webp`, the plugin required is [imagemin-webp](https://www.npmjs.com/package/imagemin-webp).

The code to convert to webp is quite simple:

```javascript
const imagemin = require('imagemin');
const webp = require('imagemin-webp');

...

await imagemin([`${folderPath}/*.jpg`], {
  destination: folderPath,
  plugins: [
    webp({
      quality: 85,
    }),
  ],
});
```

`imagemin` here takes in `${folderPath}/*.jpg`, which is just telling it to take all the JPEG files in the given folder, applies the `mozjpeg` compression with `quality` set to `85`, and
churns out `large.webp` and `small.webp`, 2 super compressed images.

## Optimizing the JPEGs

`large.jpg` and `small.jpg` have been created, but these are far from optimized. These might still be in Megabytes, so optimzations are required.

For this blog, all I need is the `mozJPEG` algorithm for my JPEG files. Plus mozJPEG churns out `Progressive JPEGs`, which is even better. For those who don't know what Progressive JPEGs(`pjpeg` for short) means, these are the kind of the images which load a blurry version of it at first, then fills in the details, rather than load from top to bottom. These are much compact, and don't need to be loaded 100% to convey the information. 30% loaded is enough.

The basic code for that is:

```javascript
const imagemin = require('imagemin');
const mozjpeg = require('imagemin-mozjpeg');

...

await imagemin([`${folderPath}/*.jpg`], {
  destination: folderPath,
  plugins: [
    mozjpeg({
      quality: 85,
    }),
  ],
});
```

This will replace the `large.jpg` and `small.jpg` inside with the newly optimized images.

<mark>Note</mark>: The statement to convert to `webp` should come before optimizing the `jpeg`s themselves, or the quality of `webp` images will be quite aweful.

## Metadata

Now these images are optimized and prepared, let's extract some metadata. The metadata here includes:

- **Aspect** ratio: For a little CSS hack to ensure images don't push down content.
- **Dominant Color**: The dominant color extracted from the image for the placeholder.

**Aspect Ratio calculation** is quite easy. We already did that above using the `image-size` package.

**For getting the dominant color**, I use [color-thief-node](https://www.npmjs.com/package/color-thief-node). The API is dead simple and promise-based.

I store these values in a `data.json` file in the corresponding folder(`check-mate`, in the example).

Here's an example of how it looks:

```json
{
  "aspectHTW": 0.75,
  "color": [46, 35, 39]
}
```

`aspectHTW` is value of `Height / Width` of the image

`color` is an Array corresponding to `[r, g, b]`.

You could calculate these everytime, but that would defeat the purpose of incremental builds, eh😉?

## Returning the markup

Now after all that complex algorithm work is over, let's just return the markup.

The markup returned is this:

```jsx
<figure
  style="width: 100%;padding-top: ${
    list.aspectHTW * 100
  }%;background-color: rgb(${r}, ${g}, ${b})"
>
  <picture>
    <source
      type="image/webp"
      media="(min-width: 501px)"
      data-srcset="${list.large.webp}"
    ></source>
    <source
      type="image/webp"
      media="(max-width: 500px)"
      data-srcset="${list.small.webp}"
    ></source>
    <source
      type="image/jpg"
      media="(min-width: 501px)"
      data-srcset="${list.large.jpg}"
    ></source>
    <source
      type="image/jpg"
      media="(max-width: 500px)"
      data-srcset="${list.small.jpg}"
    ></source>
    <img
      alt="Placeholder"
      data-src="${list.large.jpg}"
      class="lazyload blog-img"
    />
  </picture>
</figure>
```

`list` is where I store the references and metadata of the images. Nothing much there.

The markup is quite a handful, so lemme break it down:

In the `figure` tag, I'm using a little trick too maintain aspect ratio. It requires setting `padding-top` or `padding-bottom` to the percantage required.

For example, to maintain a `16:9` ratio box, you would set `padding-top` to `56.25%`. `56.25` is simply `9 / 16 * 100`. Height divide by width. That's what I'm doing here. `aspectHTW * 100` suffixed with `%` is the trick here.

The `background-color: rgb(${r}, ${g}, ${b})` is setting color for the placeholder.

The `picture` and the `source` tags are just providing the browser choices to decide the best image and load that one. For browsers that support `webp`, the `webp` will be loaded, otherwise the `jpg` will load.

And if the browser doesn't support the `picture` tag altogether, the image referenced in `img` tag will be loaded as the last resort.

## Lazyloading

Finally, you'll notice that instead of `src` or `srcset`, there are `data-src` and `data-srcset` attributes. These attributes alone will do nothing. The image won't be loaded just from them.

These are for lazyloading. When you scroll down to the image, these `data-srcset` and `data-src` attributes are replaced with `srcset` and `src`, triggering in the loading of the image.

The library I use for lazyloading images is [lazysizes](https://www.npmjs.com/package/lazysizes). You're missing out if you haven't heard of it. Check it out!

These are all the key parts of this crazy algorithm. I use some other hacks to get into the final markup, but that is for another day.

{{ series-links }}
