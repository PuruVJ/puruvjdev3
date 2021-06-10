---
title: The power of CSS Modules 💪
description: CSS Modules are extremely powerful. Find out why in this article.
date: 14 June, 2021
---

CSS Modules are one of the best ways of styling in React. We have libraries that people consider better than CSS Modules, but CSS Modules have stood the test of time and are still one of the most universal ways of styling React. They give you superpowers, and are simple enough that even beginners can grasp it.

# Advantages

1. **Scoped** - CSS modules are scoped when you use them the right way.
2. **Highly composable** - You can compose different styles in a lot of ways
3. **Tree shakable** - Styles you don't use are removed, just like modern JS tooling.
4. **Very easy to pick up** - CSS Modules are very easy to understand and takes almost no effort to start using.
5. **It's just CSS!!** - CSS Modules are just CSS that you write with some specific rules in mind. You get the great tooling from your IDE, and IDEs are really good at plain ol' CSS.
6. **PostCSS tooling just works** - Because CSS Modules are just CSS, all of your PostCSS tooling will work flawlessly.

# Prerequisites

- Basic knowledge of CSS.
- Have worked with React before.
- Hungry to learn 😋.

So we have seen the advantages and why you should learn CSS Modules. Now let's actually look at the syntax

# The syntax

Let's build a little Card component.

This will be our directory structure 👇

```txt
|- Card.jsx
|- Card.module.css
```

Notice we're naming our CSS file a `*.module.css`. This is a convention that is good to follow, and in a lot of build tools, is actually necessary, if you want the file to be processed as a CSS Module file.

Now let's look at the CSS file.

```css
/* Card.module.scss */

.container {
}

.avatar {
}

.userInfo {
}

.userName {
}

.userStatus {
}
```

Your CSS naming sense might be going off looking at the `.userInfo` and `.userName`. Shouldn't they be named `.user-info` and `.user-name`? Isn't that the main naming convention? Short answer: Yes, we're going off a bit on the tradition and naming things like we name things in JS. Bear with me, the reason will be clear in a while.

And how to use this CSS Module file in your react component?

Look at this 👇

```js
import './Card.module.scss';

export const Card = () => {
  return (
    <section className="container">
      <img className="avatar" src="..." />
      <div className="userInfo">
        <div className="userName">...</div>
        <div className="userStatus">...</div>
      </div>
    </section>
  );
};
```

This looks good! This is how we generally style our components in React, just import the CSS file as a module and it's included in the bundle.

**Wrong** ❌❌

This not how we use CSS Modules. For the advantages of CSS Modules, we gotta change how we write out `className`s.

Here's how we'd use our CSS Module actually 👇

```js
import css from './Card.module.scss';

export const Card = () => {
  return (
    <section className={css.container}>
      <img className={css.avatar} src="..." />
      <div className={css.userInfo}>
        <div className={css.userName}>...</div>
        <div className={css.userStatus}>...</div>
      </div>
    </section>
  );
};
```

![Wait what!?!?](../assets/media/css-modules--wait-what-kevin-hart.gif)

If you're just wondering what happened here, you're not alone. CSS Modules can feel weird coming from writing plain CSS and referencing the `class` and styles directly.

So, a few observations here:

1. We're importing the CSS Module file as a module using a default import, naming it `css`. You can name it `styles` or `classes` or `confetti`. Totally up to you!

2. Instead of regular static strings, we're using `css.*` values. Its as if the `classes` we defined in the CSS file are actually being exported as variables of an ES Module, kinda like this 👇

```js
export const container = '...';
export const avatar = '...';
export const userInfo = '...';
export const userName = '...';
export const userStatus = '...';
```

This is the reason why we used <mark>Camel Casing</mark> while naming our CSS classes. Because if there was a `dash-` used in the name, using it would be very dirty 👇

```js
import css from './Card.module.scss';

export const Card = () => {
  return (
    <section className={css.container}>
      <img className={css.avatar} src="..." />
      <div className={css['user-info']}>
        <div className={css['user-name']}>...</div>
        <div className={css['userStatus']}>...</div>
      </div>
    </section>
  );
};
```

See? Not as clean anymore.

## Under the hood

What goes on under the hood is very interesting. Let's have a look at what this file you're importing from becomes 👇

```js
export const container = '_container_bslv0_1';
export const avatar = '_avatar_bslv0_8';
export const userInfo = '_userInfo_bslv0_14';
export const userName = '_userName_bslv0_21';
export const userStatus = '_userStatus_bslv0_40';
export default {
  container: container,
  avatar: avatar,
  userInfo: userInfo,
  userName: userName,
  userStatus: userStatus,
};
```

As you can see, literally variables named the same as our classes are being defined by our build tools, and these variables are being exported separately(using named exports), and as an object in a default export.

As for the contents of these variables, you can see they contain the `classes` we defined, but these classes have some random strings around them. This is where the scoping happens.

Your CSS file's classes are basically mangled, and converted into this 👇

```css
._container_bslv0_1 {
}

._avatar_bslv0_8 {
}

._userInfo_bslv0_14 {
}

._userName_bslv0_21 {
}

._userStatus_bslv0_40 {
}
```

And their names are stored as variables in this JS module that you saw above. This is the complete mechanism of CSS Modules.

Now that we're done with how CSS Modules work and the basic syntax, let's get into the nitty-gritty!

## Using with Pre-processors and PostCSS

CSS Modules work seamlessly with pre-processors like **SASS**, **LESS**, **Stylus**, etc, and also with PostCSS, so any PostCSS config you have will work just fine.

## Gotchas

With everything great, there are some limitations. Here are the things you gotta watch out for.

### No styling the IDs!!

CSS Modules scope only the classes. They don't scope you styling the IDs, or tag names directly, as in, trying this 👇

```css
.someStyleClass {
}

img {
  display: none;
}
```

will mangle the className, thus scoping it, but the style applied to `img` there won't be scoped, rather it would be global, and hence, all the `img`s in your app will have `display: none` applied to them, which if you ask me, is nothing short of a disaster 😅

However, you can achieve this behavior by putting the img as a descendent of the root element in the component. In simple words, this 👇

```css
.container {
}

.container img {
  display: none;
}
```

`.container` class would mangled and scoped, so ultimately, your `img`'s styling will be applied only in this component, nowhere else!

Same with styling `Id`s 👇

```css
.container {
}

.container #image {
  display: none;
}
```

# The delicious parts 😋

CSS Modules come with some very tasty stuff. They don't just offer scoping, but so much more. Here are some of them.

## :global

Sometimes, you need to opt out of scoping for some specific styles. Let's take for example, applying special style when body has a specific class

```css
.header {
  color: green;
}

body.dark .header {
  color: blue;
}
```

This works pretty well, you don't need any globalising here. But say, you're using SCSS, and your `.header` is nested in another selectors 👇

```scss
.container {
  .someRandomDiv {
    .header {
      color: green;
    }

    body.dark .header {
      color: blue;
    }
  }
}
```

This won't work, as after SCSS compilation, the code would look something like this 👇

```css
.container .someRandomDiv body.dark .header {
  color: blue;
}
```

As you can clearly see, it expects `body` as a child now, but that simply isn't possible. What we need is body being the top most selector

```css
body.dark .container .someRandomDiv .header {
  color: blue;
}
```

This is what we desire. How to do this?

This is what exactly CSS Modules' `:global` selector is for. We want to make `body.dark` global, and so, we can simply re-write the SCSS code like this 👇

```scss
.container {
  .someRandomDiv {
    .header {
      color: green;
    }

    :global(body.dark) .header {
      color: blue;
    }
  }
}
```

Now This whole selector will be made global, and we'll get the desired output.

## Composing multiple styles together

In CSS Modules, you can basically create a single class, and then compose it within other classes. Here's what I mean 👇

```css
.classA {
  background-color: green;
  color: white;
}

.classB {
  composes: classA;
  color: blue;
}
```

As you can see, `.classB` has a special property `composes`, and its value is `classA`. This is how `composes` works: You pass the class name you want incorporated into your style as the value for `composes`.

And in fact, you're not limited to classes defined in the same file. The class to be composed can come from another CSS file 👇

```css
.classB {
  composes: classA from './classB.css';
  color: blue;
}
```

This syntax looks a little weird, but once you get used to it, there's no going back!

Composition in CSS Modules allow you to build reusable styles, and whole Design Systems. You could build your own [Tailwind](https://tailwindcss.com/) and [Windi](https://windicss.org/)! Quite exciting, right!?!? 😻😻

## Variables

CSS Modules have their own variable system too!!

```css
@value blue: #0c77f8;
@value red: #ff0000;
@value green: #aaf200;

.button {
  color: blue;
  display: inline-block;
}
```

As you can see, there's some trickery going on here!! `red`, `green` and `blue` are colors already defined in browser, but I assume you'll agree with me, that they are horribly ugly!

So here, we're simply redefining these colors for our own purposes. This is some wizardry that SCSS/LESS/CSS variables simply can't achieve, so CSS Modules variables have some serious edge here.

And you can basically import these in other files

```css
/* import your colors... */
@value colors: "./colors.css";
@value blue, red, green from colors;

.button {
  color: blue;
  display: inline-block;
}
```

Super good!!

OFC, these variables aren't live. As in, during compile time, these variables are stripped away and they are replaced with their actual values. So if you are planning on changing some global variables for theme switching purposes, you can't do that, you'll have to go the [CSS variables path](https://blog.logrocket.com/how-to-create-better-themes-with-css-variables-5a3744105c74/) for that!

# Playing nice with TypeScript

CSS Modules are great, but only 1 little issue with them: **VSCode Intellisense**.

First off, if you're using TypeScript, you simply can't do

```js
import css from './Card.module.css';
```

VSCode will yell at you looking at the `.css` at the end. So you'll need to put a fix here.

> Note: If you're using `create-react-app` or Vite's `react` scaffolds, you don't need the steps below, they already have the minimal configuration built-in to allow `.css`, `.scss`, `.less`, `.styl`, etc in `import` statements.

Create a `types.d.ts` in your `src` folder(Or whatever your source folder is), and put in this config 👇

```ts
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.less' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.styl' {
  const classes: { [key: string]: string };
  export default classes;
}
```

As you can see, this will make VSCode interpret your CSS Modules as basically a key value pair. So you'll get no warnings when using `css.*` anywhere, as VSCode knows it returns a string.

But it is not the best experience ever. For example, when type `css.`, you don't get a list of classes you declared. You're basically typing in blind. One typo, and the program breaks, until you look very closely and find the source of the issue.

But there are tricks to get that sweet, sweet, list intellisense and strict name checking, just like this 👇

![CSS Modules intellisense in VSCode](../assets/media/css-modules--intellisense-demo.gif)

See that sweet sweet intellisense? And not only that, even if you do type the name manually, and make a typo, **TypeScript will scream at you** with its red squiggles. This is where strict type checking comes in. If you haven't defined a class, you simply can't use it! And while doing refactoring, deleting some of your CSS, your `.tsx` files will give errors if a class is missing and you have used it, so the editor itself will tell you what needs to be changed, rather than you squinting at every single line of code.

> And the best part: You don't need any VSCode extension for this 🤩

## The best way

This is the best and most optimal method here. It is really fast, feels native, as if TypeScript itself knows about your CSS Modules, and doesn't clutter your workspace with `d.ts` files. It just works!!

And the best part: Because it's just an npm package, and because the tsconfig is there, anyone else(team member/collaborator) will have the same experience as you out of the box, without any config. No need for them to download any extension, just the plain old `npm install` will do it for them.

Magic!!!

Here's how to set it up 👇

### npm install typescript-plugin-css-modules

Install this little npm package, preferably as a `devDependency` (-D).

```sh
npm i --save-dev typescript-plugin-css-modules

# Or if you're a yarn person

yarn add --save-dev typescript-plugin-css-modules
```

> And yeah, in case you were wondering, TypeScript does have its own plugin architecture. Heck, I myself found it very recently, [when I moved a project of mine to CSS Modules from Styled Components 😅](https://puruvj.dev/blog/move-to-css-modules-from-styled-components).

### Add to tsconfig.json

Open up your `tsconfig.json`, and add to the `compilerOptions` property this one liner:

```json
"plugins": [{ "name": "typescript-plugin-css-modules" }]
```

### Set VSCode TypeScript version

This one is superrrrrr important. The TypeScript version your VSCode uses should be the local version(The one installed in your project locally), otherwise this whole song and dance of installing plugins and setting config will be worthless.

Open a `.ts` or `.tsx` file in VSCode, On bottom left you'll see this little option 👇

![TS version in bottom right corner of VSCode](../assets/media/css-modules--typescript-version-photo-1.png)

This is your TypeScript version. Click on it, and a list popup will open on the very top 👇

![Choose TypeScript version](../assets/media/css-modules--typescript-version-photo-2.png)

Click on Select TypeScript Version. That will show these options 👇

![Select Workspace version](../assets/media/css-modules--typescript-version-photo-3.png)

As you can see, I have Use VS Code's Version selected(Look at the white dot before). Click on Use Workspace Version, and you are all set.

And here's your setup. In less than 5 minutes. Super simple, right?

Enjoy the amazing DX 😀.

> Oh, and in case you were wondering, it works perfectly with Sass too 😉

## Honorable Mentions

Here are some more methods that are... OK, I guess 😅. I used these, and they weren't as good as the technique above.

### VSCode extension

So, there are a few VSCode extensions out there that provide similar level of intellisense. Notice I used the word similar, not same, because

1. They were a little slower - They slowed down VSCode a little bit. On my fast laptop, it negligible, but on my other older laptop, it was noticeably slow.

1. Choppy Intellisense - The intellisense wasn't always accurate, and sometimes had some noise in it like units(9px, 3rem) when you typed styles., which was definitely a bit weird.

1. I dislike extensions - I am an extreme minimalist. My hunger to reduce things and have only the things necessary is super big. I only have 7 VSCode extensions, and only 2-3 are enabled for each workspace at a time. I worked on a super old and slow computer for 4 years, so it's habit to keep these 3rd party things as low as possible(even though I'm on a super fast computer one now 😅)

But still, this extension is good enough if you can't get The Best Method above working.

Oh, and as for the extension itself, I won't drop a link. There are so many coming out and some are better, some aren't, and its in constant flux. It's recommended to just do a search. The keywords: CSS Modules should give good results.

### `typings-for-css-modules-loader`

This is a Webpack-only loader. This will do the trick too.

As I have no experience in Webpack, I can't explain the usage. I recommend you to check out the documentation @ [NPM](https://www.npmjs.com/package/typings-for-css-modules-loader)

#### The CLI

There's a CLI out there that will generate `d.ts` files for your CSS modules. Check it out here: [typed-css-modules](https://github.com/Quramy/typed-css-modules).

It has a watch mode, so you won't have to run it again everytime you edit your CSS files. Thats handy.

Though OFC, it only works on plain CSS files, not `SCSS` or `SASS` or `STYL`. Plus there's that hiccup of remembering to run this command in a parallel terminal, or using a script to turn it on automatically along with your Web server.

#### For Sass

Its again a CLI and inspired from `typed-css-modules` CLI: [typed-scss-modules](https://github.com/skovy/typed-scss-modules). Its a really good tool.

> This approach is good, but the biggest drawback I see is the d.ts files generated. it sort off clutters your workspace and Git commits.

### Manually

The last method is manually adding in the typings yourselves.

God forbid if you have to resort to this! 😱😱

It involves making a `d.ts` file next to your CSS modules file, and defining modules and putting in the class names yourselves. Its a really bad method. If you add a class to you CSS module, you have to add it to the `d.ts` too. If you change something, and the project is too big, you're basically screwed, cuz you won't remember to change it in the d.ts most probably.

# Bonus material

As CSS Modules rely on using the `css.*` pattern, composing multiple classes becomes painful, as you have to do this:

```js
<div className={`${css.classA} ${css.classB} ${css.classC}`} />
```

It looks a little ugly, but it's still manageable. But once you try to have conditional classes here, things go off the rails

```js
<div className={`${css.classA} ${condition1 ? css.classB : ''} ${condition2 ? css.classC : ''}`} />
```

Ewww!! That's ugly as hell. 😖😖

The ternary hell here is pretty bad. We have to render an empty string manually if the condition is false. If we did just `condition1 && css.classB`, it would've been pretty clean and legible, but if the condition is false, it would output a `null` in the `className`. Pretty sure no one will style `null` class, but as a rule, let's not have the `null` in our classes at all.

So, to make this cleaner, we can use the `clsx` library. It's a small 228B library that makes dealing with class composition much easier!

Using it, the code above becomes super clean 👇

```js
import clsx from 'clsx';

// Later in the component
<div className={clsx(css.classA, condition1 && css.classB, condition2 && css.classC)} />;
```

Now its much more cleaner, literally no noise now. Really good. And that's not all the ways of using this library. You can pass an object to it 👇

```js
<div
  className={clsx({
    [css.classA]: true,
    [css.classB]: condition1,
    [css.classC]: condition2,
  })}
/>
```

This is another way!

`clsx` is a very very versatile library, and any time I jump onto a new React/Preact package, I always install it in the very beginning, even if I don't use it very much. It being <mark>228 Bytes</mark> doesn't really make this a regret, as far as bundle size is concerned.

# Conclusion

I hope you find this article helpful. CSS Modules are truly amazing, once you start using, you'll fall in love with them
