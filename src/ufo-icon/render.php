<?php
/**
 * UFO Blocks – Icon
 * Rendu dynamique (render.php)
 *
 * Variables disponibles :
 *   $attributes  (array)    — attributs du bloc
 *   $content     (string)   — toujours vide (save = null)
 *   $block       (WP_Block)
 */

$icon      = $attributes['icon']     ?? '';
$icon_size = (int) ( $attributes['iconSize'] ?? 32 );

if ( empty( $icon ) ) {
	return;
}

$svg = ufo_get_icon_svg( $icon, '', $icon_size );

if ( empty( $svg ) ) {
	return;
}

$text_align = $attributes['textAlign'] ?? 'left';

// text-align ne positionne pas un SVG — on utilise display:flex + justify-content.
// get_block_wrapper_attributes() fusionne ce style avec ceux générés par les supports
// (couleur text/background, spacing).
$justify_map = [
	'left'   => 'flex-start',
	'center' => 'center',
	'right'  => 'flex-end',
];
$justify = $justify_map[ $text_align ] ?? 'flex-start';

$wrapper_attrs = get_block_wrapper_attributes( [
	'class' => 'ufo-icon-block has-text-align-' . esc_attr( $text_align ),
	'style' => 'display:flex;align-items:center;justify-content:' . $justify . ';',
] );

?>
<div <?php echo $wrapper_attrs; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php echo $svg; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</div>
