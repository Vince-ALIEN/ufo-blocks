import { registerBlockType, registerBlockStyle } from "@wordpress/blocks";
import Edit from "./edit";
import save from "./save";
import { getBlockIcon } from '../icons';
import metadata from "./block.json";

registerBlockType(metadata.name, {
  icon: getBlockIcon('RectangleHorizontal', {
    background: '#F6F6F7',
    color: '#EB9188'
  }),
  edit: Edit,
  save,
});

registerBlockStyle(metadata.name, [
  { name: 'primary',   label: 'Primary',   isDefault: true },
  { name: 'secondary', label: 'Secondary' },
]);
