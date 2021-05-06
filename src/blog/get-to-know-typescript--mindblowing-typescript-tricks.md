---
title: Mindblowing 🤯 TypeScript tricks
description: There's a lot about TypeScript that most people don't know. I'll surface some of the "unknown" stuff in this blog post.
date: 19 Mar, 2021
cover_image: media/mindblowing-typescript-tricks--cover.jpg
series: 'Get to know TypeScript'
---

![Colorful](../../static/media/mindblowing-typescript-tricks--cover.jpg)

{{ series-links }}

Apologies for the clickbaity title 🙃. But it is in good faith, cuz I'm gonna introduce you to some TypeScript related tricks that are bound to blow your mind to pieces. And if you can read the whole post without feeling wonder at any trick, great for you!! You're TypeScript pro already 🥳

So let's cut to the chase.

# A little note...

The level of this article is **Advanced**. You may not understand how things work. However, you don't have to. You only have to copy paste the snippet, and understand how to use it, as these will make your life easy, and overtime, you'll get the know-how of how these actually work.

# In-built types 🥱

These are some of the built-in helper types in TypeScript. I'll keep this section short, as you can read about these anywhere. A good starting point would be [TypeScript Docs](https://www.typescriptlang.org/docs/handbook/utility-types.html) Then we'll get to the juicy stuff 😋

## Pick

It allows to pick specific fields from a type/interface, along with their types and create a brand new type. Let's take a look at this 👇

```ts
type UserFields = {
  id: number;
  name: string;
  gender: 'male' | 'female' | 'non-binary' | 'prefer-not-to-say';
  dob: Date;
};

type NameAndGenderOnly = Pick<UserFields, 'name' | 'gender'>;

// This is equal to 👇
type NameAndGenderOnly = {
  name: string;
  gender: 'male' | 'female' | 'non-binary' | 'prefer-not-to-say';
};
```

See!?! The same types, without any duplication.

## Partial

This is the most used type of mine. If you have a type/interface, and for some reason, you wanna make **all** its fields optional, this is it 👇

```ts
type UserFields = {
  id: number;
  name: string;
  gender: 'male' | 'female' | 'non-binary' | 'prefer-not-to-say';
  dob: Date;
};

type OptionalUserFields = Partial<UserFields>;

// This is equal to 👇
type OptionalUserFields = {
  id?: number;
  name?: string;
  gender?: 'male' | 'female' | 'non-binary' | 'prefer-not-to-say';
  dob?: Date;
};
```

## Readonly

This is very useful, when you wanna make sure that an object's properties can't be changed in your code. Think of it as a `const` for your object properties.

```ts
type UserFields = {
  id: number;
  name: string;
  gender: 'male' | 'female' | 'non-binary' | 'prefer-not-to-say';
  dob: Date;
};

const userData: Readonly<UserFields> = {
  id: 100,
  name: 'Puru Vijay',
  gender: 'male',
  dob: new Date('12 Nov, 2001'),
};
```

Trying to modify any property like `userData.name = 'Hoolalala'` will result in error.

## Record

Now we are getting to the good stuff. I've had a new-found respect for `Record` recently, while working on my current project [macos.now.sh](https://macos.now.sh) (**Shameless Plug**, It's basically a macOS Big Sur clone written in Preact and Vite).

Take a look at this 👇

```ts
export type AppName =
  | 'finder'
  | 'launchpad'
  | 'safari'
  | 'messages'
  | 'mail'
  | 'maps'
  | 'photos'
  | 'facetime'
  | 'calendar';

/** Which apps are currently open */
export const openApps: Record<AppName, boolean> = {
  finder: false,
  launchpad: false,
  safari: false,
  messages: false,
  mail: false,
  maps: false,
  photos: false,
  facetime: false,
  calendar: false,
};
```

As you can see, this is just a simple key-value pair. But I wanted to enforce that this object contains all the apps listed in the `AppName` union type, and that all the values are boolean only. I also wanted to be presented with an error if I add a new app to the list, which would make me add that app's key value pair to this `openApps` object.

This is where `Record` comes in. It's simply a way to enforce the types of the keys as well as values. Another layer of safety that TypeScript adds.

# Juicy stuff 😋

Now the fun part begins.

## Retrieve element type from Array

Suppose you have an Array, and you wanna extract the type of each Element from an array

```ts
type ArrayElement<
  ArrayType extends readonly unknown[]
> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
```

We're using TypeScript's `infer` here, which helps pick out specific types from a complex type.

Here's how to use it:

```ts
type A = ArrayElement<string[]>; // string
type B = ArrayElement<readonly string[]>; // string
type C = ArrayElement<[string, number]>; // string | number
type D = ArrayElement<['foo', 'bar']>; // "foo" | "bar"
type E = ArrayElement<(P | Q | R)[]>; // P | Q | R

type Error1 = ArrayElement<{ name: string }>;
//                         ^^^^^^^^^^^^^^^^
// Error: Type '{ name: string; }' does not satisfy the constraint 'readonly unknown[]'.
```

There's a bit simpler version to get the element type.

```ts
type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType[number];
```

## Retrieve type from a promise

Ever wanted to retrieve type from a function that returns a promise? You might've tried this:

```ts
function returnsPromise(): Promise<number>;

let num: typeof returnsPromise;
//       ^^^^^^^^^^^^^^^^^^^^^
// num: () => Promise<number>
```

We want `num`'s type to be the returned type of the promise(in this case `number`), and the above solution definitely didn't work.

The solution is to once again use `infer` to retrieve the type from the promise:

```ts
type UnwrapPromise<T> = T extends (props: any) => PromiseLike<infer U>
  ? U
  : T extends PromiseLike<infer K>
  ? K
  : T;
```

usage:

```ts
function returnsPromise(props: any) {
  return Promise.resolve(6);
}

const num: UnwrapPromise<typeof returnsPromise> = 8;
//    num: number
```

Here we wrapped a function that returns a promise into this type. This works directly with a regular `Promise<unknown>` type too.

> **Why `PromiseLike` instead of `Promise`?** \
> <br/>
>
> `Promise` interface comes with lot of pre-built methods exclusive to promises. But sometimes, you wanna create functions that return a `.then` just like Promises, but not have all the properties that `Promise`s do. In that case, we use `PromiseLike`

Aside: You could rename `UnwrapPromise` to be `BreakPromise`. Doesn't affect the code, but its good for laughs 🤣🤣

## Turning a tuple into union types

This is a tuple:

```ts
const alphabets = ['a', 'b', 'c', 'd'] as const;
```

> Note: Without `as const` at the end, typescript will interpret the type as `string[]`, not as a tuple

Now we want to use these specific strings as union types. Easy peasy.

```ts
type Alphabet = 'a' | 'b' | 'c' | 'd';
```

This will do. But let's assume that this type and the array above are gonna end up in different files, and the project grows quite big, then you come back a few months later, and add another value `e` to the `alphabets` variable, and BOOM!!! The whole codebase breaks, because you forgot to add `e` in the `Alphabet` union type.

We can automate the `Alphabet` union type generation, in such a way that it pulls its members directly from `alphabets` variable.

```ts
type Alphabet = typeof alphabets[number];
```

And here's the universal type safe helper:

```ts
type UnionFromTuple<Tuple extends readonly (string | number | boolean)[]> = Tuple[number];
```

Usage:

```ts
const alphabets = ['a', 'b', 'c', 'd'] as const;

type Alphabet = UnionFromTuple<typeof alphabets>;
//  type Alphabet = 'a' | 'b' | 'c' | 'd'
```

> **Why `readonly array`?** \
> \
> This section is about Tuple to Union types, but in the code itself we haven't used the word `tuple`. The reason is that tuple isn't a keyword. As far as TypeScript is concerned, a `readonly Array` is a tuple. There's no `Tuple` type or anything. That's why I'm making sure the type passed to `UnionFromTuple` is a tuple, not an array. If its an array, its basically the same as the section above where we retrieved the element type from an array

## Union types from object

Let's say we have this object:

```ts
const openApps = {
  finder: false,
  launchpad: false,
  safari: false,
  messages: false,
  mail: false,
  maps: false,
  photos: false,
  facetime: false,
  calendar: false,
};
```

And I want to create a union type that's based on the keys specified here. If I add an extra key-value pair to this object, I want the union type to include that too.

Here's the solution:

```ts
type KeysOfObject<T extends { [K in string | number]: unknown }> = keyof T;
```

Usage👇

```ts
type App = KeysOfObject<typeof openApps>;
```

This will be equal to 👇

```ts
type App =
  | 'finder'
  | 'launchpad'
  | 'safari'
  | 'messages'
  | 'mail'
  | 'maps'
  | 'photos'
  | 'facetime'
  | 'calendar';
```

## A better Object.Keys

Looking the article, it seems like its a compilation of Helper Types, which is the case. But in this one, I'm gonna share a tip which isn't the most mind-blowing or the coolest. Its pretty boring, but the important thing is that it's the most MOST useful tip in this whole article. If you have to take something away from this article, take this. Ignore the whole article except for this part.

Let's look the object from before:

```ts
const openApps = {
  finder: false,
  launchpad: false,
  safari: false,
  messages: false,
  mail: false,
  maps: false,
  photos: false,
  facetime: false,
  calendar: false,
};
```

Say I wanna apply `Object.keys` to get an array of the keys of this object.

```ts
const apps = Object.keys(openApps);
//  ["finder", "launchpad", "safari", "messages", "mail", "maps", "photos", "facetime", "calendar"]
```

But there's bit of a problem here. If you hover over `apps`, its type will be `string`[]. Not `("finder" | "launchpad" | "safari" | "messages" | "mail" | "maps" | "photos" | "facetime" | "calendar")[]`.

Its not exactly a **problem**, per se, but it would be great to have `Object.keys` return the union types array of the keys.

So let's investigate the issue. We'll start with `Object.keys` definition in pre-built `lib.d.ts`:

```ts
interface ObjectConstructor {
  //...
  keys(o: object): string[];
  keys(o: {}): string[];
}
```

> If you find it weird that `keys` is defined twice, its called <mark>Function/Method overloading</mark>. You can basically define multiple function declarations for flexible usage.

As you can see, its hard coded to always return `string[]`. I'm sure its there for good reasons, but its quite inconvenient for me, so I'm gonna override this method to infer the keys correctly from what it is passed.

If you have a root `.d.ts` file in your project, put the snippet below right in it.

```ts
type ObjectKeys<Obj> = Obj extends object
  ? (keyof Obj)[]
  : Obj extends number
  ? []
  : Obj extends Array<any> | string
  ? string[]
  : never;

interface ObjectConstructor {
  keys<ObjectType>(o: ObjectType): ObjectKeys<ObjectType>;
}
```

Now let's try the code above with the new `Object.keys`:

```ts
const apps = Object.keys(openApps);
// const apps: ("finder" | "launchpad" | "safari" | "messages" | "mail" | "maps" | "photos" | "facetime" | "calendar")[]
```

Don't trust me? Check it out yourself @ [TypeScript Playground](https://www.typescriptlang.org/play?#code/C4TwDgpgBA8gRgKwgY2AaQiAzgHnggPigF5ZEoIAPYCAOwBMsoB7RFYAKCigH4oAKANaZmAMzIIAlAG0AulygAuCRWp1GUWgFcAtnAgAnBXzkLl+VTQZMAggYMBDEDge0QRAD5QswAwEtaAHNjb18AwNNuZVoIADdDAG4ODgCaA1EHZGh8dgBhZlofAy1UZgMoAG8FYWw8NlQAFXAIAn5mc3rgJshJDqRUDFqcxuaCJIBfZOQCnxZIWhswMCZSKu5RAPpDZQyAGywIABoFXYctWmQACzAHeh2HfaOFLAcM-3vH4+4dCCwXwN+HwOXygOgcfl2QKe3wcyyhILAl2YwGYWHhCgyWWAfh+6O4yAe6gcBnR4ySHGmhWAUFhyxIEnYADoalg2vNFstJEkgA)

> Note: All the credit goes to Steven Baumgeitner's blog post about this exact same thing. I just ripped it off 😁. You can read more about fixing `Object.keys` on his [blog post](https://fettblog.eu/typescript-better-object-keys/).

So, this is it!! Hope you got something out of this blog post!

Signing off!!

{{ series-links }}
