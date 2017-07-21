# Typer.js
Typing effect completely configurable in HTML

Live page: http://steven.codes/typerjs

![example gif of typing effect](assets/not_the_first_example.gif)

## Features
- Change speed and delays
- Configurable cursors
- Colors
- On/Off

## TODO
- [ ] Add `human-like` option that varies character delays slightly

## Common bugs

If you're getting element not found errors, a potential source of the problem is that your page elements haven't loaded before the Typer.js script runs. Try moving the `TyperSetup()` line at the end of Typer.js to inside some sort of `onLoad` function.
