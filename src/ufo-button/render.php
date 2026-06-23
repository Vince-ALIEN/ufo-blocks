<?php
/**
 * UFO Blocks – Button (render.php)
 *
 * Variables disponibles :
 *   $attributes  (array)
 *   $content     (string)
 *   $block       (WP_Block)
 */

$button_text   = $attributes['buttonText']   ?? '';
$button_url    = $attributes['buttonUrl']    ?? '';
$button_icon   = $attributes['buttonIcon']   ?? '';
$icon_position = $attributes['iconPosition'] ?? 'right';
$opens_new_tab = (bool) ( $attributes['opensInNewTab'] ?? false );
$rel_nofollow  = (bool) ( $attributes['relNofollow']   ?? false );

// ── Attributs rel / target ────────────────────────────────────────────────────
$rel_parts = [];
if ( $opens_new_tab ) {
	$rel_parts[] = 'noopener';
	$rel_parts[] = 'noreferrer';
}
if ( $rel_nofollow ) {
	$rel_parts[] = 'nofollow';
}
$rel_attr    = ! empty( $rel_parts ) ? ' rel="' . esc_attr( implode( ' ', $rel_parts ) ) . '"' : '';
$target_attr = $opens_new_tab ? ' target="_blank"' : '';
$href        = ! empty( $button_url ) ? esc_url( $button_url ) : '#';

// ── Icône SVG ─────────────────────────────────────────────────────────────────
$icon_html = '';
if ( ! empty( $button_icon ) && function_exists( 'ufo_get_icon_svg' ) ) {
	$svg = ufo_get_icon_svg( $button_icon, 'stroke-current size-4' );
	if ( $svg ) {
		$icon_html = '<span class="btn__icon h-4 w-4 flex items-center justify-center group-hover:scale-110 transition duration-700 ease-in-out motion-reduce:transition-none" aria-hidden="true">'
			. $svg
			. '</span>';
	}
}

// ── Wrapper ───────────────────────────────────────────────────────────────────
$wrapper_attrs = get_block_wrapper_attributes( [
	'class' => 'btn inline-flex items-center gap-2 no-underline cursor-pointer group',
] );

?>
<a <?php echo $wrapper_attrs; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	href="<?php echo $href; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>"
	<?php echo $target_attr; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	<?php echo $rel_attr;    // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
>
	<?php if ( 'left' === $icon_position ) : ?>
		<?php echo $icon_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	<?php endif; ?>
	<span><?php echo wp_kses_post( $button_text ); ?></span>
	<?php if ( 'left' !== $icon_position ) : ?>
		<?php echo $icon_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	<?php endif; ?>
</a>
