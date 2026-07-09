"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none cursor-pointer",
  {
    variants: {
      variant: {
        primary: "bg-green-600 text-white hover:bg-green-700 shadow-soft",
        secondary: "bg-yellow-400 text-gray-900 hover:bg-yellow-500 shadow-soft",
        outline: "bg-white border border-gray-200 text-gray-700 hover:border-green-600 hover:text-green-600 hover:bg-green-50",
        ghost: "bg-transparent text-gray-700 hover:bg-green-50 hover:text-green-600",
      },
      size: {
        default: "px-6 py-2.5 has-[>svg]:px-5",
        sm: "gap-1.5 px-4 py-2 has-[>svg]:px-3",
        lg: "px-8 py-3 has-[>svg]:px-6",
        xl: "px-10 py-4 has-[>svg]:px-8 text-base",
        icon: "size-10",
        "icon-sm": "size-9",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
}

function Button({
  className,
  variant = "primary",
  size = "default",
  href,
  ...props
}: ButtonProps) {
  if (href) {
    return (
      <a
        href={href}
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={cn(buttonVariants({ variant, size, className }))}
      >
        {props.children}
      </a>
    );
  }

  return (
    <button
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
export default Button;
