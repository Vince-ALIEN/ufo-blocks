import { registerBlockType } from '@wordpress/blocks';
import './style.css';
import Edit from './edit';
import save from './save';
import { getBlockIcon } from '../icons';
import metadata from './block.json';

/**
 * Enregistrement du bloc Column
 */
registerBlockType(metadata.name, {
    icon: getBlockIcon('PanelLeftDashed', {
        background: '#F6F6F7',
        color: '#EB9188'
    }),
    edit: Edit,
    save,
});
