"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export const Modal = ({
  open,
  onClose,
  title,
  description,
  children,
}: ModalProps) => {
  if (!open) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
        {
          "animate-opacity-in": open,
          "animate-opacity-out": !open,
        }
      )}
      onClick={onClose}
    >
      <div
        className={cn(
          "bg-white rounded-md shadow-md p-6 w-96",
          {
            "animate-scale-in": open,
            "animate-scale-out": !open,
          }
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h2 className="text-xl font-bold mb-4">{title}</h2>
        )}
        {description && (
          <p className="text-gray-700 mb-4">{description}</p>
        )}
        {children}
      </div>
    </div>
  );
};