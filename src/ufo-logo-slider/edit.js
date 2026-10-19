/**
 * UFO Blocks – Logo Slider
 * Bloc Gutenberg : éditeur (edit.js)
 */

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	RangeControl,
	SelectControl,
	ToggleControl,
	TextControl,
	Placeholder,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { chevronUp, chevronDown, close } from '@wordpress/icons';

import './editor.css';

// ─── Variantes disponibles ───────────────────────────────────────────────────
const VARIANTS = [
	{ label: __( 'Clair', 'ufo-blocks' ), value: 'light' },
	{ label: __( 'Sombre', 'ufo-blocks' ), value: 'dark' },
	{ label: __( 'Cartes (border)', 'ufo-blocks' ), value: 'card' },
];

const VARIANT_BG = {
	light: 'dark:bg-gray-900',
	dark: 'bg-gray-950',
	card: 'bg-gray-50 dark:bg-gray-900',
};

// ─── Composant logo item dans l'éditeur ──────────────────────────────────────
const LogoItem = ( { logo, index, total, onRemove, onUpdate, onMove } ) => {
	const [ editingLink, setEditingLink ] = useState( false );

	return (
		<div className="ufo-ls-item">
			<div className="ufo-ls-preview">
				<img src={ logo.url } alt={ logo.alt || '' } />
			</div>

			<div className="ufo-ls-meta">
				<span className="ufo-ls-name">
					{ logo.alt || `Logo ${ index + 1 }` }
				</span>

				{ editingLink ? (
					<TextControl
						label={ __( 'URL du lien (optionnel)', 'ufo-blocks' ) }
						value={ logo.link || '' }
						onChange={ ( val ) =>
							onUpdate( index, { ...logo, link: val } )
						}
						placeholder="https://..."
						type="url"
					/>
				) : (
					<Button
						variant="link"
						className="ufo-ls-link-btn"
						onClick={ () => setEditingLink( true ) }
					>
						{ logo.link
							? __( 'Modifier le lien', 'ufo-blocks' )
							: __( '+ Ajouter un lien', 'ufo-blocks' ) }
					</Button>
				) }
			</div>

			<div className="ufo-ls-actions">
				<Button
					size="small"
					icon={ chevronUp }
					label={ __( 'Monter', 'ufo-blocks' ) }
					disabled={ index === 0 }
					onClick={ () => onMove( index, -1 ) }
				/>
				<Button
					size="small"
					icon={ chevronDown }
					label={ __( 'Descendre', 'ufo-blocks' ) }
					disabled={ index === total - 1 }
					onClick={ () => onMove( index, 1 ) }
				/>
				<Button
					size="small"
					icon={ close }
					label={ __( 'Supprimer', 'ufo-blocks' ) }
					isDestructive
					onClick={ () => onRemove( index ) }
				/>
			</div>
		</div>
	);
};

// ─── Composant principal Edit ─────────────────────────────────────────────────
export default function Edit( { attributes, setAttributes } ) {
	const {
		logos,
		speed,
		direction,
		variant,
		logoHeight,
		gap,
		pauseOnHover,
		grayscale,
		showFade,
	} = attributes;

	const blockProps = useBlockProps( {
		className: `${ VARIANT_BG[ variant ] || 'bg-white' } py-8`,
	} );

	// ── Handlers ──────────────────────────────────────────────────────────────
	const addLogos = ( media ) => {
		const newLogos = media.map( ( m ) => ( {
			id: m.id,
			url: m.url,
			alt: m.alt || m.title || '',
			link: '',
			width: m.width || 0,
			height: m.height || 0,
		} ) );
		setAttributes( { logos: [ ...logos, ...newLogos ] } );
	};

	const removeLogo = ( index ) => {
		setAttributes( { logos: logos.filter( ( _, i ) => i !== index ) } );
	};

	const updateLogo = ( index, updated ) => {
		const next = [ ...logos ];
		next[ index ] = updated;
		setAttributes( { logos: next } );
	};

	const moveLogo = ( index, delta ) => {
		const target = index + delta;
		if ( target < 0 || target >= logos.length ) {
			return;
		}
		const next = [ ...logos ];
		[ next[ index ], next[ target ] ] = [ next[ target ], next[ index ] ];
		setAttributes( { logos: next } );
	};

	// ── Classes Tailwind de l'image selon variante ─────────────────────────────
	const getImgClass = () => {
		let cls =
			'block w-auto max-w-none object-contain transition-all duration-300';
		if ( variant === 'dark' ) {
			cls += ' brightness-0 invert opacity-50';
		} else if ( grayscale ) {
			cls +=
				' grayscale opacity-60 dark:brightness-0 dark:invert dark:grayscale-0 dark:opacity-40';
		} else {
			cls += ' dark:brightness-0 dark:invert dark:opacity-60';
		}
		return cls;
	};

	const getItemClass = () => {
		let cls = 'flex items-center justify-center shrink-0';
		if ( variant === 'card' ) {
			cls +=
				' bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-5 py-3 shadow-sm';
		}
		return cls;
	};

	return (
		<>
			{ /* ── Panneau d'options ── */ }
			<InspectorControls>
				<PanelBody
					title={ __( 'Logos', 'ufo-blocks' ) }
					initialOpen={ true }
				>
					<p className="ufo-ls-count">
						{ logos.length } logo{ logos.length !== 1 ? 's' : '' }{ ' ' }
						ajouté{ logos.length !== 1 ? 's' : '' }
					</p>

					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) =>
								addLogos(
									Array.isArray( media ) ? media : [ media ]
								)
							}
							allowedTypes={ [ 'image' ] }
							multiple={ true }
							gallery={ false }
							value={ logos.map( ( l ) => l.id ) }
							render={ ( { open } ) => (
								<Button
									variant="secondary"
									onClick={ open }
									style={ {
										width: '100%',
										justifyContent: 'center',
									} }
								>
									{ logos.length
										? __(
												'+ Ajouter des logos',
												'ufo-blocks'
										  )
										: __(
												'Choisir des logos',
												'ufo-blocks'
										  ) }
								</Button>
							) }
						/>
					</MediaUploadCheck>

					{ logos.length > 0 && (
						<div className="ufo-ls-list">
							{ logos.map( ( logo, i ) => (
								<LogoItem
									key={ `${ logo.id }-${ i }` }
									logo={ logo }
									index={ i }
									total={ logos.length }
									onRemove={ removeLogo }
									onUpdate={ updateLogo }
									onMove={ moveLogo }
								/>
							) ) }
						</div>
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'Apparence', 'ufo-blocks' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Variante', 'ufo-blocks' ) }
						value={ variant }
						options={ VARIANTS }
						onChange={ ( val ) =>
							setAttributes( { variant: val } )
						}
					/>
					<RangeControl
						label={ __( 'Hauteur des logos (px)', 'ufo-blocks' ) }
						value={ logoHeight }
						onChange={ ( val ) =>
							setAttributes( { logoHeight: val } )
						}
						min={ 20 }
						max={ 120 }
						step={ 4 }
					/>
					<RangeControl
						label={ __(
							'Espacement entre logos (px)',
							'ufo-blocks'
						) }
						value={ gap }
						onChange={ ( val ) => setAttributes( { gap: val } ) }
						min={ 16 }
						max={ 160 }
						step={ 8 }
					/>
					<ToggleControl
						label={ __( 'Niveaux de gris', 'ufo-blocks' ) }
						help={ __(
							'Les logos passent en couleur au survol',
							'ufo-blocks'
						) }
						checked={ grayscale }
						onChange={ ( val ) =>
							setAttributes( { grayscale: val } )
						}
					/>
					<ToggleControl
						label={ __( 'Fondu latéral', 'ufo-blocks' ) }
						help={ __(
							'Dégradé transparent sur les bords',
							'ufo-blocks'
						) }
						checked={ showFade }
						onChange={ ( val ) =>
							setAttributes( { showFade: val } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Animation', 'ufo-blocks' ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __(
							'Vitesse (secondes pour un cycle complet)',
							'ufo-blocks'
						) }
						value={ speed }
						onChange={ ( val ) => setAttributes( { speed: val } ) }
						min={ 10 }
						max={ 120 }
						step={ 5 }
					/>
					<SelectControl
						label={ __( 'Sens de défilement', 'ufo-blocks' ) }
						value={ direction }
						options={ [
							{
								label: __( '← Gauche (défaut)', 'ufo-blocks' ),
								value: 'left',
							},
							{
								label: __( '→ Droite', 'ufo-blocks' ),
								value: 'right',
							},
						] }
						onChange={ ( val ) =>
							setAttributes( { direction: val } )
						}
					/>
					<ToggleControl
						label={ __( 'Pause au survol', 'ufo-blocks' ) }
						checked={ pauseOnHover }
						onChange={ ( val ) =>
							setAttributes( { pauseOnHover: val } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			{ /* ── Aperçu dans l'éditeur ── */ }
			<div { ...blockProps }>
				{ logos.length === 0 ? (
					<Placeholder
						icon="slides"
						label={ __( 'Logo Slider', 'ufo-blocks' ) }
						instructions={ __(
							'Ajoutez vos logos via le panneau latéral →',
							'ufo-blocks'
						) }
					>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ ( media ) =>
									addLogos(
										Array.isArray( media )
											? media
											: [ media ]
									)
								}
								allowedTypes={ [ 'image' ] }
								multiple={ true }
								render={ ( { open } ) => (
									<Button variant="primary" onClick={ open }>
										{ __(
											'Choisir des logos',
											'ufo-blocks'
										) }
									</Button>
								) }
							/>
						</MediaUploadCheck>
					</Placeholder>
				) : (
					<div
						className="overflow-hidden relative"
						style={
							showFade
								? {
										WebkitMaskImage:
											'linear-gradient(to right,transparent,#000 10%,#000 90%,transparent)',
										maskImage:
											'linear-gradient(to right,transparent,#000 10%,#000 90%,transparent)',
								  }
								: {}
						}
					>
						{ /* Aperçu statique (pas d'animation dans l'éditeur) */ }
						<div
							className={ `flex items-center flex-wrap ${
								variant === 'card' ? 'gap-4' : 'gap-8'
							} py-4` }
						>
							{ logos.map( ( logo, i ) => (
								<div
									key={ `${ logo.id }-${ i }` }
									className={ getItemClass() }
								>
									<img
										src={ logo.url }
										alt={ logo.alt || '' }
										className={ getImgClass() }
										style={ {
											height: `${ logoHeight }px`,
										} }
									/>
								</div>
							) ) }
						</div>
						<p className="ufo-ls-notice">
							{ __(
								'▶ Aperçu statique — le défilement est actif en front-end',
								'ufo-blocks'
							) }
						</p>
					</div>
				) }
			</div>
		</>
	);
}
