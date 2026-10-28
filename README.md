# Plains & Pour Coffee — demo website

A demo website for a made-up coffee shop in Auburn, Alabama. It's plain HTML, CSS and JavaScript, with no frameworks and no build step.

## How to view it

Double-click `index.html` to open it in a browser. That's it.

To put it online for free, upload the folder to GitHub Pages, Netlify or Cloudflare Pages.

## Files

```
index.html     Home page: big banner, "Open now" badge, links to every other page
menu.html      Menu with filter buttons (Espresso / Brewed / Tea / Food)
gallery.html   Photo grid; click a photo to see it full screen
hours.html     Hours table (today is highlighted), address, map
about.html     The shop's story
css/styles.css One stylesheet shared by every page
js/main.js     One script shared by every page
images/        Illustrations used as stand-in photos, plus the logo
```

## Common edits

| To change… | Edit |
|---|---|
| Opening hours | The `HOURS` list at the top of `js/main.js`. The home page badge and the hours table both update. |
| Colors / fonts | The `:root` variables at the top of `css/styles.css` |
| Menu items or prices | Copy or edit an `<li class="menu-item">` in `menu.html` |
| Photos | Put a `.jpg` in `images/` and change the `src="images/…"` to point at it |
| Address / phone | The footer of each page and the "Find us" section of `hours.html` |
