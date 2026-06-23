import { __ } from "@wordpress/i18n";
import {
  InspectorControls,
  BlockControls,
  BlockVerticalAlignmentToolbar,
  MediaUpload,
  MediaUploadCheck,
} from "@wordpress/block-editor";
import { PanelBody, SelectControl, RangeControl, Button } from "@wordpress/components";

export default function Inspector({ attributes, setAttributes }) {
  const {
    colSpan,
    colStart,
    colEnd,
    rowSpan,
    rowStart,
    rowEnd,
    minHeight,
    height,
    verticalAlignment,
    borderRadius,
    paddingY,
    paddingX,
    backgroundImage,
    backgroundSize,
    backgroundPosition,
  } = attributes;

  return (
    <>
      <BlockControls>
        <BlockVerticalAlignmentToolbar
          value={verticalAlignment}
          onChange={(newAlignment) =>
            setAttributes({ verticalAlignment: newAlignment })
          }
        />
      </BlockControls>

      <InspectorControls>
        <PanelBody
          title={__("Disposition de la colonne", "ufo-blocks")}
          initialOpen={true}
        >
          <RangeControl
            label={__("Col-span", "ufo-blocks")}
            value={colSpan ? parseInt(colSpan, 10) : undefined}
            onChange={(value) =>
              setAttributes({ colSpan: value ? String(value) : "" })
            }
            min={1}
            max={6}
            allowReset
            resetFallbackValue={undefined}
            help={__("Nombre de colonnes que cet élément doit occuper", "ufo-blocks")}
          />

          <RangeControl
            label={__("Row-span", "ufo-blocks")}
            value={rowSpan ? parseInt(rowSpan, 10) : undefined}
            onChange={(value) =>
              setAttributes({ rowSpan: value ? String(value) : "" })
            }
            min={1}
            max={6}
            allowReset
            resetFallbackValue={undefined}
            help={__("Nombre de lignes que cet élément doit occuper", "ufo-blocks")}
          />

          <SelectControl
            label={__("Col-start", "ufo-blocks")}
            value={colStart}
            options={[
              { label: __("Auto (par défaut)", "ufo-blocks"), value: "" },
              { label: __("1", "ufo-blocks"), value: "1" },
              { label: __("2", "ufo-blocks"), value: "2" },
              { label: __("3", "ufo-blocks"), value: "3" },
              { label: __("4", "ufo-blocks"), value: "4" },
              { label: __("5", "ufo-blocks"), value: "5" },
              { label: __("6", "ufo-blocks"), value: "6" },
              { label: __("7", "ufo-blocks"), value: "7" },
            ]}
            onChange={(newColStart) => setAttributes({ colStart: newColStart })}
            help={__("Position de départ de la colonne dans la grille", "ufo-blocks")}
          />

          <SelectControl
            label={__("Col-end", "ufo-blocks")}
            value={colEnd}
            options={[
              { label: __("Auto (par défaut)", "ufo-blocks"), value: "" },
              { label: __("1", "ufo-blocks"), value: "1" },
              { label: __("2", "ufo-blocks"), value: "2" },
              { label: __("3", "ufo-blocks"), value: "3" },
              { label: __("4", "ufo-blocks"), value: "4" },
              { label: __("5", "ufo-blocks"), value: "5" },
              { label: __("6", "ufo-blocks"), value: "6" },
              { label: __("7", "ufo-blocks"), value: "7" },
              { label: __("8", "ufo-blocks"), value: "8" },
            ]}
            onChange={(newColEnd) => setAttributes({ colEnd: newColEnd })}
            help={__("Position de fin de la colonne dans la grille", "ufo-blocks")}
          />

          <SelectControl
            label={__("Row-start", "ufo-blocks")}
            value={rowStart}
            options={[
              { label: __("Auto (par défaut)", "ufo-blocks"), value: "" },
              { label: __("1", "ufo-blocks"), value: "1" },
              { label: __("2", "ufo-blocks"), value: "2" },
              { label: __("3", "ufo-blocks"), value: "3" },
              { label: __("4", "ufo-blocks"), value: "4" },
              { label: __("5", "ufo-blocks"), value: "5" },
              { label: __("6", "ufo-blocks"), value: "6" },
              { label: __("7", "ufo-blocks"), value: "7" },
            ]}
            onChange={(newRowStart) => setAttributes({ rowStart: newRowStart })}
            help={__("Position de départ de la ligne dans la grille", "ufo-blocks")}
          />

          <SelectControl
            label={__("Row-end", "ufo-blocks")}
            value={rowEnd}
            options={[
              { label: __("Auto (par défaut)", "ufo-blocks"), value: "" },
              { label: __("1", "ufo-blocks"), value: "1" },
              { label: __("2", "ufo-blocks"), value: "2" },
              { label: __("3", "ufo-blocks"), value: "3" },
              { label: __("4", "ufo-blocks"), value: "4" },
              { label: __("5", "ufo-blocks"), value: "5" },
              { label: __("6", "ufo-blocks"), value: "6" },
              { label: __("7", "ufo-blocks"), value: "7" },
            ]}
            onChange={(newRowEnd) => setAttributes({ rowEnd: newRowEnd })}
            help={__("Position de fin de la ligne dans la grille", "ufo-blocks")}
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
              { label: __("100 %", "ufo-blocks"), value: "full" },
              { label: __("Screen (100vh)", "ufo-blocks"), value: "screen" },
            ]}
            onChange={(newMinHeight) => setAttributes({ minHeight: newMinHeight })}
            help={__("Hauteur minimale de l'élément", "ufo-blocks")}
          />

          <SelectControl
            label={__("Hauteur fixe", "ufo-blocks")}
            value={height}
            options={[
              { label: __("Auto (par défaut)", "ufo-blocks"), value: "" },
              { label: __("24 (96px)", "ufo-blocks"), value: "24" },
              { label: __("32 (128px)", "ufo-blocks"), value: "32" },
              { label: __("40 (160px)", "ufo-blocks"), value: "40" },
              { label: __("48 (192px)", "ufo-blocks"), value: "48" },
              { label: __("56 (224px)", "ufo-blocks"), value: "56" },
              { label: __("64 (256px)", "ufo-blocks"), value: "64" },
              { label: __("72 (288px)", "ufo-blocks"), value: "72" },
              { label: __("80 (320px)", "ufo-blocks"), value: "80" },
              { label: __("96 (384px)", "ufo-blocks"), value: "96" },
              { label: "120 (480px)", value: "120" },
              { label: "150 (600px)", value: "150" },
              { label: __("Screen (100vh)", "ufo-blocks"), value: "screen" },
            ]}
            onChange={(newHeight) => setAttributes({ height: newHeight })}
            help={__("Hauteur fixe de l'élément (h-*)", "ufo-blocks")}
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
    </>
  );
}
