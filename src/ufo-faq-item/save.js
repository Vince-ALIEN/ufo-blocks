import {
  useBlockProps,
  RichText,
  useInnerBlocksProps,
} from "@wordpress/block-editor";
import { Plus, Minus } from "lucide-react";

export default function save({ attributes }) {
  const { question } = attributes;

  const blockProps = useBlockProps.save({
    className: "group bg-white border border-gray-200 rounded-md",
  });

  const innerBlocksProps = useInnerBlocksProps.save({
    className: "faq-content px-6 pb-4",
  });

  return (
    <details {...blockProps}>
      <summary className="flex w-full items-center justify-between px-6 py-6 md:text-lg text-base text-violet tracking-widest font-sans font-semibold cursor-pointer">
        <RichText.Content
          tagName="span"
          className="faq-question"
          value={question}
        />
        <span aria-hidden="true" className="ml-4 flex-shrink-0">
          <span className="group-open:hidden">
            <Plus size={18} />
          </span>
          <span className="hidden group-open:inline-flex">
            <Minus size={18} />
          </span>
        </span>
      </summary>
      <div {...innerBlocksProps} />
    </details>
  );
}
