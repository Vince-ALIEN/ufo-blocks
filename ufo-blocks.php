<?php

/**
 * Plugin Name:       Ufo Blocks
 * Description:       A set of Gutemberg blocks using Tailwind CSS in WordPress class.
 * Requires at least: 6.1
 * Requires PHP:      7.4
 * Version:           1.5.0
 * Author:            Vincent LASSERRE
 * License:           GPL-2.0-or-later
 * License URI:       https://www.ufo-agency.com/
 * Text Domain:       ufo-blocks
 *
 * @package UfoBlocks
 */

if (!defined("ABSPATH")) {
    exit();
}

require_once plugin_dir_path(__FILE__) . 'includes/ufo-faq-schema.php';

// Helper SVG pour le rendu dynamique du bloc button
if ( file_exists( __DIR__ . '/includes/ufo-blocks-icons.php' ) ) {
    require_once __DIR__ . '/includes/ufo-blocks-icons.php';
}

function create_block_ufo_blocks_block_init()
{
    register_block_type(__DIR__ . "/build/ufo-grid");
    register_block_type(__DIR__ . "/build/ufo-row");
    register_block_type(__DIR__ . "/build/ufo-faq");
    register_block_type(__DIR__ . "/build/ufo-faq-item");
    register_block_type(__DIR__ . "/build/ufo-button");
    register_block_type(__DIR__ . "/build/ufo-buttons-group");
    register_block_type(__DIR__ . "/build/ufo-title");
    register_block_type(__DIR__ . "/build/ufo-icon");
    register_block_type(__DIR__ . "/build/ufo-time");
}
add_action("init", "create_block_ufo_blocks_block_init");

function ufo_blocks_register_category($categories) {
    return array_merge(
        $categories,
        array(
            array(
                'slug'  => 'ufo-blocks',
                'title' => __('UFO Blocks', 'ufo-blocks'),
            ),
        )
    );
}
add_filter('block_categories_all', 'ufo_blocks_register_category', 10, 2);
