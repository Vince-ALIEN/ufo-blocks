import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InspectorControls,
    PanelColorSettings,
    useSettings,
} from '@wordpress/block-editor';
import { Disabled, PanelBody, RangeControl, SelectControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import ServerSideRender from '@wordpress/server-side-render';

// Mêmes correspondances que render.php
const POST_TYPES = {
    page: {
        label: __('Pages', 'ufo-blocks'),
        taxonomy: 'page_category',
        attribute: 'pageCategory',
        categoryLabel: __('Catégorie de page', 'ufo-blocks'),
    },
    post: {
        label: __('Articles', 'ufo-blocks'),
        taxonomy: 'category',
        attribute: 'postCategory',
        categoryLabel: __('Catégorie', 'ufo-blocks'),
    },
    realisation: {
        label: __('Réalisations', 'ufo-blocks'),
        taxonomy: 'type_realisation',
        attribute: 'adminCategory',
        categoryLabel: __('Type de réalisation', 'ufo-blocks'),
    },
};

// Contraste avec le texte blanc des cartes (mêmes règles que render.php)
function contrastWithWhite(color) {
    let hex = String(color).replace('#', '');
    if (hex.length === 3) {
        hex = hex.replace(/./g, '$&$&');
    }
    if (!/^[0-9a-f]{6}$/i.test(hex)) {
        return 0;
    }

    const luminance = [0.2126, 0.7152, 0.0722].reduce((sum, weight, i) => {
        const channel = parseInt(hex.substr(i * 2, 2), 16) / 255;
        return (
            sum +
            weight *
                (channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
        );
    }, 0);

    return 1.05 / (luminance + 0.05);
}

export default function Edit({ attributes, setAttributes }) {
    const { postType, postsToShow, backgroundColor } = attributes;

    // Palette du thème, limitée aux couleurs lisibles sous du texte blanc (AA)
    const [themePalette] = useSettings('color.palette.theme');
    const backgroundColors = (themePalette ?? []).filter(
        (color) => contrastWithWhite(color.color) >= 4.5
    );
    const currentBackground = backgroundColors.find((color) => color.slug === backgroundColor);
    const config = POST_TYPES[postType] ?? POST_TYPES.page;
    const currentCategory = attributes[config.attribute] ?? 0;

    const { availableTypes, categories } = useSelect(
        (select) => {
            const { getPostTypes, getTaxonomy, getEntityRecords } = select(coreStore);
            const existing = getPostTypes({ per_page: -1 }) ?? [];
            const taxonomyExists = !!getTaxonomy(config.taxonomy);

            return {
                availableTypes: Object.keys(POST_TYPES).filter(
                    (slug) => slug === postType || existing.some((type) => type.slug === slug)
                ),
                categories: taxonomyExists
                    ? getEntityRecords('taxonomy', config.taxonomy, { per_page: -1, _fields: 'id,name' })
                    : [],
            };
        },
        [postType, config.taxonomy]
    );

    const blockProps = useBlockProps();

    return (
        <div {...blockProps}>
            <InspectorControls>
                <PanelBody title={__('Réglages', 'ufo-blocks')}>
                    <SelectControl
                        __nextHasNoMarginBottom
                        label={__('Type de contenu', 'ufo-blocks')}
                        value={postType}
                        options={availableTypes.map((slug) => ({
                            value: slug,
                            label: POST_TYPES[slug].label,
                        }))}
                        onChange={(value) => setAttributes({ postType: value })}
                    />

                    {categories?.length > 0 && (
                        <SelectControl
                            __nextHasNoMarginBottom
                            label={config.categoryLabel}
                            value={currentCategory}
                            options={[
                                { value: 0, label: __('Toutes les catégories', 'ufo-blocks') },
                                ...categories.map((cat) => ({ value: cat.id, label: cat.name })),
                            ]}
                            onChange={(value) =>
                                setAttributes({ [config.attribute]: Number(value) })
                            }
                        />
                    )}

                    <RangeControl
                        __nextHasNoMarginBottom
                        label={__('Nombre d’éléments', 'ufo-blocks')}
                        help={__('Grille prévue pour 2 (une ligne) ou 5 (deux lignes).', 'ufo-blocks')}
                        value={postsToShow}
                        onChange={(value) => setAttributes({ postsToShow: value })}
                        min={1}
                        max={5}
                    />
                </PanelBody>

                <PanelColorSettings
                    title={__('Couleur', 'ufo-blocks')}
                    disableCustomColors
                    colorSettings={[
                        {
                            label: __('Fond et dégradé des cartes', 'ufo-blocks'),
                            colors: backgroundColors,
                            value: currentBackground?.color,
                            clearable: false,
                            onChange: (value) => {
                                const color = backgroundColors.find((c) => c.color === value);
                                if (color) {
                                    setAttributes({ backgroundColor: color.slug });
                                }
                            },
                        },
                    ]}
                >
                    <p className="components-base-control__help">
                        {__('Seules les couleurs du thème assez contrastées avec le texte blanc sont proposées.', 'ufo-blocks')}
                    </p>
                </PanelColorSettings>
            </InspectorControls>

            {/* Aperçu non interactif : les liens vers les contenus ne doivent pas
                être suivis depuis l'éditeur (comme le bloc core Derniers articles) */}
            <Disabled>
                <ServerSideRender
                    block="ufo-blocks/ufo-bento"
                    attributes={attributes}
                />
            </Disabled>
        </div>
    );
}
