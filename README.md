# UFO Blocks

**A WordPress Gutenberg plugin providing a powerful CSS Grid layout system and content blocks built with Tailwind CSS v4.**

No page builder. No bloat. Just clean, semantic markup with full CSS Grid control — directly inside the block editor.

> Built and battle-tested by [UFO Agency](https://ufo-agency.com) across 30+ client sites.

---

## Why ufo-blocks?

Gutenberg's native columns block is limited. Page builders are overkill. `ufo-blocks` gives you a proper CSS Grid system — with `col-span`, `col-start`, `row-span`, background images, background videos, responsive reordering, and more — all configurable from the block sidebar without writing a single line of CSS.

It pairs with your Tailwind CSS v4 theme: the plugin ships no CSS of its own, staying lean and letting your theme's design tokens drive the visual output.

---

## Available blocks

| Block | Block name | Description |
|---|---|---|
| ufo Grid | `ufo-blocks/ufo-grid` | Responsive CSS Grid container |
| ufo Row | `ufo-blocks/ufo-row` | Grid cell (direct child of ufo Grid) |
| UFO Button | `ufo-blocks/ufo-button` | Customizable button with Lucide icons |
| ufo Buttons | `ufo-blocks/ufo-buttons-group` | Button group with alignment control |
| ufo FAQ | `ufo-blocks/ufo-faq` | FAQ accordion with Schema.org JSON-LD |
| ufo FAQ Item | `ufo-blocks/ufo-faq-item` | Question/answer item (child of ufo FAQ) |
| UFO Icon | `ufo-blocks/ufo-icon` | Lucide icon with alignment and theme color |
| UFO Time | `ufo-blocks/ufo-time` | Styled `<time>` element |
| ufo Title | `ufo-blocks/ufo-title` | Title with icon and rounded background |

## Installation

### Requirements

- WordPress 6.1+
- PHP 7.4+
- Node.js 18+ and npm
- **A theme using Tailwind CSS v4** (see [Tailwind integration](#tailwind-css-v4-integration) below)

### Steps

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

## Tailwind CSS v4 Integration

`ufo-blocks` ships no CSS. It is designed to work with a theme that already runs Tailwind CSS v4.

Add the following directives to your theme's CSS entry point so Tailwind scans the plugin's source files and includes all required utility classes in the build:

```css
/**
 * Add your plugins folder
 */
@source "../../../plugins/ufo-blocks/src/**/*.js";
@source "../../../plugins/ufo-blocks/src/**/*.php";

@source inline("md:col-span-{1,2,3,4,5,6}");
@source inline("md:col-start-{1,2,3,4,5,6,7}");
@source inline("md:col-end-{1,2,3,4,5,6,7,8}");
@source inline("row-span-{1,2,3,4,5,6}");
@source inline("row-start-{1,2,3,4,5,6,7}");
@source inline("row-end-{1,2,3,4,5,6,7,8}");

/* ufo-grid — fixed height */
@source inline("h-{24,32,40,48,56,64,72,80,96,9/10}");

@source inline("gap-{0,1,2,3,4,5,6,7,8}");
@source inline("md:grid-cols-{1,2,3,4,5,6}");
@source inline("grid-rows-{1,2,3,4,5,6}");
@source inline("px-{0,2,4,6,8,10,12,14,16}");
@source inline("py-{0,2,4,6,8,10,12,14,16}");
@source inline("min-h-{32,48,64,80,96,192}");
@source inline("rounded-{sm,md,lg,xl,2xl,3xl}");
```

The `@source inline(...)` directives are required for dynamically generated classes (e.g. `md:col-span-3`) that Tailwind cannot detect through file scanning alone.

### Starter themes

Need a Tailwind CSS v4 + WordPress starter? Both of these handle the Tailwind + Gutenberg wiring out of the box and work seamlessly with `ufo-blocks`:

- **[_tw](https://underscoretw.com/)** — A minimal `_s`-based starter theme with Tailwind CSS. Clean, unopinionated, easy to extend.
- **[TailPress](https://tailpress.io/)** — A block-theme starter with full Tailwind CSS v4 integration, FSE support, and a ready-to-use build pipeline.

## Usage

### Development

```bash
npm start       # Watch mode with auto-reload
npm run build   # Production build
```

### In the block editor

1. Click **"+"** to add a block
2. Search for the block under the **"UFO Blocks"** category
3. Configure via the sidebar panel

## Attribute reference

### ufo Grid (`ufo-blocks/ufo-grid`)

CSS Grid container. Only accepts `ufo Row` blocks as direct children.

| Attribute | Type | Default | Description |
|---|---|---|---|
| columnsCount | number | 2 | Number of columns (desktop) |
| rowsCount | number | 0 | Number of rows (0 = auto) |
| gap | string | '4' | Gap between cells (0–8) |
| verticalAlignment | string | '' | Vertical alignment of cells |
| reverseMobile | boolean | false | Reverse order on mobile |
| equalRows | boolean | true | Equal row heights (`auto-rows-fr`) |
| minHeight | string | '' | Minimum height |
| borderRadius | string | '' | Border radius |
| isBoxed | boolean | false | Centered container with max-width |
| backgroundImage | object | — | Background image (url, id, alt) |
| backgroundSize | string | 'cover' | Background image size |
| backgroundPosition | string | 'center center' | Background image position |
| backgroundVideo | object | — | Background video (url, id) |
| paddingX | string | '0' | Horizontal padding (0–16) |
| paddingY | string | '0' | Vertical padding (0–16) |

### ufo Row (`ufo-blocks/ufo-row`)

Grid cell. Must be a direct child of `ufo Grid`.

| Attribute | Type | Default | Description |
|---|---|---|---|
| colSpan | string | '' | Number of columns spanned |
| colStart | string | '' | Starting column |
| colEnd | string | '' | Ending column |
| rowSpan | string | '' | Number of rows spanned |
| rowStart | string | '' | Starting row |
| rowEnd | string | '' | Ending row |
| verticalAlignment | string | '' | Vertical alignment of content |
| minHeight | string | '' | Minimum height |
| height | string | '' | Fixed height |
| paddingX | string | '0' | Horizontal padding (0–16) |
| paddingY | string | '0' | Vertical padding (0–16) |
| borderRadius | string | '' | Border radius |
| backgroundImage | object | — | Background image (url, id, alt) |
| backgroundSize | string | 'cover' | Background image size |
| backgroundPosition | string | 'center center' | Background image position |

## File structure

```
ufo-blocks/
├── build/                    # Compiled files (generated by npm run build)
├── includes/
│   ├── ufo-blocks-icons.php  # SVG helpers for the button block
│   └── ufo-faq-schema.php    # Schema.org JSON-LD for FAQ
├── src/
│   ├── shared/               # Shared utilities across blocks
│   ├── ufo-grid/             # Grid container block
│   │   ├── block.json
│   │   ├── shared.js         # getWrapperClasses(), getInnerClasses(), getWrapperStyle()
│   │   ├── inspector.js
│   │   ├── edit.js / save.js
│   │   └── editor.css / style.css
│   ├── ufo-row/              # Grid cell block
│   │   ├── block.json
│   │   ├── shared.js         # getTailwindClasses(), getBlockStyle()
│   │   ├── inspector.js
│   │   ├── edit.js / save.js
│   │   └── editor.css / style.css
│   ├── ufo-button/           # Button with Lucide icon
│   ├── ufo-buttons-group/    # Button group
│   ├── ufo-faq/              # FAQ accordion + Schema.org
│   ├── ufo-faq-item/         # FAQ item
│   ├── ufo-icon/             # Lucide icon
│   ├── ufo-time/             # <time> element
│   ├── ufo-title/            # Title with icon
│   └── icons.js
├── ufo-blocks.php            # Main plugin file
├── package.json
└── webpack.config.js
```

## NPM commands

| Command | Description |
|---|---|
| `npm start` | Development mode with watch |
| `npm run build` | Production build |
| `npm run format` | Code formatting |
| `npm run lint:css` | CSS linting |
| `npm run lint:js` | JavaScript linting |
| `npm run plugin-zip` | Generate plugin archive |

## Further reading

- [How to build custom Gutenberg blocks with Tailwind CSS](https://www.ufo-agency.com/news/comment-creer-des-blocs-wordpress-gutenberg-sur-mesure-avec-tailwind-css/) *(French)*

## Compatibility

- WordPress 6.1+
- PHP 7.4+
- Modern browsers (Chrome, Firefox, Safari, Edge)

## License

GPL v2 or later

## Author

**UFO Agency** — [ufo-agency.com](https://ufo-agency.com)

Issues & contributions welcome → [GitHub Issues](https://github.com/Vince-ALIEN/ufo-blocks/issues)
