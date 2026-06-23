import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";

export default function save({ attributes }) {
  const {
    enableSchema = true,
    schemaName = "",
    schemaDescription = "",
    schemaAbout = "",
  } = attributes;

  const blockProps = useBlockProps.save();
  const innerBlocksProps = useInnerBlocksProps.save({
    className: "w-full space-y-3 lg:my-3 my-1 px-2",
  });

  const hasSchema = enableSchema && (schemaName.trim() || schemaDescription.trim() || schemaAbout.trim());

  const jsonLd = hasSchema ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(schemaName.trim() && { name: schemaName }),
    ...(schemaDescription.trim() && { description: schemaDescription }),
    ...(schemaAbout.trim() && { about: schemaAbout }),
  } : null;

  return (
    <>
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
      <div {...blockProps}>
        <div {...innerBlocksProps} />
      </div>
    </>
  );
}
