import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  useInnerBlocksProps,
  InspectorControls,
  BlockControls,
  BlockVerticalAlignmentToolbar,
  MediaUpload,
  MediaUploadCheck,
} from "@wordpress/block-editor";
import { PanelBody, SelectControl, RangeControl, Button } from "@wordpress/components";
import classnames from "classnames";
import "./editor.css";

/**
 * Edit component pour le bloc Column
 */
export default function Edit({ attributes, setAttributes }) {
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

  /**
   * Classes Tailwind CSS pour la colonne
   * Classes en dur pour que Tailwind puisse les compiler
   */
  const tailwindClasses = ["ufo-row"];

  // Col-span sur desktop
  if (colSpan === "1") {
    tailwindClasses.push("md:col-span-1");
  } else if (colSpan === "2") {
    tailwindClasses.push("md:col-span-2");
  } else if (colSpan === "3") {
    tailwindClasses.push("md:col-span-3");
  } else if (colSpan === "4") {
    tailwindClasses.push("md:col-span-4");
  } else if (colSpan === "5") {
    tailwindClasses.push("md:col-span-5");
  } else if (colSpan === "6") {
    tailwindClasses.push("md:col-span-6");
  } else if (colSpan === "7") {
    tailwindClasses.push("md:col-span-7");
  } else if (colSpan === "8") {
    tailwindClasses.push("md:col-span-8");
  } else if (colSpan === "9") {
    tailwindClasses.push("md:col-span-9");
  } else if (colSpan === "10") {
    tailwindClasses.push("md:col-span-10");
  } else if (colSpan === "11") {
    tailwindClasses.push("md:col-span-11");
  } else if (colSpan === "12") {
    tailwindClasses.push("md:col-span-12");
  }

  // Col-start sur desktop
  if (colStart === "1") {
    tailwindClasses.push("md:col-start-1");
  } else if (colStart === "2") {
    tailwindClasses.push("md:col-start-2");
  } else if (colStart === "3") {
    tailwindClasses.push("md:col-start-3");
  } else if (colStart === "4") {
    tailwindClasses.push("md:col-start-4");
  } else if (colStart === "5") {
    tailwindClasses.push("md:col-start-5");
  } else if (colStart === "6") {
    tailwindClasses.push("md:col-start-6");
  } else if (colStart === "7") {
    tailwindClasses.push("md:col-start-7");
  }

  // Col-end sur desktop
  if (colEnd === "1") {
    tailwindClasses.push("md:col-end-1");
  } else if (colEnd === "2") {
    tailwindClasses.push("md:col-end-2");
  } else if (colEnd === "3") {
    tailwindClasses.push("md:col-end-3");
  } else if (colEnd === "4") {
    tailwindClasses.push("md:col-end-4");
  } else if (colEnd === "5") {
    tailwindClasses.push("md:col-end-5");
  } else if (colEnd === "6") {
    tailwindClasses.push("md:col-end-6");
  } else if (colEnd === "7") {
    tailwindClasses.push("md:col-end-7");
    } else if (colEnd === "8") {
    tailwindClasses.push("md:col-end-8");
  }

  // Row-span (tous écrans)
  if (rowSpan === "1") {
    tailwindClasses.push("row-span-1");
  } else if (rowSpan === "2") {
    tailwindClasses.push("row-span-2");
  } else if (rowSpan === "3") {
    tailwindClasses.push("row-span-3");
  } else if (rowSpan === "4") {
    tailwindClasses.push("row-span-4");
  } else if (rowSpan === "5") {
    tailwindClasses.push("row-span-5");
  } else if (rowSpan === "6") {
    tailwindClasses.push("row-span-6");
  }

  // Row-start (tous écrans)
  if (rowStart === "1") {
    tailwindClasses.push("row-start-1");
  } else if (rowStart === "2") {
    tailwindClasses.push("row-start-2");
  } else if (rowStart === "3") {
    tailwindClasses.push("row-start-3");
  } else if (rowStart === "4") {
    tailwindClasses.push("row-start-4");
  } else if (rowStart === "5") {
    tailwindClasses.push("row-start-5");
  } else if (rowStart === "6") {
    tailwindClasses.push("row-start-6");
  } else if (rowStart === "7") {
    tailwindClasses.push("row-start-7");
  }

  // Row-end (tous écrans)
  if (rowEnd === "1") {
    tailwindClasses.push("row-end-1");
  } else if (rowEnd === "2") {
    tailwindClasses.push("row-end-2");
  } else if (rowEnd === "3") {
    tailwindClasses.push("row-end-3");
  } else if (rowEnd === "4") {
    tailwindClasses.push("row-end-4");
  } else if (rowEnd === "5") {
    tailwindClasses.push("row-end-5");
  } else if (rowEnd === "6") {
    tailwindClasses.push("row-end-6");
  } else if (rowEnd === "7") {
    tailwindClasses.push("row-end-7");
  }

  // Hauteur fixe
  if (height === "24") {
    tailwindClasses.push("h-24");
  } else if (height === "32") {
    tailwindClasses.push("h-32");
  } else if (height === "40") {
    tailwindClasses.push("h-40");
  } else if (height === "48") {
    tailwindClasses.push("h-48");
  } else if (height === "56") {
    tailwindClasses.push("h-56");
  } else if (height === "64") {
    tailwindClasses.push("h-64");
  } else if (height === "72") {
    tailwindClasses.push("h-72");
  } else if (height === "80") {
    tailwindClasses.push("h-80");
  } else if (height === "96") {
    tailwindClasses.push("h-96");
  }

  // Hauteur minimale
  if (minHeight === "screen") {
    tailwindClasses.push("min-h-screen");
  } else if (minHeight === "full") {
    tailwindClasses.push("h-full");
  } else if (minHeight === "192") {
    tailwindClasses.push("min-h-192");
  } else if (minHeight === "96") {
    tailwindClasses.push("min-h-96");
  } else if (minHeight === "80") {
    tailwindClasses.push("min-h-80");
  } else if (minHeight === "64") {
    tailwindClasses.push("min-h-64");
  } else if (minHeight === "48") {
    tailwindClasses.push("min-h-48");
  } else if (minHeight === "32") {
    tailwindClasses.push("min-h-32");
  }

  // Border radius
  if (borderRadius === "sm") {
    tailwindClasses.push("rounded-sm");
  } else if (borderRadius === "default") {
    tailwindClasses.push("rounded");
  } else if (borderRadius === "md") {
    tailwindClasses.push("rounded-md");
  } else if (borderRadius === "lg") {
    tailwindClasses.push("rounded-lg");
  } else if (borderRadius === "xl") {
    tailwindClasses.push("rounded-xl");
  } else if (borderRadius === "2xl") {
    tailwindClasses.push("rounded-2xl");
  } else if (borderRadius === "3xl") {
    tailwindClasses.push("rounded-3xl");
  }

  // Padding X - classes en dur pour que Tailwind puisse les compiler
  if (paddingX === "2") {
    tailwindClasses.push("px-2");
  } else if (paddingX === "4") {
    tailwindClasses.push("px-4");
  } else if (paddingX === "6") {
    tailwindClasses.push("px-6");
  } else if (paddingX === "8") {
    tailwindClasses.push("px-8");
  } else if (paddingX === "10") {
    tailwindClasses.push("px-10");
  } else if (paddingX === "12") {
    tailwindClasses.push("px-12");
  } else if (paddingX === "14") {
    tailwindClasses.push("px-14");
  } else if (paddingX === "16") {
    tailwindClasses.push("px-16");
  }

  // Padding Y - classes en dur pour que Tailwind puisse les compiler
  if (paddingY === "2") {
    tailwindClasses.push("py-2");
  } else if (paddingY === "4") {
    tailwindClasses.push("py-4");
  } else if (paddingY === "6") {
    tailwindClasses.push("py-6");
  } else if (paddingY === "8") {
    tailwindClasses.push("py-8");
  } else if (paddingY === "10") {
    tailwindClasses.push("py-10");
  } else if (paddingY === "12") {
    tailwindClasses.push("py-12");
  } else if (paddingY === "14") {
    tailwindClasses.push("py-14");
  } else if (paddingY === "16") {
    tailwindClasses.push("py-16");
  }

  // Alignement vertical du contenu
  if (verticalAlignment === "top") {
    tailwindClasses.push("flex", "flex-col", "justify-start");
  } else if (verticalAlignment === "center") {
    tailwindClasses.push("flex", "flex-col", "justify-center");
  } else if (verticalAlignment === "bottom") {
    tailwindClasses.push("flex", "flex-col", "justify-end");
  }

  // Background image
  if (backgroundImage?.url) {
    tailwindClasses.push("bg-no-repeat");
  }

  const blockClasses = classnames(tailwindClasses);

  // Styles inline pour l'image de fond
  const blockStyle = {
    ...(backgroundImage?.url && {
      backgroundImage: `url(${backgroundImage.url})`,
      backgroundSize: backgroundSize || "cover",
      backgroundPosition: backgroundPosition || "center center",
    }),
  };

  const blockProps = useBlockProps({
    className: blockClasses,
    style: blockStyle,
  });

  const innerBlocksProps = useInnerBlocksProps(blockProps, {
    templateLock: false,
  });

  return (
    <>
      <BlockControls>
        <BlockVerticalAlignmentToolbar
          value={verticalAlignment}
          onChange={(newAlignment) => setAttributes({ verticalAlignment: newAlignment })}
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
            onChange={(value) => setAttributes({ colSpan: value ? String(value) : "" })}
            min={1}
            max={12}
            allowReset
            resetFallbackValue={undefined}
            help={__(
              "Nombre de colonnes que cet élément doit occuper",
              "ufo-blocks",
            )}
          />

          <RangeControl
            label={__("Row-span", "ufo-blocks")}
            value={rowSpan ? parseInt(rowSpan, 10) : undefined}
            onChange={(value) => setAttributes({ rowSpan: value ? String(value) : "" })}
            min={1}
            max={6}
            allowReset
            resetFallbackValue={undefined}
            help={__(
              "Nombre de lignes que cet élément doit occuper",
              "ufo-blocks",
            )}
          />

          <SelectControl
            label={__("Col-start", "ufo-blocks")}
            value={colStart}
            options={[
              {
                label: __("Auto (par défaut)", "ufo-blocks"),
                value: "",
              },
              { label: __("1", "ufo-blocks"), value: "1" },
              { label: __("2", "ufo-blocks"), value: "2" },
              { label: __("3", "ufo-blocks"), value: "3" },
              { label: __("4", "ufo-blocks"), value: "4" },
              { label: __("5", "ufo-blocks"), value: "5" },
              { label: __("6", "ufo-blocks"), value: "6" },
              { label: __("7", "ufo-blocks"), value: "7" },
            ]}
            onChange={(newColStart) => setAttributes({ colStart: newColStart })}
            help={__(
              "Position de départ de la colonne dans la grille",
              "ufo-blocks",
            )}
          />

          <SelectControl
            label={__("Col-end", "ufo-blocks")}
            value={colEnd}
            options={[
              {
                label: __("Auto (par défaut)", "ufo-blocks"),
                value: "",
              },
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
            help={__(
              "Position de fin de la colonne dans la grille",
              "ufo-blocks",
            )}
          />

          <SelectControl
            label={__("Row-start", "ufo-blocks")}
            value={rowStart}
            options={[
              {
                label: __("Auto (par défaut)", "ufo-blocks"),
                value: "",
              },
              { label: __("1", "ufo-blocks"), value: "1" },
              { label: __("2", "ufo-blocks"), value: "2" },
              { label: __("3", "ufo-blocks"), value: "3" },
              { label: __("4", "ufo-blocks"), value: "4" },
              { label: __("5", "ufo-blocks"), value: "5" },
              { label: __("6", "ufo-blocks"), value: "6" },
              { label: __("7", "ufo-blocks"), value: "7" },
            ]}
            onChange={(newRowStart) => setAttributes({ rowStart: newRowStart })}
            help={__(
              "Position de départ de la ligne dans la grille",
              "ufo-blocks",
            )}
          />

          <SelectControl
            label={__("Row-end", "ufo-blocks")}
            value={rowEnd}
            options={[
              {
                label: __("Auto (par défaut)", "ufo-blocks"),
                value: "",
              },
              { label: __("1", "ufo-blocks"), value: "1" },
              { label: __("2", "ufo-blocks"), value: "2" },
              { label: __("3", "ufo-blocks"), value: "3" },
              { label: __("4", "ufo-blocks"), value: "4" },
              { label: __("5", "ufo-blocks"), value: "5" },
              { label: __("6", "ufo-blocks"), value: "6" },
              { label: __("7", "ufo-blocks"), value: "7" },
            ]}
            onChange={(newRowEnd) => setAttributes({ rowEnd: newRowEnd })}
            help={__(
              "Position de fin de la ligne dans la grille",
              "ufo-blocks",
            )}
          />

          <SelectControl
            label={__("Hauteur minimale", "ufo-blocks")}
            value={minHeight}
            options={[
              { label: __("Auto (par défaut)", "ufo-blocks"), value: "" },
              { label: __("32 (128px)", "ufo-blocks"), value: "32" },
              { label: __("48 (192px)", "ufo-blocks"), value: "48" },
              { label: __("64 (256px)", "ufo-blocks"), value: "64" },
              { label: __("80 (320px)", "ufo-blocks"), value: "80" },
              { label: __("96 (384px)", "ufo-blocks"), value: "96" },
              { label: __("192 (768px)", "ufo-blocks"), value: "192" },
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
                  backgroundImage: {
                    url: media.url,
                    id: media.id,
                    alt: media.alt,
                  },
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
                  setAttributes({
                    backgroundImage: {
                      url: "",
                      id: null,
                      alt: "",
                    },
                  })
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
                  {
                    label: __("Haut centre", "ufo-blocks"),
                    value: "top center",
                  },
                  {
                    label: __("Haut droite", "ufo-blocks"),
                    value: "top right",
                  },
                  {
                    label: __("Centre gauche", "ufo-blocks"),
                    value: "center left",
                  },
                  {
                    label: __("Centre droite", "ufo-blocks"),
                    value: "center right",
                  },
                  {
                    label: __("Bas gauche", "ufo-blocks"),
                    value: "bottom left",
                  },
                  {
                    label: __("Bas centre", "ufo-blocks"),
                    value: "bottom center",
                  },
                  {
                    label: __("Bas droite", "ufo-blocks"),
                    value: "bottom right",
                  },
                ]}
                onChange={(value) =>
                  setAttributes({ backgroundPosition: value })
                }
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
              {
                label: __("Aucun", "ufo-blocks"),
                value: "",
              },
              {
                label: __("SM (2px)", "ufo-blocks"),
                value: "sm",
              },
              {
                label: __("Default (4px)", "ufo-blocks"),
                value: "default",
              },
              {
                label: __("MD (6px)", "ufo-blocks"),
                value: "md",
              },
              {
                label: __("LG (8px)", "ufo-blocks"),
                value: "lg",
              },
              {
                label: __("XL (12px)", "ufo-blocks"),
                value: "xl",
              },
              {
                label: __("2XL (16px)", "ufo-blocks"),
                value: "2xl",
              },
              {
                label: __("3XL (24px)", "ufo-blocks"),
                value: "3xl",
              },
            ]}
            onChange={(newBorderRadius) =>
              setAttributes({ borderRadius: newBorderRadius })
            }
            help={__(
              "Arrondi des coins (classes Tailwind rounded-*)",
              "ufo-blocks",
            )}
          />
        </PanelBody>
      </InspectorControls>

      <div {...innerBlocksProps} />
    </>
  );
}
