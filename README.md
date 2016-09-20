# Typer.js
Typing effect completely configurable in HTML

Live page
[http://steven.codes/typerjs](http://steven.codes/typerjs)

![example gif of typing effect](demo/assets/not_the_first_example.gif)


### Features
- Change speed and delays
- Configurable cursors
- Colors
- On/Off


### TODO
- [x] Show code for the example on http://steven.codes/typerjs/playground.html so you don't have to open web inspector
- [ ] Improve randomization to be more human like

### Getting Started
Getting ready to use Typer.js very simple; all of Typer.js is packaged in one short javascript file.

Place the following at the end of your html file, right before the body tag closes. Be sure to change the filepath in src to reflect your case.

```
<script src='typer.js'></script>
```

That's it. Here's an example typer to get you started:

```
<p>
	I enjoy <span class="typer" data-delay="150" data-words="apples,oranges,blueberries" data-colors="red,orange,blue"></span>
</p>
```

Add the following after your typer span to create a cursor. Make sure to add `id="first-typer"` to the typer as well, or else cursor won't know who to listen to.

```
<span class="cursor" data-owner="first-typer"></span>
```
