# UFO Blocks

Plugin WordPress Gutenberg proposant un ensemble de blocs de mise en page responsive utilisant Tailwind CSS.

## Fonctionnalités

- Système de grille CSS complet (1 à 6+ colonnes)
- Contrôle avancé du placement (col-span, col-start, col-end, row-span, row-start, row-end)
- Espacement (gap) entre cellules
- Alignement vertical des cellules
- Inversion de l'ordre sur mobile
- Image et vidéo de fond par bloc
- Hauteur minimale, border-radius, mode boxed
- Padding horizontal et vertical indépendants
- Support des blocs imbriqués (InnerBlocks)
- Compatible avec les thèmes WordPress
- API Block v3

## Installation

### Prérequis

- WordPress 6.1+
- PHP 7.0+
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

## Utilisation

### Développement

```bash
npm start       # Watch mode avec rechargement automatique
npm run build   # Build de production
```

### Dans l'éditeur Gutenberg

1. Cliquer sur **"+"** pour ajouter un bloc
2. Rechercher **"ufo Grid"** dans la catégorie **"UFO Blocks"**
3. Configurer la grille dans le panneau latéral
4. Ajouter des blocs **"ufo Row"** à l'intérieur

### Blocs disponibles

#### ufo Grid (`ufo-blocks/ufo-grid`)

Conteneur de grille CSS. Accepte uniquement des blocs `ufo Row` comme enfants directs.

| Attribut | Type | Défaut | Description |
|---|---|---|---|
| columnsCount | number | 2 | Nombre de colonnes |
| rowsCount | number | 0 | Nombre de lignes (0 = auto) |
| gap | string | '4' | Espacement entre cellules (0–8) |
| verticalAlignment | string | '' | Alignement vertical des cellules |
| reverseMobile | boolean | false | Inverser l'ordre sur mobile |
| minHeight | string | '' | Hauteur minimale |
| borderRadius | string | '' | Arrondi des coins |
| isBoxed | boolean | false | Conteneur centré avec largeur max |
| backgroundImage | object | — | Image de fond (url, id, alt) |
| backgroundSize | string | 'cover' | Taille de l'image de fond |
| backgroundPosition | string | 'center center' | Position de l'image de fond |
| backgroundVideo | object | — | Vidéo de fond (url, id) |
| paddingX | string | '0' | Padding horizontal (0–16) |
| paddingY | string | '0' | Padding vertical (0–16) |

#### ufo Row (`ufo-blocks/ufo-row`)

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
├── build/                  # Fichiers compilés (généré par npm run build)
│   ├── ufo-grid/
│   └── ufo-row/
├── src/
│   ├── ufo-grid/           # Bloc conteneur de grille
│   │   ├── block.json
│   │   ├── index.js
│   │   ├── edit.js
│   │   ├── save.js
│   │   ├── editor.css
│   │   └── style.css
│   ├── ufo-row/            # Bloc cellule de grille
│   │   ├── block.json
│   │   ├── index.js
│   │   ├── edit.js
│   │   ├── save.js
│   │   ├── editor.css
│   │   └── style.css
│   └── icons.js
├── ufo-blocks.php          # Fichier principal du plugin
├── package.json
└── README.md
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

## Intégration Tailwind CSS

Le plugin n'inclut pas de CSS, il faut impérativement travailler avec un theme intégrant Tailwind css V4 :

/**
 * On pointe Tailwind vers les fichiers source du plugin
 * pour qu'il scanne et inclue toutes leurs classes dans le build du thème.
 */
@source "../../../plugins/ufo-blocks/src/**/*.js";

## Compatibilité

- WordPress 6.1+
- PHP 7.0+
- Navigateurs modernes (Chrome, Firefox, Safari, Edge)

## Licence

GPL v2 or later

## Auteur

UFO Agency — https://ufo-agency.com

## Support

- Issues GitHub : https://github.com/Vince-ALIEN/ufo-blocks/issues
