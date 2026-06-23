export const ALIGNMENT_CLASSES = {
  top: "items-start",
  center: "items-center",
  bottom: "items-end",
};

const HEIGHT_CLASSES = {
  "h-full": "h-full",
};

export function getWrapperClasses(attributes) {
  const { minHeight, borderRadius, backgroundImage, paddingX, paddingY } =
    attributes;

  return [
    "relative",
    "ufo-grid-wrapper",
    minHeight === "screen"
      ? "md:h-screen h-full"
      : minHeight === "h-full" && "h-full",
    borderRadius && `rounded-${borderRadius}`,
    backgroundImage?.url && "bg-no-repeat",
    paddingX !== undefined && `px-${paddingX}`,
    paddingY !== undefined && `py-${paddingY}`,
  ]
    .filter(Boolean)
    .join(" ");
}

export function getInnerClasses(attributes) {
  const {
    columnsCount,
    rowsCount,
    gap,
    verticalAlignment,
    reverseMobile,
    equalRows,
    minHeight,
    isBoxed,
  } = attributes;

  return [
    reverseMobile ? "md:grid" : "grid",
    "grid-cols-1",
    equalRows && "md:auto-rows-fr",
    "auto-rows-auto",
    gap !== undefined && `gap-${gap}`,
    columnsCount !== undefined && `md:grid-cols-${columnsCount}`,
    rowsCount && `grid-rows-${rowsCount}`,
    ALIGNMENT_CLASSES[verticalAlignment],
    reverseMobile && "flex flex-col-reverse",
    minHeight === "screen"
      ? "h-full"
      : HEIGHT_CLASSES[minHeight] ?? (minHeight && `h-${minHeight}`),
    isBoxed && "max-w-content mx-auto w-full",
  ]
    .filter(Boolean)
    .join(" ");
}

export function getWrapperStyle(attributes) {
  const { backgroundImage, backgroundSize, backgroundPosition } = attributes;

  return backgroundImage?.url
    ? {
        backgroundImage: `url(${backgroundImage.url})`,
        backgroundSize: backgroundSize || "cover",
        backgroundPosition: backgroundPosition || "center center",
      }
    : undefined;
}
