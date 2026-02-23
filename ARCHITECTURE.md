# Architecture du plugin UFO Blocks

## Structure des fichiers

```
ufo-blocks/
│
├── ufo-blocks.php              # Fichier principal du plugin
│   ├── create_block_ufo_blocks_block_init()   # Enregistrement des blocs
│   ├── ufo_blocks_register_category()         # Catégorie "UFO Blocks"
│   └── ufo_blocks_register_faq_scripts()      # Scripts frontend optionnels
│
├── src/                        # Sources (avant compilation)
│   ├── icons.js                # Icônes partagées (lucide-react)
│   ├── ufo-grid/               # Bloc conteneur de grille
│   │   ├── block.json
│   │   ├── index.js
│   │   ├── edit.js
│   │   ├── save.js
│   │   ├── editor.css
│   │   └── style.css
│   └── ufo-row/                # Bloc cellule de grille
│       ├── block.json
│       ├── index.js
│       ├── edit.js
│       ├── save.js
│       ├── editor.css
│       └── style.css
│
├── build/                      # Fichiers compilés (généré par npm run build)
│   ├── ufo-grid/
│   │   ├── index.js
│   │   ├── index.asset.php
│   │   ├── index.css
│   │   └── style-index.css
│   └── ufo-row/
│       ├── index.js
│       ├── index.asset.php
│       ├── index.css
│       └── style-index.css
│
└── Documentation
    ├── README.md
    ├── QUICKSTART.md
    ├── DEVELOPERS.md
    ├── CONTRIBUTING.md
    ├── CHANGELOG.md
    └── ARCHITECTURE.md
```

## Flux de données

### Chargement du plugin

```
WordPress init
    ↓
ufo-blocks.php
    ↓
create_block_ufo_blocks_block_init()
    ├→ register_block_type(__DIR__ . '/build/ufo-grid')
    └→ register_block_type(__DIR__ . '/build/ufo-row')
```

### Rendu dans l'éditeur

```
Utilisateur insère un bloc ufo Grid
    ↓
Gutenberg charge build/ufo-grid/index.js
    ↓
Composant React (edit.js)
    ├→ useBlockProps()
    ├→ useInnerBlocksProps()      ← accepte uniquement ufo-row
    ├→ InspectorControls          ← panneau latéral droit
    └→ BlockControls              ← barre d'outils

Attribut modifié → setAttributes() → re-render
```

### Sauvegarde et affichage frontend

```
Utilisateur publie
    ↓
save.js retourne le JSX
    ↓
WordPress sérialise en HTML dans post_content
    ↓
Requête frontend
    ↓
HTML statique servi directement
```

## Architecture CSS

### ufo Grid

```
.ufo-grid                    (base)
.grid                        (layout CSS grid)
.grid-cols-{n}               (colonnes desktop)
.gap-{size}                  (espacement)
.items-{align}               (alignement vertical)
.ufo-grid--reverse-mobile    (inversion mobile)
.ufo-grid--boxed             (conteneur centré)
```

### ufo Row

```
.ufo-row                     (base)
.col-span-{n}                (largeur en colonnes)
.col-start-{n}               (colonne de départ)
.col-end-{n}                 (colonne de fin)
.row-span-{n}                (hauteur en lignes)
.row-start-{n}               (ligne de départ)
.row-end-{n}                 (ligne de fin)
```

## Relations entre blocs

```
ufo-grid
    └── ufo-row (1..N)   ← parent déclaré dans block.json
            └── [tout bloc WordPress]
```

Le bloc `ufo-row` déclare `"parent": ["ufo-blocks/ufo-grid"]` dans son `block.json`, ce qui empêche son insertion en dehors d'un `ufo-grid`.

## Workflow de développement

```bash
npm install          # Installer les dépendances
npm start            # Watch mode
npm run build        # Build de production
npm run lint:js      # Lint JavaScript
npm run lint:css     # Lint CSS
npm run format       # Formatter le code
npm run plugin-zip   # Générer l'archive du plugin
```

## Diagramme de composants

```
┌───────────────────────────────────────────┐
│           WordPress Gutenberg             │
├───────────────────────────────────────────┤
│                                           │
│  ┌────────────────────────────────────┐   │
│  │         UFO Blocks Plugin          │   │
│  │                                    │   │
│  │  ┌──────────────────────────────┐  │   │
│  │  │  ufo Grid (conteneur)        │  │   │
│  │  │  ┌──────────────────────┐    │  │   │
│  │  │  │ ufo Row              │    │  │   │
│  │  │  │  [InnerBlocks WP]    │    │  │   │
│  │  │  └──────────────────────┘    │  │   │
│  │  │  ┌──────────────────────┐    │  │   │
│  │  │  │ ufo Row              │    │  │   │
│  │  │  │  [InnerBlocks WP]    │    │  │   │
│  │  │  └──────────────────────┘    │  │   │
│  │  └──────────────────────────────┘  │   │
│  │                                    │   │
│  └────────────────────────────────────┘   │
│                                           │
└───────────────────────────────────────────┘
```

---

**Maintenu par UFO Agency**
