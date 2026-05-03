# UFO Blocks

**A WordPress Gutenberg plugin providing a powerful CSS Grid layout system built with Tailwind CSS v4.**

No page builder. No bloat. Just clean, semantic markup with full CSS Grid control — directly inside the block editor.

> Built and battle-tested by [UFO Agency](https://ufo-agency.com) across 30+ client sites.

---

## Why ufo-blocks?

Gutenberg's native columns block is limited. Page builders are overkill. `ufo-blocks` gives you a proper CSS Grid system — with `col-span`, `col-start`, `row-span`, background images, background videos, responsive reordering, and more — all configurable from the block sidebar without writing a single line of CSS.

It pairs with your Tailwind CSS v4 theme: the plugin ships no CSS of its own, staying lean and letting your theme's design tokens drive the visual output.

---

## Features

- Full CSS Grid system (1 to 6+ columns)
- Advanced placement control (`col-span`, `col-start`, `col-end`, `row-span`, `row-start`, `row-end`)
- Gap control between cells
- Vertical alignment per block
- Mobile order reversal
- Background image and video per block
- Min-height, border-radius, boxed mode
- Independent horizontal and vertical padding
- Nested blocks support via `InnerBlocks`
- Compatible with any WordPress block theme
- Block API v3

---

## Requirements

- WordPress 6.1+
- PHP 7.0+
- Node.js 18+ and npm
- **A theme using Tailwind CSS v4** (see [Tailwind integration](#tailwind-css-v4-integration) below)

---

## Installation

1. Clone the repository into `wp-content/plugins/`

```bash
cd wp-content/plugins
git clone https://github.com/Vince-ALIEN/ufo-blocks.git
cd ufo-blocks
```

2. Install dependencies

```bash
npm install
```

3. Build the plugin

```bash
npm run build
```

4. Activate the plugin in **WordPress Admin → Plugins → UFO Blocks**

---

## Tailwind CSS v4 Integration

`ufo-blocks` ships no CSS. It is designed to work with a theme that already runs Tailwind CSS v4. To include the plugin's block classes in your theme's Tailwind build, add the following `@source` directive to your theme's CSS entry point:

```css
@import "tailwindcss";

/* Point Tailwind at ufo-blocks source files */
@source "../../../plugins/ufo-blocks/src/**/*.js";

/* Your theme's own source files */
@source "../../templates/**/*.html";
@source "../../parts/**/*.html";
@source "../../patterns/**/*.php";
```

This ensures Tailwind scans the plugin's JS files and includes all necessary utility classes in the final build.

Looking for a starter theme setup? Check out [Tailpress](https://github.com/richaber/tailpress) or [_TW](https://underscoretw.com/) — both handle the Tailwind + Gutenberg wiring out of the box.

---

## Usage

### In the block editor

1. Click **"+"** to add a block
2. Search for **"ufo Grid"** under the **"UFO Blocks"** category
3. Configure the grid from the sidebar panel
4. Add **"ufo Row"** blocks inside the grid

### Development

```bash
npm start       # Watch mode with auto-reload
npm run build   # Production build
```

---

## Blocks

### ufo Grid — `ufo-blocks/ufo-grid`

The CSS Grid container. Only accepts `ufo Row` blocks as direct children.

| Attribute | Type | Default | Description |
|---|---|---|---|
| `columnsCount` | number | `2` | Number of columns |
| `rowsCount` | number | `0` | Number of rows (0 = auto) |
| `gap` | string | `'4'` | Gap between cells (0–8) |
| `verticalAlignment` | string | `''` | Vertical alignment of cells |
| `reverseMobile` | boolean | `false` | Reverse order on mobile |
| `minHeight` | string | `''` | Minimum height |
| `borderRadius` | string | `''` | Border radius |
| `isBoxed` | boolean | `false` | Centered container with max-width |
| `backgroundImage` | object | — | Background image (url, id, alt) |
| `backgroundSize` | string | `'cover'` | Background image size |
| `backgroundPosition` | string | `'center center'` | Background image position |
| `backgroundVideo` | object | — | Background video (url, id) |
| `paddingX` | string | `'0'` | Horizontal padding (0–16) |
| `paddingY` | string | `'0'` | Vertical padding (0–16) |

### ufo Row — `ufo-blocks/ufo-row`

A grid cell. Must be a direct child of `ufo Grid`.

| Attribute | Type | Default | Description |
|---|---|---|---|
| `colSpan` | string | `''` | Number of columns spanned |
| `colStart` | string | `''` | Starting column |
| `colEnd` | string | `''` | Ending column |
| `rowSpan` | string | `''` | Number of rows spanned |
| `rowStart` | string | `''` | Starting row |
| `rowEnd` | string | `''` | Ending row |
| `verticalAlignment` | string | `''` | Vertical alignment of content |
| `minHeight` | string | `''` | Minimum height |
| `height` | string | `''` | Fixed height |
| `paddingX` | string | `'0'` | Horizontal padding (0–16) |
| `paddingY` | string | `'0'` | Vertical padding (0–16) |
| `borderRadius` | string | `''` | Border radius |
| `backgroundImage` | object | — | Background image (url, id, alt) |
| `backgroundSize` | string | `'cover'` | Background image size |
| `backgroundPosition` | string | `'center center'` | Background image position |

---

## File Structure

```
ufo-blocks/
├── build/                  # Compiled files (generated by npm run build)
│   ├── ufo-grid/
│   └── ufo-row/
├── src/
│   ├── ufo-grid/           # Grid container block
│   │   ├── block.json
│   │   ├── index.js
│   │   ├── edit.js
│   │   ├── save.js
│   │   ├── editor.css
│   │   └── style.css
│   ├── ufo-row/            # Grid cell block
│   │   ├── block.json
│   │   ├── index.js
│   │   ├── edit.js
│   │   ├── save.js
│   │   ├── editor.css
│   │   └── style.css
│   └── icons.js
├── ufo-blocks.php          # Main plugin file
├── package.json
└── README.md
```

---

## NPM Commands

| Command | Description |
|---|---|
| `npm start` | Development mode with watch |
| `npm run build` | Production build |
| `npm run format` | Code formatting |
| `npm run lint:css` | CSS linting |
| `npm run lint:js` | JavaScript linting |
| `npm run plugin-zip` | Generate plugin archive |

---

## Compatibility

- WordPress 6.1+
- PHP 7.0+
- Modern browsers (Chrome, Firefox, Safari, Edge)

---

## Further Reading

- [How to build custom Gutenberg blocks with Tailwind CSS](https://www.ufo-agency.com/news/comment-creer-des-blocs-wordpress-gutenberg-sur-mesure-avec-tailwind-css/) *(French)*

---

## License

GPL v2 or later

---

## Author

**UFO Agency** — [ufo-agency.com](https://ufo-agency.com)

Issues & contributions welcome → [GitHub Issues](https://github.com/Vince-ALIEN/ufo-blocks/issues)
