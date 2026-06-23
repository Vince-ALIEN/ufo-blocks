<?php
/**
 * LCP optimisation for ufo-hero block.
 *
 * - Removes loading="lazy" from the first (light-mode) image.
 * - Adds fetchpriority="high" + loading="eager" so the browser treats
 *   it as the LCP candidate immediately.
 * - Outputs a <link rel="preload"> in <head> for pages that contain
 *   the block, cutting ~200–400 ms off LCP on mobile.
 */

/**
 * Fix loading attributes on the first image of every ufo-hero block.
 */
add_filter( 'render_block', function ( $block_content, $block ) {
	if ( 'ufo-blocks/ufo-hero' !== $block['blockName'] ) {
		return $block_content;
	}

	$count = 0;
	return preg_replace_callback(
		'/<img\b([^>]*)>/i',
		function ( $matches ) use ( &$count ) {
			$count++;
			if ( 1 !== $count ) {
				return $matches[0];
			}
			$attrs = $matches[1];
			$attrs = preg_replace( '/\s*loading=["\'][^"\']*["\']/', '', $attrs );
			$attrs = preg_replace( '/\s*fetchpriority=["\'][^"\']*["\']/', '', $attrs );
			$attrs = preg_replace( '/\s*decoding=["\'][^"\']*["\']/', '', $attrs );
			return '<img' . $attrs . ' fetchpriority="high" loading="eager" decoding="async">';
		},
		$block_content
	);
}, 10, 2 );

/**
 * Preload the hero image in <head> on pages that use the ufo-hero block.
 * Runs at priority 2, after fonts (priority 1) but before stylesheets.
 */
add_action( 'wp_head', function () {
	if ( ! is_singular() ) {
		return;
	}
	$post = get_post();
	if ( ! $post || ! has_block( 'ufo-blocks/ufo-hero', $post ) ) {
		return;
	}
	$blocks = parse_blocks( $post->post_content );
	foreach ( $blocks as $block ) {
		if ( 'ufo-blocks/ufo-hero' !== $block['blockName'] ) {
			continue;
		}
		$url = $block['attrs']['imageLight']['url'] ?? '';
		if ( $url ) {
			echo '<link rel="preload" as="image" href="' . esc_url( $url ) . '" fetchpriority="high">' . "\n";
		}
		break;
	}
}, 2 );
