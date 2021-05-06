---
title: My First Blog post
description: My very first blog post on my very first functional site
date: 31 May, 2020
---

Hi I am Puru. This is my very first blog post. THE VERY FIRST.

I will be writing all kinds of technical stuff here. Primarily to increase my own understanding of concepts(Looking at you, Scope and Hoisting), for stuff I found on 40<sup>th</sup> page on google but could not find it again. I will also write a post about how I made this super fast blog using StencilJS's (The coolest framework you've never heard of) Static site generation to create a fast and SEO friendly blog.

My writing and grammar is quite rusty at present, but no issues. I'll be improving it day by day by posting here something.

![](../../static/media/dumbledore-pretty-hard.gif)

Wait Wait Wait. Let me check if my code highlighting is working.

```tsx
import { Component, h } from "@stencil/core";

@Component({
  tag: "app-root",
  styleUrl: "app-root.scss",
  scoped: true,
})
export class AppRoot {
  render() {
    return [
      <app-nav />,
      <main>
        <stencil-router>
          <stencil-route-switch scrollTopOffset={0}>
            <stencil-route url="/" component="app-home" exact={true} />
            <stencil-route
              url={["/blog", "/blog/"]}
              component="blogs-overview"
              exact={true}
            />
            <stencil-route url="/blog/:id" component="blog-page" />
          </stencil-route-switch>
        </stencil-router>
      </main>,
    ];
  }
}
```

Signing off!
