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
      small: "py-1 px-2 text-sm",
      base: "py-2 px-4",
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

const Button = ({ ref, className, intent, size, ...props }: ButtonProps) => {
  return <button ref={ref} className={cn(buttonVariants({ intent, size }), className)} {...props} />;
};

export default Button;
