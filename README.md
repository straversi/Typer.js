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
...
<script src="typer.js"></script>
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

If you're getting element not found errors, a potential source of the problem is that your page elements haven't loaded before the Typer.js script runs. Try moving the `TyperSetup()` line at the end of Typer.js to inside some sort of `onLoad` function.
