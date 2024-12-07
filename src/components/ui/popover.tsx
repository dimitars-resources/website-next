"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverAnchor = PopoverPrimitive.Anchor;

interface PopoverContentProps extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  ref: React.RefObject<React.ComponentRef<typeof PopoverPrimitive.Content>>;
}

const PopoverContent = ({ ref, className, align = "center", sideOffset = 4, ...props }: PopoverContentProps) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn("z-50 w-72 bg-background p-4 text-white shadow-md outline-none ring-1 ring-white/10", className)}
      {...props}
    />
  </PopoverPrimitive.Portal>
);

PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
