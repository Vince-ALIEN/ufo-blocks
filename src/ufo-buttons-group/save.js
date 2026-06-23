import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

export default function save({ attributes }) {
  const { buttonAlignment } = attributes;

  const blockProps = useBlockProps.save();

  const containerClasses = `lg:flex lg:flex-nowrap py-2 gap-2 lg:space-y-0 space-y-2 ${
    buttonAlignment === "left"
      ? "justify-start"
      : buttonAlignment === "center"
      ? "justify-center"
      : "justify-end"
  }`;

  return (
    <div {...blockProps}>
      <div className={containerClasses}>
        <InnerBlocks.Content />
      </div>
    </div>
  );
}
