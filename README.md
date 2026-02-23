# Tailwind Columns Block

Plugin WordPress Gutenberg pour créer un système de colonnes responsive utilisant Tailwind CSS.

## 🎯 Fonctionnalités

- ✅ Système de colonnes responsive (1 à 6 colonnes)
- ✅ Gestion de l'espacement (gap) entre colonnes
- ✅ Alignement vertical des colonnes
- ✅ Option pour inverser l'ordre des colonnes sur mobile
- ✅ Largeurs personnalisées pour chaque colonne (système de grille 12 colonnes)
- ✅ Support des blocs imbriqués (InnerBlocks)
- ✅ Compatible avec les thèmes WordPress
- ✅ Respect des meilleures pratiques WordPress
- ✅ API Block v3

## 📦 Installation

### Prérequis

- WordPress 6.0+
- PHP 7.4+
- Node.js 18+ et npm

### Étapes d'installation

1. **Cloner ou télécharger le plugin**
   ```bash
   cd wp-content/plugins
   git clone [url-du-repo] tailwind-columns-block
   cd ufo-blocks
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Compiler le plugin**
   ```bash
   npm run build
   ```

4. **Activer le plugin**
   - Aller dans WordPress Admin > Extensions
   - Activer "Tailwind Columns Block"

## 🚀 Utilisation

### Développement

Pour le développement avec rechargement automatique :

```bash
npm start
```

Pour la production :

```bash
npm run build
```

### Dans l'éditeur Gutenberg

1. Cliquer sur le bouton "+" pour ajouter un bloc
2. Rechercher "Tailwind Columns"
3. Configurer le nombre de colonnes et les options
4. Ajouter du contenu dans chaque colonne

### Options disponibles

#### Bloc Columns

- **Nombre de colonnes** : 1 à 6 colonnes
- **Espacement (Gap)** : 
  - Aucun (0px)
  - Très petit (4px)
  - Petit (8px)
  - Moyen (16px)
  - Moyen-large (24px)
  - Large (32px)
  - Très large (40px)
  - Extra large (48px)
  - XXL (64px)
- **Alignement vertical** : Haut, Centre, Bas
- **Inverser sur mobile** : Active/Désactive

#### Bloc Column

- **Largeur personnalisée** : 
  - Auto (répartition égale)
  - 1/12 à 12/12 (système de grille)

## 🎨 Intégration avec Tailwind CSS

### Option 1 : Utilisation du CSS fourni (par défaut)

Le plugin inclut un fichier CSS avec les classes Tailwind nécessaires. Aucune configuration supplémentaire n'est requise.

### Option 2 : Intégration complète de Tailwind CSS

Si votre thème utilise déjà Tailwind CSS, vous pouvez désactiver le CSS du plugin et utiliser votre configuration Tailwind.

1. **Désactiver le CSS du plugin** dans `tailwind-columns-block.php` :
   ```php
   // Commenter cette ligne
   // wp_enqueue_style( 'tailwind-columns-frontend', ... );
   ```

2. **Ajouter les classes au safelist** de votre `tailwind.config.js` :
   ```javascript
   module.exports = {
     content: [
       './wp-content/plugins/tailwind-columns-block/**/*.php',
       './wp-content/plugins/tailwind-columns-block/**/*.js',
     ],
     safelist: [
       'grid',
       'grid-cols-1',
       'gap-0',
       'gap-1',
       'gap-2',
       'gap-4',
       'gap-6',
       'gap-8',
       'gap-10',
       'gap-12',
       'gap-16',
       'items-start',
       'items-center',
       'items-end',
       'flex',
       'flex-col-reverse',
       'md:grid',
       'md:grid-cols-2',
       'md:grid-cols-3',
       'lg:grid-cols-3',
       'lg:grid-cols-4',
       'lg:grid-cols-5',
       'lg:grid-cols-6',
       {
         pattern: /col-span-(1|2|3|4|5|6|7|8|9|10|11|12)/,
       },
     ],
   }
   ```

## 📝 Structure des fichiers

```
tailwind-columns-block/
├── build/                        # Fichiers compilés (généré)
│   ├── columns/
│   └── column/
├── src/
│   ├── columns/                  # Bloc Columns
│   │   ├── block.json
│   │   ├── index.js
│   │   ├── edit.js
│   │   ├── save.js
│   │   ├── editor.css
│   │   └── style.css
│   └── column/                   # Bloc Column
│       ├── block.json
│       ├── index.js
│       ├── edit.js
│       ├── save.js
│       ├── editor.css
│       └── style.css
├── tailwind-columns-block.php    # Fichier principal
├── package.json
└── README.md
```

## 🔧 Commandes NPM

- `npm start` : Mode développement avec watch
- `npm run build` : Compilation pour production
- `npm run format` : Formatage du code
- `npm run lint:css` : Lint des fichiers CSS
- `npm run lint:js` : Lint des fichiers JavaScript

## 🎯 Bonnes pratiques implémentées

- ✅ Utilisation de `block.json` (API Block v3)
- ✅ Rendu côté serveur (Server-Side Rendering)
- ✅ Internationalisation (i18n)
- ✅ InnerBlocks pour les blocs imbriqués
- ✅ InspectorControls pour les options
- ✅ BlockControls pour les outils rapides
- ✅ Support des attributs WordPress (align, color, spacing, border)
- ✅ Classes CSS BEM-like
- ✅ Responsive design mobile-first
- ✅ Code documenté et commenté
- ✅ Architecture modulaire

## 🔒 Sécurité

- Échappement des attributs avec `esc_attr()`
- Validation des entrées utilisateur
- Utilisation de `absint()` pour les nombres
- Préfixes de fonctions et classes

## 🌐 Compatibilité

- WordPress 6.0+
- PHP 7.4+
- Navigateurs modernes (Chrome, Firefox, Safari, Edge)
- Support de Grid CSS (avec fallback flexbox)

## 📄 Licence

GPL v2 or later

## 👨‍💻 Auteur

UFO Agency - https://ufo-agency.com

## 🤝 Support

Pour toute question ou problème :
- Créer une issue sur GitHub
- Contact : [email]

## 🚀 Améliorations futures

- [ ] Support de présets de colonnes (ex: 70/30, 60/40)
- [ ] Options d'animation GSAP
- [ ] Support de colonnes collapsables sur mobile
- [ ] Mode grille avancé avec row span
- [ ] Variations de blocs pré-configurées
- [ ] Support de breakpoints personnalisés
- [ ] Mode debug pour visualiser la grille

## 📚 Ressources

- [Documentation WordPress Block Editor](https://developer.wordpress.org/block-editor/)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)
- [InnerBlocks Documentation](https://developer.wordpress.org/block-editor/reference-guides/components/inner-blocks/)

---

Développé avec ❤️ par UFO Agency
