"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Upload,
  Palette,
  Type,
  Layout,
  Smartphone,
  Monitor,
  Tablet,
} from "lucide-react";

interface AppearanceEditorProps {
  onChange?: (settings: AppearanceSettings) => void;
  settings?: AppearanceSettings;
}

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

const defaultSettings: AppearanceSettings = {
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
    position: "bottom-right",
    borderRadius: 8,
    shadow: 2,
    animation: "slide",
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
};

const fontOptions = [
  "Inter",
  "Poppins",
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Source Sans Pro",
];

const positionOptions = [
  { value: "bottom-right", label: "Bottom Right" },
  { value: "bottom-left", label: "Bottom Left" },
  { value: "top-right", label: "Top Right" },
  { value: "top-left", label: "Top Left" },
  { value: "custom", label: "Custom" },
];

const animationOptions = [
  { value: "slide", label: "Slide" },
  { value: "fade", label: "Fade" },
  { value: "bounce", label: "Bounce" },
];

const AppearanceEditor: React.FC<AppearanceEditorProps> = ({
  onChange,
  settings = defaultSettings,
}) => {
  const [currentSettings, setCurrentSettings] =
    useState<AppearanceSettings>(settings);
  const [activeTab, setActiveTab] = useState("colors");
  const [previewDevice, setPreviewDevice] = useState("desktop");

  const handleSettingsChange = (newSettings: Partial<AppearanceSettings>) => {
    const updatedSettings = {
      ...currentSettings,
      ...newSettings,
    };
    setCurrentSettings(updatedSettings);
    onChange?.(updatedSettings);
  };

  const handleColorChange = (
    colorKey: keyof AppearanceSettings["colors"],
    value: string,
  ) => {
    handleSettingsChange({
      colors: {
        ...currentSettings.colors,
        [colorKey]: value,
      },
    });
  };

  const handleTypographyChange = (
    typographyKey: keyof AppearanceSettings["typography"],
    value: string | number,
  ) => {
    handleSettingsChange({
      typography: {
        ...currentSettings.typography,
        [typographyKey]: value,
      },
    });
  };

  const handleLayoutChange = (
    layoutKey: keyof AppearanceSettings["layout"],
    value: any,
  ) => {
    handleSettingsChange({
      layout: {
        ...currentSettings.layout,
        [layoutKey]: value,
      },
    });
  };

  const handleBrandingChange = (
    brandingKey: keyof AppearanceSettings["branding"],
    value: string | boolean,
  ) => {
    handleSettingsChange({
      branding: {
        ...currentSettings.branding,
        [brandingKey]: value,
      },
    });
  };

  return (
    <div className="bg-background w-full h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-semibold">Appearance Editor</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className={previewDevice === "desktop" ? "bg-accent/10" : ""}
            onClick={() => setPreviewDevice("desktop")}
          >
            <Monitor className="h-4 w-4 mr-1" />
            Desktop
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={previewDevice === "tablet" ? "bg-accent/10" : ""}
            onClick={() => setPreviewDevice("tablet")}
          >
            <Tablet className="h-4 w-4 mr-1" />
            Tablet
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={previewDevice === "mobile" ? "bg-accent/10" : ""}
            onClick={() => setPreviewDevice("mobile")}
          >
            <Smartphone className="h-4 w-4 mr-1" />
            Mobile
          </Button>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 overflow-hidden"
      >
        <div className="border-b px-4">
          <TabsList className="mt-2">
            <TabsTrigger value="colors" className="flex items-center">
              <Palette className="h-4 w-4 mr-2" />
              Colors
            </TabsTrigger>
            <TabsTrigger value="typography" className="flex items-center">
              <Type className="h-4 w-4 mr-2" />
              Typography
            </TabsTrigger>
            <TabsTrigger value="layout" className="flex items-center">
              <Layout className="h-4 w-4 mr-2" />
              Layout & Behavior
            </TabsTrigger>
            <TabsTrigger value="branding" className="flex items-center">
              <Upload className="h-4 w-4 mr-2" />
              Branding
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="p-4 overflow-y-auto">
          <TabsContent value="colors" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Color Scheme</CardTitle>
                <CardDescription>
                  Customize the colors of your chat widget to match your brand.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-md border"
                        style={{
                          backgroundColor: currentSettings.colors.primary,
                        }}
                      />
                      <Input
                        id="primaryColor"
                        type="color"
                        value={currentSettings.colors.primary}
                        onChange={(e) =>
                          handleColorChange("primary", e.target.value)
                        }
                        className="w-full h-10"
                      />
                      <Input
                        value={currentSettings.colors.primary}
                        onChange={(e) =>
                          handleColorChange("primary", e.target.value)
                        }
                        className="w-28"
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-md border"
                        style={{
                          backgroundColor: currentSettings.colors.secondary,
                        }}
                      />
                      <Input
                        id="secondaryColor"
                        type="color"
                        value={currentSettings.colors.secondary}
                        onChange={(e) =>
                          handleColorChange("secondary", e.target.value)
                        }
                        className="w-full h-10"
                      />
                      <Input
                        value={currentSettings.colors.secondary}
                        onChange={(e) =>
                          handleColorChange("secondary", e.target.value)
                        }
                        className="w-28"
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="accentColor">Accent Color</Label>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-md border"
                        style={{
                          backgroundColor: currentSettings.colors.accent,
                        }}
                      />
                      <Input
                        id="accentColor"
                        type="color"
                        value={currentSettings.colors.accent}
                        onChange={(e) =>
                          handleColorChange("accent", e.target.value)
                        }
                        className="w-full h-10"
                      />
                      <Input
                        value={currentSettings.colors.accent}
                        onChange={(e) =>
                          handleColorChange("accent", e.target.value)
                        }
                        className="w-28"
                      />
                    </div>
                  </div>

                  <Separator className="my-2" />

                  <div className="grid gap-2">
                    <Label htmlFor="backgroundColor">Background Color</Label>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-md border"
                        style={{
                          backgroundColor: currentSettings.colors.background,
                        }}
                      />
                      <Input
                        id="backgroundColor"
                        type="color"
                        value={currentSettings.colors.background}
                        onChange={(e) =>
                          handleColorChange("background", e.target.value)
                        }
                        className="w-full h-10"
                      />
                      <Input
                        value={currentSettings.colors.background}
                        onChange={(e) =>
                          handleColorChange("background", e.target.value)
                        }
                        className="w-28"
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="textColor">Text Color</Label>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-md border"
                        style={{ backgroundColor: currentSettings.colors.text }}
                      />
                      <Input
                        id="textColor"
                        type="color"
                        value={currentSettings.colors.text}
                        onChange={(e) =>
                          handleColorChange("text", e.target.value)
                        }
                        className="w-full h-10"
                      />
                      <Input
                        value={currentSettings.colors.text}
                        onChange={(e) =>
                          handleColorChange("text", e.target.value)
                        }
                        className="w-28"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="typography" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Typography</CardTitle>
                <CardDescription>
                  Customize the fonts and text sizes for your chat widget.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="fontFamily">Font Family</Label>
                    <Select
                      value={currentSettings.typography.fontFamily}
                      onValueChange={(value) =>
                        handleTypographyChange("fontFamily", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select font" />
                      </SelectTrigger>
                      <SelectContent>
                        {fontOptions.map((font) => (
                          <SelectItem key={font} value={font}>
                            {font}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="headingFont">Heading Font</Label>
                    <Select
                      value={currentSettings.typography.headingFont}
                      onValueChange={(value) =>
                        handleTypographyChange("headingFont", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select heading font" />
                      </SelectTrigger>
                      <SelectContent>
                        {fontOptions.map((font) => (
                          <SelectItem key={font} value={font}>
                            {font}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <Label htmlFor="fontSize">
                        Font Size: {currentSettings.typography.fontSize}px
                      </Label>
                    </div>
                    <Slider
                      id="fontSize"
                      min={12}
                      max={20}
                      step={1}
                      value={[currentSettings.typography.fontSize]}
                      onValueChange={(value) =>
                        handleTypographyChange("fontSize", value[0])
                      }
                      className="py-4"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="layout" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Layout & Behavior</CardTitle>
                <CardDescription>
                  Configure how your chat widget appears and behaves on your
                  website.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="position">Widget Position</Label>
                    <Select
                      value={currentSettings.layout.position}
                      onValueChange={(value: any) =>
                        handleLayoutChange("position", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        {positionOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <Label htmlFor="borderRadius">
                        Border Radius: {currentSettings.layout.borderRadius}px
                      </Label>
                    </div>
                    <Slider
                      id="borderRadius"
                      min={0}
                      max={20}
                      step={1}
                      value={[currentSettings.layout.borderRadius]}
                      onValueChange={(value) =>
                        handleLayoutChange("borderRadius", value[0])
                      }
                      className="py-4"
                    />
                  </div>

                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <Label htmlFor="shadow">
                        Shadow Intensity: {currentSettings.layout.shadow}
                      </Label>
                    </div>
                    <Slider
                      id="shadow"
                      min={0}
                      max={5}
                      step={1}
                      value={[currentSettings.layout.shadow]}
                      onValueChange={(value) =>
                        handleLayoutChange("shadow", value[0])
                      }
                      className="py-4"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="animation">Animation Style</Label>
                    <Select
                      value={currentSettings.layout.animation}
                      onValueChange={(value: any) =>
                        handleLayoutChange("animation", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select animation" />
                      </SelectTrigger>
                      <SelectContent>
                        {animationOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="autoOpen">Auto-open widget</Label>
                    <Switch
                      id="autoOpen"
                      checked={currentSettings.layout.autoOpen}
                      onCheckedChange={(checked) =>
                        handleLayoutChange("autoOpen", checked)
                      }
                    />
                  </div>

                  {currentSettings.layout.autoOpen && (
                    <div className="grid gap-2">
                      <div className="flex justify-between">
                        <Label htmlFor="autoOpenDelay">
                          Auto-open delay:{" "}
                          {currentSettings.layout.autoOpenDelay}s
                        </Label>
                      </div>
                      <Slider
                        id="autoOpenDelay"
                        min={0}
                        max={30}
                        step={1}
                        value={[currentSettings.layout.autoOpenDelay]}
                        onValueChange={(value) =>
                          handleLayoutChange("autoOpenDelay", value[0])
                        }
                        className="py-4"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="branding" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Branding</CardTitle>
                <CardDescription>
                  Add your company branding to personalize the chat widget.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="logo">Company Logo</Label>
                    <div className="flex items-center gap-2">
                      {currentSettings.branding.logo && (
                        <div className="w-10 h-10 rounded-md border overflow-hidden">
                          <img
                            src={currentSettings.branding.logo}
                            alt="Company logo"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                      <Button variant="outline" className="w-full">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Logo
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="botAvatar">Bot Avatar</Label>
                    <div className="flex items-center gap-2">
                      {currentSettings.branding.botAvatar ? (
                        <div className="w-10 h-10 rounded-full border overflow-hidden">
                          <img
                            src={currentSettings.branding.botAvatar}
                            alt="Bot avatar"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                          AI
                        </div>
                      )}
                      <Button variant="outline" className="w-full">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Avatar
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={currentSettings.branding.companyName}
                      onChange={(e) =>
                        handleBrandingChange("companyName", e.target.value)
                      }
                      maxLength={30}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="welcomeMessage">Welcome Message</Label>
                    <Input
                      id="welcomeMessage"
                      value={currentSettings.branding.welcomeMessage}
                      onChange={(e) =>
                        handleBrandingChange("welcomeMessage", e.target.value)
                      }
                      maxLength={100}
                    />
                    <p className="text-xs text-muted-foreground">
                      {currentSettings.branding.welcomeMessage.length}/100
                      characters
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="showPoweredBy">
                      Show "Powered by" label
                    </Label>
                    <Switch
                      id="showPoweredBy"
                      checked={currentSettings.branding.showPoweredBy}
                      onCheckedChange={(checked) =>
                        handleBrandingChange("showPoweredBy", checked)
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>

      <div className="border-t p-4 flex justify-end space-x-2">
        <Button variant="outline">Reset to Default</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
};

export default AppearanceEditor;
