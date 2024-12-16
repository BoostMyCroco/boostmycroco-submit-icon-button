<?php
/**
 * Plugin Name: BoostMyCroco - Custom Icon Block
 * Description: Adds a custom block with customizable styles and icon.
 * Version: 1.0.4
 * Author: BoostMyCroco
 * Text Domain: boostmycroco
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

add_action('enqueue_block_editor_assets', 'boostmycroco_enqueue_assets');
add_action('wp_enqueue_scripts', 'boostmycroco_enqueue_assets');

function boostmycroco_enqueue_assets() {
    if (!wp_style_is('font-awesome', 'registered')) {
        if (!fontawesome_is_loaded()) {
            wp_enqueue_style(
                'font-awesome',
                'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css',
                [],
                '5.15.4'
            );
        }
    }

    if (is_admin()) {
        wp_enqueue_script(
            'boostmycroco-block-js',
            plugin_dir_url(__FILE__) . 'admin/block.js', // Ajusta la ruta si fuera necesario
            ['wp-blocks', 'wp-editor', 'wp-components', 'wp-element', 'wp-i18n'],
            '1.0.0',
            true
        );
    }

    wp_enqueue_style(
        'boostmycroco-block-css',
        plugin_dir_url(__FILE__) . 'assets/styles.css', // Ajusta la ruta si fuera necesario
        [],
        '1.0.0'
    );
}

function fontawesome_is_loaded() {
    $styles = wp_styles();
    foreach ($styles->queue as $style) {
        if (strpos($style, 'font-awesome') !== false || strpos($style, 'fontawesome') !== false) {
            return true;
        }
    }
    return false;
}

add_action('init', 'boostmycroco_register_custom_block');
function boostmycroco_register_custom_block() {
    register_block_type('boostmycroco/submit-icon-button', [
        'editor_script' => 'boostmycroco-block-js',
        'editor_style'  => 'boostmycroco-block-css',
        'render_callback' => 'boostmycroco_render_submit_icon_button',
        'attributes' => [
            'iconClass'          => ['type' => 'string', 'default' => 'fa-paper-plane'],
            'iconPosition'       => ['type' => 'string', 'default' => 'before'],
            'addIcon'            => ['type' => 'boolean', 'default' => true],
            'buttonLabel'        => ['type' => 'string', 'default' => 'Submit'],
            'labelColor'         => ['type' => 'string', 'default' => '#ffffff'],
            'iconColor'          => ['type' => 'string', 'default' => '#ffffff'],
            'backgroundColor'    => ['type' => 'string', 'default' => '#007cba'],
            'borderSize'         => ['type' => 'number', 'default' => 0],
            'borderColor'        => ['type' => 'string', 'default' => '#000000'],
            'borderRadius'       => ['type' => 'number', 'default' => 4],
            'paddingTop'         => ['type' => 'number', 'default' => 10],
            'paddingRight'       => ['type' => 'number', 'default' => 20],
            'paddingBottom'      => ['type' => 'number', 'default' => 10],
            'paddingLeft'        => ['type' => 'number', 'default' => 20],
            'hoverLabelColor'    => ['type' => 'string', 'default' => '#ffffff'],
            'hoverIconColor'     => ['type' => 'string', 'default' => '#ffffff'],
            'hoverBackgroundColor'=>['type' => 'string', 'default' => '#005fa3'],
            'buttonAlignment'    => ['type' => 'string', 'default' => 'center']
        ],
    ]);
}

function boostmycroco_render_submit_icon_button($attributes) {
    $iconClass          = $attributes['iconClass'];
    $iconPosition       = $attributes['iconPosition'];
    $addIcon            = $attributes['addIcon'];
    $buttonLabel        = $attributes['buttonLabel'];
    $labelColor         = $attributes['labelColor'];
    $iconColor          = $attributes['iconColor'];
    $backgroundColor    = $attributes['backgroundColor'];
    $borderSize         = $attributes['borderSize'];
    $borderColor        = $attributes['borderColor'];
    $borderRadius       = $attributes['borderRadius'];
    $paddingTop         = $attributes['paddingTop'];
    $paddingRight       = $attributes['paddingRight'];
    $paddingBottom      = $attributes['paddingBottom'];
    $paddingLeft        = $attributes['paddingLeft'];
    $hoverLabelColor    = $attributes['hoverLabelColor'];
    $hoverIconColor     = $attributes['hoverIconColor'];
    $hoverBackgroundColor = $attributes['hoverBackgroundColor'];
    $buttonAlignment    = $attributes['buttonAlignment'];

    $icon_html = '';
    if ($addIcon) {
        $icon_html = '<i class="fa ' . esc_attr($iconClass) . '" style="color:' . esc_attr($iconColor) . ';"></i>';
    }

    $before = $iconPosition === 'before' ? $icon_html . ' ' : '';
    $after  = $iconPosition === 'after' ? ' ' . $icon_html : '';

    $normal_border = $borderSize > 0 ? "{$borderSize}px solid {$borderColor}" : 'none';

    $inline_styles = "
        .boostmycroco-button {
            color: {$labelColor};
            background-color: {$backgroundColor};
            border: {$normal_border};
            border-radius: {$borderRadius}px;
            padding: {$paddingTop}px {$paddingRight}px {$paddingBottom}px {$paddingLeft}px;
        }
        .boostmycroco-button:hover {
            color: {$hoverLabelColor};
            background-color: {$hoverBackgroundColor};
        }
        .boostmycroco-button:hover i {
            color: {$hoverIconColor};
        }
    ";

    $button_html = '<button type="submit" class="boostmycroco-button ' . esc_attr($iconClass) . '">'
                    . $before . esc_html($buttonLabel) . $after .
                   '</button>';

    $container_style = 'text-align:' . esc_attr($buttonAlignment) . ';';

    $style_tag = '<style>' . $inline_styles . '</style>';
    $output = '<div class="boostmycroco-button-container" style="' . $container_style . '">' . $button_html . '</div>';

    return $style_tag . $output;
}
