"use client";

import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

export const Button = ({
  className,
  variant = "primary",
  size = "md",
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        "rounded-md px-4 py-2 font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
        {
          "bg-blue-500": variant === "primary",
          "bg-gray-500": variant === "secondary",
          "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100":
            variant === "outline",
          "bg-transparent text-gray-500 hover:bg-gray-100": variant === "ghost",
          "disabled:opacity-50 disabled:cursor-not-allowed": disabled,
          "text-sm": size === "sm",
          "text-base": size === "md",
          "text-lg": size === "lg",
        },
        className
      )}
      {...props}
    />
  );
};