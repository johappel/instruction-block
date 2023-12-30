/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { InnerBlocks } from '@wordpress/block-editor';
import { parse } from '@wordpress/blocks';


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

export default function Edit({ attributes, setAttributes, isSelected} ) {
    const { selectedPost } = attributes;

    // Hole Posts vom Typ 'instruction-post'
    const posts = useSelect((select) => {
        return select('core').getEntityRecords('postType', 'instruction-post', { per_page: -1 });
    }, []);

    // Hole Daten des ausgewählten Posts
    const selectedPostData = useSelect((select) => {
        return selectedPost ? select('core').getEntityRecord('postType', 'instruction-post', selectedPost) : null;
    }, [selectedPost]);

    // Ändere den ausgewählten Post
    const onChangeSelectPost = (postId) => {
        setAttributes({ selectedPost: postId });

        // Verzögere das Setzen der weiteren Attribute, bis selectedPostData aktualisiert wurde
        if (postId && posts) {
            const newSelectedPostData = posts.find(post => post.id === parseInt(postId, 10));
            if (newSelectedPostData) {
                setAttributes({
                    title: newSelectedPostData.title.rendered,
                    hint: newSelectedPostData.meta.instruction_hint,
                    icon: newSelectedPostData.meta.instruction_icon
                });
            }
        }
    };

    // Optionen für das Select-Control generieren
    const options = posts ? posts.map((post) => ({
        label: post.title.rendered,
        value: post.id
    })) : [];

    // Generiere den Inhalt des Blocks basierend auf dem ausgewählten Post
    let blockContent = <p>Bitte wähle eine Instruktion aus dem Dropdown-Menü im Seitenpanel.</p>;
    if (selectedPostData) {


        // Extrahiere die HTML-Inhalte für Frage und Template

        // Verwende einen DOMParser, um den HTML-String zu parsen
        const parser = new DOMParser();
        const doc = parser.parseFromString(selectedPostData.content.raw, 'text/html');

        // Finde die Elemente innerhalb der Gruppen
        const instructionGroup = doc.querySelector('.instruction-group p');
        const templateGroup = doc.querySelector('.template-group');

        // Extrahiere den HTML-Inhalt
        const instruction_question = instructionGroup ? instructionGroup.innerHTML : '';
        const instruction_template = templateGroup ? templateGroup.innerHTML : '';

        //Parse das ROW HTML und erzeuge ein InnerBlocks Template
        const blocksFromTemplate = parse(instruction_template);
        const templateArray = blocksFromTemplate.map(block => [block.name, block.attributes]);
        console.log('blocksFromTemplate',templateArray);

        //Generiere den HTML Content für den Editorblock
        blockContent = (
            <div className="instruction-post-preview">
                <span className={`dashicons ${selectedPostData.meta.instruction_icon}`}></span>
                <h4 className="instruction-post-title">{selectedPostData.title.rendered}</h4>
                <div className="instruction-post-question">{instruction_question}</div>
                <InnerBlocks
                    template={templateArray}
                    templateLock={false}
                />
            </div>
        );
    }

    return (
        <div  { ...useBlockProps() }>
            {isSelected && (
                <InspectorControls>
                    <PanelBody title="Einstellungen">
                        <SelectControl
                            label="Wähle eine Instruktion:"
                            options={[{ label: 'Wähle...', value: '' }].concat(options)}
                            value={selectedPost}
                            onChange={onChangeSelectPost}
                        />
                    </PanelBody>
                </InspectorControls>
            )}
            {blockContent}
        </div>
    );
}
