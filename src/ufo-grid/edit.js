import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";
import Inspector from "./inspector";
import {
  getWrapperClasses,
  getInnerClasses,
  getWrapperStyle,
} from "./shared";
import "./editor.css";

export default function Edit({ attributes, setAttributes }) {
  const {
    columnsCount,
    gap,
    backgroundVideo,
  } = attributes;

  const getTemplate = () =>
    Array(columnsCount)
      .fill(0)
      .map(() => ["ufo-blocks/ufo-row"]);

  const blockProps = useBlockProps({
    className: getWrapperClasses(attributes),
    style: getWrapperStyle(attributes),
    "data-cols": columnsCount,
    "data-gap": gap,
  });

  const innerBlocksProps = useInnerBlocksProps(
    { className: getInnerClasses(attributes) },
    {
      template: getTemplate(),
      allowedBlocks: ["ufo-blocks/ufo-row"],
      orientation: "horizontal",
      templateLock: false,
    },
  );

  return (
    <>
      <Inspector attributes={attributes} setAttributes={setAttributes} />
      <div {...blockProps}>
        {backgroundVideo?.url && (
          <video
            className="absolute inset-0 w-full h-full object-cover -z-10"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={backgroundVideo.url} type="video/mp4" />
          </video>
        )}
        <div {...innerBlocksProps} />
      </div>
    </>
  );
}
