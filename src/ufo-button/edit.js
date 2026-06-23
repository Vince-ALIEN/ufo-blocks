import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
  BlockControls,
  LinkControl,
} from "@wordpress/block-editor";
import {
  PanelBody,
  ToolbarGroup,
  ToolbarButton,
  ToggleControl,
  BaseControl,
  Button,
  Popover,
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
} from "@wordpress/components";
import { alignLeft, alignRight } from "@wordpress/icons";
import { link, linkOff } from "@wordpress/icons";
import { useState } from "@wordpress/element";
import { ICONS, ICON_LIST } from "../shared/icons";
import clsx from "clsx";
import "./editor.css";

function Edit({ attributes, setAttributes }) {
  const {
    buttonText,
    buttonUrl,
    buttonIcon,
    opensInNewTab,
    relNofollow,
    iconPosition,
  } = attributes;

  const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false);
  const blockProps = useBlockProps();
  const IconComponent = ICONS[buttonIcon];

  const buttonClasses = "btn inline-flex items-center gap-2 no-underline group cursor-pointer";

  return (
    <>
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton
            icon={buttonUrl ? linkOff : link}
            title={
              buttonUrl
                ? __("Modifier le lien", "ufo-blocks")
                : __("Ajouter un lien", "ufo-blocks")
            }
            onClick={() => setIsLinkPopoverOpen((v) => !v)}
            isActive={!!buttonUrl || isLinkPopoverOpen}
          />
        </ToolbarGroup>
      </BlockControls>

      {isLinkPopoverOpen && (
        <Popover
          placement="bottom"
          onClose={() => setIsLinkPopoverOpen(false)}
          focusOnMount
        >
          <div style={{ padding: "8px", minWidth: 320 }}>
            <LinkControl
              value={{ url: buttonUrl, opensInNewTab }}
              onChange={({ url, opensInNewTab: newTab }) => {
                setAttributes({
                  buttonUrl: url || "",
                  opensInNewTab: newTab || false,
                });
              }}
              settings={[
                {
                  id: "opensInNewTab",
                  title: __("Ouvrir dans un nouvel onglet", "ufo-blocks"),
                },
              ]}
            />
            {buttonUrl && (
              <Button
                variant="tertiary"
                isDestructive
                onClick={() => {
                  setAttributes({ buttonUrl: "", opensInNewTab: false, relNofollow: false });
                  setIsLinkPopoverOpen(false);
                }}
                style={{ marginTop: 8 }}
              >
                {__("Supprimer le lien", "ufo-blocks")}
              </Button>
            )}
          </div>
        </Popover>
      )}

      <InspectorControls>
        <PanelBody title={__("Icône", "ufo-blocks")} initialOpen>
          <BaseControl label={__("Choisir une icône", "ufo-blocks")}>
            <div className="ufo-icon-picker">
              <button
                className={clsx("ufo-icon-picker__item", { "is-selected": !buttonIcon })}
                onClick={() => setAttributes({ buttonIcon: "" })}
                title={__("Aucune icône", "ufo-blocks")}
                aria-label={__("Aucune icône", "ufo-blocks")}
                aria-pressed={!buttonIcon}
              >
                <span style={{ fontSize: 10, lineHeight: 1 }}>—</span>
              </button>
              {ICON_LIST.map(({ value, label }) => {
                const Icon = ICONS[value];
                return (
                  <button
                    key={value}
                    className={clsx("ufo-icon-picker__item", { "is-selected": buttonIcon === value })}
                    onClick={() => setAttributes({ buttonIcon: value })}
                    title={label}
                    aria-label={label}
                    aria-pressed={buttonIcon === value}
                  >
                    <Icon size={16} />
                  </button>
                );
              })}
            </div>
          </BaseControl>
          {buttonIcon && (
            <ToggleGroupControl
              label={__("Position de l'icône", "ufo-blocks")}
              value={iconPosition}
              onChange={(val) => setAttributes({ iconPosition: val })}
              isBlock
              __next40pxDefaultSize
              __nextHasNoMarginBottom
            >
              <ToggleGroupControlOptionIcon value="left"  icon={alignLeft}  label={__("Gauche", "ufo-blocks")} />
              <ToggleGroupControlOptionIcon value="right" icon={alignRight} label={__("Droite", "ufo-blocks")} />
            </ToggleGroupControl>
          )}
        </PanelBody>

        <PanelBody title={__("Lien", "ufo-blocks")} initialOpen={false}>
          <ToggleControl
            label={__("Ajouter nofollow", "ufo-blocks")}
            checked={relNofollow}
            onChange={(value) => setAttributes({ relNofollow: value })}
          />
        </PanelBody>
      </InspectorControls>

      <button {...blockProps} className={clsx(blockProps.className, buttonClasses)}>
        {IconComponent && iconPosition === "left" && (
          <span className="btn__icon h-4 w-4 flex items-center justify-center" aria-hidden="true">
            <IconComponent className="size-4 stroke-current" />
          </span>
        )}
        <RichText
          tagName="span"
          value={buttonText}
          onChange={(value) => setAttributes({ buttonText: value })}
          placeholder={__("Texte du bouton...", "ufo-blocks")}
          allowedFormats={["core/bold", "core/italic"]}
        />
        {IconComponent && iconPosition !== "left" && (
          <span className="btn__icon h-4 w-4 flex items-center justify-center group-hover:scale-110 transition duration-700 ease-in-out" aria-hidden="true">
            <IconComponent className="size-4 stroke-current" />
          </span>
        )}
      </button>
    </>
  );
}

export default Edit;
