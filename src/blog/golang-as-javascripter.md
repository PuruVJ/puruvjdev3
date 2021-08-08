---
title: Trying Golang as a JavaScript lover
description: I have written JavaScript, TypeScript, Dart, Python, PHP, C, C++, but never tried golang before. Here is my first hand experience trying it out
date: 15 Aug, 2021
cover_image: media/golang-as-javascripter--cover-image.jpg
---

![Peaceful Tibetan Monastery](../../static/media/golang-as-javascripter--cover-image.jpg)

I have been into coding since early 2015. That's about 6 years now. In that time I have done HTML CSS JavaScript, it's supersets TypeScript(My most favorite language of all time 😌) and Dart, Python as a form of timepass, and C and C++ in university curriculum.

Recently, Golang caught my eye. So I had been casually reading its documentation, the tutorial, some articles. Not really trying it out, in the sense opening VSCode and writing the code. That didn't happen.

I was just trying to get a feel for the patterns. Because the more sources you learn from, the better you become, no matter if the context is entirely different. Concepts and Patterns bleed over to other things.

Now here's one thing about me: I am a die-hard JavaScripter(That's not an official term, but who cares, let's consider it is, for now 😋). I write everything in JavaScript or TypeScript(Basically JavaScript with Types and futuristic features). Whether it's an app, or a small script or heck, even something where using Python
would be better, I still go with JavaScript.

Why? Because JavaScript is extremely flexible. As a language alone, it can literally do **anything**. It is a very simple language. There are a dozen ways to do anything in it. Then you include the **Modular** aspect of it in the equation, like [NPM](https://www.npmjs.com/), and JavaScript reaches a godly level.

Yet at the same time, it is explicit enough. You have to declare variable first before using it using `const` or `let`, unlike Python, which leads to confusion about **where** the variable is coming from!!

JavaScript uses curly braces for blocks instead of indentation. People would say Python looks cleaner without those braces, and I agree. It **looks** cleaner. But while reading, that indentation confuses me, as in, the line I'm reading belongs to which block exactly. Plus writing it is really risky. You might end up accidentally removing indentation from a line at the end of a block and it becomes a part of the outer block. It **has happened to me**, countless times.

These are some reasons why JavaScript is my favorite. So where does Go factor in on it?

Let's see!

# TLDR

Sorry, there's no TLDR for this article. It's just a documentation of my experience 🥲.

# Disclaimer

Before we start, here's something I wanna make clear: This isn't an organized technical article about pros and cons of Go or JavaScript. This is a completely Subjective article about what **I like** about Go and what I don't like about it.

If yur here for a hardcore, informative article about Go and JavaScript, I might disappoint you 😅.

But hey, if you wanna read first hand experience, this is it!! Read on!! 🤩

So with that out of the way, let's begin!

# Why even try Go?

This is a valid question. You saw I know many languages, and even on top of that, I use JavaScript for everything. So what gives? Why try to fit another language in my tiny brain?

The problem was when JS was way too big!!

What do I mean by that? Let's rewind a little!!

# The lazy undergraduate

I am the lazy undergraduate in question 😄.

I took admission in university a few months back. Thanks to Covid-19, our classes are fully online. It means there are a bunch of Google meet links that I had to hunt for every class.

So the actual process was:

1. Open up the timetable every hour and see which class is next.
2. If there's a class in next hour, find out its link.

Believe me or not, this process took 5 minutes. EVERY. SINGLE. TIME! 5 minutes isn't a lot, but you count these 5 minutes for every time I had to it, and combine it, that's around 10 hours wasted just for finding the link.

And worse than that is the repetition. As a programmer, you know how horrible it is do the same boring task again and again. And unlike non-programmers, you can't accept the situation and get used to it. You have to automate it, even if it takes hours.

So hey, that's what I did!!

I created a script that would run in the background, and open the class link in the browser 5 minutes before the class started. Just like that!!

# In comes Deno

![Hold up a minute meme](../../static/media/golang-as-javascripter--hold-up.jpg)

If you're like, "Hold up a minute, what's Deno doing an article about Go?", lemme explain.

Deno is platform for JavaScript/typeScript, like NodeJS, with the added benefit of compiling your code into machine level code, or an executable file.

This was perfect for me. I could write code in my favorite language, and convert it over to an executable that I could configure to run on System startup, so I'd never have to run it myself ever again.

![Perfection meme from X Men](../../static/media/golang-as-javascripter--xmen-perfection-meme.jpg)

Only it wasn't perfect 🤐🤐.

The code itself was amazingly easy to write. I completed it in 3 hours, because I was so familiar with TypeScript.

But where the issue was while compiling the code into an executable.

The executable's size was <mark>56 MB</mark> for windows, and as high as <mark>90MB</mark> for MacOS M1.

56Mb isn't a lot for me. Even 90 MB is nothing. But it kept nagging at me. I try to keep the sizes of apps/websites as low as I can, and 56MB felt just way too big for that.

And not only that. Because I had made this project public(Here it is: [github.com/PuruVJ/auto-class-launcher-deno]) and usable for everyone, my batchmates tried to use it, and well, 60-90Mb was way too big for them, due to limited internet and all.

So I got a good excuse to re-write it.

Node was out of question because any script in it would require NodeJS to be installed on the system and overall a more complicated process.

I turned towards Rust! I had been jumping to learn Rust for quite some time, cuz of its performance and modernity and all that stuff.

But oh boy, Rust was hard. Extremely hard!! I gave up after a few hours.

Then, I finally turned towards Go!!

I sat down at night to make it. I created the project, initialized the Go
