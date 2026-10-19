import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

// Anciennes sorties de save(), pour que les groupes déjà enregistrés restent
// valides. Ils sont migrés vers le balisage actuel à la prochaine sauvegarde.

const attributes = {
  buttonAlignment: {
    type: "string",
    default: "left",
  },
};

const JUSTIFY_CLASSES = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

const legacySave = (baseClasses) =>
  function save({ attributes: { buttonAlignment } }) {
    const blockProps = useBlockProps.save();
    const justify = JUSTIFY_CLASSES[buttonAlignment] ?? "justify-end";

    return (
      <div {...blockProps}>
        <div className={`${baseClasses} ${justify}`}>
          <InnerBlocks.Content />
        </div>
      </div>
    );
  };

export default [
  // 1.5.0 – 1.5.1
  {
    attributes,
    save: legacySave("lg:flex lg:flex-nowrap py-2 gap-2 lg:space-y-0 space-y-2"),
  },
  // Avant 1.5.0
  {
    attributes,
    save: legacySave("flex flex-nowrap my-0 gap-2"),
  },
];
