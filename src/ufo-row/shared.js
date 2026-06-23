export const ALIGNMENT_CLASSES = {
  top: "flex flex-col justify-start",
  center: "flex flex-col justify-center",
  bottom: "flex flex-col justify-end",
};

const HEIGHT_CLASSES = {
  screen: "h-screen",
  full: "h-full",
};

export function getTailwindClasses(attributes) {
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
  } = attributes;

  return [
    "ufo-row",
    colSpan && `md:col-span-${colSpan}`,
    colStart && `md:col-start-${colStart}`,
    colEnd && `md:col-end-${colEnd}`,
    rowSpan && `row-span-${rowSpan}`,
    rowStart && `row-start-${rowStart}`,
    rowEnd && `row-end-${rowEnd}`,
    height && `h-${height}`,
    HEIGHT_CLASSES[minHeight] ?? (minHeight && `h-${minHeight}`),
    borderRadius && `rounded-${borderRadius}`,
    paddingX && `px-${paddingX}`,
    paddingY && `py-${paddingY}`,
    ALIGNMENT_CLASSES[verticalAlignment],
    backgroundImage?.url && "bg-no-repeat",
  ]
    .filter(Boolean)
    .join(" ");
}

export function getBlockStyle(attributes) {
  const { backgroundImage, backgroundSize, backgroundPosition } = attributes;

  return backgroundImage?.url
    ? {
        backgroundImage: `url(${backgroundImage.url})`,
        backgroundSize: backgroundSize || "cover",
        backgroundPosition: backgroundPosition || "center center",
      }
    : undefined;
}
