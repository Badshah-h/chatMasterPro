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
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  showButton?: boolean;
}

export function PageHeader({
  title,
  description,
  buttonText,
  buttonIcon: ButtonIcon,
  onButtonClick,
  buttonVariant = "default",
  showButton = true,
}: PageHeaderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        {showButton && buttonText && (
          <Button 
            variant={buttonVariant}
            onClick={onButtonClick}
            className="flex items-center gap-2"
          >
            {ButtonIcon && <ButtonIcon className="h-4 w-4" />}
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
}
