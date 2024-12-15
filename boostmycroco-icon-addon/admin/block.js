document.addEventListener('DOMContentLoaded', () => {
    const { registerBlockType } = wp.blocks;
    const { InspectorControls, useBlockProps } = wp.blockEditor;
    const { PanelBody, ToggleControl, TextControl, SelectControl } = wp.components;
    const { createElement } = wp.element;
    const { __ } = wp.i18n;

    // Lista estática de 18 íconos en total.
    const fontAwesomeIcons = [
        { label: 'Paper Plane', value: 'fa-paper-plane' },
        { label: 'Envelope', value: 'fa-envelope' },
        { label: 'Check', value: 'fa-check' },
        { label: 'Times', value: 'fa-times' },
        { label: 'Plus', value: 'fa-plus' },
        { label: 'Minus', value: 'fa-minus' },
        { label: 'Star', value: 'fa-star' },
        { label: 'Heart', value: 'fa-heart' },
        { label: 'Bell', value: 'fa-bell' },
        { label: 'Arrow Right', value: 'fa-arrow-right' },
        { label: 'Arrow Left', value: 'fa-arrow-left' },
        { label: 'Paperclip', value: 'fa-paperclip' },
        { label: 'Folder', value: 'fa-folder' },
        { label: 'File', value: 'fa-file' },
        { label: 'Lock', value: 'fa-lock' },
        { label: 'Unlock', value: 'fa-unlock' },
        { label: 'Arrow Up', value: 'fa-arrow-up' },
        { label: 'Arrow Down', value: 'fa-arrow-down' },
    ];

    registerBlockType('boostmycroco/icon-button', {
        title: __('Submit Icon Button', 'boostmycroco'),
        description: __('Add a custom submit button with an icon and label.', 'boostmycroco'),
        category: 'design',
        icon: 'button',
        attributes: {
            iconClass: {
                type: 'string',
                default: 'fa-paper-plane',
            },
            iconPosition: {
                type: 'string',
                default: 'before', // Puede ser "before" o "after".
            },
            addIcon: {
                type: 'boolean',
                default: true,
            },
            buttonLabel: {
                type: 'string',
                default: 'Submit',
            },
        },
        edit: function ({ attributes, setAttributes }) {
            const blockProps = useBlockProps();

            // Picker visual de íconos
            const IconPicker = () =>
                createElement(
                    'div',
                    { className: 'icon-picker' },
                    fontAwesomeIcons.map((icon) =>
                        createElement(
                            'button',
                            {
                                type: 'button',
                                className: `icon-button ${attributes.iconClass === icon.value ? 'active' : ''}`,
                                onClick: () => setAttributes({ iconClass: icon.value }),
                                title: icon.label,
                            },
                            createElement('i', { className: `fa ${icon.value}` })
                        )
                    )
                );

            return createElement(
                'div',
                blockProps,
                createElement(
                    InspectorControls,
                    null,
                    createElement(
                        PanelBody,
                        { title: __('Settings', 'boostmycroco'), initialOpen: true },
                        createElement(ToggleControl, {
                            label: __('Add Icon to Button', 'boostmycroco'),
                            checked: attributes.addIcon,
                            onChange: (value) => setAttributes({ addIcon: value }),
                        }),
                        createElement(SelectControl, {
                            label: __('Icon Position', 'boostmycroco'),
                            value: attributes.iconPosition,
                            options: [
                                { label: __('Before Label', 'boostmycroco'), value: 'before' },
                                { label: __('After Label', 'boostmycroco'), value: 'after' },
                            ],
                            onChange: (value) => setAttributes({ iconPosition: value }),
                        }),
                        createElement(IconPicker),
                        createElement(TextControl, {
                            label: __('Button Label', 'boostmycroco'),
                            value: attributes.buttonLabel,
                            onChange: (value) => setAttributes({ buttonLabel: value }),
                            placeholder: __('Enter button text', 'boostmycroco'),
                        })
                    )
                ),
                createElement(
                    'button',
                    {
                        type: 'submit',
                        className: blockProps.className,
                    },
                    attributes.addIcon && attributes.iconPosition === 'before' &&
                        createElement('i', { className: `fa ${attributes.iconClass}` }),
                    ` ${attributes.buttonLabel} `,
                    attributes.addIcon && attributes.iconPosition === 'after' &&
                        createElement('i', { className: `fa ${attributes.iconClass}` })
                )
            );
        },
        save: function ({ attributes }) {
            const blockProps = useBlockProps.save();

            return createElement(
                'div',
                blockProps,
                createElement(
                    'button',
                    {
                        type: 'submit',
                        className: blockProps.className,
                    },
                    attributes.addIcon && attributes.iconPosition === 'before' &&
                        createElement('i', { className: `fa ${attributes.iconClass}` }),
                    ` ${attributes.buttonLabel} `,
                    attributes.addIcon && attributes.iconPosition === 'after' &&
                        createElement('i', { className: `fa ${attributes.iconClass}` })
                )
            );
        },
    });
});
