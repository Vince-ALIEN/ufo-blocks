/**
 * UFO Blocks – Logo Slider
 * Point d'entrée du bloc (index.js)
 */

import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './edit';
import save from './save';
import './style.css';

registerBlockType( metadata.name, {
	...metadata,
	edit: Edit,
	save,
} );
