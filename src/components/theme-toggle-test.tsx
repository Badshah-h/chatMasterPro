"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Laptop } from "lucide-react";

export function ThemeToggleTest() {
  const { theme, setTheme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {currentTheme === "dark" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
          Theme Toggle Test
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          Current theme: <span className="font-medium">{theme}</span>
          {theme === "system" && (
            <span> (system: {systemTheme})</span>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={theme === "light" ? "default" : "outline"}
            size="sm"
            onClick={() => setTheme("light")}
            className="flex items-center gap-2"
          >
            <Sun className="h-4 w-4" />
            Light
          </Button>
          
          <Button
            variant={theme === "dark" ? "default" : "outline"}
            size="sm"
            onClick={() => setTheme("dark")}
            className="flex items-center gap-2"
          >
            <Moon className="h-4 w-4" />
            Dark
          </Button>
          
          <Button
            variant={theme === "system" ? "default" : "outline"}
            size="sm"
            onClick={() => setTheme("system")}
            className="flex items-center gap-2"
          >
            <Laptop className="h-4 w-4" />
            System
          </Button>
        </div>

        <div className="space-y-2 text-sm">
          <div className="p-3 bg-background border rounded">
            Background color adapts to theme
          </div>
          <div className="p-3 bg-card border rounded">
            Card background adapts to theme
          </div>
          <div className="p-3 bg-muted border rounded">
            Muted background adapts to theme
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
