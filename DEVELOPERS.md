# Documentation développeur — UFO Blocks

## Structure des blocs

Le plugin est composé de deux blocs :

1. **ufo-blocks/ufo-grid** : Conteneur de grille CSS
2. **ufo-blocks/ufo-row** : Cellule de grille (enfant obligatoire)

## Personnalisation avancée

### Ajouter des valeurs de gap

Dans `src/ufo-grid/edit.js`, modifiez le `SelectControl` du gap :

```javascript
options={[
    // ... options existantes
    { label: __('Très grand (5rem)', 'ufo-blocks'), value: '20' },
]}
```

Puis dans `src/ufo-grid/style.css` :

```css
.gap-20 {
    gap: 5rem;
}
```

### Ajouter des breakpoints personnalisés

Dans `src/ufo-grid/style.css` ou `src/ufo-row/style.css` :

```css
@media (min-width: 1280px) {
    .xl\:grid-cols-4 {
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }
}
```

### Désactiver le CSS du plugin

Si votre thème inclut déjà Tailwind CSS :

```php
// Dans functions.php de votre thème
add_action( 'wp_enqueue_scripts', function() {
    wp_dequeue_style( 'ufo-grid-style' );
    wp_dequeue_style( 'ufo-row-style' );
}, 100 );
```

## Performance

### Optimisations recommandées

1. **Cache HTML** : Les blocs produisent du HTML statique, activez un cache de page
2. **CDN** : Héberger les assets compilés sur un CDN
3. **Lazy loading** : Pour les images dans les cellules

### Critical CSS minimal

```css
.grid { display: grid; }
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.gap-4 { gap: 1rem; }
@media (min-width: 768px) {
    .md\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
```

## Tests

### Tests unitaires (à implémenter)

```javascript
import { render } from '@testing-library/react';
import Edit from '../edit';

test('renders ufo-grid wrapper', () => {
    const { container } = render(
        <Edit attributes={{ columnsCount: 2 }} setAttributes={() => {}} />
    );
    expect(container.querySelector('.ufo-grid')).toBeInTheDocument();
});
```

### Tests E2E avec Playwright (à implémenter)

```javascript
test('can insert ufo-grid block', async ({ page }) => {
    await page.goto('/wp-admin/post-new.php');
    await page.click('[aria-label="Add block"]');
    await page.fill('[placeholder="Search"]', 'ufo Grid');
    await page.click('text=ufo Grid');

    const grid = await page.locator('.ufo-grid');
    await expect(grid).toBeVisible();
});
```

## Debugging

### Mode debug WordPress

```php
// wp-config.php
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', false );
define( 'SCRIPT_DEBUG', true );
```

### Console logs dans l'éditeur

```javascript
// Dans edit.js (à retirer avant commit)
console.log( 'ufo-grid attributes:', attributes );
```

## Contribution

### Code Style

- PHP : WordPress Coding Standards
- JavaScript : WordPress Coding Standards
- CSS : classes utilitaires Tailwind

### Workflow Git

1. Créer une branche `feature/` ou `fix/`
2. Développer avec `npm start`
3. Builder avec `npm run build`
4. Ouvrir une Pull Request sur https://github.com/Vince-ALIEN/ufo-blocks

## Support

- Documentation WordPress : https://developer.wordpress.org/block-editor/
- Tailwind CSS : https://tailwindcss.com/docs
- Issues GitHub : https://github.com/Vince-ALIEN/ufo-blocks/issues

---

Maintenu par UFO Agency
