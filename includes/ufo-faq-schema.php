<?php
/**
 * Génère le schema FAQPage complet (avec mainEntity) pour le bloc ufo-faq.
 *
 * save.js ne peut pas accéder aux données des inner blocks, donc il produit
 * un FAQPage sans mainEntity. Ce filtre intercepte le rendu, extrait les
 * questions/réponses depuis le HTML stocké et les inner blocks, puis injecte
 * le schema complet en remplacement.
 *
 * @package ufo-blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_filter( 'render_block', function ( $block_content, $block ) {
	if ( 'ufo-blocks/ufo-faq' !== $block['blockName'] ) {
		return $block_content;
	}

	$attrs         = $block['attrs'] ?? [];
	$enable_schema = $attrs['enableSchema'] ?? true;

	if ( ! $enable_schema ) {
		return $block_content;
	}

	// Construire mainEntity depuis les inner blocks ufo-faq-item.
	$main_entity = [];

	foreach ( $block['innerBlocks'] as $item ) {
		if ( 'ufo-blocks/ufo-faq-item' !== $item['blockName'] ) {
			continue;
		}

		// Question : stockée dans le HTML du bloc via source "html" (.faq-question).
		// innerContent contient les chaînes statiques + null pour les inner blocks.
		$item_html = implode( '', array_filter( $item['innerContent'], 'is_string' ) );
		preg_match( '/<span[^>]+class="[^"]*faq-question[^"]*"[^>]*>(.*?)<\/span>/s', $item_html, $q );
		$question = isset( $q[1] ) ? trim( wp_strip_all_tags( $q[1] ) ) : '';

		if ( empty( $question ) ) {
			continue;
		}

		// Réponse : concaténation du HTML statique des inner blocks (paragraphes, etc.).
		$answer_parts = [];
		foreach ( $item['innerBlocks'] as $answer_block ) {
			$answer_parts[] = implode( '', array_filter( $answer_block['innerContent'], 'is_string' ) );
		}
		$answer = trim( wp_strip_all_tags( implode( ' ', $answer_parts ) ) );

		if ( empty( $answer ) ) {
			continue;
		}

		$main_entity[] = [
			'@type'          => 'Question',
			'name'           => $question,
			'acceptedAnswer' => [
				'@type' => 'Answer',
				'text'  => $answer,
			],
		];
	}

	if ( empty( $main_entity ) ) {
		return $block_content;
	}

	// Construire le schema FAQPage.
	$json_ld = [
		'@context'   => 'https://schema.org',
		'@type'      => 'FAQPage',
		'mainEntity' => $main_entity,
	];

	if ( ! empty( trim( $attrs['schemaName'] ?? '' ) ) ) {
		$json_ld['name'] = $attrs['schemaName'];
	}
	if ( ! empty( trim( $attrs['schemaDescription'] ?? '' ) ) ) {
		$json_ld['description'] = $attrs['schemaDescription'];
	}
	if ( ! empty( trim( $attrs['schemaAbout'] ?? '' ) ) ) {
		$json_ld['about'] = $attrs['schemaAbout'];
	}

	$schema_tag = '<script type="application/ld+json">'
		. wp_json_encode( $json_ld, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE )
		. '</script>' . "\n";

	// Supprimer le schema incomplet produit par save.js (s'il est présent).
	$updated = preg_replace(
		'/<script\s+type="application\/ld\+json">.*?<\/script>\s*/s',
		'',
		$block_content,
		1
	);

	return $schema_tag . $updated;

}, 10, 2 );
