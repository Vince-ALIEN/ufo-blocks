# Contribuer au projet UFO Blocks

Merci de votre intérêt pour contribuer à ce projet !

## Comment contribuer

### Rapporter un bug

Créer une issue sur https://github.com/Vince-ALIEN/ufo-blocks/issues avec :

1. **Titre clair** décrivant le problème
2. **Étapes pour reproduire** le bug
3. **Comportement attendu** vs comportement actuel
4. **Screenshots** si applicable
5. **Environnement** (version WordPress, PHP, thème, navigateur)

### Proposer une fonctionnalité

Créer une issue détaillée avec :
- Description de la fonctionnalité
- Cas d'usage concret
- Mockups ou exemples si possible

### Soumettre du code

#### 1. Cloner et installer

```bash
git clone https://github.com/Vince-ALIEN/ufo-blocks.git
cd ufo-blocks
npm install
```

#### 2. Créer une branche

```bash
git checkout -b feature/ma-fonctionnalite
# ou
git checkout -b fix/correction-bug
```

**Convention de nommage :**
- `feature/` : Nouvelle fonctionnalité
- `fix/` : Correction de bug
- `docs/` : Documentation
- `refactor/` : Refactoring
- `chore/` : Maintenance

#### 3. Développer

```bash
npm start           # Mode watch
npm run lint:js     # Vérifier le JavaScript
npm run format      # Formatter le code
```

**Règles de code :**
- Suivre les [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/)
- Utiliser l'internationalisation (`__()`, `_e()`, etc.)
- Garder les fonctions courtes et ciblées

#### 4. Tester

```bash
npm run build       # Build de production
npm run lint:js     # Pas d'erreurs JS
npm run lint:css    # Pas d'erreurs CSS
```

**Tests manuels :**
- [ ] Le bloc `ufo Grid` s'insère correctement
- [ ] Le bloc `ufo Row` s'insère uniquement dans `ufo Grid`
- [ ] Toutes les options du panneau latéral fonctionnent
- [ ] Responsive sur mobile/tablette/desktop
- [ ] Pas d'erreurs console
- [ ] Sauvegarde et rechargement corrects

#### 5. Convention de commit

```
type(scope): description courte

Description détaillée si nécessaire

Fixes #123
```

**Types :**
- `feat` : Nouvelle fonctionnalité
- `fix` : Correction de bug
- `docs` : Documentation
- `refactor` : Refactoring
- `test` : Tests
- `chore` : Maintenance

**Exemples :**
```bash
git commit -m "feat(ufo-grid): add sticky background option"
git commit -m "fix(ufo-row): resolve col-span calculation on mobile"
git commit -m "docs(readme): update installation instructions"
```

#### 6. Pull Request

```bash
git push origin feature/ma-fonctionnalite
```

Créer une Pull Request sur GitHub avec :
- Description claire du changement
- Type de changement (bug fix, feature, docs…)
- Checklist de tests manuels effectués
- Screenshots si applicable
- Numéro d'issue lié (`Fixes #123`)

## Standards de code

### PHP

```php
<?php
/**
 * Description de la fonction.
 *
 * @param string $param Description du paramètre.
 * @return string Description du retour.
 */
function ufo_blocks_ma_fonction( $param ) {
    return esc_html( $param );
}
```

### JavaScript

```javascript
/**
 * @param {Object} attributes     Les attributs du bloc
 * @param {Function} setAttributes Fonction pour modifier les attributs
 * @return {JSX.Element}
 */
export default function Edit( { attributes, setAttributes } ) {
    // ...
}
```

## Débogage

```php
// wp-config.php
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', false );
define( 'SCRIPT_DEBUG', true );
```

## Documentation

Toute nouvelle fonctionnalité doit inclure :

1. Mise à jour du `README.md` (attributs, usage)
2. Mise à jour de `DEVELOPERS.md` si technique
3. Entrée dans `CHANGELOG.md`

---

**Note :** En contribuant à ce projet, vous acceptez que votre code soit distribué sous licence GPL v2 or later.
