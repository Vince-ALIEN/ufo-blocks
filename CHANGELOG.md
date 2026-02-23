# Changelog

Tous les changements notables de ce projet seront documentés dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-02-01

### Ajouté
- Bloc Columns pour créer des layouts en colonnes
- Bloc Column pour les colonnes individuelles
- Support de 1 à 6 colonnes responsive
- Contrôle de l'espacement (gap) entre colonnes (9 options)
- Alignement vertical des colonnes (haut, centre, bas)
- Option pour inverser l'ordre des colonnes sur mobile
- Système de grille 12 colonnes pour largeurs personnalisées
- Support des InnerBlocks pour contenu imbriqué
- CSS Tailwind optimisé inclus
- Internationalisation (i18n/l10n)
- Documentation complète (README, DEVELOPERS)
- Support des attributs WordPress (align, color, spacing, border)

### Sécurité
- Échappement de toutes les sorties
- Validation des attributs
- Sanitization des données

## [À venir]

### Prévu pour v1.1.0
- Présets de colonnes (70/30, 60/40, etc.)
- Variations de blocs pré-configurées
- Support de colonnes collapsables
- Mode debug visuel

### Prévu pour v1.2.0
- Intégration GSAP pour animations
- Row span pour grilles complexes
- Breakpoints personnalisables
- Export/import de configurations

### Idées futures
- Support de masonry layout
- Colonnes sticky
- Animations au scroll
- Parallax entre colonnes
- Mode grid avancé

---

## Notes de version

### v1.0.0 - Version initiale

Cette première version stable inclut toutes les fonctionnalités de base pour créer des layouts en colonnes professionnels avec Tailwind CSS dans Gutenberg.

**Points forts :**
- Architecture solide et extensible
- Code conforme aux standards WordPress
- Performance optimisée
- Documentation complète

**Limitations connues :**
- Pas de support d'animations (prévu pour v1.2.0)
- Pas de présets visuels (prévu pour v1.1.0)
- Breakpoints fixes (personnalisation prévue pour v1.2.0)

**Migration :**
- Aucune migration requise (première version)

**Compatibilité :**
- WordPress 6.0+
- PHP 7.4+
- Testé jusqu'à WordPress 6.7
- Compatible avec les principaux thèmes WordPress
