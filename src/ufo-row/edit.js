import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";
import Inspector from "./inspector";
import { getTailwindClasses, getBlockStyle } from "./shared";
import "./editor.css";

export default function Edit({ attributes, setAttributes }) {
  const { colSpan, rowSpan } = attributes;

  const blockProps = useBlockProps({
    className: getTailwindClasses(attributes),
    style: getBlockStyle(attributes),
    "data-col-span": colSpan || "auto",
    "data-row-span": rowSpan || "auto",
  });

  const innerBlocksProps = useInnerBlocksProps(blockProps, {
    templateLock: false,
  });

  return (
    <>
      <Inspector attributes={attributes} setAttributes={setAttributes} />
      <div {...innerBlocksProps} />
    </>
  );
}
