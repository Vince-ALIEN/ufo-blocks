import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";
import classnames from "classnames";

/**
 * Save component pour le bloc Column
 */
export default function save({ attributes }) {
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
    paddingX,
    paddingY,
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

  const blockProps = useBlockProps.save({
    className: blockClasses,
    style: blockStyle,
  });

  const innerBlocksProps = useInnerBlocksProps.save(blockProps);

  return <div {...innerBlocksProps} />;
}
