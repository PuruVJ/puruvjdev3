---
title: Pitfalls when using Stencil Helmet during Prerendering
description: Stencil Helmet can break the whole app really bad on some occasions, some so random that you might never find out why
date: 2 Jun, 2020 2:24
---

I assume that if you're here, you already know a little about [StencilJS](https://stenciljs.com), if not, check out this super awesome framework.

# Back story
When I was building this blog, I was trying to use [Stencil Helmet](https://www.npmjs.com/package/@stencil/helmet) to dynamically add some tags to the `<head>` tag, and these dynamic tags would show up in prerendered pages. You can even confirm their existence right now, by pressing `Ctrl+U` key combo or by manually typing `view-source:` behind the actual URL.

```html
view-source:https://puruvjdev.now.sh
```

So, what happened was, I made some changes in my code, and my application stopped prerendering. Just like that. **It wasn't prerendering**.

This wasn't acceptable. Prerendering is absolutely necessary to make a fast and SEO friendly site.

So I dug deep into my git commits, and BAM! There was the culprit, hiding right in the **`index.html`** file on the 3rd line. The glorious.....
```html
<title>Something</title>
```

Or rather, the absence of it. You see, I had deleted the `title` tag, so I could handle dynamic title management in my components.

# The solution
Always keep the `title` tag in your `index.html`.

I just added in the `title` tag and everything started working.

Hope you got something out of this post.

Signing off!