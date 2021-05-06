---
title: Blogging with Markdown
date: 28 June, 2020 9:50
description: In this post, I delve into the details of how I built the blogging with markdown system
cover_image: media/writing-pen-paper.jpg
published: true
series: "How I created my personal site"
---

![](../../static/media/writing-pen-paper.jpg)

{{ series-links }}

Hi! In this 2<sup>nd</sup> part of the series, I will expose the secret ingredient of what makes this blog work.

# Problem

The problem was figuring out how to write the blog. Do I create a Rich-text Editor for myself first, and then copy-paste the generated HTML into every html page manually? No! Definitely No!

This left me with only one other way. <mark>Markdown</mark>.

This seemed the perfect way. Write stuff in markdown, process it and convert it into html and just fetch that html when called for in the blog page.

But how do I store the metadata like title, date published, description or the cover image for social media?

After some researching, I reached the complete answer.

# Solution

Final solution was: Write content in markdown files, and store the metadata in those files only. Then extract all the relevant part, render to html the main content, and store the final data in a JSON files.

Whoa Whoa. Wait up! That was quite fast. Lemme break it down.

A typical markdown file would look like this:

```markdown
## Hello

# Heading one

I have no idea what **_I am doing here_**.
What are any of us doing here anyway 🤔?
```

Now we'll adding metadata as **Frontmatter**. Frontmatter is a metadata storing approach Jekyll came up with. Here you store all your metadata on the top of the file. Like this:

```markdown
---
title: "The title"
description: "the description"
---
```

So our markdown file becomes:

```markdown
---
title: "The title"
description: "the description"
---

## Hello

# Heading one

I have no idea what **_I am doing here_**.
What are any of us doing here anyway 🤔?
```

Looks nice. But how do we process this data(aka convert it to html and store the metadata away)

# Processing the data

So let's assume we have written a full fledged blog post with all the metadata on top. How do we get it from `markdown` to a visual blog page viewable in a browser?

For that we're going to use 2 NPM Packages.

- [front-matter](https://www.npmjs.com/package/front-matter) for gathering the metadata.

- [markdown-it](https://www.npmjs.com/package/markdown-it) for rendering markdown content into html.

## front-matter

`front-matter` takes in markdown content, tears it apart, and return an object:

```javascript
{
  attributes: {
    ...
  },
  body: {
    "..."
  }
}
```

`attributes` is a key-value pair of all metadata keys to their values.

`body` is the main content you wrote in your markdown, just below the metadata. Note that `body` isn't rendered to html yet. We still need to do that

For example:

Markdown code:

```markdown
---
title: Krrish
description: Krishna Mehra leaves on a journey to find his father.
year_released: 2006
---

Krrish is a very captivating **superhero**.
```

will become

```javascript
{
  attributes: {
    title: 'Krrish',
    description: 'Krishna Mehra leaves on a journey to find his father.',
    year_released: 2006
  },
  body: 'Krrish is a very captivating **superhero**.'
}
```

Notice how all the metadata got beautifully condensed into an object, which we can use in any way.

And the `body` is the part below the front matter, just completely unchanged.

## markdown-it

Now we can use markdown-it to render the `markdown` in `body` to html.

The basic code is this simple:

```javascript
const md = require("markdown-it")();

const result = md.render("# This is a heading");
```

Now we have the rendered html and metadata, we caan simply store these in a JSON file, like this:

```json
{
  "title": "Krrish",
  "description": "Krishna Mehra leaves on a journey to find his father.",
  "year_released": 2006,
  "body": "<p>Krrish is a very captivating <b>superhero</b>.</p>"
}
```

Then in our main Stencil component, we can simply fetch this JSON file, and show its content. Easy Peasy.

BUT WAIT!!!

# It gets messy

Everything is going very smoothly. But we have forgotten one very important thing: <mark>Code Syntax Highlighting!</mark>

There's no developer blog without some cool code syntax highlighting to show off their coding skills. So we need a way to have code syntax highlighting in our blog.

These will come in mind for most people:

- [prismjs](https://www.npmjs.com/package/prismjs)
- [highlight.js](https://www.npmjs.com/package/highlight.js)

These are good libraries. No doubt. They both integrate with `markdown-it` to generate highlighted code at build time only. They just lack one thing: VS Code level consistency.

They both can't highlight code the way VS Code does. If you use VS Code, you know what I'm talking about. Nothing beats VS Code at syntax highlighting. What if there was a way to use VS Code for syntax highlighting ...

Aha! There is a way. Lemme introduce you to the amazing and very underrated, [ShikiJS](https://github.com/octref/shiki).

Take my word, this is the best syntax highlighter there could be. It's syntax highlighting works the same way VS Code's themes work: JSON Config files. Shiki has some beautiful pre-built themes, but if you want your favorite theme, it can do that too. Just pass it the config JSON file of that theme, and you're all set.

The basic code for integrating `shiki` with `markdown-it` is this:

```javascript
const fs = require("fs");
const markdown = require("markdown-it");
const shiki = require("shiki");

shiki
  .getHighlighter({
    theme: "nord",
  })
  .then((highlighter) => {
    const md = markdown({
      html: true,
      highlight: (code, lang) => {
        return highlighter.codeToHtml(code, lang);
      },
    });

    const html = md.render(fs.readFileSync("index.md", "utf-8"));
    const out = `
    <title>Shiki</title>
    <link rel="stylesheet" href="style.css">
    ${html}
    <script src="index.js"></script>
  `;
    fs.writeFileSync("index.html", out);

    console.log("done");
  });
```

I copied the above code from the [main website](https://shiki.matsu.io/), but you can always check it out at my [Github repo](https://github.com/puruvj/puruvjdev).

# Structure

All the mechanics aside, we haven't talked about how I actually structure my blog posts. Here's a simple skeleton structure of the metadata:

- **title**: The title of the blog post (Duh! 🙄)
- **description**: The description of the blog post. This shows up on the blogs overview page as a simple description and in `<meta name="description">` too, for social media sharing
- **date**: The date when the post was written. I put it in manually when I start writing.
- **cover_image**: This isn't the cover image that you looked at, at the top of this very blog post. That's a manual image. It is used for social media cards.
- **published**: If I do some horrible, horrible mistake in my feed and have already published it(aka pushed it to Vercel), I can just set this property as `false`, and it will be removed until I set it to `true` (Or remove it. Works as `true` only)

There is some more dark magic I apply to this blog, but I will get to that in the next post.

{{ series-links }}
