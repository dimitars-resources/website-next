import * as React from "react";

import { cn } from "@/lib/utils";

interface TextareaProps extends React.ComponentPropsWithoutRef<"textarea"> {
  ref?: React.RefObject<HTMLTextAreaElement>;
}

const Textarea = ({ ref, className, ...props }: TextareaProps) => {
  return (
    <textarea
      className={cn(
        "flex h-10 min-h-10 w-full overflow-hidden rounded-md bg-transparent px-3 py-2 outline-none placeholder:text-white/50",
        "ring-2 ring-white/5 ring-offset-zinc-950 focus-visible:ring-primary focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
};

Textarea.displayName = "Textarea";

export { Textarea };
