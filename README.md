# Reveal Jekyll

Reveal.js Web presentation served with jekyll.

## Set up

Run the presentation using:

```bash
bundle exec jekyll serve
```

# Create your presentation

## Raw Markdown

In `index.html` use the `layout: raw` and then you can create your slides directly in the file using markdown:

 - `___` Makes a basement slide
 - `---` Makes the next slide

## Using Jekyll capabilities

In `index.html` use the `layout: presentation`. It will use the `_slides` and `_basements` folder to create the presentation.
 
### Slide

Use the `_slides` folder to create a file per slide in markdown. 

```yaml

---
background: ...                 # Optional to put an image or a color as the background
video: "http://video-link.mp4"  # Optional to put a video as the background
transition: slide               # Optional change the transition type for this slide
---

Slide content in markdown
```

> Don't forget to add the two `---`.

To order the presentation you can do something like `01-First-slide-title.md`, `02-Second-slide-title.md`.

### Basement slides

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

### Config

Configure Reveal.js in teh `_config.yml`:

```yml
reveal:
  transition: "slide" # none/fade/slide/convex/concave/zoom
  theme: "black" # beige/blood/league/moon/night/serif/simple/sky/solarized/white
```

You can set globally the transitions and theme of your presentation.

# License

## Reveal Jekyll

[Reveal Jekyll](https://github.com/sylhare/Reveal-Jekyll/blob/master/LICENSE) MIT licensed

Copyright (c) 2019 Sylhare \o/

## Reveal.js

[Reveal.js](https://github.com/hakimel/reveal.js/) MIT licensed

Copyright (C) 2019 Hakim El Hattab, http://hakim.se

## Jekyll

[Jekyll](https://github.com/jekyll/jekyll) MIT licensed

Copyright (c) 2008-present Tom Preston-Werner and Jekyll contributors
