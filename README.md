# UFO Blocks

Plugin WordPress Gutenberg proposant un ensemble de blocs de mise en page et de contenu responsive utilisant Tailwind CSS.

## Blocs disponibles

| Bloc | Nom technique | Description |
|---|---|---|
| ufo Grid | `ufo-blocks/ufo-grid` | Conteneur de grille CSS responsive |
| ufo Row | `ufo-blocks/ufo-row` | Cellule de grille (enfant direct de ufo Grid) |
| UFO Button | `ufo-blocks/ufo-button` | Bouton personnalisable avec icônes Lucide |
| ufo Buttons | `ufo-blocks/ufo-buttons-group` | Groupe de boutons avec alignement |
| ufo FAQ | `ufo-blocks/ufo-faq` | Accordéon FAQ avec Schema.org JSON-LD |
| ufo FAQ Item | `ufo-blocks/ufo-faq-item` | Élément question/réponse (enfant de ufo FAQ) |
| UFO Icon | `ufo-blocks/ufo-icon` | Icône Lucide avec alignement et couleur thème |
| UFO Time | `ufo-blocks/ufo-time` | Élément `<time>` stylisé |
| ufo Title | `ufo-blocks/ufo-title` | Titre avec icône et fond arrondi |

## Installation

### Prérequis

- WordPress 6.1+
- PHP 7.4+
- Node.js 18+ et npm

### Étapes d'installation

1. Cloner le dépôt dans `wp-content/plugins/`
   ```bash
   cd wp-content/plugins
   git clone https://github.com/Vince-ALIEN/ufo-blocks.git
   cd ufo-blocks
   ```

2. Installer les dépendances
   ```bash
   npm install
   ```

3. Compiler le plugin
   ```bash
   npm run build
   ```

4. Activer le plugin dans **WordPress Admin → Extensions → UFO Blocks**

## Intégration Tailwind CSS

Le plugin ne génère pas de CSS : il faut un thème WordPress intégrant **Tailwind CSS v4**.

Ajouter ces directives dans le fichier CSS principal du thème pour que Tailwind scanne les sources du plugin et inclue toutes les classes utilitaires dans le build :

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

/* ufo-grid — hauteur fixe */
@source inline("h-{24,32,40,48,56,64,72,80,96,9/10}");

@source inline("gap-{0,1,2,3,4,5,6,7,8}");
@source inline("md:grid-cols-{1,2,3,4,5,6}");
@source inline("grid-rows-{1,2,3,4,5,6}");
@source inline("px-{0,2,4,6,8,10,12,14,16}");
@source inline("py-{0,2,4,6,8,10,12,14,16}");
@source inline("min-h-{32,48,64,80,96,192}");
@source inline("rounded-{sm,md,lg,xl,2xl,3xl}");
```

Les `@source inline(...)` sont nécessaires pour les classes générées dynamiquement (ex. `md:col-span-3`) que Tailwind ne peut pas détecter par scan de fichiers.

## Utilisation

### Développement

```bash
npm start       # Watch mode avec rechargement automatique
npm run build   # Build de production
```

### Dans l'éditeur Gutenberg

1. Cliquer sur **"+"** pour ajouter un bloc
2. Rechercher le bloc dans la catégorie **"UFO Blocks"**
3. Configurer via le panneau latéral

## Référence des attributs

### ufo Grid (`ufo-blocks/ufo-grid`)

Conteneur de grille CSS. Accepte uniquement des blocs `ufo Row` comme enfants directs.

| Attribut | Type | Défaut | Description |
|---|---|---|---|
| columnsCount | number | 2 | Nombre de colonnes (desktop) |
| rowsCount | number | 0 | Nombre de lignes (0 = auto) |
| gap | string | '4' | Espacement entre cellules (0–8) |
| verticalAlignment | string | '' | Alignement vertical des cellules |
| reverseMobile | boolean | false | Inverser l'ordre sur mobile |
| equalRows | boolean | true | Lignes de hauteur égale (`auto-rows-fr`) |
| minHeight | string | '' | Hauteur minimale |
| borderRadius | string | '' | Arrondi des coins |
| isBoxed | boolean | false | Conteneur centré avec largeur max |
| backgroundImage | object | — | Image de fond (url, id, alt) |
| backgroundSize | string | 'cover' | Taille de l'image de fond |
| backgroundPosition | string | 'center center' | Position de l'image de fond |
| backgroundVideo | object | — | Vidéo de fond (url, id) |
| paddingX | string | '0' | Padding horizontal (0–16) |
| paddingY | string | '0' | Padding vertical (0–16) |

### ufo Row (`ufo-blocks/ufo-row`)

Cellule de grille. Doit être enfant direct d'un `ufo Grid`.

| Attribut | Type | Défaut | Description |
|---|---|---|---|
| colSpan | string | '' | Nombre de colonnes occupées |
| colStart | string | '' | Colonne de départ |
| colEnd | string | '' | Colonne de fin |
| rowSpan | string | '' | Nombre de lignes occupées |
| rowStart | string | '' | Ligne de départ |
| rowEnd | string | '' | Ligne de fin |
| verticalAlignment | string | '' | Alignement vertical du contenu |
| minHeight | string | '' | Hauteur minimale |
| height | string | '' | Hauteur fixe |
| paddingX | string | '0' | Padding horizontal (0–16) |
| paddingY | string | '0' | Padding vertical (0–16) |
| borderRadius | string | '' | Arrondi des coins |
| backgroundImage | object | — | Image de fond (url, id, alt) |
| backgroundSize | string | 'cover' | Taille de l'image de fond |
| backgroundPosition | string | 'center center' | Position de l'image de fond |

## Structure des fichiers

```
ufo-blocks/
├── build/                    # Fichiers compilés (généré par npm run build)
├── includes/
│   ├── lcp-hero.php          # Optimisation LCP (fetchpriority, preload)
│   ├── ufo-blocks-icons.php  # Helpers SVG pour le bloc button
│   └── ufo-faq-schema.php    # JSON-LD Schema.org FAQ
├── src/
│   ├── shared/               # Utilitaires partagés entre blocs
│   ├── ufo-grid/             # Conteneur de grille
│   │   ├── block.json
│   │   ├── shared.js         # getWrapperClasses(), getInnerClasses(), getWrapperStyle()
│   │   ├── inspector.js
│   │   ├── edit.js / save.js
│   │   └── editor.css / style.css
│   ├── ufo-row/              # Cellule de grille
│   │   ├── block.json
│   │   ├── shared.js         # getTailwindClasses(), getBlockStyle()
│   │   ├── inspector.js
│   │   ├── edit.js / save.js
│   │   └── editor.css / style.css
│   ├── ufo-button/           # Bouton avec icône Lucide
│   ├── ufo-buttons-group/    # Groupe de boutons
│   ├── ufo-faq/              # FAQ accordéon + Schema.org
│   ├── ufo-faq-item/         # Élément FAQ
│   ├── ufo-icon/             # Icône Lucide
│   ├── ufo-time/             # Élément <time>
│   ├── ufo-title/            # Titre avec icône
│   └── icons.js
├── ufo-blocks.php            # Fichier principal du plugin
├── package.json
└── webpack.config.js
```

## Commandes NPM

| Commande | Description |
|---|---|
| `npm start` | Mode développement avec watch |
| `npm run build` | Compilation pour production |
| `npm run format` | Formatage du code |
| `npm run lint:css` | Lint des fichiers CSS |
| `npm run lint:js` | Lint des fichiers JavaScript |
| `npm run plugin-zip` | Générer l'archive du plugin |

## Compatibilité

- WordPress 6.1+
- PHP 7.4+
- Navigateurs modernes (Chrome, Firefox, Safari, Edge)

## Licence

GPL v2 or later

## Auteur

UFO Agency — https://ufo-agency.com

## Support

Issues GitHub : https://github.com/Vince-ALIEN/ufo-blocks/issues
