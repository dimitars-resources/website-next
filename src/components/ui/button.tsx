import React from "react";
import { cva, VariantProps } from "cva";
import { cn } from "@/lib/utils";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const buttonVariants = cva({
  base: "rounded-sm",
  variants: {
    intent: {
      primary: "bg-blue-800 hover:bg-blue-900",
      secondary: "bg-white text-gray-800 hover:bg-gray-100",
    },
    size: {
      base: "py-2 px-4",
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "base",
  },
});

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, intent, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ intent }), className)}
        {...props}
      />
    );
  },
);

export default Button;
