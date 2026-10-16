import { useBlockProps } from "@wordpress/block-editor";
import { getTimeClassName } from "./shared";

export default function save({ attributes }) {
  const { datetime, text } = attributes;

  const blockProps = useBlockProps.save();

  return (
    <div {...blockProps}>
      <time dateTime={datetime} className={getTimeClassName(attributes)}>
        <svg
          viewBox="0 0 4 4"
          aria-hidden="true"
          className="mr-4 size-1 flex-none fill-primary"
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
}
