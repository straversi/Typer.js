# Typer.js
Typing effect completely configurable in HTML

Live page: http://steven.codes/typerjs

![example gif of typing effect](assets/bears.gif)

```html
<h1>
  I love
  <span class="typer" id="first-typer" data-words="beets,bears,battlestar galactica" data-colors="#cd2032,#cc1e81,#6e6abb"></span>
  <span class="cursor" data-owner="first-typer"></span>
</h1>
<script async src="https://unpkg.com/typer-dot-js@0.1.0/typer.js"></script>
```

Never touch the JavaScript if you don't want to.

## Features
- Change speed and delays
- Configurable cursors
- Colors
- On/Off

Explained in the [docs](http://steven.codes/typerjs/docs/)

## TODO
- [ ] Add `human-like` option that varies character delays slightly

## Common bugs

Make sure to load the script after the final usage of Typer.js in your HTML. Due
to how browsers parse HTML, a script is guaranteed access to all of the DOM elements
that precede the script tag that loaded it. There's no harm in adding the `async`
attribute to your script tag, so that the browser resumes parsing your HTML file
while it fetches Typer.js!
