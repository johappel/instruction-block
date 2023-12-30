<?php
/**
 * Plugin Name:       Instruktionen - Gutenberg Block
 * Description:       Fügt einen Gutenberg Block für Instruktionen zur Erstellung von Inhaltsteilen hinzu.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Joachim Happel
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       instruction-block
 *
 * @package           create-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

// Autoload Composer dependencies
require_once __DIR__ . '/vendor/autoload.php';

use InstruktionBlock\InstruktionBlockEditor;

class InstruktionBlock
{

    public function __construct()
    {
        add_action('init', [$this, 'register_instruction_post']);
        add_action('init', [$this, 'instruction_register_block']);
    }

    public function instruction_register_block()
    {
        register_block_type('instruction/selector', array(
            'editor_script' => 'instruction-editor-script',
            'render_callback' => ['InstruktionBlock', 'render_instruction_block'],
        ));
    }


    public function register_instruction_post()
    {

        register_block_type( __DIR__ . '/build' );

        // Registrierung des Custom Post Types 'instruction-post'
        register_post_type('instruction-post', [
            'label' => __('Instruktionen Block', 'instruction-blocks'),
            'public' => true,
            'show_in_rest' => true,
            'supports' => ['title', 'editor', 'custom-fields'],
            'template' => [
                [
                    'core/group',
                    [
                        'lock' => ['move' => true, 'remove' => true],
                        'className' => 'instruction-group'
                    ],
                    [
                        [
                            'core/paragraph',
                            [
                                'content' => 'Diesen Text durch deine Instruktion ersetzen',
                                'placeholder' => 'Instruktion hier eingeben...'
                            ]
                        ]
                    ]
                ],
                [
                    'core/group',
                    [
                        //'lock' => ['move' => true],
                        'className' => 'template-group'
                    ],
                    [
                        [
                            'core/paragraph',
                            [
                                'content' => 'Vorlage ...',
                                'placeholder' => 'Vorlagentext hier eingeben...'
                            ]
                        ]
                    ]
                ]
            ],
            'template_lock' => false // Verhindert das Hinzufügen oder Entfernen von Blöcken
        ]);

        // Registrierung der Metadaten für 'instruction-post'
        $this->register_post_meta();


    }

    private function register_post_meta()
    {
        // Registriere 'instruction_icon' Metadaten
        register_post_meta('instruction-post', 'instruction_icon', [
            'show_in_rest' => true,
            'single' => true,
            'type' => 'string',
        ]);

        // Registriere 'instruction_hint' Metadaten
        register_post_meta('instruction-post', 'instruction_hint', [
            'show_in_rest' => true,
            'single' => true,
            'type' => 'string',
        ]);

        // Registriere 'instruction_style' Metadaten
        register_post_meta('instruction-post', 'instruction_style', [
            'show_in_rest' => true,
            'single' => true,
            'type' => 'string',
        ]);

        // Registriere 'instruction_class' Metadaten
        register_post_meta('instruction-post', 'instruction_class', [
            'show_in_rest' => true,
            'single' => true,
            'type' => 'string',
        ]);
    }


}

new InstruktionBlock();
