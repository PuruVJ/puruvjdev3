---
title: Trying Golang as a JavaScript lover
description: I have written JavaScript, TypeScript, Dart, Python, PHP, C, C++, but never tried golang before. Here is my first hand experience trying it out
date: 15 Aug, 2021
cover_image: media/golang-as-javascripter--cover-image.jpg
series: 'Go for JavaScript developers'
---

![Peaceful Tibetan Monastery](../../static/media/golang-as-javascripter--cover-image.jpg)

{{ series-links }}

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

> Spoiler: I am the lazy undergraduate in question 😄.

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

![Perfection meme from X Men](../../static/media/golang-as-javascripter--xmen-perfection-meme.gif)

Only it wasn't perfect 🤐🤐

The code itself was amazingly easy to write. I completed it in 3 hours, because I was so familiar with TypeScript.

But where the issue was while compiling the code into an executable.

The executable's size was <mark>56 MB</mark> for windows, and as high as <mark>90MB</mark> for MacOS M1.

56MB isn't a lot for me. Even 90 MB is nothing. But it kept nagging at me. I try to keep the sizes of apps/websites as low as I can, and 56MB felt just way too big for that.

And not only that. Because I had made this project public(Here it is: [PuruVJ/auto-class-launcher-deno](https://github.com/PuruVJ/auto-class-launcher-deno)) and usable for everyone, my batchmates tried to use it, and well, 60-90Mb was way too big for them, due to limited internet and all.

So I got a good excuse to re-write it.

Node was out of question because any script in it would require NodeJS to be installed on the system and overall a more complicated process.

I turned towards Rust! I had been jumping to learn Rust for quite some time, cuz of its performance and modernity and all that stuff.

But oh boy, Rust was hard. Extremely hard!! I gave up after a few hours.

Then, I finally turned towards Go!!

# Learning Go

I sat down at night to make it. I created the project, initialized the Go boilerplate(which is just a `go.mod` file and a `main.go` with 4 lines of code), **then** I opened up the Go Tutorial.

Yeah, this might seem strange to you. Initialize a project, and **then** start learning that thing? Why would you do that??

Well, I'm a huge proponent of <mark>Learning by Doing</mark>, where you learn the bare minimum upfront, and the rest you learn by trying to make a small project in it. It makes you learn the thing the hard way, but really fast, without wasting any time on trivialities.

In case of Go, though, I didn't need anything upfront, cuz I had seen the syntax before a bit and it looked simple enough to me.

> Spoiler: Learning by Doing really works, I learnt basic Go in 3-4 hours only 😉

# Observations about migrating

This folks is the part you came to read about actually!! Read on!!

So I migrated the whole app to Go, completely bug free, in 1 day.

And here's my observations, as an avid JavaScripter learning Go for the very first time!!

## It isn't much different!!

Really, that's the first point I noticed about it. It isn't much different from JavaScript. There are variables, functions, if, else, for, switch blocks, Error handling system and what not.

That is the main point of Go, really!! It combines all the knowledge of 60 years of programming into a very simple language which doesn't invent a lot of new stuff. Rather, it focuses on problems that aren't even code related(directly), and fixes other problems, like feature creep, standard formatting, Goroutines and stuff that isn't answered well enough in a majority of languages to the day.

OFC, it depends on how comfortable you're with programming languages, generally, but if you're very comfortable with TypeScript or Dart or any other statically typed language, you'll feel right at home with Go.

But even then, it isn't necessary to know a Statically typed language before, as Go will infer as much of the types as it can without you needing to tell it much.

## Variables are Pythonic, but not quite...

Here's how JavaScript variables are defined.

```js
// Declare variable
let someVal;
someVal = 'hello';

// Set it to something later on
someVal = 'world';
```

If you wanna do it explicitly in TypeScript,

```ts
let someVal: string;
someVal = 'hello';

// Set it to something later on
someVal = 'world';
```

OFC, TypeScript is intelligent and you don't always need to specify types for a variable.

As you can see, it's **extremely clear** where this variable is defined. You are scrolling through a file, there's the big `const` and `let` glaring right at you. The source is extremely clear.

Now let's come to Python.

The above example of declaring a variable here 👇

```py
someVal = 'hello'

# Set it to something later on
someVal = 'world'
```

Can you the declaration part and the part where we set it's value to something, later on in the program? There's no difference. No way to know where this variable was defined.

It's irritating in my opinion. There needs to be some distinction between the two!!

Now, why I talk about Python variables? Cuz Golang variables, in their simplest form, are very much like Python variables, but they have one extra character that prevents the confusion that Python variables introduce. That character is `:`

```go
someVal := "hello"

// Set it to something later on
someVal = "Hello"
```

1st time, I'm declaring the variable using the `:=` operator. But when setting its value later in the program, I use the regular `=` operator.

This is a small thing, but it makes a huge difference!! I even actually prefer it over JavaScript's `let` variable declaration. It is cleaner, but not **so clean** it sacrifices developer ergonomics.

And if you prefer a more verbose way, that's there too

```go
var someVal string = "hello"
```

Just like JavaScript's `var someVal = "hello"`, but here the data type is necessary. If you're a TypeScripter, you'll feel right at home here.

And ofc, you also have `const` in go, and its declaration is the exact same as doing it in JavaScript

```go
const someVal = "hello"
```

I really love the fact that Go goes the extra length to keep the code clean, but doesn't shy away from providing the standard, more verbose APIs when they're needed. It's the best of both worlds.

## Type System

Go's Type system is similar to the type system of TypeScript, where most of the time, you don't even need to specify types for your variables.

In TypeScript, this below:

```ts
const x = 'hello';
```

is inferred as `string` automatically. Same with number or boolean or just anything.

Go works like this too!!

```go
x := "hello"
```

is inferred as `string`. Works similar to TypeScript!!

This kind of type system is personally my favorite!! Having too much type information makes the code hard to scan, in my opinion!

Having types only where absolutely needed is the way I roll, and I am glad Go has that same philosophy 🤩

OFC, there was one place where I found Go's system to be less convenient.

You see, in the project, I input the timetable and link information from an external `.json` file. That JSON file has the following TypeScript structure 👇

```ts
type ClassConfig = {
  link?: string;
  times: {
    day: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
    time: string;
  }[];
}[];
```

As you can see, I have an object type inside the main object type. If you're a TypeScript developer, you wouldn't even think about it twice.

But in Golang, you can't define a type with a struct inside struct 🤐

So I had to do this

```go
type ClassTime struct {
	Day  string `json:"day,omitempty"`
	Time string `json:"time,omitempty"`
}

type Class struct {
	Link  string      `json:"link,omitempty"`
	Times []ClassTime `json:"times"`
}

type ClassConfig map[string]Class
```

So yeah, had to declare 2 more types to get the TypeScript behavior 🥲. But here's the added benefit of the types not being in sync

> Those tags in structs are a way to tell go to expect this data to be a json field, and don't include a field if it is not there in the JSON itself.

## Standard library is the 🧑‍🍳😘

> Bonus points if you can figure out the heading fully 😜

## go:embed is DOPE!! 🤯🤯

## No .map .filter .every 😭

## Heartsick for the +
