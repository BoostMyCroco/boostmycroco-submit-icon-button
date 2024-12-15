<?php
/**
 * Plugin Name: BoostMyCroco - Custom Icon Block
 * Description: Adds a custom block to enhance the submit button with an icon and additional classes.
 * Version: 1.0
 * Author: BoostMyCroco
 * Text Domain: boostmycroco
 */

// Prevent direct access.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Register the block and its assets.
add_action('enqueue_block_editor_assets', 'boostmycroco_enqueue_assets');
add_action('wp_enqueue_scripts', 'boostmycroco_enqueue_assets');

function boostmycroco_enqueue_assets() {
    // Validar si Font Awesome ya está disponible.
    if (!wp_style_is('font-awesome', 'registered')) {
        // Comprobar si Font Awesome ya está cargado por otras herramientas como Elementor.
        if (!fontawesome_is_loaded()) {
            // Registrar y encolar Font Awesome si no está cargado.
            wp_enqueue_style(
                'font-awesome',
                'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css',
                [],
                '5.15.4'
            );
        }
    }

    // Encolar el script del bloque solo en el editor.
    if (is_admin()) {
        wp_enqueue_script(
            'boostmycroco-block-js',
            plugin_dir_url(__FILE__) . 'admin/block.js',
            ['wp-blocks', 'wp-editor', 'wp-components', 'wp-element', 'wp-i18n'],
            '1.0.0',
            true
        );
    }

    // Encolar estilos para el bloque en ambos entornos (editor y frontend).
    wp_enqueue_style(
        'boostmycroco-block-css',
        plugin_dir_url(__FILE__) . 'assets/styles.css',
        [],
        '1.0.0'
    );
}

// Helper para verificar si Font Awesome ya está disponible en la página.
function fontawesome_is_loaded() {
    $styles = wp_styles();
    foreach ($styles->queue as $style) {
        if (strpos($style, 'font-awesome') !== false || strpos($style, 'fontawesome') !== false) {
            return true;
        }
    }
    return false;
}

// Register the block.
add_action('init', 'boostmycroco_register_custom_block');
function boostmycroco_register_custom_block() {
    register_block_type('boostmycroco/icon-button', [
        'editor_script' => 'boostmycroco-block-js',
        'editor_style'  => 'boostmycroco-block-css',
    ]);
}
