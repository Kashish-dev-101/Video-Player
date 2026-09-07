# JavaScript Learning Notes

These notes capture the JavaScript ideas we discussed while setting up the `imagekit-player-sdk` folder.

## 1. What the current player uses

The current `imagekit-player-sdk` setup does **not** use Video.js yet.

It currently uses the browser's native HTML5 video element:

```html
<video id="video-player" controls playsinline preload="metadata"></video>
```

This means:

- the browser shows the default video controls
- JavaScript only sets the video source and poster
- playback is handled by the browser itself

So right now:

- `native-videojs-player` = Video.js-based player
- `imagekit-player-sdk` = plain HTML5 `<video>` player for now

## 2. Why JavaScript is still needed

Even though the current player is not using Video.js or the ImageKit SDK yet, JavaScript is still useful for:

- reading user input
- setting the video URL
- setting the poster URL
- resetting the player
- updating status text
- showing debug messages

So the current JS is simple page logic, not SDK logic yet.

## 3. Functions in JavaScript

A function is a reusable block of code.

Example:

```js
const greet = (name) => {
  return `Hello, ${name}`;
};
```

This function:

- is stored in a variable called `greet`
- takes one parameter: `name`
- returns a string

## 4. Common function styles

### Function declaration

```js
function greet(name) {
  return `Hello, ${name}`;
}
```

### Function expression

```js
const greet = function (name) {
  return `Hello, ${name}`;
};
```

### Arrow function

```js
const greet = (name) => {
  return `Hello, ${name}`;
};
```

### Short arrow function

```js
const greet = (name) => `Hello, ${name}`;
```

## 5. Preferred style for this project

Recommended default for your current frontend work:

- use `const`
- use arrow functions

Example:

```js
const setStatus = (message) => {
  playerStatus.textContent = message;
};
```

Why this is a good fit here:

- matches your natural style
- works well in DOM code
- keeps helper functions and callbacks consistent
- fits modern frontend JavaScript nicely

## 6. When function declarations are useful

Function declarations are still useful because of **hoisting**.

Example:

```js
sayHi();

function sayHi() {
  console.log("Hi");
}
```

This works because the function declaration is hoisted.

But this does **not** work:

```js
sayHi();

const sayHi = () => {
  console.log("Hi");
};
```

Why?

- `const` variables are not usable before they are defined
- arrow functions stored in `const` are not available before that line runs

Simple rule:

- use arrow functions by default
- use function declarations when you specifically want hoisting

## 7. Parameters and arguments

In this function:

```js
const setStatus = (message) => {
  playerStatus.textContent = message;
};
```

- `message` is a parameter

When calling it:

```js
setStatus("Playing");
```

- `"Playing"` is the argument

## 8. What `return` does

`return` sends a value back from a function.

Example:

```js
const add = (a, b) => {
  return a + b;
};
```

If you write:

```js
const result = add(2, 3);
```

Then `result` becomes `5`.

## 9. DOM selection

This kind of code:

```js
const applyBtn = document.querySelector("#apply-btn");
```

means:

- find the HTML element with `id="apply-btn"`
- store it in a variable

This lets us work with the element later in JS.

Examples from the current file:

- `videoUrlInput`
- `posterUrlInput`
- `applyBtn`
- `videoPlayer`
- `playerStatus`

## 10. Event listeners

An event listener means:

"When something happens, run this function."

Example:

```js
applyBtn.addEventListener("click", applyPlayerState);
```

This means:

- listen for a `click` on `applyBtn`
- when clicked, run `applyPlayerState`

## 11. Common event listener patterns

### Using a separate function

```js
const handleClick = () => {
  console.log("Clicked");
};

button.addEventListener("click", handleClick);
```

### Using an inline arrow function

```js
button.addEventListener("click", () => {
  console.log("Clicked");
});
```

### Using a function expression

```js
button.addEventListener("click", function () {
  console.log("Clicked");
});
```

## 12. Important listener detail

This is correct:

```js
applyBtn.addEventListener("click", applyPlayerState);
```

This is usually wrong for event listeners:

```js
applyBtn.addEventListener("click", applyPlayerState());
```

Why?

- `applyPlayerState` passes the function
- `applyPlayerState()` runs the function immediately

For event listeners, we usually want to pass the function, not run it right away.

## 13. Common browser events

Some useful events:

- `click`
- `input`
- `change`
- `submit`
- `play`
- `pause`
- `loadedmetadata`
- `error`

Examples:

```js
videoPlayer.addEventListener("play", () => {
  setStatus("Playing");
});
```

```js
videoPlayer.addEventListener("pause", () => {
  setStatus("Paused");
});
```

## 14. Arrow function syntax patterns

### No parameters

```js
const resetPlayer = () => {
  console.log("reset");
};
```

### One parameter

```js
const setStatus = (message) => {
  console.log(message);
};
```

### Two parameters

```js
const add = (a, b) => {
  return a + b;
};
```

### Short return

```js
const add = (a, b) => a + b;
```

### Returning an object

```js
const getUser = () => ({
  name: "Ashish",
  role: "Developer",
});
```

## 15. What the current app.js does

The current `app.js` mainly does four things:

1. Selects HTML elements
2. Reads input values
3. Loads or resets the native video player
4. Updates status/debug text based on player events

## 16. Main recommendation to remember

For your current frontend/player work:

- default to arrow functions
- use `const` for function variables
- use function declarations only when there is a clear reason, like hoisting

## 17. Handy mental model

- function = instructions
- event listener = wait for something, then run the instructions
- parameter = placeholder inside the function
- argument = actual value passed in
- return = sends a value back

## 18. Revision mini cheat sheet

### Arrow function

```js
const doSomething = () => {
  console.log("Hello");
};
```

### Function with parameter

```js
const greet = (name) => {
  console.log(`Hello, ${name}`);
};
```

### Event listener

```js
button.addEventListener("click", () => {
  console.log("Button clicked");
});
```

### Event listener using named function

```js
const handleClick = () => {
  console.log("Button clicked");
};

button.addEventListener("click", handleClick);
```
