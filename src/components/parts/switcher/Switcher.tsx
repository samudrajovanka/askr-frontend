"use client";

import { Check, ChevronsUpDown, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

export type SwitcherItem = {
  id: string;
  name: string;
  onClick: () => void;
};

type SwitcherProps = {
  items: SwitcherItem[];
  selectedId?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  footerButtonText?: string;
  onFooterButtonClick?: () => void;
  defaultPlaceholder?: string;
  footerRender?: () => React.ReactNode;
};

export default function Switcher({
  items,
  selectedId,
  searchPlaceholder = "Find...",
  emptyText = "No items found.",
  defaultPlaceholder = "Select...",
  footerRender,
}: SwitcherProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const currentItem = useMemo(() => {
    return items.find((item) => item.id === selectedId) || items[0];
  }, [items, selectedId]);

  const filteredItems = useMemo(() => {
    if (!searchQuery) return items;
    return items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [items, searchQuery]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className="max-w-50 justify-between px-2 hover:bg-accent"
          >
            {currentItem ? (
              <span className="truncate">{currentItem.name}</span>
            ) : (
              defaultPlaceholder
            )}
            <ChevronsUpDown className="size-4 text-muted-foreground" />
          </Button>
        }
      />
      <PopoverContent className="w-65 p-0 gap-0" align="start">
        <div className="p-2">
          <InputGroup>
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupInput
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
        </div>

        <Separator />

        <div className="max-h-75 overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="py-6 text-center typography-small text-muted-foreground">
              {emptyText}
            </div>
          ) : (
            filteredItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className="w-full justify-start h-10 px-2"
                onClick={() => {
                  setOpen(false);
                  item.onClick();
                }}
              >
                <span className="truncate flex-1 text-left">{item.name}</span>
                {currentItem?.id === item.id && (
                  <Check className="ml-auto size-4" />
                )}
              </Button>
            ))
          )}
        </div>

        {footerRender && (
          <>
            <Separator />
            <div className="p-2">{footerRender()}</div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
