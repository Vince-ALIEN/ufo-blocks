import { __ } from "@wordpress/i18n";
import { useBlockProps, useInnerBlocksProps, InspectorControls } from "@wordpress/block-editor";
import { PanelBody, ToggleControl, TextControl, TextareaControl } from "@wordpress/components";
import "./editor.css";

export default function Edit({ attributes, setAttributes }) {
  const {
    enableSchema = true,
    schemaName = "",
    schemaDescription = "",
    schemaAbout = "",
  } = attributes;

  const blockProps = useBlockProps({ className: "ufo-faq-container", "data-schema": enableSchema ? "oui" : "non" });

  const innerBlocksProps = useInnerBlocksProps(
    { className: "w-full space-y-3 lg:my-3 my-1 px-2" },
    {
      allowedBlocks: ["ufo-blocks/ufo-faq-item"],
      template: [["ufo-blocks/ufo-faq-item"]],
      templateLock: false,
    }
  );

  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Paramètres du Schema", "ufo-blocks")}>
          <ToggleControl
            label={__("Activer les données structurées", "ufo-blocks")}
            checked={enableSchema}
            onChange={(value) => setAttributes({ enableSchema: value })}
            help={__("Activez pour générer le balisage schema.org.", "ufo-blocks")}
          />
          {enableSchema && (
            <>
              <TextControl
                label={__("Nom du Schema", "ufo-blocks")}
                value={schemaName}
                onChange={(value) => setAttributes({ schemaName: value })}
                placeholder={__("Ex: FAQ Référencement SEO", "ufo-blocks")}
              />
              <TextareaControl
                label={__("Description du Schema", "ufo-blocks")}
                value={schemaDescription}
                onChange={(value) => setAttributes({ schemaDescription: value })}
                placeholder={__("Ex: Questions spécialisées sur le référencement naturel", "ufo-blocks")}
              />
              <TextControl
                label={__("Sujet du Schema", "ufo-blocks")}
                value={schemaAbout}
                onChange={(value) => setAttributes({ schemaAbout: value })}
                placeholder={__("Ex: SEO", "ufo-blocks")}
              />
            </>
          )}
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <div {...innerBlocksProps} />
      </div>
    </>
  );
}
