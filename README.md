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
- [x] Refactor setup js into a setup function that can be run onload/in $() [Done: see TyperSetup function]
- [x] Show code for the example on http://steven.codes/typerjs/playground.html so you don't have to open web inspector

If you're getting element not found errors, a potential source of the problem could be that your elements aren't loading
in time before the Typer.js script runs. Try moving the `TyperSetup()` line at the end of Typer.js to inside some sort
of `onLoad` function.
