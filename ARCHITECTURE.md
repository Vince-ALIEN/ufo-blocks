# Architecture du plugin Tailwind Columns Block

## 📂 Structure des fichiers

```
tailwind-columns-block/
│
├── 📄 tailwind-columns-block.php    # Fichier principal du plugin
│   └── Namespace: TailwindColumnsBlock
│       └── Classe: Plugin (Singleton)
│           ├── register_blocks()
│           ├── render_columns_block()
│           ├── render_column_block()
│           ├── enqueue_editor_assets()
│           └── enqueue_frontend_assets()
│
├── 📁 src/                          # Sources (avant compilation)
│   │
│   ├── 📁 columns/                  # Bloc Columns
│   │   ├── block.json              # Métadonnées du bloc
│   │   ├── index.js                # Point d'entrée
│   │   ├── edit.js                 # Composant React d'édition
│   │   ├── save.js                 # Composant React de sauvegarde
│   │   ├── editor.css              # Styles pour l'éditeur
│   │   └── style.css               # Styles frontend
│   │
│   └── 📁 column/                   # Bloc Column
│       ├── block.json              # Métadonnées du bloc
│       ├── index.js                # Point d'entrée
│       ├── edit.js                 # Composant React d'édition
│       ├── save.js                 # Composant React de sauvegarde
│       ├── editor.css              # Styles pour l'éditeur
│       └── style.css               # Styles frontend
│
├── 📁 build/                        # Fichiers compilés (généré par npm run build)
│   ├── columns/
│   │   ├── index.js
│   │   ├── index.asset.php
│   │   ├── index.css
│   │   └── style-index.css
│   └── column/
│       ├── index.js
│       ├── index.asset.php
│       ├── index.css
│       └── style-index.css
│
├── 📁 languages/                    # Fichiers de traduction
│   └── tailwind-columns-block.pot
│
├── 📁 examples/                     # Exemples et extensions
│   └── block-variations.php        # Variations de blocs
│
├── 📄 package.json                  # Dépendances npm
├── 📄 composer.json                 # Dépendances PHP (dev)
├── 📄 phpcs.xml                     # Config PHP CodeSniffer
├── 📄 .eslintrc.json               # Config ESLint
├── 📄 .gitignore                   # Fichiers à ignorer
├── 📄 install.sh                   # Script d'installation
│
└── 📚 Documentation
    ├── README.md                   # Documentation principale
    ├── QUICKSTART.md              # Guide de démarrage rapide
    ├── DEVELOPERS.md              # Documentation développeur
    ├── CONTRIBUTING.md            # Guide de contribution
    ├── CHANGELOG.md               # Journal des modifications
    └── ARCHITECTURE.md            # Ce fichier
```

## 🔄 Flux de données

### 1. Chargement du plugin

```
WordPress init
    ↓
tailwind-columns-block.php
    ↓
Plugin::get_instance()
    ↓
init_hooks()
    ├→ register_blocks()
    ├→ enqueue_editor_assets()
    └→ enqueue_frontend_assets()
```

### 2. Rendu dans l'éditeur

```
User clicks "Add Block"
    ↓
Gutenberg loads block.json
    ↓
React Component (edit.js)
    ├→ useBlockProps()
    ├→ useInnerBlocksProps()
    ├→ InspectorControls (panneau de droite)
    └→ BlockControls (barre d'outils)
    ↓
User modifies attributes
    ↓
setAttributes() triggers re-render
```

### 3. Sauvegarde et affichage frontend

```
User clicks "Publish"
    ↓
save.js returns React element
    ↓
WordPress saves HTML in post_content
    ↓
Frontend request
    ↓
render_columns_block() (PHP)
    ├→ Get attributes
    ├→ Build CSS classes
    ├→ Escape output
    └→ Return HTML
```

## 🎨 Architecture CSS

### Système de classes Tailwind

```
Bloc Columns:
    .tw-columns-wrapper (base)
    .grid (layout)
    .grid-cols-{n} (responsive)
    .gap-{size} (espacement)
    .items-{align} (alignement vertical)
    .flex.flex-col-reverse (mobile inverse)

Bloc Column:
    .tw-column (base)
    .col-span-{n} (largeur personnalisée)
```

### Responsive Design

```css
Mobile (défaut):
    grid-cols-1
    
Tablet (768px+):
    md:grid-cols-2
    md:grid-cols-3
    
Desktop (1024px+):
    lg:grid-cols-3
    lg:grid-cols-4
    lg:grid-cols-5
    lg:grid-cols-6
```

## 🔌 Points d'extension

### 1. Filtres PHP

```php
// Modifier les classes du conteneur
apply_filters('tailwind_columns_wrapper_classes', $classes, $attributes)

// Modifier les classes d'une colonne
apply_filters('tailwind_columns_column_classes', $classes, $attributes)
```

### 2. Actions PHP

```php
// Après enregistrement des blocs
do_action('tailwind_columns_blocks_registered')
```

### 3. Variations JavaScript

```javascript
wp.blocks.registerBlockVariation('tailwind-columns/columns', {
    name: 'custom-variation',
    // ...
});
```

### 4. Patterns WordPress

```php
register_block_pattern('tailwind-columns/custom-pattern', [
    'title' => 'Custom Layout',
    'content' => '<!-- wp:tailwind-columns/columns -->...',
]);
```

## 🎯 Attributs des blocs

### Bloc Columns

| Attribut | Type | Défaut | Description |
|----------|------|--------|-------------|
| columnsCount | number | 2 | Nombre de colonnes (1-6) |
| gap | string | 'md' | Espacement entre colonnes |
| verticalAlignment | string | '' | Alignement vertical |
| reverseMobile | boolean | false | Inverser sur mobile |

### Bloc Column

| Attribut | Type | Défaut | Description |
|----------|------|--------|-------------|
| width | string | '' | Largeur personnalisée (col-span) |

## 🔐 Sécurité

### Sanitization des données

```php
// Entrées utilisateur
absint()      → Nombres entiers
esc_attr()    → Attributs HTML
esc_html()    → Contenu HTML

// Validation
in_array()    → Valeurs autorisées
```

### Échappement des sorties

```php
// Toujours dans render_*_block()
sprintf(
    '<div class="%s">%s</div>',
    esc_attr($class_string),  // Classes
    $content                   // Contenu (déjà échappé par WP)
);
```

## 🚀 Workflow de développement

### Installation

```bash
npm install          # Dépendances JavaScript
composer install     # Dépendances PHP (optionnel)
```

### Développement

```bash
npm start           # Watch mode
npm run build       # Production build
npm run format      # Format code
npm run lint:js     # Lint JavaScript
npm run lint:css    # Lint CSS
composer phpcs      # Lint PHP
```

### Déploiement

```bash
npm run build       # Build production
# Zipper le dossier sans node_modules
```

## 📊 Diagramme de composants

```
┌─────────────────────────────────────────────┐
│          WordPress Gutenberg                │
├─────────────────────────────────────────────┤
│                                             │
│  ┌──────────────────────────────────────┐  │
│  │   Tailwind Columns Block Plugin      │  │
│  │                                       │  │
│  │  ┌────────────┐    ┌─────────────┐  │  │
│  │  │  Columns   │◄───┤  InnerBlocks│  │  │
│  │  │   Block    │    └─────────────┘  │  │
│  │  └────────────┘                      │  │
│  │        │                             │  │
│  │        ├─── Column Block (1..6)     │  │
│  │        │                             │  │
│  │        └─── Inspector Controls       │  │
│  │                                       │  │
│  └──────────────────────────────────────┘  │
│                                             │
│  ┌──────────────────────────────────────┐  │
│  │        Tailwind CSS Engine           │  │
│  │   (Grid, Gap, Responsive utilities)  │  │
│  └──────────────────────────────────────┘  │
│                                             │
└─────────────────────────────────────────────┘
```

## 🎓 Concepts clés

### 1. InnerBlocks

Permet d'imbriquer des blocs à l'intérieur d'autres blocs.
- Columns utilise InnerBlocks pour contenir des Columns
- Column utilise InnerBlocks pour le contenu

### 2. Block Context

Le bloc Column connaît son parent via la propriété `parent` dans block.json.

### 3. Server-Side Rendering

Le rendu final est géré en PHP pour :
- Meilleure performance
- SEO optimisé
- Flexibilité côté serveur

### 4. Block Supports

Support natif WordPress pour :
- Alignement (wide, full)
- Couleurs (background, text)
- Espacement (margin, padding)
- Bordures

## 📈 Performance

### Optimisations

1. **CSS minimal** : Uniquement les classes utilisées
2. **Server-side rendering** : HTML statique
3. **No JavaScript frontend** : Pur CSS
4. **Asset optimization** : Minification en production

### Metrics attendues

- PageSpeed Score: 95+
- First Contentful Paint: < 1.8s
- Largest Contentful Paint: < 2.5s

## 🔮 Évolutions futures

### v1.1.0
- [ ] Présets de colonnes
- [ ] Variations visuelles
- [ ] Mode collapse mobile

### v1.2.0
- [ ] Animations GSAP
- [ ] Row span
- [ ] Breakpoints customs

### v2.0.0
- [ ] Masonry layout
- [ ] Sticky columns
- [ ] Advanced grid system

---

**Maintenu par UFO Agency**
