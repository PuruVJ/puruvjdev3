---
title: Get the most out of CSS Modules with TypeScript in 5 minutes
description: If you're a TypeScript Dev, here are a few things you can do to get that sweet, sweet CSS class intellisense
date: 14 May, 2021
---

Are you a TypeScript user, who's using CSS modules and ever ran into this little problem where you type `styles.` and expect the list of classes to show up in your VSCode intellisense, but it doesn't?

After going through this article, you'll have this super sweet intellisense like shown below 👇

![Demo of CSS Modules autocompletion](../assets/media/css-modules-typescript-intellisense--intellisense-demo.gif)

And the fun part is, you won't need to install any VSCode extensions for this.

# Prerequisites

1. **VSCode** - VSCode has TypeScript built in, which is what's gonna make this feature work. Not sure about Vim or Sublime though, if they'll support this 😅

2. **Locally installed TypeScript** - There must be TypeScript locally installed and present in your `package.json` (Preferably the latest version 😁)

3. **Grit and Debugging skills 😉** - Well, it is a prerequisite for writing every single line of code as a dev, donchya agree?

# The Best Way

This is the best and most optimal method here. It is really fast, feels native, as if TypeScript itself knows about your CSS Modules, and doesn't clutter your workspace with `d.ts` files. It just works!!

And the best part: Because it's just an npm package, and because the tsconfig is there, anyone else(team member/collaborator) will have the same experience as you out of the box, without any config. No need for them to download any extension, just the plain old `npm install` will do it for them.

Magic!!!

![Magic](../assets/media/css-modules-typescript-intellisense--magic.gif)

Here's how to set it up 👇

## <mark>npm install typescript-plugin-css-modules</mark>

Install this little npm package, preferably as a `devDependency` (-D).

```sh
npm i --save-dev typescript-plugin-css-modules

# Or if you're a yarn person

yarn add --save-dev typescript-plugin-css-modules
```

> And yeah, in case you were wondering, TypeScript does have its own plugin architecture. Heck, I myself found it only a month back, [when I moved a project of mine to CSS Modules from Styled Components](https://puruvj.dev/blog/move-to-css-modules-from-styled-components) 😅.

## Add to tsconfig.json

Open up your `tsconfig.json`, and add to the `compilerOptions` property this one liner:

```json
"plugins": [{ "name": "typescript-plugin-css-modules" }]
```

## Set VSCode TypeScript version

This one is superrrrrr important. The TypeScript version your VSCode uses should be the local version(The one installed in your project locally), otherwise this whole song and dance of installing plugins and setting config will be worthless.

Open a `.ts` or `.tsx` file in VSCode, On bottom left you'll see this little option 👇

![TypeScript version number in VSCode](../assets/media/css-modules-typescript-intellisense--typescript-version-photo-1.png)

This is your TypeScript version. Click on it, and a list popup will open on the very top 👇

![The list popup](../assets/media/css-modules-typescript-intellisense--typescript-version-photo-2.png)

Click on <mark>Select TypeScript Version</mark>. That will show these options 👇

![Version choosing list](../assets/media/css-modules-typescript-intellisense--typescript-version-photo-3.png)

As you can see, I have <mark>Use VS Code's Version</mark> selected(Look at the white dot before). Click on <mark>Use Workspace Version</mark>, and you are all set.

And here's your setup. In less than 5 minutes. Super simple, right?

Enjoy the amazing DX 😀.

> Oh, and in case you were wondering, it works perfectly with Sass too 😉

# Honorable Mentions

Here are some more methods that are... OK, I guess 😅. I used these, and they weren't as good as the technique above.

## VSCode extension

So, there are a few VSCode extensions out there that provide similar level of intellisense. Notice I used the word **similar**, not same, because

1. They were a little slower - They slowed down VSCode a little bit. On my fast laptop, it negligible, but on my other older laptop, it was noticeably slow.

2. Choppy Intellisense - The intellisense wasn't always accurate, and sometimes had some noise in it like units(`9px`, `3rem`) when you typed `styles.`, which was definitely a bit weird.

3. I dislike extensions - I am an extreme minimalist. My hunger to reduce things and have only the things **necessary** is super big. I only have 7 VSCode extensions, and only 2-3 are enabled for each workspace at a time. I worked on a super old and slow computer for 4 years, so it's habit to keep these 3rd party things as low as possible(even though I'm on a super fast one now 😅)

But still, this extension is good enough if you can't get <mark>The Best Method</mark> above working.

Oh, and as for the **extension** itself, I won't drop a link. There are so many coming out and some are better, some aren't, and its in constant flux. It's recommended to just do a search. The keywords: <mark>CSS Modules</mark> should give good results.

## `typings-for-css-modules-loader`

This is a <mark>Webpack</mark>-only loader. This will do the trick too.

As I have no experience in Webpack, I can't explain the usage. I recommend you to check out the documentation @ [NPM](https://www.npmjs.com/package/typings-for-css-modules-loader)

## The CLI

There's a CLI out there that will generate `d.ts` files for your CSS modules. Check it out here: [typed-css-modules](https://github.com/Quramy/typed-css-modules).

It has a watch mode, so you won't have to run it again everytime you edit your CSS files. Thats handy.

Though OFC, it only works on plain CSS files, not `SCSS` or `SASS` or `STYL`. Plus there's that hiccup of remembering to run this command in a parallel terminal, or using a script to turn it on automatically along with your Web server.

### For Sass

Its again a CLI and inspired from `typed-css-modules` CLI: [typed-scss-modules](https://github.com/skovy/typed-scss-modules). Its a really good tool.

> This approach is good, but the biggest drawback I see is the d.ts files generated. it sort off clutters your workspace and Git commits.

## Manually

The last method is manually adding in the typings yourselves.

God forbid if you have to resort to this! 😱😱

It involves making a `d.ts` file next to your CSS modules file, and defining modules and putting in the class names yourselves. Its a really bad method. If you add a class to you CSS module, you have to add it to the `d.ts` too. If you change something, and the project is too big, you're basically screwed, cuz you won't remember to change it in the d.ts most probably.

# Conclusion

I hope you found this article to be helpful. Turning on intellisense for CSS modules has been a total gamechanger for me in terms of how my component and the CSS interact.

Signing off!
