import { __ } from "@wordpress/i18n";
import { useBlockProps, InnerBlocks, BlockControls } from "@wordpress/block-editor";
import { ToolbarGroup, ToolbarButton } from "@wordpress/components";
import { alignLeft, alignCenter, alignRight } from "@wordpress/icons";

const ALLOWED_BLOCKS = ["ufo-blocks/ufo-button"];

export default function Edit({ attributes, setAttributes }) {
  const { buttonAlignment } = attributes;

  const blockProps = useBlockProps({ "data-align": buttonAlignment });

  const containerClasses = `lg:flex lg:flex-nowrap py-2 gap-2 lg:space-y-0 space-y-2 ${
    buttonAlignment === "left"
      ? "justify-start"
      : buttonAlignment === "center"
      ? "justify-center"
      : "justify-end"
  }`;

  return (
    <>
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton
            icon={alignLeft}
            title={__("Aligner à gauche", "ufo-blocks")}
            isActive={buttonAlignment === "left"}
            onClick={() => setAttributes({ buttonAlignment: "left" })}
          />
          <ToolbarButton
            icon={alignCenter}
            title={__("Centrer", "ufo-blocks")}
            isActive={buttonAlignment === "center"}
            onClick={() => setAttributes({ buttonAlignment: "center" })}
          />
          <ToolbarButton
            icon={alignRight}
            title={__("Aligner à droite", "ufo-blocks")}
            isActive={buttonAlignment === "right"}
            onClick={() => setAttributes({ buttonAlignment: "right" })}
          />
        </ToolbarGroup>
      </BlockControls>

      <div {...blockProps}>
        <div className={containerClasses}>
          <InnerBlocks
            allowedBlocks={ALLOWED_BLOCKS}
            template={[["ufo-blocks/ufo-button"]]}
            renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
          />
        </div>
      </div>
    </>
  );
}
