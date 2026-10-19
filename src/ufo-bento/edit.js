import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl } from '@wordpress/components';
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

export default function Edit({ attributes, setAttributes }) {
    const { postType, postsToShow } = attributes;
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
            </InspectorControls>

            <ServerSideRender
                block="ufo-blocks/ufo-bento"
                attributes={attributes}
            />
        </div>
    );
}
