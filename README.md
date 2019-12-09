# Reveal Jekyll

Reveal.js Web presentation served with jekyll.

## Set up

Run the presentation using:

```bash
bundle exec jekyll serve
```

## Create your presentation

In `index.html` use the `layout:raw` and then you can create your slides directly in the file using markdown:

 - `___` Makes a basement slide
 - `---` Makes the next slide
 
If you use the `layout:presentation` use the `_slides` folder to create a file per slide in markdown.
To order the presentation you can do something like `01-First-slide-title.md`, `02-Second-slide-title.md`.

## Source

- Assets contains [Reveal.js](https://github.com/hakimel/reveal.js/)
