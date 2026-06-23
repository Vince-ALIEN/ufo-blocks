<?php
/**
 * UFO Blocks – Title
 * Rendu dynamique (render.php)
 *
 * Variables disponibles :
 *   $attributes  (array)    — attributs du bloc
 *   $content     (string)   — HTML sauvegardé (ancien contenu statique, pour compatibilité)
 *   $block       (WP_Block)
 */

$level          = (int) ( $attributes['level']          ?? 3 );
$title_align    = $attributes['titleAlignment']          ?? 'left';
$text_color     = $attributes['textColor']               ?? '';
$icon_bg_color  = $attributes['iconBgColor']             ?? '';
$custom_icon_bg = $attributes['customIconBgColor']       ?? '';
$icon           = $attributes['icon']                    ?? '';

// ── Contenu du titre ─────────────────────────────────────────────────────────
// source:html → WordPress extrait 'content' du HTML sauvegardé pour les anciens blocs.
// Pour les nouveaux blocs (save=null), 'content' est stocké dans le JSON via setAttributes.
$heading_content = $attributes['content'] ?? '';

// Fallback pour les blocs créés avant la migration save()→null (content stocké en HTML).
if ( empty( $heading_content ) && ! empty( $content ) ) {
	preg_match( '/<h[1-6][^>]*>(.*?)<\/h[1-6]>/si', $content, $m );
	if ( ! empty( $m[1] ) ) {
		$heading_content = $m[1];
	}
}

$tag = 'h' . max( 1, min( 6, $level ) );

// ── Classes ───────────────────────────────────────────────────────────────────
$align_class = 'left' === $title_align ? 'justify-start' : ( 'center' === $title_align ? 'justify-center' : 'justify-end' );

$text_color_class = $text_color ? 'has-' . esc_attr( $text_color ) . '-color' : '';
$title_classes    = trim( 'flex items-center not-prose ' . $text_color_class );

$icon_color_class = $icon_bg_color ? 'has-' . esc_attr( $icon_bg_color ) . '-color' : '';

// ── Style fond icône (hex → rgba 15 %) ───────────────────────────────────────
$icon_bg_style = '';
if ( $custom_icon_bg && preg_match( '/^#([0-9a-f]{6})$/i', $custom_icon_bg, $m ) ) {
	$r             = hexdec( substr( $m[1], 0, 2 ) );
	$g             = hexdec( substr( $m[1], 2, 2 ) );
	$b             = hexdec( substr( $m[1], 4, 2 ) );
	$icon_bg_style = sprintf( ' style="background-color:rgba(%d,%d,%d,0.15);"', $r, $g, $b );
}

// ── Icône SVG ─────────────────────────────────────────────────────────────────
$icon_html = '';
if ( ! empty( $icon ) ) {
	$svg = ufo_get_icon_svg( $icon, 'size-6 ' . $icon_color_class );
	if ( $svg ) {
		$icon_html = '<span class="rounded-lg p-3 mr-2"' . $icon_bg_style . '>' . $svg . '</span>';
	}
}

// ── Wrapper (classes WP : typographie, couleurs…) ─────────────────────────────
$wrapper_attrs = get_block_wrapper_attributes();

?>
<div <?php echo $wrapper_attrs; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="flex <?php echo esc_attr( $align_class ); ?>">
		<div class="block pr-2">
			<div class="<?php echo esc_attr( $title_classes ); ?>">
				<?php echo $icon_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				<<?php echo esc_html( $tag ); ?>><?php echo wp_kses_post( $heading_content ); ?></<?php echo esc_html( $tag ); ?>>
			</div>
		</div>
	</div>
</div>
