import React from "react";
import { cva, VariantProps } from "cva";
import { cn } from "@/lib/utils";

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

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  ref?: React.RefObject<HTMLButtonElement>;
  className?: string;
}

const Button = ({ ref, className, intent, size, ...props }: ButtonProps) => {
  return (
    <button
      ref={ref}
      className={cn(buttonVariants({ intent, size }), className)}
      {...props}
    />
  );
};

export default Button;
