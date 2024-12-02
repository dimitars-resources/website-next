import React from "react";
import { cva, VariantProps } from "cva";
import { cn } from "@/lib/utils";

const buttonVariants = cva({
  base: "rounded-sm",
  variants: {
    intent: {
      primary: "bg-blue-600 hover:bg-blue-700",
      secondary: "bg-white text-gray-800 hover:bg-gray-100",
      ghost: "bg-transparent text-white hover:bg-white/10",
    },
    size: {
      small: "py-1 px-2 text-sm",
      base: "py-2 px-4",
    },
    rounded: {
      full: "rounded-full",
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "base",
  },
});

type ButtonVariantsType = VariantProps<typeof buttonVariants>;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariantsType {
  ref?: React.RefObject<HTMLButtonElement & ButtonVariantsType>;
  className?: string;
}

const Button = ({ ref, className, intent, size, rounded, ...props }: ButtonProps) => {
  return <button ref={ref} className={cn(buttonVariants({ intent, size, rounded }), className)} {...props} />;
};

export default Button;
