'use strict';

/**
 * Génère includes/ufo-blocks-icons.php à partir de :
 *   - src/shared/icon-names.json  (source de vérité)
 *   - lucide-react                (SVG paths)
 *
 * Utilisé par "npm run generate:icons" et en prebuild.
 */

const { renderToStaticMarkup } = require('react-dom/server');
const React   = require('react');
const lucide  = require('lucide-react');
const fs      = require('fs');
const path    = require('path');

const ROOT       = path.resolve(__dirname, '..');
const iconNames  = require(path.join(ROOT, 'src/shared/icon-names.json'));
const lucideVer  = require(path.join(ROOT, 'node_modules/lucide-react/package.json')).version;
const outputPath = path.join(ROOT, 'includes/ufo-blocks-icons.php');

// Créer le dossier includes/ si nécessaire
fs.mkdirSync(path.join(ROOT, 'includes'), { recursive: true });

const paths  = {};
const errors = [];

iconNames.forEach((name) => {
  const Icon = lucide[name];
  if (!Icon) {
    errors.push(name);
    return;
  }
  const html  = renderToStaticMarkup(React.createElement(Icon, {}));
  const inner = html.replace(/<svg[^>]*>/, '').replace('</svg>', '').trim();
  paths[name] = inner;
});

if (errors.length > 0) {
  console.error(`\n[generate-icons-php] ✗ Icônes introuvables dans lucide-react v${lucideVer} :`);
  errors.forEach((n) => console.error(`  - ${n}`));
  process.exit(1);
}

const pad    = (s, n) => s.padEnd(n);
const maxLen = Math.max(...iconNames.map((n) => n.length));

const entries = iconNames
  .map((name) => `\t\t\t'${pad(name + "'", maxLen + 2)}=> '${paths[name].replace(/'/g, "\\'")}',`)
  .join('\n');

const php = `<?php
/**
 * UFO Blocks – Shared icon helper
 *
 * ⚠️  Fichier généré automatiquement — ne pas modifier manuellement.
 *     Source     : src/shared/icon-names.json
 *     Générateur : scripts/generate-icon-svgs.js
 *     Lucide     : v${lucideVer}
 *
 * Pour ajouter une icône :
 *   1. Ajouter le nom dans src/shared/icon-names.json
 *   2. Lancer npm run build (ou npm run generate:icons)
 *
 * @package UfoBlocks
 */

if ( ! function_exists( 'ufo_get_icon_svg' ) ) :
\t/**
\t * Retourne le HTML <svg> d'une icône Lucide.
\t *
\t * @param string $icon_name  Nom CamelCase (ex. "MoveRight").
\t * @param string $classes    Classes CSS supplémentaires pour le <svg>.
\t * @param int    $size       Largeur/hauteur en pixels (défaut : 24).
\t * @return string  HTML du SVG, ou chaîne vide si introuvable.
\t */
\tfunction ufo_get_icon_svg( string $icon_name, string $classes = '', int $size = 24 ): string {

\t\tstatic $paths = [
${entries}
\t\t];

\t\tif ( empty( $icon_name ) || ! isset( $paths[ $icon_name ] ) ) {
\t\t\treturn '';
\t\t}

\t\t$slug      = strtolower( preg_replace( '/(?<!^)[A-Z]/', '-$0', $icon_name ) );
\t\t$css_class = trim( 'lucide lucide-' . $slug . ( $classes ? ' ' . $classes : '' ) );

\t\treturn sprintf(
\t\t\t'<svg xmlns="http://www.w3.org/2000/svg" width="%d" height="%d" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="%s" aria-hidden="true">%s</svg>',
\t\t\t$size,
\t\t\t$size,
\t\t\tesc_attr( $css_class ),
\t\t\t$paths[ $icon_name ] // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
\t\t);
\t}
endif;
`;

fs.writeFileSync(outputPath, php, 'utf8');
console.log(`[generate-icons-php] ✓ ${iconNames.length} icônes → includes/ufo-blocks-icons.php (lucide v${lucideVer})`);

// Génère src/shared/icons.js (imports nommés pour le tree-shaking webpack)
const iconsJsPath = path.join(ROOT, 'src/shared/icons.js');
const importList  = iconNames.map((n) => `\t${ n },`).join('\n');
const iconEntries = iconNames.map((n) => `\t${ n },`).join('\n');

const iconsJs = `// ⚠️  Fichier généré automatiquement — ne pas modifier manuellement.
//     Source     : src/shared/icon-names.json
//     Générateur : scripts/generate-icon-svgs.js
import {
${ importList }
} from 'lucide-react';
import iconNames from './icon-names.json';
import { ICON_LABELS, camelToWords } from './icon-labels';

export const ICONS = {
${ iconEntries }
};

export const ICON_LIST = iconNames
\t.filter( ( name ) => ICONS[ name ] )
\t.map( ( name ) => ( {
\t\tvalue: name,
\t\tlabel: ICON_LABELS[ name ] ?? camelToWords( name ),
\t} ) );
`;

fs.writeFileSync(iconsJsPath, iconsJs, 'utf8');
console.log(`[generate-icons-php] ✓ ${ iconNames.length } icônes → src/shared/icons.js`);
