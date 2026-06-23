import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";
import { getTailwindClasses, getBlockStyle } from "./shared";

export default function save({ attributes }) {
  const blockProps = useBlockProps.save({
    className: getTailwindClasses(attributes),
    style: getBlockStyle(attributes),
  });

  const innerBlocksProps = useInnerBlocksProps.save(blockProps);

  return <div {...innerBlocksProps} />;
}
