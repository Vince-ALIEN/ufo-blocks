<?php
/**
 * UFO Blocks – Logo Slider
 * Rendu dynamique (render.php)
 *
 * Variables disponibles :
 *   $attributes  (array)  — attributs du bloc
 *   $content     (string) — innerHTML (vide pour un bloc dynamique)
 *   $block       (WP_Block)
 */

// ── Récupération des attributs avec valeurs par défaut ──────────────────────
$logos        = $attributes['logos']        ?? [];
$speed        = (int) ( $attributes['speed']        ?? 40 );
$direction    = $attributes['direction']    ?? 'left';
$variant      = $attributes['variant']      ?? 'light';
$logo_height  = (int) ( $attributes['logoHeight']   ?? 40 );
$gap          = (int) ( $attributes['gap']           ?? 64 );
$pause_hover  = (bool) ( $attributes['pauseOnHover'] ?? true );
$grayscale    = (bool) ( $attributes['grayscale']    ?? true );
$show_fade    = (bool) ( $attributes['showFade']     ?? true );

// ── Abandon si aucun logo ────────────────────────────────────────────────────
if ( empty( $logos ) ) {
	return;
}

// ── CSS custom properties (valeurs dynamiques) ────────────────────────────────
$custom_props = sprintf(
	'--ufo-ls-speed:%ds; --ufo-ls-height:%dpx; --ufo-ls-gap:%dpx; --ufo-ls-direction:%s;',
	$speed,
	$logo_height,
	$gap,
	$direction === 'right' ? 'reverse' : 'normal'
);

// ── Classes Tailwind du wrapper selon la variante ────────────────────────────
// light/card s'adaptent au mode dark du thème via dark:
$variant_classes = [
	'light' => 'py-8 dark:bg-gray-900',
	'dark'  => 'bg-gray-950 py-8',
	'card'  => 'bg-gray-50 dark:bg-gray-900 py-8',
];
$wrapper_tw = $variant_classes[ $variant ] ?? $variant_classes['light'];

// Pause au survol et au focus clavier (CSS custom dans style.css)
if ( $pause_hover ) {
	$wrapper_tw .= ' ufo-ls-pausable';
}

// ── Classes Tailwind de l'image selon variante + grayscale ───────────────────
$img_tw = 'block w-auto max-w-none object-contain transition-all duration-300';

if ( $variant === 'dark' ) {
	// Toujours sombre : logos blancs
	$img_tw .= ' brightness-0 invert opacity-50 hover:opacity-100';
} else {
	// light & card : grayscale en clair, inversion en dark mode
	if ( $grayscale ) {
		$img_tw .= ' grayscale opacity-60 hover:grayscale-0 hover:opacity-100';
		$img_tw .= ' dark:brightness-0 dark:invert dark:grayscale-0 dark:opacity-40 dark:hover:opacity-90';
	} else {
		$img_tw .= ' dark:brightness-0 dark:invert dark:opacity-60 dark:hover:opacity-100';
	}
}

// ── Classe Tailwind de l'item selon variante ─────────────────────────────────
$item_tw = 'ufo-ls-item flex items-center justify-center shrink-0';
if ( $variant === 'card' ) {
	$item_tw .= ' bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-5 py-3 shadow-sm';
}

// ── Attributs du bloc (align, spacing…) via get_block_wrapper_attributes() ──
$wrapper_attrs = get_block_wrapper_attributes( [
	'class' => $wrapper_tw,
	'style' => $custom_props,
] );

$viewport_class = 'overflow-hidden relative' . ( $show_fade ? ' ufo-ls-fade' : '' );

// ── Génération du HTML d'un logo ─────────────────────────────────────────────
if ( ! function_exists( 'ufo_logo_slider_logo_html' ) ) :
function ufo_logo_slider_logo_html( array $logo, string $img_tw, string $item_tw, bool $aria_hidden = false ): string {
	$id  = (int) ( $logo['id'] ?? 0 );
	$alt = $aria_hidden ? '' : (string) ( $logo['alt'] ?? '' );

	if ( ! empty( $logo['link'] ) ) {
		$img_tw .= ' cursor-pointer';
	}

	// Média de la bibliothèque : URL à jour quel que soit le domaine, srcset, dimensions.
	// L'URL enregistrée sert de secours si le média a été supprimé.
	$img = $id ? wp_get_attachment_image(
		$id,
		'medium',
		false,
		[
			'alt'      => $alt,
			'class'    => $img_tw,
			'style'    => 'height:var(--ufo-ls-height);',
			'loading'  => 'lazy',
			'decoding' => 'async',
			'sizes'    => 'auto, 300px',
		]
	) : '';

	if ( ! $img && ! empty( $logo['url'] ) ) {
		$img_width  = ! empty( $logo['width'] )  ? (int) $logo['width']  : 0;
		$img_height = ! empty( $logo['height'] ) ? (int) $logo['height'] : 0;
		$dimensions = ( $img_width && $img_height )
			? sprintf( ' width="%d" height="%d"', $img_width, $img_height )
			: '';

		$img = sprintf(
			'<img src="%s" alt="%s"%s style="height:var(--ufo-ls-height);" loading="lazy" decoding="async" class="%s">',
			esc_url( $logo['url'] ),
			esc_attr( $alt ),
			$dimensions,
			esc_attr( $img_tw )
		);
	}

	if ( ! $img ) {
		return '';
	}

	// Lien optionnel
	if ( ! empty( $logo['link'] ) ) {
		$link_attrs = sprintf(
			'href="%s" class="flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-current rounded" tabindex="%s" rel="noopener noreferrer"',
			esc_url( $logo['link'] ),
			$aria_hidden ? '-1' : '0'
		);
		$img = "<a $link_attrs>$img</a>";
	}

	$hidden_attr = $aria_hidden ? ' aria-hidden="true"' : ' role="listitem"';
	return '<div class="' . esc_attr( $item_tw ) . '"' . $hidden_attr . '>' . $img . '</div>';
}
endif;

// ── Rendu HTML ────────────────────────────────────────────────────────────────
ob_start();
?>
<div <?php echo $wrapper_attrs; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>

	<div class="<?php echo esc_attr( $viewport_class ); ?>">
		<div
			class="ufo-ls-track flex items-center whitespace-nowrap"
			role="list"
			aria-label="<?php esc_attr_e( 'Logos partenaires', 'ufo-blocks' ); ?>"
		>
			<?php
			// Série 1 — accessible
			foreach ( $logos as $logo ) {
				echo ufo_logo_slider_logo_html( $logo, $img_tw, $item_tw, false ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}

			// Série 2 — copie pour la boucle seamless, masquée aux AT
			foreach ( $logos as $logo ) {
				echo ufo_logo_slider_logo_html( $logo, $img_tw, $item_tw, true ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
			?>
		</div>
	</div>

</div>
<?php
echo ob_get_clean(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
