"use client";

import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  title?: string;
  children?: React.ReactNode;
}

export const Card = ({ className, title, children, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-md p-4 flex flex-col gap-2",
        className
      )}
      {...props}
    >
      {title && <h3 className="text-xl font-bold">{title}</h3>}
      {children}
    </div>
  );
};