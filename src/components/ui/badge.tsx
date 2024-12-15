import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants =
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {}

function Badge({ className, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants, className)} {...props} />;
}

export { Badge };
