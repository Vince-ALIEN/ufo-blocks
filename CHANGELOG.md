# Changelog

Tous les changements notables de ce projet seront documentés dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.5.0] - 2026-06-23

### Ajouté
- Bloc `ufo-button` : bouton personnalisable avec styles Tailwind et icônes Lucide (rendu serveur via `render.php`)
- Bloc `ufo-buttons-group` : conteneur pour regrouper plusieurs boutons avec alignement
- Bloc `ufo-faq` : accordéon FAQ avec données structurées Schema.org pour le SEO
- Bloc `ufo-faq-item` : élément FAQ question/réponse (InnerBlocks), enfant de `ufo-faq`
- Bloc `ufo-icon` : affichage d'une icône Lucide avec alignement et couleur du thème (rendu serveur)
- Bloc `ufo-time` : élément `<time>` stylisé avec point décoratif et séparateur
- Bloc `ufo-title` : titre avec icône et fond arrondi (rendu serveur)
- Attribut `equalRows` (boolean, défaut `true`) sur `ufo-grid` : force des lignes de hauteur égale via `md:auto-rows-fr`
- `src/ufo-grid/inspector.js` et `src/ufo-row/inspector.js` : panneaux de contrôles extraits de `edit.js`
- `includes/lcp-hero.php` : optimisation LCP pour le bloc hero (fetchpriority, preload)
- `includes/ufo-blocks-icons.php` : helpers SVG pour le rendu dynamique du bloc button
- `includes/ufo-faq-schema.php` : génération du JSON-LD Schema.org FAQ
- Fichier `.distignore` pour le packaging via `plugin-zip`

### Modifié
- `ufo-blocks.php` : enregistrement de tous les nouveaux blocs ; nettoyage du code de debug FAQ
- `ufo-row` : attribut `height` pour hauteur fixe (classes `h-{24,32,…}`) en plus de `minHeight`
- Correction du `Requires PHP` header (`7.0` → `7.4`) et du `@package` (`CreateBlock` → `UfoBlocks`)
- Renommage `composer.json` : `ufo-agency/tailwind-columns-block` → `ufo-agency/ufo-blocks`
- Mise à jour des préfixes PHPCS (`TailwindColumnsBlock` → `UfoBlocks`, `tailwind_columns` → `ufo_`)
- `webpack.config.js` : ajout des points d'entrée pour tous les nouveaux blocs

### Refactoré
- Extraction de la logique de classes CSS partagée entre `edit.js` et `save.js`
  - `src/ufo-grid/shared.js` : `getWrapperClasses()`, `getInnerClasses()`, `getWrapperStyle()`
  - `src/ufo-row/shared.js` : `getTailwindClasses()`, `getBlockStyle()`
  - Les 4 fichiers `edit.js`/`save.js` concernés utilisent désormais les helpers partagés

## [0.1.3] - 2026-02-23

### Corrigé
- Ajout d'un guard `file_exists()` avant l'inclusion de `build/ufo-faq-frontend.asset.php`
  pour éviter des warnings PHP fatals quand le bloc `ufo-faq` n'est pas encore compilé

## [0.1.0] - 2025

### Ajouté
- Bloc `ufo-grid` : conteneur de grille CSS responsive (1 à 6+ colonnes)
- Bloc `ufo-row` : cellule de grille avec contrôle col-span, col-start, col-end, row-span, row-start, row-end
- Contrôle du gap entre cellules (9 niveaux)
- Alignement vertical des cellules
- Option pour inverser l'ordre des cellules sur mobile
- Image de fond et vidéo de fond par bloc
- Hauteur minimale et hauteur fixe
- Border-radius personnalisable
- Mode boxed (conteneur centré)
- Padding horizontal et vertical indépendants
- Catégorie de blocs personnalisée `ufo-blocks`
- Internationalisation (i18n/l10n)
- API Block v3

### Sécurité
- Échappement de toutes les sorties
- Validation des attributs
- Sanitization des données
