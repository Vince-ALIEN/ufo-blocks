import { __ } from "@wordpress/i18n";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { PanelBody, TextControl } from "@wordpress/components";
import "./editor.css";

export default function Edit({ attributes, setAttributes }) {
  const { datetime, text } = attributes;

  const blockProps = useBlockProps();

  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Paramètres", "ufo-blocks")} initialOpen={true}>
          <TextControl
            label={__("Attribut datetime", "ufo-blocks")}
            value={datetime}
            onChange={(value) => setAttributes({ datetime: value })}
            help={__("Format ISO : YYYY-MM, YYYY, YYYY-MM-DD…", "ufo-blocks")}
          />
          <TextControl
            label={__("Texte affiché", "ufo-blocks")}
            value={text}
            onChange={(value) => setAttributes({ text: value })}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <time dateTime={datetime} className="flex items-center font-semibold">
          <svg
            viewBox="0 0 4 4"
            aria-hidden="true"
            className="mr-4 size-2 flex-none fill-primary animate-ping"
          >
            <circle r="2" cx="2" cy="2" />
          </svg>
          {text}
          <div
            aria-hidden="true"
            className="absolute -z-10 -ml-2 h-px w-screen -translate-x-full bg-slate-200 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0"
          />
        </time>
      </div>
    </>
  );
}
