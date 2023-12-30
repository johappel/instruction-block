import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { TextControl, TextareaControl, ExternalLink, PanelBody } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
const { compose } = wp.compose;
const { plugins } = wp;


const MetaField = ({ metaKey, label, defaultValue, isTextarea }) => {
	const { editPost } = useDispatch('core/editor');
	const meta = useSelect((select) => select('core/editor').getEditedPostAttribute('meta')[metaKey], [metaKey]);
	const [value, setValue] = useState(meta || defaultValue);

	useEffect(() => {
		setValue(meta || defaultValue);
	}, [meta, defaultValue]);

	const onChangeValue = (newValue) => {
		setValue(newValue);
		editPost({ meta: { ...meta, [metaKey]: newValue } });
	};

	const ControlComponent = isTextarea ? TextareaControl : TextControl;

	return (
		<ControlComponent
			label={label}
			value={value}
			onChange={onChangeValue}
		/>
	);
};

const InstruktionMetaPanel = () => {
	return (
		<PluginDocumentSettingPanel
			name="instruction-meta-panel"
			title="Instruktionen Einstellungen"
			className="instruction-meta-panel"
		>
			<PanelBody>
				<MetaField metaKey="instruction_icon" label="Instruktionen Icon" defaultValue="dashicons-info-outline" />
				<MetaField metaKey="instruction_hint" label="Instruktionen Hinweis URL" defaultValue="" />
				<MetaField metaKey="instruction_class" label="CSS-Klasse" defaultValue="" />
				<MetaField metaKey="instruction_style" label="Zusätzliche CSS" defaultValue="" isTextarea />
				<ExternalLink href="https://developer.wordpress.org/resource/dashicons/">Dashicons Referenz</ExternalLink>
			</PanelBody>
		</PluginDocumentSettingPanel>
	);
};

registerPlugin('instruction-meta-panel', {
	render: InstruktionMetaPanel
});
