import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";
import {
  getWrapperClasses,
  getInnerClasses,
  getWrapperStyle,
} from "./shared";

export default function save({ attributes }) {
  const { backgroundVideo } = attributes;

  const blockProps = useBlockProps.save({
    className: getWrapperClasses(attributes),
    style: getWrapperStyle(attributes),
  });

  const innerBlocksProps = useInnerBlocksProps.save({
    className: getInnerClasses(attributes),
  });

  return (
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
  );
}
