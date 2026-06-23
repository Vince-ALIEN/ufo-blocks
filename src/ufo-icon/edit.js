import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
	AlignmentControl,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl, BaseControl } from '@wordpress/components';
import { ICONS, ICON_LIST } from '../shared/icons';
import clsx from 'clsx';
import './editor.css';

export default function Edit( { attributes, setAttributes } ) {
	const { icon, iconSize, textAlign } = attributes;
	const IconComponent = ICONS[ icon ];

	const blockProps = useBlockProps( {
		className: clsx( 'ufo-icon-block', {
			[ `has-text-align-${ textAlign }` ]: textAlign,
		} ),
		'data-icon': icon || '—',
		'data-size': iconSize,
	} );

	return (
		<>
			<BlockControls group="block">
				<AlignmentControl
					value={ textAlign }
					onChange={ ( val ) => setAttributes( { textAlign: val } ) }
				/>
			</BlockControls>

			<InspectorControls>
				<PanelBody title={ __( 'Icône', 'ufo-blocks' ) } initialOpen>
					<BaseControl label={ __( 'Choisir une icône', 'ufo-blocks' ) }>
						<div className="ufo-icon-picker">
							<button
								className={ clsx( 'ufo-icon-picker__item', { 'is-selected': ! icon } ) }
								onClick={ () => setAttributes( { icon: '' } ) }
								title={ __( 'Aucune icône', 'ufo-blocks' ) }
								aria-label={ __( 'Aucune icône', 'ufo-blocks' ) }
								aria-pressed={ ! icon }
							>
								<span style={ { fontSize: 10, lineHeight: 1 } }>—</span>
							</button>
							{ ICON_LIST.map( ( { value, label } ) => {
								const Icon = ICONS[ value ];
								return (
									<button
										key={ value }
										className={ clsx( 'ufo-icon-picker__item', {
											'is-selected': icon === value,
										} ) }
										onClick={ () => setAttributes( { icon: value } ) }
										title={ label }
										aria-label={ label }
										aria-pressed={ icon === value }
									>
										<Icon size={ 16 } />
									</button>
								);
							} ) }
						</div>
					</BaseControl>

					<RangeControl
						label={ __( 'Taille (px)', 'ufo-blocks' ) }
						value={ iconSize }
						onChange={ ( val ) => setAttributes( { iconSize: val } ) }
						min={ 12 }
						max={ 120 }
						step={ 4 }
						marks={ [
							{ value: 16, label: '16' },
							{ value: 24, label: '24' },
							{ value: 32, label: '32' },
							{ value: 48, label: '48' },
							{ value: 64, label: '64' },
							{ value: 96, label: '96' },
						] }
						withInputField
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ IconComponent ? (
					<IconComponent size={ iconSize } />
				) : (
					<span className="ufo-icon-block__placeholder">
						{ __( '← Choisir une icône', 'ufo-blocks' ) }
					</span>
				) }
			</div>
		</>
	);
}
