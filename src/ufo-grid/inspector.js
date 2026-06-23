import { __ } from "@wordpress/i18n";
import {
  InspectorControls,
  BlockControls,
  BlockVerticalAlignmentToolbar,
  MediaUpload,
  MediaUploadCheck,
} from "@wordpress/block-editor";
import {
  PanelBody,
  RangeControl,
  SelectControl,
  ToggleControl,
  Button,
} from "@wordpress/components";

export default function Inspector({ attributes, setAttributes }) {
  const {
    columnsCount,
    rowsCount,
    gap,
    verticalAlignment,
    reverseMobile,
    equalRows,
    minHeight,
    borderRadius,
    isBoxed,
    backgroundImage,
    backgroundSize,
    backgroundPosition,
    backgroundVideo,
    paddingX,
    paddingY,
  } = attributes;

  return (
    <>
      <InspectorControls>
        <PanelBody
          title={__("Paramètres des colonnes", "ufo-blocks")}
          initialOpen={true}
        >
          <RangeControl
            label={__("Nombre de colonnes", "ufo-blocks")}
            value={columnsCount}
            onChange={(newColumns) => setAttributes({ columnsCount: newColumns })}
            min={1}
            max={6}
            help={__("Choisissez le nombre de colonnes de la grille (1-6)", "ufo-blocks")}
          />

          <RangeControl
            label={__("Nombre de lignes", "ufo-blocks")}
            value={rowsCount}
            onChange={(newRows) => setAttributes({ rowsCount: newRows })}
            min={0}
            max={6}
            help={__("Nombre de lignes de la grille (0 = auto, 1-6 = fixe)", "ufo-blocks")}
          />

          <SelectControl
            label={__("Espacement (Gap)", "ufo-blocks")}
            value={gap}
            options={[
              { label: __("0 - Aucun (0px)", "ufo-blocks"), value: "0" },
              { label: __("1 - Très petit (4px)", "ufo-blocks"), value: "1" },
              { label: __("2 - Petit (8px)", "ufo-blocks"), value: "2" },
              { label: __("3 - (12px)", "ufo-blocks"), value: "3" },
              { label: __("4 - Moyen (16px)", "ufo-blocks"), value: "4" },
              { label: __("5 - (20px)", "ufo-blocks"), value: "5" },
              { label: __("6 - Large (24px)", "ufo-blocks"), value: "6" },
              { label: __("7 - (28px)", "ufo-blocks"), value: "7" },
              { label: __("8 - Très large (32px)", "ufo-blocks"), value: "8" },
            ]}
            onChange={(newGap) => setAttributes({ gap: newGap })}
            help={__("Espacement entre les colonnes (gap-0 à gap-8)", "ufo-blocks")}
          />

          <ToggleControl
            label={__("Lignes de hauteur égale", "ufo-blocks")}
            checked={equalRows}
            onChange={() => setAttributes({ equalRows: !equalRows })}
            help={__("Force toutes les lignes à la même hauteur (auto-rows-fr)", "ufo-blocks")}
          />

          <ToggleControl
            label={__("Inverser sur mobile", "ufo-blocks")}
            checked={reverseMobile}
            onChange={() => setAttributes({ reverseMobile: !reverseMobile })}
            help={__("Inverse l'ordre des colonnes sur mobile", "ufo-blocks")}
          />

          <SelectControl
            label={__("Hauteur minimale", "ufo-blocks")}
            value={minHeight}
            options={[
              { label: __("Auto (par défaut)", "ufo-blocks"), value: "" },
              { label: "24 (96px)",   value: "24" },
              { label: "32 (128px)",  value: "32" },
              { label: "40 (160px)",  value: "40" },
              { label: "48 (192px)",  value: "48" },
              { label: "56 (224px)",  value: "56" },
              { label: "64 (256px)",  value: "64" },
              { label: "72 (288px)",  value: "72" },
              { label: "80 (320px)",  value: "80" },
              { label: "96 (384px)",  value: "96" },
              { label: "120 (480px)", value: "120" },
              { label: "150 (600px)", value: "150" },
              { label: __("100 %", "ufo-blocks"), value: "h-full" },
              { label: __("Screen (100vh)", "ufo-blocks"), value: "screen" },
            ]}
            onChange={(newMinHeight) => setAttributes({ minHeight: newMinHeight })}
            help={__("Hauteur minimale de la grille pour garantir les proportions", "ufo-blocks")}
          />

          <ToggleControl
            label={__("Conteneur boxed", "ufo-blocks")}
            checked={isBoxed}
            onChange={() => setAttributes({ isBoxed: !isBoxed })}
            help={__("Centre le contenu avec une largeur maximale (max-w-content)", "ufo-blocks")}
          />

          <SelectControl
            label={__("Padding horizontal (X)", "ufo-blocks")}
            value={paddingX}
            options={[
              { label: __("0 - Aucun", "ufo-blocks"), value: "0" },
              { label: __("2 (8px)", "ufo-blocks"), value: "2" },
              { label: __("4 (16px)", "ufo-blocks"), value: "4" },
              { label: __("6 (24px)", "ufo-blocks"), value: "6" },
              { label: __("8 (32px)", "ufo-blocks"), value: "8" },
              { label: __("10 (40px)", "ufo-blocks"), value: "10" },
              { label: __("12 (48px)", "ufo-blocks"), value: "12" },
              { label: __("14 (56px)", "ufo-blocks"), value: "14" },
              { label: __("16 (64px)", "ufo-blocks"), value: "16" },
            ]}
            onChange={(newPaddingX) => setAttributes({ paddingX: newPaddingX })}
          />

          <SelectControl
            label={__("Padding vertical (Y)", "ufo-blocks")}
            value={paddingY}
            options={[
              { label: __("0 - Aucun", "ufo-blocks"), value: "0" },
              { label: __("2 (8px)", "ufo-blocks"), value: "2" },
              { label: __("4 (16px)", "ufo-blocks"), value: "4" },
              { label: __("6 (24px)", "ufo-blocks"), value: "6" },
              { label: __("8 (32px)", "ufo-blocks"), value: "8" },
              { label: __("10 (40px)", "ufo-blocks"), value: "10" },
              { label: __("12 (48px)", "ufo-blocks"), value: "12" },
              { label: __("14 (56px)", "ufo-blocks"), value: "14" },
              { label: __("16 (64px)", "ufo-blocks"), value: "16" },
            ]}
            onChange={(newPaddingY) => setAttributes({ paddingY: newPaddingY })}
          />
        </PanelBody>
      </InspectorControls>

      <InspectorControls group="styles">
        <PanelBody
          title={__("Image d'arrière-plan", "ufo-blocks")}
          initialOpen={false}
        >
          <MediaUploadCheck>
            <MediaUpload
              onSelect={(media) =>
                setAttributes({
                  backgroundImage: { url: media.url, id: media.id, alt: media.alt },
                })
              }
              allowedTypes={["image"]}
              value={backgroundImage?.id}
              render={({ open }) => (
                <Button
                  onClick={open}
                  variant={backgroundImage?.id ? "secondary" : "primary"}
                  className="mb-4"
                >
                  {backgroundImage?.id
                    ? __("Remplacer l'image", "ufo-blocks")
                    : __("Ajouter une image", "ufo-blocks")}
                </Button>
              )}
            />
          </MediaUploadCheck>

          {backgroundImage?.id && (
            <>
              <Button
                onClick={() =>
                  setAttributes({ backgroundImage: { url: "", id: null, alt: "" } })
                }
                isDestructive
                className="mb-4"
              >
                {__("Supprimer l'image", "ufo-blocks")}
              </Button>

              <SelectControl
                label={__("Taille de l'image", "ufo-blocks")}
                value={backgroundSize}
                options={[
                  { label: __("Cover", "ufo-blocks"), value: "cover" },
                  { label: __("Contain", "ufo-blocks"), value: "contain" },
                  { label: __("Auto", "ufo-blocks"), value: "auto" },
                ]}
                onChange={(value) => setAttributes({ backgroundSize: value })}
              />

              <SelectControl
                label={__("Position de l'image", "ufo-blocks")}
                value={backgroundPosition}
                options={[
                  { label: __("Centre", "ufo-blocks"), value: "center center" },
                  { label: __("Haut gauche", "ufo-blocks"), value: "top left" },
                  { label: __("Haut centre", "ufo-blocks"), value: "top center" },
                  { label: __("Haut droite", "ufo-blocks"), value: "top right" },
                  { label: __("Centre gauche", "ufo-blocks"), value: "center left" },
                  { label: __("Centre droite", "ufo-blocks"), value: "center right" },
                  { label: __("Bas gauche", "ufo-blocks"), value: "bottom left" },
                  { label: __("Bas centre", "ufo-blocks"), value: "bottom center" },
                  { label: __("Bas droite", "ufo-blocks"), value: "bottom right" },
                ]}
                onChange={(value) => setAttributes({ backgroundPosition: value })}
              />
            </>
          )}
        </PanelBody>

        <PanelBody
          title={__("Vidéo d'arrière-plan", "ufo-blocks")}
          initialOpen={false}
        >
          <MediaUploadCheck>
            <MediaUpload
              onSelect={(media) =>
                setAttributes({ backgroundVideo: { url: media.url, id: media.id } })
              }
              allowedTypes={["video"]}
              value={backgroundVideo?.id}
              render={({ open }) => (
                <Button
                  onClick={open}
                  variant={backgroundVideo?.id ? "secondary" : "primary"}
                  className="mb-4"
                >
                  {backgroundVideo?.id
                    ? __("Remplacer la vidéo", "ufo-blocks")
                    : __("Ajouter une vidéo", "ufo-blocks")}
                </Button>
              )}
            />
          </MediaUploadCheck>

          {backgroundVideo?.id && (
            <Button
              onClick={() =>
                setAttributes({ backgroundVideo: { url: "", id: null } })
              }
              isDestructive
            >
              {__("Supprimer la vidéo", "ufo-blocks")}
            </Button>
          )}
        </PanelBody>

        <PanelBody
          title={__("Border Radius", "ufo-blocks")}
          initialOpen={false}
        >
          <SelectControl
            label={__("Border Radius", "ufo-blocks")}
            value={borderRadius}
            options={[
              { label: __("Aucun", "ufo-blocks"), value: "" },
              { label: __("SM (2px)", "ufo-blocks"), value: "sm" },
              { label: __("MD (6px)", "ufo-blocks"), value: "md" },
              { label: __("LG (8px)", "ufo-blocks"), value: "lg" },
              { label: __("XL (12px)", "ufo-blocks"), value: "xl" },
              { label: __("2XL (16px)", "ufo-blocks"), value: "2xl" },
              { label: __("3XL (24px)", "ufo-blocks"), value: "3xl" },
            ]}
            onChange={(newBorderRadius) =>
              setAttributes({ borderRadius: newBorderRadius })
            }
            help={__("Arrondi des coins (classes Tailwind rounded-*)", "ufo-blocks")}
          />
        </PanelBody>
      </InspectorControls>

      <BlockControls>
        <BlockVerticalAlignmentToolbar
          onChange={(newAlignment) =>
            setAttributes({ verticalAlignment: newAlignment })
          }
          value={verticalAlignment}
        />
      </BlockControls>
    </>
  );
}
