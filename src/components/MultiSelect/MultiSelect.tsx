"use client";

import React from "react";

import { Tag } from "../Tag/Tag";
import { Command, CommandGroup, CommandItem, CommandProps } from "./Command";
import { Command as CommandPrimitive } from "cmdk";

import { cn } from "../../lib/utils";

interface MultiSelectItem {
  value: string;
  label: string;
}

interface MultiSelectProps extends CommandProps {
  /**
   * Array of items to be displayed in the multi-select
   */
  items: MultiSelectItem[];
  /**
   * Array of initially selected items
   */
  selectedItems?: MultiSelectItem[];
  /**
   * Placeholder text displayed when no items are selected
   * @default "Select items..."
   */
  placeholderText?: string;
  /**
   * Text displayed when no items match the search criteria
   */
  notFoundText?: string;
  /**
   * Variant for the tag displayed for selected items
   * @default "default"
   */
  tagVariant?: "default" | "primary" | "secondary";
  /**
   * Additional class name for the tag component
   * @default ""
   */
  tagClassName?: string;
  /**
   * Width of the multi-select
   * @default "512px"
   */
  width?: React.CSSProperties["width"];
  /**
   * Height of the input field
   * @default "40px"
   */
  inputHeight?: React.CSSProperties["height"];
  /**
   * Maximum height of the dropdown
   * @default "384px"
   */
  dropdownMaxHeight?: React.CSSProperties["height"];
  /**
   * Whether the input field should be scrollable
   * @default false
   */
  inputScrollable?: boolean;
  /**
   * Maximum number of items that can be selected
   * @default Number.MAX_SAFE_INTEGER
   */
  maxSelectedItems?: number;
  /**
   * Whether to hide the placeholder when items are selected
   * @default false
   */
  hidePlaceholderWhenSelected?: boolean;
  /**
   * Whether the multi-select is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether the dropdown should be open by default
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Callback when the maximum number of items is reached
   */
  onMaxSelected?: (maxLimit: number) => void;
  /**
   * Callback when an item is selected
   */
  onSelectItem?: (item: MultiSelectItem) => void;
  /**
   * Callback when an item is unselected
   */
  onUnselectItem?: (item: MultiSelectItem) => void;
  /**
   * Callback when the dropdown is opened or closed
   */
  onOpen?: (open: boolean) => void;
}

const MultiSelect = ({
  items,
  selectedItems,
  placeholderText = "Select items...",
  tagVariant = "default",
  tagClassName = "",
  width = "512px",
  inputHeight = "40px",
  dropdownMaxHeight = "384px",
  inputScrollable = false,
  maxSelectedItems = Number.MAX_SAFE_INTEGER,
  hidePlaceholderWhenSelected = false,
  disabled = false,
  defaultOpen = false,
  onMaxSelected,
  onSelectItem,
  onUnselectItem,
  onOpen,
}: MultiSelectProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(defaultOpen);
  const [selected, setSelected] = React.useState<MultiSelectItem[]>(
    selectedItems ?? []
  );
  const [selectables, setSelectables] = React.useState<MultiSelectItem[]>([]);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = React.useCallback(
    (item: MultiSelectItem) => {
      if (!disabled) {
        setSelected((prev) => prev.filter((s) => s.value !== item.value));
        if (onUnselectItem) {
          onUnselectItem(item);
        }
      }
    },
    [disabled, onUnselectItem]
  );

  const handleSelect = React.useCallback(
    (item: MultiSelectItem) => {
      if (disabled) return;
      if (selected.length >= maxSelectedItems) {
        if (onMaxSelected) {
          onMaxSelected(maxSelectedItems);
        }
        return;
      }
      setSelected((prev) => [...prev, item]);
      if (onSelectItem) {
        onSelectItem(item);
      }
    },
    [maxSelectedItems, onMaxSelected, onSelectItem, selected]
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    []
  );

  React.useEffect(() => {
    if (selectedItems) {
      setSelected(selectedItems);
    }
  }, [selectedItems]);

  React.useEffect(() => {
    setSelectables(
      items.filter((item) => {
        return !selected.some(
          (selectedItem) => selectedItem.value === item.value
        );
      })
    );
  }, [items, selected]);

  React.useEffect(() => {
    if (onOpen) {
      onOpen(open);
    }
  }, [open, onOpen]);

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
      style={{ width }}
    >
      <div
        className={`
        rounded-lg border border-grey-300 bg-white px-3 py-2 text-sm 
        ring-offset-grey-300 placeholder:text-grey focus:outline-none 
        focus:ring-2 focus:ring-primary focus:ring-opacity-20 
        focus:border-primary-active
        ${disabled ? "cursor-not-allowed opacity-50 bg-grey-100" : ""}
        [&>span]:line-clamp-1 inc-design-system-select-content
      `}
        style={{
          height: inputScrollable ? inputHeight : "auto",
          overflow: inputScrollable ? "auto" : "hidden",
        }}
        data-disabled={disabled}
      >
        <div className="flex gap-1 flex-wrap">
          {selected.map((item) => {
            return (
              <Tag
                key={item.value}
                variant={tagVariant}
                className={cn(tagClassName)}
                closeable
                onClose={() => handleUnselect(item)}
              >
                {item.label}
              </Tag>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={
              hidePlaceholderWhenSelected && selected.length > 0
                ? ""
                : placeholderText
            }
            className={`
            ml-2 bg-transparent outline-none placeholder:text-grey-400 flex-1
            ${disabled ? "cursor-not-allowed" : ""}
          `}
            disabled={disabled}
            data-disabled={disabled}
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 ? (
          <div
            className={`absolute w-full z-10 top-0 rounded-md border bg-background text-text-default shadow-md outline-none animate-in max-h-96 overflow-y-auto inc-design-system-select-content ${
              disabled ? "cursor-not-allowed opacity-50" : ""
            }`}
            style={{
              maxHeight: dropdownMaxHeight,
            }}
          >
            <CommandGroup className="h-full overflow-auto">
              {selectables.map((item) => {
                return (
                  <CommandItem
                    key={item.value}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={(value) => {
                      handleSelect(item);
                    }}
                    className={
                      disabled ? "cursor-not-allowed" : "cursor-pointer"
                    }
                  >
                    {item.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  );
};

export { MultiSelect, MultiSelectItem, MultiSelectProps };
