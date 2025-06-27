"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Save, Code, Eye, Settings, Palette, Play } from "lucide-react";
import AppearanceEditor from "./AppearanceEditor";
import WidgetPreview from "./WidgetPreview";


// Import the AppearanceSettings type
interface AppearanceSettings {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  typography: {
    fontFamily: string;
    fontSize: number;
    headingFont: string;
  };
  layout: {
    position:
    | "bottom-right"
    | "bottom-left"
    | "top-right"
    | "top-left"
    | "custom";
    borderRadius: number;
    shadow: number;
    animation: "slide" | "fade" | "bounce";
    autoOpen: boolean;
    autoOpenDelay: number;
  };
  branding: {
    logo: string;
    botAvatar: string;
    companyName: string;
    welcomeMessage: string;
    showPoweredBy: boolean;
  };
}

interface WidgetBuilderProps { }

export default function WidgetBuilder({ }: WidgetBuilderProps = {}) {
  const [activeTab, setActiveTab] = useState("appearance");
  const [widgetSettings, setWidgetSettings] = useState<AppearanceSettings>({
    colors: {
      primary: "#3b82f6",
      secondary: "#6366f1",
      accent: "#f472b6",
      background: "#ffffff",
      text: "#1f2937",
    },
    typography: {
      fontFamily: "Inter",
      fontSize: 16,
      headingFont: "Inter",
    },
    layout: {
      position: "bottom-right" as const,
      borderRadius: 8,
      shadow: 2,
      animation: "slide" as const,
      autoOpen: false,
      autoOpenDelay: 3,
    },
    branding: {
      logo: "",
      botAvatar: "",
      companyName: "Your Company",
      welcomeMessage: "Hello! How can I help you today?",
      showPoweredBy: true,
    },
  });

  const [isSaving, setIsSaving] = useState(false);
  const handleSettingsChange = (newSettings: AppearanceSettings) => {
    setWidgetSettings(newSettings);
  };

  const handleSave = async () => {
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      // Handle save logic here
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full h-full bg-background">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Widget Builder</h1>
          <p className="text-muted-foreground">
            Customize your chat widget appearance and behavior
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => { }}>
            <Eye className="mr-2 h-4 w-4" /> Preview
          </Button>
          <Button variant="outline" onClick={() => { }}>
            <Code className="mr-2 h-4 w-4" /> Get Code
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />{" "}
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="appearance"
        orientation="vertical"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="mb-6">
          <TabsTrigger value="appearance">
            <Palette className="mr-2 h-4 w-4" /> Appearance
          </TabsTrigger>
          <TabsTrigger value="behavior">
            <Settings className="mr-2 h-4 w-4" /> Behavior
          </TabsTrigger>
          <TabsTrigger value="deployment">
            <Play className="mr-2 h-4 w-4" /> Deployment
          </TabsTrigger>
        </TabsList>

        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-250px)]">
          <Card className="flex-1 overflow-auto">
            <CardContent className="p-6">
              <TabsContent value="appearance" className="mt-0">
                <AppearanceEditor
                  settings={widgetSettings}
                  onChange={handleSettingsChange}
                />
              </TabsContent>

              <TabsContent value="behavior" className="mt-0">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Chat Behavior</h3>
                    <p className="text-sm text-muted-foreground">
                      Configure how your widget behaves
                    </p>
                  </div>
                  <div className="grid gap-4">
                    <div className="p-6 border rounded-md">
                      <p className="text-muted-foreground text-sm">
                        Behavior settings will be implemented here
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="deployment" className="mt-0">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Widget Deployment</h3>
                    <p className="text-sm text-muted-foreground">
                      Get your widget code and deploy it
                    </p>
                  </div>
                  <div className="grid gap-4">
                    <div className="p-6 border rounded-md">
                      <p className="text-muted-foreground text-sm">
                        Deployment options will be implemented here
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </CardContent>
          </Card>

          <Card className="flex-1 overflow-hidden">
            <CardContent className="p-6 h-full">
              <div className="mb-4">
                <h3 className="text-lg font-medium">Live Preview</h3>
                <p className="text-sm text-muted-foreground">
                  See how your widget will look
                </p>
              </div>
              <Separator className="my-4" />
              <div className="h-[calc(100%-80px)] overflow-hidden">
                <WidgetPreview widgetConfig={{
                  colors: {
                    primary: widgetSettings.colors.primary,
                    secondary: widgetSettings.colors.secondary,
                    background: widgetSettings.colors.background,
                    text: widgetSettings.colors.text,
                  },
                  fonts: {
                    family: widgetSettings.typography.fontFamily,
                    size: widgetSettings.typography.fontSize.toString() + "px",
                  },
                  position: {
                    placement: widgetSettings.layout.position as "bottom-right" | "bottom-left" | "top-right" | "top-left",
                  },
                  branding: {
                    logo: widgetSettings.branding.logo,
                    botAvatar: widgetSettings.branding.botAvatar,
                    companyName: widgetSettings.branding.companyName,
                    welcomeMessage: widgetSettings.branding.welcomeMessage,
                    showPoweredBy: widgetSettings.branding.showPoweredBy,
                  },
                  size: "standard" as const,
                  borderRadius: widgetSettings.layout.borderRadius,
                  shadow: widgetSettings.layout.shadow as unknown as "none" | "small" | "medium" | "large",
                }} />
              </div>
            </CardContent>
          </Card>
        </div>
      </Tabs>
    </div>
  );
}
