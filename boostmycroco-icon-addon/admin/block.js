const { registerBlockType } = wp.blocks;
const { InspectorControls, useBlockProps } = wp.blockEditor;
const { PanelBody, ToggleControl, ColorPicker, SelectControl, RangeControl, TextControl } = wp.components;
const { createElement, Fragment } = wp.element;
const { __ } = wp.i18n;

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

registerBlockType('boostmycroco/submit-icon-button', {
    title: __('Submit Icon Button', 'boostmycroco'),
    description: __('Add a custom submit button with an icon and label.', 'boostmycroco'),
    category: 'design',
    icon: 'button',
    attributes: {
        iconClass: { type: 'string', default: 'fa-paper-plane' },
        iconPosition: { type: 'string', default: 'before' },
        addIcon: { type: 'boolean', default: true },
        buttonLabel: { type: 'string', default: 'Submit' },
        labelColor: { type: 'string', default: '#ffffff' },
        iconColor: { type: 'string', default: '#ffffff' },
        backgroundColor: { type: 'string', default: '#007cba' },
        borderSize: { type: 'number', default: 0 },
        borderColor: { type: 'string', default: '#000000' },
        borderRadius: { type: 'number', default: 4 },
        paddingTop: { type: 'number', default: 10 },
        paddingRight: { type: 'number', default: 20 },
        paddingBottom: { type: 'number', default: 10 },
        paddingLeft: { type: 'number', default: 20 },
        hoverLabelColor: { type: 'string', default: '#ffffff' },
        hoverIconColor: { type: 'string', default: '#ffffff' },
        hoverBackgroundColor: { type: 'string', default: '#005fa3' },
        buttonAlignment: { type: 'string', default: 'center' },
    },
    edit: function ({ attributes, setAttributes }) {
        const blockProps = useBlockProps();

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
            Fragment,
            null,
            createElement(
                InspectorControls,
                null,
                createElement(
                    PanelBody,
                    { title: __('General Settings', 'boostmycroco'), initialOpen: true },
                    createElement(ToggleControl, {
                        label: __('Add Icon to Button', 'boostmycroco'),
                        checked: attributes.addIcon,
                        onChange: (value) => setAttributes({ addIcon: value }),
                    }),
                    createElement('p', {}, __('Select Icon', 'boostmycroco')),
                    createElement(IconPicker),
                    createElement(SelectControl, {
                        label: __('Icon Position', 'boostmycroco'),
                        value: attributes.iconPosition,
                        options: [
                            { label: __('Before', 'boostmycroco'), value: 'before' },
                            { label: __('After', 'boostmycroco'), value: 'after' },
                        ],
                        onChange: (value) => setAttributes({ iconPosition: value }),
                    }),
                    createElement(SelectControl, {
                        label: __('Button Alignment', 'boostmycroco'),
                        value: attributes.buttonAlignment,
                        options: [
                            { label: __('Left', 'boostmycroco'), value: 'left' },
                            { label: __('Center', 'boostmycroco'), value: 'center' },
                            { label: __('Right', 'boostmycroco'), value: 'right' },
                        ],
                        onChange: (value) => setAttributes({ buttonAlignment: value }),
                    }),
                    createElement(TextControl, {
                        label: __('Button Label', 'boostmycroco'),
                        value: attributes.buttonLabel,
                        onChange: (value) => setAttributes({ buttonLabel: value }),
                    })
                ),
                createElement(
                    PanelBody,
                    { title: __('Normal State Styles', 'boostmycroco'), initialOpen: false },
                    createElement('p', {}, __('Label Color', 'boostmycroco')),
                    createElement(ColorPicker, {
                        color: attributes.labelColor,
                        onChangeComplete: (color) => setAttributes({ labelColor: color.hex }),
                    }),
                    createElement('p', {}, __('Icon Color', 'boostmycroco')),
                    createElement(ColorPicker, {
                        color: attributes.iconColor,
                        onChangeComplete: (color) => setAttributes({ iconColor: color.hex }),
                    }),
                    createElement('p', {}, __('Background Color', 'boostmycroco')),
                    createElement(ColorPicker, {
                        color: attributes.backgroundColor,
                        onChangeComplete: (color) => setAttributes({ backgroundColor: color.hex }),
                    }),
                    createElement(RangeControl, {
                        label: __('Border Size (px)', 'boostmycroco'),
                        value: attributes.borderSize,
                        onChange: (value) => setAttributes({ borderSize: value }),
                        min: 0,
                        max: 10
                    }),
                    createElement('p', {}, __('Border Color', 'boostmycroco')),
                    createElement(ColorPicker, {
                        color: attributes.borderColor,
                        onChangeComplete: (color) => setAttributes({ borderColor: color.hex }),
                    }),
                    createElement(RangeControl, {
                        label: __('Border Radius (px)', 'boostmycroco'),
                        value: attributes.borderRadius,
                        onChange: (value) => setAttributes({ borderRadius: value }),
                        min: 0,
                        max: 50
                    }),
                    createElement(RangeControl, {
                        label: __('Padding Top (px)', 'boostmycroco'),
                        value: attributes.paddingTop,
                        onChange: (value) => setAttributes({ paddingTop: value }),
                        min: 0,
                        max: 100
                    }),
                    createElement(RangeControl, {
                        label: __('Padding Right (px)', 'boostmycroco'),
                        value: attributes.paddingRight,
                        onChange: (value) => setAttributes({ paddingRight: value }),
                        min: 0,
                        max: 100
                    }),
                    createElement(RangeControl, {
                        label: __('Padding Bottom (px)', 'boostmycroco'),
                        value: attributes.paddingBottom,
                        onChange: (value) => setAttributes({ paddingBottom: value }),
                        min: 0,
                        max: 100
                    }),
                    createElement(RangeControl, {
                        label: __('Padding Left (px)', 'boostmycroco'),
                        value: attributes.paddingLeft,
                        onChange: (value) => setAttributes({ paddingLeft: value }),
                        min: 0,
                        max: 100
                    })
                ),
                createElement(
                    PanelBody,
                    { title: __('Hover State Styles', 'boostmycroco'), initialOpen: false },
                    createElement('p', {}, __('Label Color', 'boostmycroco')),
                    createElement(ColorPicker, {
                        color: attributes.hoverLabelColor,
                        onChangeComplete: (color) => setAttributes({ hoverLabelColor: color.hex }),
                    }),
                    createElement('p', {}, __('Icon Color', 'boostmycroco')),
                    createElement(ColorPicker, {
                        color: attributes.hoverIconColor,
                        onChangeComplete: (color) => setAttributes({ hoverIconColor: color.hex }),
                    }),
                    createElement('p', {}, __('Background Color', 'boostmycroco')),
                    createElement(ColorPicker, {
                        color: attributes.hoverBackgroundColor,
                        onChangeComplete: (color) => setAttributes({ hoverBackgroundColor: color.hex }),
                    })
                )
            ),
            createElement(
                'div',
                { style: { textAlign: attributes.buttonAlignment } },
                createElement(
                    'button',
                    {
                        type: 'submit',
                        className: `boostmycroco-button ${attributes.iconClass}`,
                        style: {
                            color: attributes.labelColor,
                            backgroundColor: attributes.backgroundColor,
                            border: attributes.borderSize > 0 ? `${attributes.borderSize}px solid ${attributes.borderColor}` : 'none',
                            borderRadius: `${attributes.borderRadius}px`,
                            padding: `${attributes.paddingTop}px ${attributes.paddingRight}px ${attributes.paddingBottom}px ${attributes.paddingLeft}px`
                        }
                    },
                    attributes.addIcon && attributes.iconPosition === 'before' && createElement('i', {
                        className: `fa ${attributes.iconClass}`,
                        style: { color: attributes.iconColor, marginRight: '5px' }
                    }),
                    attributes.buttonLabel,
                    attributes.addIcon && attributes.iconPosition === 'after' && createElement('i', {
                        className: `fa ${attributes.iconClass}`,
                        style: { color: attributes.iconColor, marginLeft: '5px' }
                    })
                )
            )
        );
    },
    save: () => {
        return null;
    }
});
