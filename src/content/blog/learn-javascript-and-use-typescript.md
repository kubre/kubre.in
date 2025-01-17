---
title: "Learn JavaScript and use Typescript"
description: "How to start using typescript in your projects without getting overwhelmed by all of the features it has to offer."
image: ../../assets/learn-javascript-and-use-typescript.jpg
publishedAt: 2022-07-03
tags: ["javascript", "typescript", "learn typescript"]
---

# Experience

You're comfortable with javascript now. You've finally been able to learn the fancy functional methods. Write out the `reduce()` instead of a loop. It runs the same as a loop but makes your code look smarter. But people are shifting to something else now. It's typescript! It's just like JavaScript but better. How? Well, you see, it has a type, “Pun intended.” So you jumped on the hype train and started a typescript project. But it felt off. You're writing code that does the same thing as JavaScript but amounts to far more code. You wonder if it was even worth the trouble. I'm going back to the good old javascript and living in a typeless environment. VS Code no longer provides intelligent suggestions, but it did, and the simpler mistakes you pass around are null and undefined and no longer being caught. But does it have to turn out this way?

_No_

# So, how do I get started with Typescript?

Learn javascript and use typescript, Yes the title of this blog post. What does it even mean? Just write JavaScript inside the typescript file.

_That's it!_

Let's understand with an example.

```tsx
const allPosts = [
    { title: "Post One", category: "one" },
    { title: "Post Two", category: "two" },
];

function getPosts(category) {
    if (category) {
        return allPosts.filter((post) => post.category === category);
    }
    return allPosts;
}

console.log(getPosts());
console.log(getPosts("one"));
```

I'm using vscode which has a linter built-in. It lets you know the issues with Javascript or TypeScript directly in the editor itself. With the default configuration for typescript (i.e., if you used one from `npx tsc --init` will show you an error at the `getPosts()` function call with a warning `An argument for 'category' was not provided`.

But we know our function does handle cases when the category is not present. But typescript doesn't. By default, it will treat the argument as a required parameter. We can just add ? at the end of the category and let the typescript know an undefined state is considered.

```tsx
function getPosts(category?) {
```

Linter will also complain about the category being type any. If you don't know it means in simple terms your variable can hold value with any of the types javascript supports. Let's change this behavior. We know that category is a string, so we can explicitly type the argument with a string datatype.

```tsx
function getPosts(category?: string) {
```

Linter is no longer complaining, and we are good. Only those changes? Yes, One of the best tips I've gotten looking at projects built by people who use typescript on daily basis, and even the advanced user just writes javascript and lets the typescript infer if it complains then add the type. This way the learning curve is minimal.

If you go deep, you will find it interesting to learn but difficult to maintain for day-to-day coding. And that's fine! All those fancy features that Typescript provides are for people who write and maintain packages. That is how we receive the great linting and the sweet IntelliSense. But for people who are building user-facing websites and applications, getting the typescript compiler happy is enough. Once you start using it on every project you will learn new things in typescript but it's a slow and gradual learning curve. You will only learn what you will use in the project.

I had a hard time starting with typescript at first, but now I've switched over to full-time. by simply only adding in types when typescript complains about it. And every other time, I just let typescript infer the type for me. This is called implicit typing, and it helps a lot to reduce the amount of code that doesn't add any features for the users. This also keeps you from getting strictly locked into the typescript itself. At work, I still have to use JavaScript, and it won't go anywhere soon. Javascript is improving day by day and people will keep using it. Some are moving back to Javascript from Typescript also.
