---
title: StencilJS Route Change events - Without any dependencies
description: How to detect route changes in StencilJS Router using the core StencilJS APIs. No dependencies.
date: 3 June, 2020 01:46
---

Hey Stencil user! Are you using the official [StencilJS Router](https://github.com/ionic-team/stencil-router/wiki) and can't find how to detect route change events? Don't worry, my friend! You will find all the answers here.

So, is there an `onRouteChange` event somewhere? Or something like `router.subscribe`?

Nope. Its much simpler. Much much simpler, but for some reason, its not documented in the official Wiki (As of the time of writing), resulting in people using the <a href="https://ionicframework.com/docs/api/router" target="_blank" rel="noopener">`ion-router`</a> instead, where everything is very very well documented.

I myself had to port an application from Stencil Router to Ion router just because of this very reason, and it was a total pain.

But after some searching and experimenting, I figured it out (No not time travel, I ain't Tony Stark). And it was staring me in the face. It was that simple. Its built right into the very core of Stencil's architechture.

# Solution

So here's your typical Stencil component.

```tsx
import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "my-first-component",
})
export class MyComponent {
  @Prop() name: string;

  render() {
    return <p>My name is {this.name}</p>;
  }
}
```

This becomes

```tsx
import { Component, Prop, h, Watch } from "@stencil/core";
import { LocationSegments, injectHistory } from "@stencil/router";

@Component({
  tag: "my-first-component",
})
export class MyComponent {
  @Prop() name: string;

  /**
   * Remember, this should be `location only`
   */
  @Prop() location: LocationSegments;

  /**
   * Now watch for any changes to the location property
   */
  @Watch("location") onRouteChange(newRoute, oldRoute) {
    // Do some epic shit
    // Like changing document title or
    // Route animations. Its your choice.
  }

  render() {
    return <p>My name is {this.name}</p>;
  }
}
```

**STOP!! It will still not work.**

Yup this code will still not work. Let me explain why:

The important bit here is the `location` prop. Think about it. Its a **Prop**. You pass a value to it. But here, nothing really is passing any value to our component here. Stencil certainly ain't.

So, the solution is to have _something_ pass a value to the `location` prop. Notice the `injectHistory` method we have imported but not used anywhere. Now's the time to use it. Just add this line at the very end of your file

```javascript
injectHistory(MyComponent);
```

`MyComponent` is the name of the class declared above.

So the final code becomes:

```tsx
import { Component, Prop, h, Watch } from "@stencil/core";
import { LocationSegments, injectHistory } from "@stencil/router";

@Component({
  tag: "my-first-component",
})
export class MyComponent {
  @Prop() name: string;

  /**
   * Remember, this should be `location only`
   */
  @Prop() location: LocationSegments;

  /**
   * Now watch for any changes to the location property
   */
  @Watch("location") onRouteChange(newRoute, oldRoute) {
    // Do some epic shit
    // Like changing document title or
    // Route animations. Its your choice.
  }

  render() {
    return <p>My name is {this.name}</p>;
  }
}

injectHistory(MyComponent);
```

Here. Hope it helps. If you still run into issues, just ping me on Twitter. The link is in the footer.

Goodbye and Enjoy!
