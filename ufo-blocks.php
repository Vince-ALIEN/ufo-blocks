<?php

/**
 * Plugin Name:       Ufo Blocks
 * Description:       A set of Gutemberg blocks using Tailwind CSS in WordPress class.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.3
 * Author:            Vincent LASSERRE
 * License:           GPL-2.0-or-later
 * License URI:       https://www.ufo-agency.com/
 * Text Domain:       ufo-blocks
 *
 * @package CreateBlock
 */

if (!defined("ABSPATH")) {
    exit(); // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_ufo_blocks_block_init()
{
    register_block_type(__DIR__ . "/build/ufo-grid");
    register_block_type(__DIR__ . "/build/ufo-row");
}
add_action("init", "create_block_ufo_blocks_block_init");





function ufo_blocks_register_category($categories) {
    return array_merge(
        $categories,
        array(
            array(
                'slug' => 'ufo-blocks',
                'title' => __('UFO Blocks', 'ufo-blocks'),
            ),
        )
    );
}
add_filter('block_categories_all', 'ufo_blocks_register_category', 10, 2);

/**
 * Fonction pour enregistrer et charger le script frontend
 * Ajoutez ce code dans votre fichier PHP principal (ufo-blocks.php)
 */
function ufo_blocks_register_faq_scripts() {
    // Maintenant que le fichier asset.php est généré, on peut l'utiliser
    $asset_file = include( plugin_dir_path( __FILE__ ) . 'build/ufo-faq-frontend.asset.php' );

    wp_register_script(
        'ufo-faq-frontend',
        plugins_url( 'build/ufo-faq-frontend.js', __FILE__ ),
        $asset_file['dependencies'],
        $asset_file['version'],
        true
    );
}
add_action( 'wp_enqueue_scripts', 'ufo_blocks_register_faq_scripts' );

/**
 * Enqueue le script quand le bloc est présent
 */
function ufo_blocks_enqueue_faq_script() {
    // Vérifiez si le bloc est utilisé sur la page
    if ( has_block( 'ufo-blocks/ufo-faq' ) ) {
        wp_enqueue_script( 'ufo-faq-frontend' );
    }
}
add_action( 'wp_enqueue_scripts', 'ufo_blocks_enqueue_faq_script', 100 );

// DÉBOGAGE : Si vous rencontrez encore des problèmes, ajoutez ce code pour charger
// le script sur toutes les pages frontend pendant le développement
function ufo_blocks_debug_load_scripts() {
    if (!is_admin()) {
        wp_enqueue_script( 'ufo-faq-frontend' );
    }
}
// Décommentez la ligne suivante pour déboguer
// add_action( 'wp_enqueue_scripts', 'ufo_blocks_debug_load_scripts', 999 );
