![Reveal Jekyll](./reveal-jekyll.png)

[![CI](https://github.com/sylhare/Reveal-Jekyll/actions/workflows/ci.yml/badge.svg)](https://github.com/sylhare/Reveal-Jekyll/actions/workflows/ci.yml)
[![Gem Version](https://badge.fury.io/rb/reveal-jekyll.svg)](https://badge.fury.io/rb/reveal-jekyll)

[Reveal.js](https://github.com/hakimel/reveal.js) Web presentation served with jekyll.
Find all the reveal.js [documentation](https://revealjs.com/) the default plugins are already package in reveal jekyll.
If you have any request, problems please open an [issue](https://github.com/sylhare/Reveal-Jekyll/issues). 
Feel free to implement any change and open through pull requests. 😉

## Set up

Make sure to install bundle which will ease the installation of jekyll:

```bash
gem install bundle
bundle install
```

Run the presentation (it will be served on [localhost:4000](http://localhost:4000/Reveal-Jekyll/)) using:

```bash
bundle exec jekyll serve
```

This project ships with [reveal.js](https://revealjs.com/) **6.0.1** and its built-in plugins
(markdown, highlight, search, zoom, notes and math) already packaged under `assets/dist`.

## Create your presentation

### Raw Markdown

Take a look at the [example](https://github.com/sylhare/Reveal-Jekyll/blob/raw/index.html),
In [`index.html`](https://github.com/sylhare/Reveal-Jekyll/blob/raw/index.html) use the `layout: raw` and then you can create your slides directly in the file using markdown:

 - `___`: Makes a basement slide
 - `---`: Makes the next slide

#### One file slides example

Your index.html could look like:

```
---
layout: raw
---

## First slide
---
## Second slide
___
Second slide's basement
---
## Third slide
```

### Using Jekyll capabilities

Take a look at the [example slides](https://github.com/sylhare/Reveal-Jekyll/tree/master/_slides) and [basements](https://github.com/sylhare/Reveal-Jekyll/tree/master/_basements),
In `index.html` use the `layout: presentation`. It will use the `_slides` and `_basements` folder to create the presentation.
 
#### Slide

Use the `_slides` folder to create a file per slide in markdown. 

```yaml

---
transition: slide               # Optional: per-slide transition (none/fade/slide/convex/concave/zoom)
transition_speed: fast          # Optional: default/fast/slow
background: "img/cover.png"      # Optional: background color OR image (auto-detected)
background_image: "img/cover.png" # Optional: force an image background
background_color: "#dddddd"      # Optional: force a color background
background_gradient: "linear-gradient(...)"  # Optional: CSS gradient background
background_iframe: "https://..." # Optional: embed a live page as the background
background_size: cover           # Optional: contain / cover / <css size>
background_opacity: 0.5          # Optional: 0..1
video: "http://video-link.mp4"   # Optional: background video (comma-separated for multiple sources)
video_loop: true                 # Optional: loop the background video
auto_animate: true               # Optional: auto-animate matching elements to the next slide
autoslide: 5000                  # Optional: auto-advance after N milliseconds
id: intro                        # Optional: anchor so you can deep-link to /#/intro
---

Slide content in markdown
```

> Don't forget to add the two `---`.

To order the presentation you can do something like `01-First-slide-title.md`, `02-Second-slide-title.md`.

#### Markdown is a first-class citizen

Whether you use the `presentation` layout (Markdown rendered by Jekyll/Kramdown) or the
`raw` layout (Markdown rendered in the browser by reveal.js), all the usual reveal.js
Markdown features work:

- **Fenced code blocks** are syntax highlighted (Rouge server-side, highlight.js in raw mode).
- **Fragments** reveal content step by step. In Kramdown add `{:.fragment}` under a block;
  in `raw` Markdown use `<!-- .element: class="fragment" -->`.
- **Speaker notes** — start a line with `Note:` (see them with the `s` key).
- **Math** via `$$ ... $$` (MathJax).

See [`raw-example.html`](raw-example.html) and the [`_slides`](_slides) folder for working examples.

#### Basement slides

Basement slides can be put in the `_basements` folder.

The Basement slides will be accessible using the down arrow when on a particular slide. They are connected by the `slide` attribute which is the filename of the slide.

They are the sub sections of your presentation:

```yaml

---
slide: slide-title
---
 
Content of the Basement slide in markdown

```

e.g:

- For a slide called `02-slide.md`
- The basement of that slide `02-1-basement.md` should have the attribute `slide: 02-slide`

#### Config

Configure reveal.js globally in the `_config.yml`. Every value maps to a
[reveal.js config option](https://revealjs.com/config/) and is optional
(sensible defaults are used when omitted):

```yml
reveal:
  title: "Reveal-jekyll"
  transition: "slide"   # none/fade/slide/convex/concave/zoom
  theme: "black"        # beige/black/black-contrast/blood/dracula/league/moon/night/serif/simple/sky/solarized/white/white-contrast
  highlightTheme: "monokai" # monokai/zenburn (code highlighting theme)
  number: true          # show slide numbers
  numberType: "c"       # "h.v" / "h/v" / "c" / "c/t"
  controls: true
  progress: true
  center: true
  hash: true            # keep the current slide in the URL
  loop: false
  autoAnimate: true     # animate matching elements between slides
  autoSlide: 0          # auto-advance every N ms (0 = off)
  width: 960            # base resolution used for scaling
  height: 700
```

You can set globally the theme, transitions, sizing and behaviour of your presentation,
and override the per-slide ones from each slide's front matter (see above).

### Export presentation

To export the presentation use `?print-pdf` at the end of the url to be able to save the page as PDF:

```html
<url>:<port>/<base url>/?print-pdf
```

Try it at [.../Reveal-Jekyll/?print-pdf](https://sylhare.github.io/Reveal-Jekyll/?print-pdf)


### Use as a gem

There is a `Dockerfile` available, check it out to see how to use the theme in a Docker.
Basically you need 4 things to make it work as a gem:

- The Gemfile with the [reveal-jekyll gem](https://rubygems.org/gems/reveal-jekyll): `gem 'reveal-jekyll'` (optionally pin a version, e.g. `'~> 0.1'`)
- The `index.html` which is the entrypoint of your jekyll site and presentation (with explained above configuration)
- The `_config.yml` which defines your theme configuration.
- The presentation, assets and content you want to display.

And that's it you'd be good to roll!

You can also run it in Docker:

```bash
docker build -t reveal-jekyll .
docker run --rm -p 4000:4000 reveal-jekyll
```

## Development

End-to-end tests use [Playwright](https://playwright.dev/) to boot the Jekyll site and
drive reveal.js in a real browser.

```bash
npm ci                       # install Playwright
npx playwright install       # download the browsers (first run only)
npm run test:e2e             # build + serve the site and run the tests
```

To bump the bundled reveal.js, change the version in `package.json`, then re-vendor
the distribution files:

```bash
npm install
npm run sync:reveal          # copies node_modules/reveal.js/dist into assets/dist
```

## License

Reveal-Jekyll is [MIT licensed](LICENSE), Copyright (c) 2019-present Sylhare.

It bundles and builds on other MIT-licensed projects, [reveal.js](https://github.com/hakimel/reveal.js/)
(Copyright © Hakim El Hattab) and [Jekyll](https://github.com/jekyll/jekyll). Their license
notices are reproduced in [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md).
