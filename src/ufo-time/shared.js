/**
 * Classes du <time>. Gris discret en `text-sm/6` par défaut ; ces classes
 * s'effacent dès qu'une couleur ou une taille est choisie dans l'éditeur,
 * pour ne pas écraser les réglages appliqués au conteneur.
 */
export function getTimeClassName(attributes) {
  const { textColor, fontSize, style } = attributes;
  const hasTextColor = !!(textColor || style?.color?.text);
  const hasFontSize = !!(fontSize || style?.typography?.fontSize);

  return [
    "flex items-center",
    !hasFontSize && "text-sm/6",
    "font-semibold",
    !hasTextColor && "text-slate-500",
  ]
    .filter(Boolean)
    .join(" ");
}
