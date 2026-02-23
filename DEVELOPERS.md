# Documentation développeur - Tailwind Columns Block

## Architecture du plugin

### Structure des blocs

Le plugin est composé de deux blocs principaux :

1. **tailwind-columns/columns** : Le bloc conteneur
2. **tailwind-columns/column** : Le bloc colonne (enfant)

### Flux de données

```
User Input → Attributes → PHP Render Callback → HTML Output
          ↓
       Edit Component (React)
          ↓
       Save Component (React)
```

## Hooks et Filtres disponibles

### Filtres PHP

Vous pouvez modifier le comportement du plugin via des filtres WordPress :

```php
// Modifier les classes CSS du conteneur columns
add_filter( 'tailwind_columns_wrapper_classes', function( $classes, $attributes ) {
    $classes[] = 'my-custom-class';
    return $classes;
}, 10, 2 );

// Modifier les classes CSS d'une colonne
add_filter( 'tailwind_columns_column_classes', function( $classes, $attributes ) {
    $classes[] = 'my-custom-column-class';
    return $classes;
}, 10, 2 );
```

### Actions PHP

```php
// Action après l'enregistrement des blocs
add_action( 'tailwind_columns_blocks_registered', function() {
    // Votre code ici
} );
```

## Personnalisation avancée

### Ajouter des options de gap personnalisées

Dans `src/columns/edit.js`, modifiez l'array `options` du SelectControl :

```javascript
options={[
    // ... options existantes
    { label: __('Personnalisé (100px)', 'tailwind-columns-block'), value: '25' },
]}
```

Puis dans le CSS du bloc concerné (`src/ufo-grid/style.css` ou `src/ufo-row/style.css`), ajoutez :

```css
.gap-25 {
    gap: 6.25rem; /* 100px */
}
```

### Ajouter des breakpoints personnalisés

Modifiez le CSS du bloc concerné (`src/ufo-grid/style.css` ou `src/ufo-row/style.css`) pour ajouter des breakpoints :

```css
/* Extra large screens (xl:) */
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
    wp_dequeue_style( 'tailwind-columns-frontend' );
}, 100 );
```

## Intégration avec ACF ou autres plugins

### Utiliser dans un template ACF Flexible Content

```php
<?php if( have_rows('flexible_content') ): ?>
    <?php while( have_rows('flexible_content') ): the_row(); ?>
        <?php if( get_row_layout() == 'columns_layout' ): ?>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="tw-column">
                    <?php the_sub_field('column_1'); ?>
                </div>
                <div class="tw-column">
                    <?php the_sub_field('column_2'); ?>
                </div>
            </div>
        <?php endif; ?>
    <?php endwhile; ?>
<?php endif; ?>
```

## Performance

### Optimisations recommandées

1. **Minification CSS** : Le CSS est déjà minimal, mais vous pouvez le minifier davantage
2. **CDN** : Héberger les assets sur un CDN
3. **Cache** : Les blocs sont rendus côté serveur, utilisez un cache HTML
4. **Lazy loading** : Pour les images dans les colonnes

### Critical CSS

Si vous utilisez Critical CSS, incluez au minimum :

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
// Exemple de test avec Jest
import { render } from '@testing-library/react';
import Edit from '../edit';

test('renders columns wrapper', () => {
    const { container } = render(
        <Edit attributes={{ columnsCount: 2 }} setAttributes={() => {}} />
    );
    expect(container.querySelector('.tw-columns-wrapper')).toBeInTheDocument();
});
```

### Tests E2E avec Playwright (à implémenter)

```javascript
test('can insert columns block', async ({ page }) => {
    await page.goto('/wp-admin/post-new.php');
    await page.click('[aria-label="Add block"]');
    await page.fill('[placeholder="Search"]', 'Tailwind Columns');
    await page.click('text=Tailwind Columns');
    
    const columns = await page.locator('.tw-columns-wrapper');
    await expect(columns).toBeVisible();
});
```

## Debugging

### Mode debug

Activer les logs de debug :

```php
// Dans wp-config.php
define( 'TAILWIND_COLUMNS_DEBUG', true );
```

### Console logs dans l'éditeur

```javascript
// Dans edit.js
if ( window.TAILWIND_COLUMNS_DEBUG ) {
    console.log( 'Columns attributes:', attributes );
}
```

## Migration depuis core/columns

Si vous migrez depuis les blocs WordPress natifs :

```php
// Script de migration (à exécuter une seule fois)
function migrate_core_columns_to_tailwind() {
    $posts = get_posts([
        'post_type' => 'any',
        'posts_per_page' => -1,
        'post_status' => 'any',
    ]);
    
    foreach ( $posts as $post ) {
        $content = $post->post_content;
        
        // Remplacer les blocs
        $content = str_replace(
            '<!-- wp:columns',
            '<!-- wp:tailwind-columns/columns',
            $content
        );
        $content = str_replace(
            '<!-- wp:column',
            '<!-- wp:tailwind-columns/column',
            $content
        );
        
        // Mettre à jour le post
        wp_update_post([
            'ID' => $post->ID,
            'post_content' => $content,
        ]);
    }
}

// Décommenter pour exécuter
// add_action( 'admin_init', 'migrate_core_columns_to_tailwind' );
```

## Contribution

### Code Style

- PHP : PSR-12
- JavaScript : WordPress Coding Standards
- CSS : BEM naming convention

### Workflow Git

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## Support et Resources

- Documentation WordPress : https://developer.wordpress.org/block-editor/
- Tailwind CSS : https://tailwindcss.com/docs
- GitHub Issues : [URL du repo]

---

Maintenu par UFO Agency
