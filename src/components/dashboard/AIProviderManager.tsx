"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  CheckCircle,
  Plus,
  RefreshCw,
  Settings,
  Trash2,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

interface AIProvider {
  id: string;
  name: string;
  logo: string;
  status: "connected" | "error" | "disconnected";
  apiKey: string;
  baseUrl?: string;
  models: AIModel[];
  isActive: boolean;
}

interface AIModel {
  id: string;
  name: string;
  provider: string;
  contextWindow: number;
  maxTokens: number;
  isSelected: boolean;
  role: "primary" | "fallback" | "specific";
}

const AIProviderManager = () => {
  const [providers, setProviders] = useState<AIProvider[]>([
    {
      id: "openai",
      name: "OpenAI",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=openai",
      status: "connected",
      apiKey: "sk-*****************************",
      models: [
        {
          id: "gpt-4o",
          name: "GPT-4o",
          provider: "openai",
          contextWindow: 128000,
          maxTokens: 4096,
          isSelected: true,
          role: "primary",
        },
        {
          id: "gpt-4-turbo",
          name: "GPT-4 Turbo",
          provider: "openai",
          contextWindow: 128000,
          maxTokens: 4096,
          isSelected: false,
          role: "fallback",
        },
        {
          id: "gpt-3.5-turbo",
          name: "GPT-3.5 Turbo",
          provider: "openai",
          contextWindow: 16385,
          maxTokens: 4096,
          isSelected: false,
          role: "specific",
        },
      ],
      isActive: true,
    },
    {
      id: "anthropic",
      name: "Anthropic Claude",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=claude",
      status: "disconnected",
      apiKey: "",
      models: [],
      isActive: false,
    },
    {
      id: "gemini",
      name: "Google Gemini",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=gemini",
      status: "error",
      apiKey: "AIza***************************",
      models: [
        {
          id: "gemini-1.5-pro",
          name: "Gemini 1.5 Pro",
          provider: "gemini",
          contextWindow: 1000000,
          maxTokens: 8192,
          isSelected: false,
          role: "primary",
        },
        {
          id: "gemini-1.0-pro",
          name: "Gemini 1.0 Pro",
          provider: "gemini",
          contextWindow: 32768,
          maxTokens: 2048,
          isSelected: false,
          role: "fallback",
        },
      ],
      isActive: false,
    },
  ]);

  const [newProvider, setNewProvider] = useState({
    name: "",
    apiKey: "",
    baseUrl: "",
  });

  const [selectedProvider, setSelectedProvider] = useState<string | null>(
    "openai",
  );

  const handleToggleProvider = (id: string) => {
    setProviders(
      providers.map((provider) =>
        provider.id === id
          ? { ...provider, isActive: !provider.isActive }
          : provider,
      ),
    );
  };

  const handleAddProvider = () => {
    const id = newProvider.name.toLowerCase().replace(/\s+/g, "-");
    const newProviderObj: AIProvider = {
      id,
      name: newProvider.name,
      logo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`,
      status: "disconnected",
      apiKey: newProvider.apiKey,
      baseUrl: newProvider.baseUrl,
      models: [],
      isActive: false,
    };

    setProviders([...providers, newProviderObj]);
    setNewProvider({ name: "", apiKey: "", baseUrl: "" });
  };

  const handleTestConnection = (id: string) => {
    // In a real implementation, this would make an API call to test the connection
    console.log(`Testing connection for provider: ${id}`);
  };

  const handleDeleteProvider = (id: string) => {
    setProviders(providers.filter((provider) => provider.id !== id));
    if (selectedProvider === id) {
      setSelectedProvider(providers.length > 1 ? providers[0].id : null);
    }
  };

  const handleSaveApiKey = (id: string, apiKey: string) => {
    setProviders(
      providers.map((provider) =>
        provider.id === id
          ? { ...provider, apiKey, status: "connected" }
          : provider,
      ),
    );
  };

  const handleToggleModel = (providerId: string, modelId: string) => {
    setProviders(
      providers.map((provider) =>
        provider.id === providerId
          ? {
              ...provider,
              models: provider.models.map((model) =>
                model.id === modelId
                  ? { ...model, isSelected: !model.isSelected }
                  : model,
              ),
            }
          : provider,
      ),
    );
  };

  const handleChangeModelRole = (
    providerId: string,
    modelId: string,
    role: "primary" | "fallback" | "specific",
  ) => {
    setProviders(
      providers.map((provider) =>
        provider.id === providerId
          ? {
              ...provider,
              models: provider.models.map((model) =>
                model.id === modelId ? { ...model, role } : model,
              ),
            }
          : provider,
      ),
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="w-3 h-3 mr-1" /> Connected
          </Badge>
        );
      case "error":
        return (
          <Badge variant="destructive">
            <AlertCircle className="w-3 h-3 mr-1" /> Error
          </Badge>
        );
      default:
        return <Badge variant="outline">Disconnected</Badge>;
    }
  };

  return (
    <div className="bg-background w-full p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Providers</CardTitle>
              <CardDescription>
                Manage your AI service connections
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {providers.map((provider) => (
                <div
                  key={provider.id}
                  className={`flex items-center justify-between p-3 rounded-md cursor-pointer ${selectedProvider === provider.id ? "bg-accent" : "hover:bg-accent/50"}`}
                  onClick={() => setSelectedProvider(provider.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                      <img
                        src={provider.logo}
                        alt={provider.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{provider.name}</h3>
                      <div className="text-xs">
                        {getStatusBadge(provider.status)}
                      </div>
                    </div>
                  </div>
                  <Switch
                    checked={provider.isActive}
                    onCheckedChange={() => handleToggleProvider(provider.id)}
                  />
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => {}}>
                <Plus className="mr-2 h-4 w-4" /> Add Provider
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {selectedProvider && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>
                      {providers.find((p) => p.id === selectedProvider)?.name}{" "}
                      Configuration
                    </CardTitle>
                    <CardDescription>
                      Configure API keys, models, and settings
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTestConnection(selectedProvider)}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" /> Test Connection
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteProvider(selectedProvider)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="connection">
                  <TabsList className="mb-4">
                    <TabsTrigger value="connection">Connection</TabsTrigger>
                    <TabsTrigger value="models">Models</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  </TabsList>

                  <TabsContent value="connection" className="space-y-4">
                    <div className="space-y-4">
                      {providers.find((p) => p.id === selectedProvider)
                        ?.status === "error" && (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            There was an error connecting to this provider.
                            Please check your API key and try again.
                          </AlertDescription>
                        </Alert>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="apiKey">API Key</Label>
                        <Input
                          id="apiKey"
                          type="password"
                          value={
                            providers.find((p) => p.id === selectedProvider)
                              ?.apiKey || ""
                          }
                          onChange={(e) =>
                            handleSaveApiKey(selectedProvider, e.target.value)
                          }
                          placeholder="Enter your API key"
                        />
                        <p className="text-xs text-muted-foreground">
                          Your API key is encrypted and stored securely.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="baseUrl">Base URL (Optional)</Label>
                        <Input
                          id="baseUrl"
                          type="text"
                          value={
                            providers.find((p) => p.id === selectedProvider)
                              ?.baseUrl || ""
                          }
                          placeholder="https://api.example.com/v1"
                        />
                        <p className="text-xs text-muted-foreground">
                          Only required for self-hosted or custom endpoints.
                        </p>
                      </div>

                      <div className="pt-4">
                        <Button>Save Connection Settings</Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="models" className="space-y-4">
                    <div className="space-y-4">
                      {(
                        providers.find((p) => p.id === selectedProvider)
                          ?.models || []
                      ).length > 0 ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-12 text-xs font-medium text-muted-foreground pb-2 border-b">
                            <div className="col-span-5">Model</div>
                            <div className="col-span-3">Context Window</div>
                            <div className="col-span-2">Role</div>
                            <div className="col-span-2 text-right">Active</div>
                          </div>

                          {providers
                            .find((p) => p.id === selectedProvider)
                            ?.models.map((model) => (
                              <div
                                key={model.id}
                                className="grid grid-cols-12 items-center py-2 border-b border-border/40"
                              >
                                <div className="col-span-5 font-medium">
                                  {model.name}
                                </div>
                                <div className="col-span-3 text-sm">
                                  {model.contextWindow.toLocaleString()} tokens
                                </div>
                                <div className="col-span-2">
                                  <Select
                                    value={model.role}
                                    onValueChange={(value) =>
                                      handleChangeModelRole(
                                        selectedProvider,
                                        model.id,
                                        value as
                                          | "primary"
                                          | "fallback"
                                          | "specific",
                                      )
                                    }
                                  >
                                    <SelectTrigger className="h-8 w-full">
                                      <SelectValue placeholder="Role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="primary">
                                        Primary
                                      </SelectItem>
                                      <SelectItem value="fallback">
                                        Fallback
                                      </SelectItem>
                                      <SelectItem value="specific">
                                        Specific
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="col-span-2 text-right">
                                  <Switch
                                    checked={model.isSelected}
                                    onCheckedChange={() =>
                                      handleToggleModel(
                                        selectedProvider,
                                        model.id,
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 border rounded-md bg-muted/20">
                          <p className="text-muted-foreground">
                            No models available. Connect your API key first.
                          </p>
                          <Button variant="outline" className="mt-4">
                            <RefreshCw className="mr-2 h-4 w-4" /> Fetch
                            Available Models
                          </Button>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="advanced" className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">
                            Fallback Configuration
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Configure fallback behavior when this provider fails
                          </p>
                        </div>
                        <Switch />
                      </div>
                      <Separator />

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Rate Limiting</h3>
                          <p className="text-sm text-muted-foreground">
                            Set maximum requests per minute
                          </p>
                        </div>
                        <Input
                          type="number"
                          className="w-20"
                          defaultValue="60"
                        />
                      </div>
                      <Separator />

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Timeout Settings</h3>
                          <p className="text-sm text-muted-foreground">
                            Maximum wait time for responses (seconds)
                          </p>
                        </div>
                        <Input
                          type="number"
                          className="w-20"
                          defaultValue="30"
                        />
                      </div>
                      <Separator />

                      <div className="pt-4">
                        <Button>
                          <Settings className="mr-2 h-4 w-4" /> Save Advanced
                          Settings
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIProviderManager;
