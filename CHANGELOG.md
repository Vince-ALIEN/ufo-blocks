# Changelog

Tous les changements notables de ce projet seront documentés dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
