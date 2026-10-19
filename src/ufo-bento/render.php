<?php
/**
 * Server-side rendering of the `ufo-blocks/ufo-bento` block.
 * Structure basée sur le template Tailwind Plus Bento Grid.
 *
 * Ligne 1 : 2 × md:col-span-3
 * Ligne 2 : les éléments restants se partagent les 6 colonnes
 *           (3 → 1 × col-span-6, 4 → 2 × col-span-3, 5 → 3 × col-span-2)
 *
 * Variables disponibles : $attributes, $content, $block.
 */

// Types de contenu autorisés : l'attribut vient du contenu du bloc, on ne
// requête jamais un type arbitraire (privé, non public…).
$allowed_post_types = array('page', 'post', 'realisation');

$post_type = isset($attributes['postType']) ? (string) $attributes['postType'] : 'page';
if (!in_array($post_type, $allowed_post_types, true) || !post_type_exists($post_type) || !is_post_type_viewable($post_type)) {
    $post_type = 'page';
}

$page_category  = absint($attributes['pageCategory'] ?? 0);
$post_category  = absint($attributes['postCategory'] ?? 0);
$admin_category = absint($attributes['adminCategory'] ?? 0);
$posts_to_show  = min(5, max(1, absint($attributes['postsToShow'] ?? 5)));

// Configuration des attributs du wrapper
$wrapper_attributes = get_block_wrapper_attributes(array(
    'class' => 'ufo-bento-container',
));

// Helper : taxonomie de catégories selon le type de contenu
if (!function_exists('ufo_bento_taxonomy')) {
    function ufo_bento_taxonomy($post_type) {
        $taxonomies = array(
            'page'        => 'page_category',
            'post'        => 'category',
            'realisation' => 'type_realisation',
        );
        $taxonomy = $taxonomies[$post_type] ?? '';

        return ($taxonomy && taxonomy_exists($taxonomy)) ? $taxonomy : '';
    }
}

// Helper : récupérer les catégories d'un post
if (!function_exists('ufo_bento_get_categories')) {
    function ufo_bento_get_categories($post_id, $taxonomy) {
        if (!$taxonomy) {
            return '';
        }

        $terms = get_the_terms($post_id, $taxonomy);
        if (!$terms || is_wp_error($terms)) {
            return '';
        }

        $html = '';
        foreach ($terms as $term) {
            $link = get_term_link($term);
            if (is_wp_error($link)) {
                continue;
            }
            $html .= sprintf(
                '<a href="%s" class="not-prose no-underline text-xs/4 font-semibold text-white bg-primary rounded-full px-2 py-px hover:text-gray-100 transition">%s</a> ',
                esc_url($link),
                esc_html($term->name)
            );
        }
        return $html;
    }
}

// Helper : col-span selon la position (classes écrites en entier pour Tailwind)
if (!function_exists('ufo_bento_col_span')) {
    function ufo_bento_col_span($index, $total) {
        if ($total === 1) {
            return 'md:col-span-6';
        }
        if ($index < 2) {
            return 'md:col-span-3';
        }
        $spans = array(1 => 'md:col-span-6', 2 => 'md:col-span-3', 3 => 'md:col-span-2');
        return $spans[$total - 2];
    }
}

// Helper : classes d'arrondi des coins extérieurs de la grille
if (!function_exists('ufo_bento_corner_classes')) {
    function ufo_bento_corner_classes($index, $total) {
        // [fond, contenu] — le contenu est arrondi d'1px de plus que le fond
        $corner = array(
            'top'    => array('max-md:rounded-t-4xl', 'max-md:rounded-t-[calc(2rem+1px)]'),
            'bottom' => array('max-md:rounded-b-4xl', 'max-md:rounded-b-[calc(2rem+1px)]'),
            'tl'     => array('md:rounded-tl-4xl', 'md:rounded-tl-[calc(2rem+1px)]'),
            'tr'     => array('md:rounded-tr-4xl', 'md:rounded-tr-[calc(2rem+1px)]'),
            'bl'     => array('md:rounded-bl-4xl', 'md:rounded-bl-[calc(2rem+1px)]'),
            'br'     => array('md:rounded-br-4xl', 'md:rounded-br-[calc(2rem+1px)]'),
        );

        $last_of_first_row = min(1, $total - 1);
        $first_of_last_row = $total > 2 ? 2 : 0;
        $keys = array();

        if ($index === 0) {
            $keys[] = 'top';
            $keys[] = 'tl';
        }
        if ($index === $last_of_first_row) {
            $keys[] = 'tr';
        }
        if ($index === $first_of_last_row) {
            $keys[] = 'bl';
        }
        if ($index === $total - 1) {
            $keys[] = 'bottom';
            $keys[] = 'br';
        }

        $bg = '';
        $content = '';
        foreach ($keys as $key) {
            $bg      .= ' ' . $corner[$key][0];
            $content .= ' ' . $corner[$key][1];
        }

        return array('bg' => $bg, 'content' => $content);
    }
}

// Helper : image de fond (aucune image si le contenu n'a pas d'image mise en avant,
// sauf si un thème en fournit une via le filtre `ufo_bento_default_image_url`)
if (!function_exists('ufo_bento_get_image')) {
    function ufo_bento_get_image($post_id, $is_above_fold, $col_span) {
        $classes = 'not-prose absolute inset-0 h-full w-full object-cover';

        if ($col_span === 'md:col-span-2') {
            $sizes = '(max-width: 767px) 100vw, (max-width: 1280px) 33vw, 313px';
        } elseif ($col_span === 'md:col-span-6') {
            $sizes = '(max-width: 1280px) 100vw, 940px';
        } else {
            $sizes = '(max-width: 767px) 100vw, (max-width: 1280px) 50vw, 469px';
        }

        if (has_post_thumbnail($post_id)) {
            return wp_get_attachment_image(get_post_thumbnail_id($post_id), 'large', false, array(
                'class'    => $classes,
                'alt'      => '',
                'decoding' => 'async',
                'loading'  => $is_above_fold ? 'eager' : 'lazy',
                'sizes'    => $sizes,
            ));
        }

        $default_url = apply_filters('ufo_bento_default_image_url', '', $post_id);
        if (!$default_url) {
            return '';
        }

        return sprintf(
            '<img src="%s" alt="" decoding="async"%s class="%s">',
            esc_url($default_url),
            $is_above_fold ? '' : ' loading="lazy"',
            esc_attr($classes)
        );
    }
}

$taxonomy = ufo_bento_taxonomy($post_type);
$category = array(
    'page'        => $page_category,
    'post'        => $post_category,
    'realisation' => $admin_category,
)[$post_type];

// Arguments de la requête WP_Query
$args = array(
    'post_type'           => $post_type,
    'posts_per_page'      => $posts_to_show,
    'post_status'         => 'publish',
    'has_password'        => false,
    'ignore_sticky_posts' => true,
    'no_found_rows'       => true,
);

// Ajouter la catégorie si spécifiée
if ($category && $taxonomy) {
    $args['tax_query'] = array(array(
        'taxonomy' => $taxonomy,
        'field'    => 'term_id',
        'terms'    => $category,
    ));
}

// La requête
$query = new WP_Query($args);
$bento_posts = $query->posts;
$total = count($bento_posts);

// Classes de la grille
$grid_classes = 'ufo-bento-grid px-2 my-10 grid grid-cols-1 gap-4 sm:mt-16 md:grid-cols-6';
if ($total > 2) {
    $grid_classes .= ' md:grid-rows-2';
}

// Génération des items via array_map
$items = array_map(function ($post, $index) use ($total, $taxonomy) {
    $post_id = $post->ID;

    $col_span   = ufo_bento_col_span($index, $total);
    $corners    = ufo_bento_corner_classes($index, $total);
    $image      = ufo_bento_get_image($post_id, $index < 4, $col_span);
    $categories = ufo_bento_get_categories($post_id, $taxonomy);
    $excerpt    = wp_trim_words(
        $post->post_excerpt ?: strip_shortcodes(excerpt_remove_blocks($post->post_content)),
        20,
        '&hellip;'
    );

    $categories_block = $categories
        ? sprintf('<div class="not-prose mb-2">%s</div>', $categories)
        : '';

    return sprintf(
        '<div class="group relative min-h-120 %s">
            <div class="absolute inset-0 rounded-lg %s"></div>
            <div class="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]%s">
                %s
                <div class="absolute inset-0 bg-gradient-photo-card"></div>
                <div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-foreground/10"></div>
                <div class="relative mt-auto p-10 pt-4">
                    %s
                    <h2 class="text-xl text-white group-hover:text-cream font-display font-medium leading-tight tracking-heading line-clamp-2">
                        <a href="%s" class="not-prose no-underline" rel="bookmark">%s</a>
                    </h2>
                    <p class="not-prose mt-2 max-w-lg text-sm/6 text-white">%s</p>
                    <a href="%s" class="not-prose no-underline mt-4 text-sm font-semibold text-white transition duration-300 hover:text-cream group-hover:text-cream inline-flex items-center gap-2" tabindex="-1" aria-hidden="true">
                        %s
                        <span class="relative w-6 h-6 rounded-full inline-flex items-center justify-center bg-secondary group-hover:translate-x-2 transition duration-200 ease-in-out">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white" aria-hidden="true" focusable="false">
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path>
                            </svg>
                        </span>
                    </a>
                </div>
            </div>
            <div class="pointer-events-none absolute inset-0 rounded-lg %s"></div>
        </div>',
        esc_attr($col_span),
        esc_attr($corners['bg']),
        esc_attr($corners['content']),
        $image,
        $categories_block,
        esc_url(get_permalink($post_id)),
        esc_html(get_the_title($post_id)),
        esc_html(html_entity_decode($excerpt, ENT_QUOTES, get_bloginfo('charset'))),
        esc_url(get_permalink($post_id)),
        esc_html__('Voir plus', 'ufo-blocks'),
        esc_attr($corners['bg'])
    );
}, $bento_posts, array_keys($bento_posts));

// Rendu final
if ($total > 0) {
    printf(
        '<div %s><div class="%s">%s</div></div>',
        $wrapper_attributes, // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        esc_attr($grid_classes),
        implode('', $items) // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
    );
} else {
    $no_content = array(
        'page'        => __('Aucune page trouvée.', 'ufo-blocks'),
        'post'        => __('Aucun article trouvé.', 'ufo-blocks'),
        'realisation' => __('Aucune réalisation trouvée.', 'ufo-blocks'),
    );
    printf(
        '<div %s><p>%s</p></div>',
        $wrapper_attributes, // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        esc_html($no_content[$post_type])
    );
}
