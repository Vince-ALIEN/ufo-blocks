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
import {
  PanelBody,
  RangeControl,
  SelectControl,
  ToggleControl,
  Button,
} from "@wordpress/components";
import classnames from "classnames";
import "./editor.css";

/**
 * Edit component pour le bloc Columns
 */
export default function Edit({ attributes, setAttributes }) {
  const {
    columnsCount,
    rowsCount,
    gap,
    verticalAlignment,
    reverseMobile,
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

  /**
   * Template pour les colonnes par défaut
   */
  const getTemplate = () => {
    return Array(columnsCount)
      .fill(0)
      .map(() => ["ufo-blocks/ufo-row"]);
  };

  /**
   * Classes pour le wrapper externe (blockProps)
   * Contient : position, background, border-radius, overflow
   */
  const wrapperClasses = ["relative", "ufo-grid-wrapper"];

  // Border radius (sur le wrapper)
  if (borderRadius === "sm") {
    wrapperClasses.push("rounded-sm");
  } else if (borderRadius === "default") {
    wrapperClasses.push("rounded");
  } else if (borderRadius === "md") {
    wrapperClasses.push("rounded-md");
  } else if (borderRadius === "lg") {
    wrapperClasses.push("rounded-lg");
  } else if (borderRadius === "xl") {
    wrapperClasses.push("rounded-xl");
  } else if (borderRadius === "2xl") {
    wrapperClasses.push("rounded-2xl");
  } else if (borderRadius === "3xl") {
    wrapperClasses.push("rounded-3xl");
  }

  // Background image
  if (backgroundImage?.url) {
    wrapperClasses.push("bg-no-repeat");
  }

  // Padding X - classes en dur pour que Tailwind puisse les compiler
  if (paddingX === "2") {
    wrapperClasses.push("px-2");
  } else if (paddingX === "4") {
    wrapperClasses.push("px-4");
  } else if (paddingX === "6") {
    wrapperClasses.push("px-6");
  } else if (paddingX === "8") {
    wrapperClasses.push("px-8");
  } else if (paddingX === "10") {
    wrapperClasses.push("px-10");
  } else if (paddingX === "12") {
    wrapperClasses.push("px-12");
  } else if (paddingX === "14") {
    wrapperClasses.push("px-14");
  } else if (paddingX === "16") {
    wrapperClasses.push("px-16");
  }

  // Padding Y - classes en dur pour que Tailwind puisse les compiler
  if (paddingY === "2") {
    wrapperClasses.push("py-2");
  } else if (paddingY === "4") {
    wrapperClasses.push("py-4");
  } else if (paddingY === "6") {
    wrapperClasses.push("py-6");
  } else if (paddingY === "8") {
    wrapperClasses.push("py-8");
  } else if (paddingY === "10") {
    wrapperClasses.push("py-10");
  } else if (paddingY === "12") {
    wrapperClasses.push("py-12");
  } else if (paddingY === "14") {
    wrapperClasses.push("py-14");
  } else if (paddingY === "16") {
    wrapperClasses.push("py-16");
  }

  /**
   * Classes pour le conteneur interne (innerBlocksProps)
   * Contient : grid, colonnes, gap, alignement, isBoxed
   */
  const innerClasses = ["grid", "grid-cols-1", "md:auto-rows-fr", "auto-rows-auto"];

  // Gap - classes en dur pour que Tailwind puisse les compiler
  if (gap === "0") {
    innerClasses.push("gap-0");
  } else if (gap === "1") {
    innerClasses.push("gap-1");
  } else if (gap === "2") {
    innerClasses.push("gap-2");
  } else if (gap === "3") {
    innerClasses.push("gap-3");
  } else if (gap === "4") {
    innerClasses.push("gap-4");
  } else if (gap === "5") {
    innerClasses.push("gap-5");
  } else if (gap === "6") {
    innerClasses.push("gap-6");
  } else if (gap === "7") {
    innerClasses.push("gap-7");
  } else if (gap === "8") {
    innerClasses.push("gap-8");
  }

  // Grille responsive - classes en dur pour que Tailwind les compile
  if (columnsCount === 1) {
    innerClasses.push("md:grid-cols-1");
  } else if (columnsCount === 2) {
    innerClasses.push("md:grid-cols-2");
  } else if (columnsCount === 3) {
    innerClasses.push("md:grid-cols-3");
  } else if (columnsCount === 4) {
    innerClasses.push("md:grid-cols-4");
  } else if (columnsCount === 5) {
    innerClasses.push("md:grid-cols-5");
  } else if (columnsCount === 6) {
    innerClasses.push("md:grid-cols-6");
  } else if (columnsCount === 7) {
    innerClasses.push("md:grid-cols-7");
  } else if (columnsCount === 8) {
    innerClasses.push("md:grid-cols-8");
  } else if (columnsCount === 9) {
    innerClasses.push("md:grid-cols-9");
  } else if (columnsCount === 10) {
    innerClasses.push("md:grid-cols-10");
  } else if (columnsCount === 11) {
    innerClasses.push("md:grid-cols-11");
  } else if (columnsCount === 12) {
    innerClasses.push("md:grid-cols-12");
  }

  // Grid rows (tous écrans)
  if (rowsCount === 1) {
    innerClasses.push("grid-rows-1");
  } else if (rowsCount === 2) {
    innerClasses.push("grid-rows-2");
  } else if (rowsCount === 3) {
    innerClasses.push("grid-rows-3");
  } else if (rowsCount === 4) {
    innerClasses.push("grid-rows-4");
  } else if (rowsCount === 5) {
    innerClasses.push("grid-rows-5");
  } else if (rowsCount === 6) {
    innerClasses.push("grid-rows-6");
  }

  // Alignement vertical
  if (verticalAlignment === "top") {
    innerClasses.push("items-start");
  } else if (verticalAlignment === "center") {
    innerClasses.push("items-center");
  } else if (verticalAlignment === "bottom") {
    innerClasses.push("items-end");
  }

  // Reverse sur mobile
  if (reverseMobile) {
    innerClasses.push("flex", "flex-col-reverse", "md:grid");
  }

  // Hauteur minimale
  if (minHeight === "screen") {
    innerClasses.push("min-h-screen");
  } else if (minHeight === "full") {
    innerClasses.push("h-full");
  } else if (minHeight === "192") {
    innerClasses.push("min-h-192");
  } else if (minHeight === "96") {
    innerClasses.push("min-h-96");
  } else if (minHeight === "80") {
    innerClasses.push("min-h-80");
  } else if (minHeight === "64") {
    innerClasses.push("min-h-64");
  } else if (minHeight === "48") {
    innerClasses.push("min-h-48");
  } else if (minHeight === "32") {
    innerClasses.push("min-h-32");
  }

  // Boxed (conteneur centré avec largeur max) - sur le conteneur interne
  if (isBoxed) {
    innerClasses.push("max-w-content", "mx-auto", "w-full");
  }

  // Styles inline pour l'image de fond (sur le wrapper)
  const wrapperStyle = {
    ...(backgroundImage?.url && {
      backgroundImage: `url(${backgroundImage.url})`,
      backgroundSize: backgroundSize || "cover",
      backgroundPosition: backgroundPosition || "center center",
    }),
  };

  const blockProps = useBlockProps({
    className: classnames(wrapperClasses),
    style: wrapperStyle,
  });

  const innerBlocksProps = useInnerBlocksProps(
    {
      className: classnames(innerClasses),
    },
    {
      template: getTemplate(),
      allowedBlocks: ["ufo-blocks/ufo-row"],
      orientation: "horizontal",
      templateLock: false,
    },
  );

  /**
   * Gestionnaire de changement du nombre de colonnes
   */
  const onChangeColumns = (newColumns) => {
    setAttributes({ columnsCount: newColumns });
  };

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
            onChange={onChangeColumns}
            min={1}
            max={12}
            help={__(
              "Choisissez le nombre de colonnes de la grille (1-12)",
              "ufo-blocks",
            )}
          />

          <RangeControl
            label={__("Nombre de lignes", "ufo-blocks")}
            value={rowsCount}
            onChange={(newRows) => setAttributes({ rowsCount: newRows })}
            min={0}
            max={6}
            help={__(
              "Nombre de lignes de la grille (0 = auto, 1-6 = fixe)",
              "ufo-blocks",
            )}
          />

          <SelectControl
            label={__("Espacement (Gap)", "ufo-blocks")}
            value={gap}
            options={[
              {
                label: __("0 - Aucun (0px)", "ufo-blocks"),
                value: "0",
              },
              {
                label: __("1 - Très petit (4px)", "ufo-blocks"),
                value: "1",
              },
              {
                label: __("2 - Petit (8px)", "ufo-blocks"),
                value: "2",
              },
              { label: __("3 - (12px)", "ufo-blocks"), value: "3" },
              {
                label: __("4 - Moyen (16px)", "ufo-blocks"),
                value: "4",
              },
              { label: __("5 - (20px)", "ufo-blocks"), value: "5" },
              {
                label: __("6 - Large (24px)", "ufo-blocks"),
                value: "6",
              },
              { label: __("7 - (28px)", "ufo-blocks"), value: "7" },
              {
                label: __("8 - Très large (32px)", "ufo-blocks"),
                value: "8",
              },
            ]}
            onChange={(newGap) => setAttributes({ gap: newGap })}
            help={__(
              "Espacement entre les colonnes (classes Tailwind gap-0 à gap-8)",
              "ufo-blocks",
            )}
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
              {
                label: __("Auto (par défaut)", "ufo-blocks"),
                value: "",
              },
              {
                label: __("32 (128px)", "ufo-blocks"),
                value: "32",
              },
              {
                label: __("48 (192px)", "ufo-blocks"),
                value: "48",
              },
              {
                label: __("64 (256px)", "ufo-blocks"),
                value: "64",
              },
              {
                label: __("80 (320px)", "ufo-blocks"),
                value: "80",
              },
              {
                label: __("96 (384px)", "ufo-blocks"),
                value: "96",
              },
              {
                label: __("192 (768px)", "ufo-blocks"),
                value: "192",
              },
              {
                label: __("100 %", "ufo-blocks"),
                value: "full",
              },
              {
                label: __("Screen (100vh)", "ufo-blocks"),
                value: "screen",
              },
            ]}
            onChange={(newMinHeight) =>
              setAttributes({ minHeight: newMinHeight })
            }
            help={__(
              "Hauteur minimale de la grille pour garantir les proportions",
              "ufo-blocks",
            )}
          />

          <ToggleControl
            label={__("Conteneur boxed", "ufo-blocks")}
            checked={isBoxed}
            onChange={() => setAttributes({ isBoxed: !isBoxed })}
            help={__(
              "Centre le contenu avec une largeur maximale (max-w-content)",
              "ufo-blocks",
            )}
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
          title={__("Vidéo d'arrière-plan", "ufo-blocks")}
          initialOpen={false}
        >
          <MediaUploadCheck>
            <MediaUpload
              onSelect={(media) =>
                setAttributes({
                  backgroundVideo: {
                    url: media.url,
                    id: media.id,
                  },
                })
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
                setAttributes({
                  backgroundVideo: {
                    url: "",
                    id: null,
                  },
                })
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

      <BlockControls>
        <BlockVerticalAlignmentToolbar
          onChange={(newAlignment) =>
            setAttributes({ verticalAlignment: newAlignment })
          }
          value={verticalAlignment}
        />
      </BlockControls>

      <div {...blockProps}>
        {backgroundVideo?.url && (
          <video
            className="absolute inset-0 w-full h-full object-cover -z-10"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={backgroundVideo.url} type="video/mp4" />
          </video>
        )}
        <div {...innerBlocksProps} />
      </div>
    </>
  );
}
