import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";
import classnames from "classnames";

/**
 * Save component pour le bloc Columns
 */
export default function save({ attributes }) {
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

  const blockProps = useBlockProps.save({
    className: classnames(wrapperClasses),
    style: wrapperStyle,
  });

  const innerBlocksProps = useInnerBlocksProps.save({
    className: classnames(innerClasses),
  });

  return (
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
  );
}
