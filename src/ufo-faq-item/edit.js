import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  useInnerBlocksProps,
} from "@wordpress/block-editor";
import { Plus, Minus } from "lucide-react";

export default function Edit({ attributes, setAttributes }) {
  const { question } = attributes;
  const [isOpen, setIsOpen] = useState(true);

  const blockProps = useBlockProps({
    className: "bg-white border border-gray-200 rounded-md overflow-hidden",
  });

  const innerBlocksProps = useInnerBlocksProps(
    { className: "faq-content px-6 pb-4" },
    { templateLock: false },
  );

  return (
    <div {...blockProps}>
      <div className="flex items-center justify-between px-6 py-6 border-b border-slate-100">
        <RichText
          tagName="span"
          className="faq-question flex-1 md:text-lg text-base text-violet tracking-widest font-sans font-semibold"
          value={question}
          onChange={(value) => setAttributes({ question: value })}
          placeholder={__("Entrez la question ici...", "ufo-blocks")}
        />
        <button
          type="button"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="ml-4 flex-shrink-0 text-violet cursor-pointer"
        >
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </button>
      </div>
      <div style={{ display: isOpen ? undefined : "none" }} {...innerBlocksProps} />
    </div>
  );
}
