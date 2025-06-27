"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Laptop, Smartphone, Tablet, Download } from "lucide-react";

interface WidgetPreviewProps {
  widgetConfig?: {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
    };
    fonts: {
      family: string;
      size: string;
    };
    position: {
      placement: "bottom-right" | "bottom-left" | "top-right" | "top-left";
    };
    branding: {
      logo?: string;
      botAvatar?: string;
      companyName: string;
      welcomeMessage: string;
      showPoweredBy: boolean;
    };
    size: "compact" | "standard" | "large";
    borderRadius: number;
    shadow: "none" | "small" | "medium" | "large";
  };
}

const defaultWidgetConfig = {
  colors: {
    primary: "#6366F1",
    secondary: "#F472B6",
    background: "#FFFFFF",
    text: "#1F2937",
  },
  fonts: {
    family: "Inter",
    size: "medium",
  },
  position: {
    placement: "bottom-right" as const,
  },
  branding: {
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=company",
    botAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=assistant",
    companyName: "Acme Inc",
    welcomeMessage: "Hello! How can I help you today?",
    showPoweredBy: true,
  },
  size: "standard" as const,
  borderRadius: 8,
  shadow: "medium" as const,
};

const WidgetPreview: React.FC<WidgetPreviewProps> = ({
  widgetConfig = defaultWidgetConfig,
}) => {
  const [deviceView, setDeviceView] = useState<"desktop" | "tablet" | "mobile">(
    "desktop",
  );

  // Calculate shadow class based on config
  const getShadowClass = () => {
    switch (widgetConfig.shadow) {
      case "none":
        return "";
      case "small":
        return "shadow-sm";
      case "medium":
        return "shadow-md";
      case "large":
        return "shadow-lg";
      default:
        return "shadow-md";
    }
  };

  // Calculate size class based on config
  const getSizeClass = () => {
    switch (widgetConfig.size) {
      case "compact":
        return "w-72 h-96";
      case "standard":
        return "w-80 h-[450px]";
      case "large":
        return "w-96 h-[500px]";
      default:
        return "w-80 h-[450px]";
    }
  };

  // Calculate position class based on config
  const getPositionClass = () => {
    switch (widgetConfig.position.placement) {
      case "bottom-right":
        return "bottom-4 right-4";
      case "bottom-left":
        return "bottom-4 left-4";
      case "top-right":
        return "top-4 right-4";
      case "top-left":
        return "top-4 left-4";
      default:
        return "bottom-4 right-4";
    }
  };

  // Calculate device container class
  const getDeviceContainerClass = () => {
    switch (deviceView) {
      case "desktop":
        return "w-full h-[600px] bg-gray-100";
      case "tablet":
        return "w-[768px] h-[500px] bg-gray-100";
      case "mobile":
        return "w-[375px] h-[667px] bg-gray-100";
      default:
        return "w-full h-[600px] bg-gray-100";
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg border border-border p-4 gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Widget Preview</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {}}
            className="flex items-center gap-1"
          >
            <Download className="h-4 w-4" />
            <span>Screenshot</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="desktop" className="w-full">
        <TabsList className="grid grid-cols-3 w-48 mb-4">
          <TabsTrigger
            value="desktop"
            onClick={() => setDeviceView("desktop")}
            className="flex items-center gap-1"
          >
            <Laptop className="h-4 w-4" />
            <span className="hidden sm:inline">Desktop</span>
          </TabsTrigger>
          <TabsTrigger
            value="tablet"
            onClick={() => setDeviceView("tablet")}
            className="flex items-center gap-1"
          >
            <Tablet className="h-4 w-4" />
            <span className="hidden sm:inline">Tablet</span>
          </TabsTrigger>
          <TabsTrigger
            value="mobile"
            onClick={() => setDeviceView("mobile")}
            className="flex items-center gap-1"
          >
            <Smartphone className="h-4 w-4" />
            <span className="hidden sm:inline">Mobile</span>
          </TabsTrigger>
        </TabsList>

        <div className="relative flex-1 overflow-hidden rounded-md border border-border">
          {/* Device viewport simulation */}
          <div
            className={`${getDeviceContainerClass()} mx-auto relative overflow-hidden`}
          >
            {/* Website simulation background */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-100 p-4">
              <div className="w-full h-12 bg-white rounded-md shadow-sm mb-4"></div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="h-32 bg-white rounded-md shadow-sm"></div>
                <div className="h-32 bg-white rounded-md shadow-sm"></div>
                <div className="h-32 bg-white rounded-md shadow-sm"></div>
              </div>
              <div className="w-full h-24 bg-white rounded-md shadow-sm mb-4"></div>
              <div className="w-3/4 h-8 bg-white rounded-md shadow-sm mb-2"></div>
              <div className="w-full h-32 bg-white rounded-md shadow-sm"></div>
            </div>

            {/* Chat widget button */}
            <div
              className={`absolute ${getPositionClass()} flex items-center justify-center rounded-full w-14 h-14`}
              style={{ backgroundColor: widgetConfig.colors.primary }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>

            {/* Chat widget expanded */}
            <div
              className={`absolute ${getPositionClass()} ${getSizeClass()} ${getShadowClass()} flex flex-col`}
              style={{
                backgroundColor: widgetConfig.colors.background,
                color: widgetConfig.colors.text,
                fontFamily: widgetConfig.fonts.family,
                borderRadius: `${widgetConfig.borderRadius}px`,
                transform: "translateY(-80px)", // Offset to show both button and expanded widget
              }}
            >
              {/* Widget header */}
              <div
                className="p-4 flex items-center gap-3 border-b"
                style={{
                  backgroundColor: widgetConfig.colors.primary,
                  color: "#FFFFFF",
                }}
              >
                {widgetConfig.branding.botAvatar && (
                  <img
                    src={widgetConfig.branding.botAvatar}
                    alt="Bot"
                    className="w-8 h-8 rounded-full bg-white"
                  />
                )}
                <div>
                  <h3 className="font-medium">
                    {widgetConfig.branding.companyName}
                  </h3>
                  <p className="text-xs opacity-90">Online</p>
                </div>
              </div>

              {/* Chat messages area */}
              <div className="flex-1 p-4 overflow-y-auto">
                {/* Bot message */}
                <div className="flex gap-2 mb-4">
                  {widgetConfig.branding.botAvatar && (
                    <img
                      src={widgetConfig.branding.botAvatar}
                      alt="Bot"
                      className="w-8 h-8 rounded-full flex-shrink-0"
                    />
                  )}
                  <div
                    className="rounded-lg p-3 max-w-[80%]"
                    style={{
                      backgroundColor: `${widgetConfig.colors.primary}20`,
                    }}
                  >
                    <p>{widgetConfig.branding.welcomeMessage}</p>
                  </div>
                </div>

                {/* User message example */}
                <div className="flex flex-row-reverse gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0"></div>
                  <div
                    className="rounded-lg p-3 max-w-[80%]"
                    style={{
                      backgroundColor: widgetConfig.colors.secondary,
                      color: "#FFFFFF",
                    }}
                  >
                    <p>Hi there! I need some help with my order.</p>
                  </div>
                </div>
              </div>

              {/* Input area */}
              <div className="p-3 border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 p-2 rounded-md border focus:outline-none"
                  />
                  <button
                    className="p-2 rounded-md"
                    style={{
                      backgroundColor: widgetConfig.colors.primary,
                      color: "#FFFFFF",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </button>
                </div>
                {widgetConfig.branding.showPoweredBy && (
                  <div className="text-center mt-2 text-xs text-gray-500">
                    Powered by Multi-AI Chat
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default WidgetPreview;
