# Contribuer au projet Tailwind Columns Block

Merci de votre intérêt pour contribuer à ce projet ! 🎉

## 🌟 Comment contribuer

### Rapporter un bug

Si vous trouvez un bug, créez une issue avec :

1. **Titre clair** décrivant le problème
2. **Étapes pour reproduire** le bug
3. **Comportement attendu** vs comportement actuel
4. **Screenshots** si applicable
5. **Environnement** (WordPress version, PHP version, thème, navigateur)

### Proposer une fonctionnalité

Pour proposer une nouvelle fonctionnalité :

1. Vérifier qu'elle n'existe pas déjà dans les issues
2. Créer une issue détaillée avec :
   - Description de la fonctionnalité
   - Cas d'usage
   - Mockups ou exemples si possible
   - Impact sur les fonctionnalités existantes

### Soumettre du code

#### 1. Fork et clone

```bash
git clone https://github.com/votre-username/tailwind-columns-block.git
cd tailwind-columns-block
npm install
```

#### 2. Créer une branche

```bash
git checkout -b feature/ma-super-fonctionnalite
# ou
git checkout -b fix/correction-bug
```

**Convention de nommage :**
- `feature/` : Nouvelle fonctionnalité
- `fix/` : Correction de bug
- `docs/` : Documentation
- `refactor/` : Refactoring
- `test/` : Tests
- `chore/` : Maintenance

#### 3. Développer

```bash
# Mode développement avec watch
npm start

# Linter et formatter
npm run lint:js
npm run format
```

**Règles de code :**
- Suivre les [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/)
- Ajouter des commentaires pour les parties complexes
- Garder les fonctions courtes et ciblées
- Utiliser l'internationalisation (`__()`, `_e()`, etc.)

#### 4. Tester

Avant de soumettre :

```bash
# Build de production
npm run build

# Vérifier qu'il n'y a pas d'erreurs
npm run lint:js
npm run lint:css
```

**Tests manuels :**
- [ ] Le bloc s'insère correctement
- [ ] Toutes les options fonctionnent
- [ ] Responsive sur mobile/tablette/desktop
- [ ] Pas d'erreurs console
- [ ] Pas de conflits avec d'autres blocs
- [ ] Sauvegarde et chargement corrects

#### 5. Commit

**Convention de commit :**

```
type(scope): description courte

Description détaillée si nécessaire

Fixes #123
```

**Types :**
- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Documentation
- `style`: Formatting, missing semi colons, etc
- `refactor`: Refactoring du code
- `test`: Ajout de tests
- `chore`: Maintenance

**Exemples :**
```bash
git commit -m "feat(columns): add 7-column layout support"
git commit -m "fix(column): resolve width calculation on mobile"
git commit -m "docs(readme): update installation instructions"
```

#### 6. Push et Pull Request

```bash
git push origin feature/ma-super-fonctionnalite
```

Puis créer une Pull Request sur GitHub avec :

**Template de PR :**
```markdown
## Description
[Description claire de ce que fait la PR]

## Type de changement
- [ ] Bug fix
- [ ] Nouvelle fonctionnalité
- [ ] Breaking change
- [ ] Documentation

## Checklist
- [ ] Code respecte les standards WordPress
- [ ] Tests manuels effectués
- [ ] Documentation mise à jour
- [ ] CHANGELOG.md mis à jour
- [ ] Pas de conflits avec main

## Screenshots
[Si applicable]

## Issues liées
Fixes #[numéro]
```

## 📋 Standards de code

### PHP

```php
<?php
/**
 * Description de la fonction
 *
 * @param string $param Description du paramètre.
 * @return string Description du retour.
 */
function ma_fonction( $param ) {
    // Code...
    return $result;
}
```

### JavaScript

```javascript
/**
 * Description de la fonction
 *
 * @param {Object} attributes - Les attributs du bloc
 * @param {Function} setAttributes - Fonction pour modifier les attributs
 * @return {JSX.Element} Le composant React
 */
export default function Edit( { attributes, setAttributes } ) {
    // Code...
}
```

### CSS

```css
/* Utiliser BEM naming convention */
.tw-columns-wrapper {
    /* Propriétés... */
}

.tw-columns-wrapper__item {
    /* Propriétés... */
}

.tw-columns-wrapper--variant {
    /* Propriétés... */
}
```

## 🎨 Guidelines de design

- **Mobile-first** : Toujours penser mobile d'abord
- **Accessibilité** : Respecter les normes WCAG 2.1 AA minimum
- **Performance** : Optimiser les assets et le code
- **Simplicité** : Préférer la simplicité à la complexité

## 📝 Documentation

Toute nouvelle fonctionnalité doit inclure :

1. **Commentaires dans le code**
2. **Mise à jour du README.md**
3. **Mise à jour du DEVELOPERS.md** si technique
4. **Entrée dans CHANGELOG.md**
5. **Mise à jour des fichiers de traduction (.pot)**

## 🐛 Débogage

### Activer le mode debug WordPress

```php
// wp-config.php
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', false );
define( 'SCRIPT_DEBUG', true );
```

### Console logs

```javascript
// Dans le code JavaScript (à retirer avant PR)
console.log( 'Debug:', attributes );
```

### PHP logs

```php
// Dans le code PHP (à retirer avant PR)
error_log( print_r( $attributes, true ) );
```

## 🏗️ Structure du projet

```
src/
├── columns/          # Bloc conteneur
│   ├── block.json    # Métadonnées du bloc
│   ├── edit.js       # Composant d'édition
│   ├── save.js       # Composant de sauvegarde
│   ├── index.js      # Point d'entrée
│   ├── editor.css    # Styles éditeur
│   └── style.css     # Styles frontend
└── column/           # Bloc colonne
    └── [même structure]
```

## ❓ Questions

Si vous avez des questions :

1. Vérifier les [issues existantes](https://github.com/user/tailwind-columns-block/issues)
2. Consulter la documentation (README.md, DEVELOPERS.md)
3. Créer une nouvelle issue avec le label `question`

## 📜 Code de conduite

- Être respectueux et professionnel
- Accepter les critiques constructives
- Se concentrer sur ce qui est meilleur pour le projet
- Faire preuve d'empathie envers les autres contributeurs

## 🎯 Priorités actuelles

Consultez le [project board](https://github.com/user/tailwind-columns-block/projects) pour voir les priorités actuelles.

## 🙏 Remerciements

Merci à tous les contributeurs qui rendent ce projet possible !

---

**Note :** En contribuant à ce projet, vous acceptez que votre code soit distribué sous licence GPL v2 or later.
