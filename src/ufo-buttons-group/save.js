import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

export default function save({ attributes }) {
  const { buttonAlignment } = attributes;

  const blockProps = useBlockProps.save();

  // Colonne en mobile (alignement via items-*), ligne à partir de lg (via justify-*).
  const containerClasses = `flex flex-col lg:flex-row lg:flex-nowrap lg:items-stretch p-4 gap-2 ${
    buttonAlignment === "left"
      ? "items-start lg:justify-start"
      : buttonAlignment === "center"
      ? "items-center lg:justify-center"
      : "items-end lg:justify-end"
  }`;

  return (
    <div {...blockProps}>
      <div className={containerClasses}>
        <InnerBlocks.Content />
      </div>
    </div>
  );
}
