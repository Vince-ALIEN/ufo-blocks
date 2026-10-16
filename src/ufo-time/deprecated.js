import { useBlockProps } from "@wordpress/block-editor";
import metadata from "./block.json";

/**
 * 1.6.0 – 1.7.0 : point animé (`animate-ping`) et texte sans couleur ni
 * taille par défaut. Les dates existantes restent valides et adoptent le
 * nouveau style à la prochaine sauvegarde.
 */
const v1 = {
  attributes: metadata.attributes,
  supports: metadata.supports,
  save({ attributes }) {
    const { datetime, text } = attributes;

    const blockProps = useBlockProps.save();

    return (
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
    );
  },
};

export default [v1];
