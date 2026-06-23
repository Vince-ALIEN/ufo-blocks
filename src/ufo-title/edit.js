import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  BlockControls,
  AlignmentToolbar,
  InspectorControls,
  PanelColorSettings,
  withColors,
  HeadingLevelDropdown,
} from "@wordpress/block-editor";
import { PanelBody, BaseControl } from "@wordpress/components";
import { ICONS, ICON_LIST } from "../shared/icons";
import clsx from "clsx";
import "./editor.css";

function Edit({
  attributes,
  setAttributes,
  textColor,
  setTextColor,
  iconBgColor,
  setIconBgColor,
}) {
  const { content, level, titleAlignment, icon } = attributes;

  const handleIconColorChange = (newColor) => {
    setIconBgColor(newColor);
    if (newColor) {
      setAttributes({ customIconBgColor: newColor });
    }
  };

  const TagName = "h" + level;
  const IconComponent = ICONS[icon];

  const blockProps = useBlockProps({ "data-level": level });

  const containerClasses = `flex ${
    titleAlignment === "left"
      ? "justify-start"
      : titleAlignment === "center"
      ? "justify-center"
      : "justify-end"
  }`;

  const titleClasses = `flex items-center not-prose ${textColor.class || ""}`;

  const hexToRgba = (hex, alpha) => {
    if (!hex) return null;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const iconBgStyle = iconBgColor.color
    ? { backgroundColor: hexToRgba(iconBgColor.color, 0.15) }
    : {};

  return (
    <>
      <BlockControls>
        <HeadingLevelDropdown
          value={level}
          selectedLevel={level}
          onChange={(newLevel) => setAttributes({ level: newLevel })}
        />
        <AlignmentToolbar
          value={titleAlignment}
          onChange={(newAlignment) =>
            setAttributes({ titleAlignment: newAlignment })
          }
        />
      </BlockControls>

      <InspectorControls>
        <PanelBody title={__("Icône", "ufo-blocks")} initialOpen>
          <BaseControl label={__("Choisir une icône", "ufo-blocks")}>
            <div className="ufo-icon-picker">
              <button
                className={clsx("ufo-icon-picker__item", {
                  "is-selected": !icon,
                })}
                onClick={() => setAttributes({ icon: "" })}
                title={__("Aucune icône", "ufo-blocks")}
                aria-label={__("Aucune icône", "ufo-blocks")}
                aria-pressed={!icon}
              >
                <span style={{ fontSize: 10, lineHeight: 1 }}>—</span>
              </button>
              {ICON_LIST.map(({ value, label }) => {
                const Icon = ICONS[value];
                return (
                  <button
                    key={value}
                    className={clsx("ufo-icon-picker__item", {
                      "is-selected": icon === value,
                    })}
                    onClick={() => setAttributes({ icon: value })}
                    title={label}
                    aria-label={label}
                    aria-pressed={icon === value}
                  >
                    <Icon size={16} />
                  </button>
                );
              })}
            </div>
          </BaseControl>
        </PanelBody>

        <PanelColorSettings
          title={__("Couleurs", "ufo-blocks")}
          colorSettings={[
            {
              value: textColor.color,
              onChange: setTextColor,
              label: __("Couleur du texte", "ufo-blocks"),
            },
            {
              value: iconBgColor.color,
              onChange: handleIconColorChange,
              label: __("Couleur de l'icône", "ufo-blocks"),
            },
          ]}
        />
      </InspectorControls>

      <div {...blockProps}>
        <div className={containerClasses}>
          <div className="block pr-2">
            <div className={titleClasses}>
              {IconComponent && (
                <span className="rounded-lg p-3 mr-2" style={iconBgStyle}>
                  <IconComponent className={`size-6 ${iconBgColor.class || ""}`} />
                </span>
              )}
              <RichText
                tagName={TagName}
                value={content}
                onChange={(newContent) => setAttributes({ content: newContent })}
                placeholder={__("Votre titre...", "ufo-blocks")}
                allowedFormats={["core/bold", "core/italic"]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withColors({
  textColor: "color",
  iconBgColor: "color",
})(Edit);
