"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  buttonText?: string;
  buttonIcon?: LucideIcon;
  onButtonClick?: () => void;
  showButton?: boolean;
}

export function PageHeader({
  title,
  description,
  buttonText,
  buttonIcon: ButtonIcon,
  onButtonClick,
  showButton = true,
}: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        {description && (
          <p className="text-muted-foreground mt-2">{description}</p>
        )}
      </div>
      {showButton && buttonText && (
        <Button onClick={onButtonClick}>
          {ButtonIcon && <ButtonIcon className="mr-2 h-4 w-4" />}
          {buttonText}
        </Button>
      )}
    </div>
  );
}
