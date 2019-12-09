# Reveal Jekyll

Reveal.js Web presentation served with jekyll.

## Set up

Run the presentation using:

```bash
bundle exec jekyll serve
```

## Create your presentation

### Raw Markdown

In `index.html` use the `layout: raw` and then you can create your slides directly in the file using markdown:

 - `___` Makes a basement slide
 - `---` Makes the next slide

### Using Jekyll capabilities

In `index.html` use the `layout: presentation`. It will use the `_slides` and `_basements` folder to create the presentation.
 
#### Slide

Use the `_slides` folder to create a file per slide in markdown. 

```yaml

---
---

Slide content in markdown
```

> Don't forget to add the two `---`.

To order the presentation you can do something like `01-First-slide-title.md`, `02-Second-slide-title.md`.

#### Basement slides

Basement slides can be put in the `_basements` folder.
The Basement slides are slides that will be accessible using the down arrow when on a particular slide.

They are the sub sections of your presentation:

```yaml

---
slide: slide-title
---
 
Content of the Basement slide in markdown

```

> Don't forget to use the `slide` attribute to specify under which slide it will fit.


## Source

- Assets contains [Reveal.js](https://github.com/hakimel/reveal.js/)
