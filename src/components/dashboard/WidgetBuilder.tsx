"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Save, Code, Eye, Settings, Palette, Play } from "lucide-react";
import AppearanceEditor from "./AppearanceEditor";
import WidgetPreview from "./WidgetPreview";

interface WidgetBuilderProps {
  widgetId?: string;
}

export default function WidgetBuilder({
  widgetId = "new-widget",
}: WidgetBuilderProps) {
  const [activeTab, setActiveTab] = useState("appearance");
  const [widgetSettings, setWidgetSettings] = useState({
    colors: {
      primary: "#3b82f6",
      secondary: "#f472b6",
      background: "#ffffff",
      text: "#1f2937",
    },
    fonts: {
      primary: "Inter",
      size: "medium",
    },
    position: {
      placement: "bottom-right",
      offset: { x: 20, y: 20 },
    },
    branding: {
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=widget",
      companyName: "Acme Inc",
      welcomeMessage: "Hi there! How can I help you today?",
      showPoweredBy: true,
    },
    behavior: {
      animation: "slide",
      autoOpen: false,
      openDelay: 3,
      triggerText: "Chat with us",
    },
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSettingsChange = (newSettings: any) => {
    setWidgetSettings({ ...widgetSettings, ...newSettings });
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
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
          <Button variant="outline" onClick={() => {}}>
            <Eye className="mr-2 h-4 w-4" /> Preview
          </Button>
          <Button variant="outline" onClick={() => {}}>
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
                  onSettingsChange={handleSettingsChange}
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
                <WidgetPreview settings={widgetSettings} />
              </div>
            </CardContent>
          </Card>
        </div>
      </Tabs>
    </div>
  );
}
