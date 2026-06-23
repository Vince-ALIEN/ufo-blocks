import { registerBlockType } from "@wordpress/blocks";
import './style.css';
import Edit from "./edit";
import save from "./save";
import { getBlockIcon } from '../icons';
import metadata from "./block.json";

registerBlockType(metadata.name, {
  icon: getBlockIcon('MessageCircleQuestionMark', {
    background: '#F6F6F7',
    color: '#EB9188',
  }),
  edit: Edit,
  save,
});
