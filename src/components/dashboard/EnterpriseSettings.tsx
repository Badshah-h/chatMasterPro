"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  Shield,
  Palette,
  Webhook,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  AlertCircle,
  Settings,
  Crown,
  UserCheck,
  Eye,
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  status: "active" | "pending" | "inactive";
  lastActive: string;
  avatar: string;
}

interface WebhookEndpoint {
  id: string;
  name: string;
  url: string;
  events: string[];
  status: "active" | "inactive" | "error";
  lastTriggered: string;
  secret: string;
}

const EnterpriseSettings = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@company.com",
      role: "admin",
      status: "active",
      lastActive: "2024-01-15",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@company.com",
      role: "editor",
      status: "active",
      lastActive: "2024-01-14",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    },
    {
      id: "3",
      name: "Bob Wilson",
      email: "bob@company.com",
      role: "viewer",
      status: "pending",
      lastActive: "Never",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob",
    },
  ]);

  const [webhooks, setWebhooks] = useState<WebhookEndpoint[]>([
    {
      id: "1",
      name: "Slack Notifications",
      url: "https://hooks.slack.com/services/...",
      events: ["conversation.started", "conversation.ended"],
      status: "active",
      lastTriggered: "2024-01-15 10:30",
      secret: "whsec_***",
    },
    {
      id: "2",
      name: "CRM Integration",
      url: "https://api.crm.com/webhooks/chat",
      events: ["conversation.started", "user.feedback"],
      status: "error",
      lastTriggered: "2024-01-14 15:20",
      secret: "whsec_***",
    },
  ]);

  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "viewer",
  });
  const [newWebhook, setNewWebhook] = useState({
    name: "",
    url: "",
    events: [] as string[],
  });
  const [brandingSettings, setBrandingSettings] = useState({
    companyName: "Your Company",
    logoUrl: "",
    primaryColor: "#3b82f6",
    secondaryColor: "#64748b",
    customDomain: "",
    hideTempobranding: false,
  });

  const availableEvents = [
    "conversation.started",
    "conversation.ended",
    "message.sent",
    "message.received",
    "user.feedback",
    "widget.deployed",
    "error.occurred",
  ];

  const handleAddTeamMember = () => {
    if (!newMember.name || !newMember.email) return;

    const member: TeamMember = {
      id: Date.now().toString(),
      name: newMember.name,
      email: newMember.email,
      role: newMember.role as "admin" | "editor" | "viewer",
      status: "pending",
      lastActive: "Never",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newMember.name}`,
    };

    setTeamMembers((prev) => [...prev, member]);
    setNewMember({ name: "", email: "", role: "viewer" });
  };

  const handleUpdateMemberRole = (id: string, role: string) => {
    setTeamMembers((prev) =>
      prev.map((member) =>
        member.id === id
          ? { ...member, role: role as "admin" | "editor" | "viewer" }
          : member,
      ),
    );
  };

  const handleRemoveTeamMember = (id: string) => {
    setTeamMembers((prev) => prev.filter((member) => member.id !== id));
  };

  const handleAddWebhook = () => {
    if (!newWebhook.name || !newWebhook.url) return;

    const webhook: WebhookEndpoint = {
      id: Date.now().toString(),
      name: newWebhook.name,
      url: newWebhook.url,
      events: newWebhook.events,
      status: "active",
      lastTriggered: "Never",
      secret: `whsec_${Math.random().toString(36).substr(2, 20)}`,
    };

    setWebhooks((prev) => [...prev, webhook]);
    setNewWebhook({ name: "", url: "", events: [] });
  };

  const handleToggleWebhookEvent = (webhookId: string, event: string) => {
    setWebhooks((prev) =>
      prev.map((webhook) => {
        if (webhook.id === webhookId) {
          const events = webhook.events.includes(event)
            ? webhook.events.filter((e) => e !== event)
            : [...webhook.events, event];
          return { ...webhook, events };
        }
        return webhook;
      }),
    );
  };

  const handleRemoveWebhook = (id: string) => {
    setWebhooks((prev) => prev.filter((webhook) => webhook.id !== id));
  };

  const handleSaveBranding = () => {
    console.log("Saving branding settings:", brandingSettings);
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return (
          <Badge className="bg-red-500">
            <Crown className="w-3 h-3 mr-1" />
            Admin
          </Badge>
        );
      case "editor":
        return (
          <Badge className="bg-blue-500">
            <Edit className="w-3 h-3 mr-1" />
            Editor
          </Badge>
        );
      case "viewer":
        return (
          <Badge variant="outline">
            <Eye className="w-3 h-3 mr-1" />
            Viewer
          </Badge>
        );
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </Badge>
        );
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "error":
        return (
          <Badge variant="destructive">
            <AlertCircle className="w-3 h-3 mr-1" />
            Error
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="bg-background w-full p-6">
      <Tabs defaultValue="team" className="space-y-6">
        <TabsList>
          <TabsTrigger value="team">Team & Roles</TabsTrigger>
          <TabsTrigger value="branding">White-Labeling</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add Team Member</CardTitle>
              <CardDescription>
                Invite new team members and assign roles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="memberName">Name</Label>
                  <Input
                    id="memberName"
                    placeholder="John Doe"
                    value={newMember.name}
                    onChange={(e) =>
                      setNewMember((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="memberEmail">Email</Label>
                  <Input
                    id="memberEmail"
                    type="email"
                    placeholder="john@company.com"
                    value={newMember.email}
                    onChange={(e) =>
                      setNewMember((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="memberRole">Role</Label>
                  <Select
                    value={newMember.role}
                    onValueChange={(value) =>
                      setNewMember((prev) => ({ ...prev, role: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button onClick={handleAddTeamMember} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Member
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>
                Manage team member roles and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{member.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {member.email}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Last active: {member.lastActive}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {getStatusBadge(member.status)}
                      <Select
                        value={member.role}
                        onValueChange={(value) =>
                          handleUpdateMemberRole(member.id, value)
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveTeamMember(member.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
              <CardDescription>
                Overview of what each role can do
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Crown className="h-5 w-5 text-red-500" />
                    <h3 className="font-semibold">Admin</h3>
                  </div>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Full system access</li>
                    <li>• Manage team members</li>
                    <li>• Configure enterprise settings</li>
                    <li>• Access billing & usage</li>
                    <li>• Delete widgets & data</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Edit className="h-5 w-5 text-blue-500" />
                    <h3 className="font-semibold">Editor</h3>
                  </div>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Create & edit widgets</li>
                    <li>• Manage AI providers</li>
                    <li>• Upload knowledge base</li>
                    <li>• View analytics</li>
                    <li>• Export data</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-5 w-5 text-gray-500" />
                    <h3 className="font-semibold">Viewer</h3>
                  </div>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• View widgets</li>
                    <li>• View analytics</li>
                    <li>• View conversations</li>
                    <li>• Export reports</li>
                    <li>• Read-only access</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Branding</CardTitle>
              <CardDescription>
                Customize the appearance and branding of your widgets
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={brandingSettings.companyName}
                      onChange={(e) =>
                        setBrandingSettings((prev) => ({
                          ...prev,
                          companyName: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="logoUrl">Logo URL</Label>
                    <Input
                      id="logoUrl"
                      placeholder="https://example.com/logo.png"
                      value={brandingSettings.logoUrl}
                      onChange={(e) =>
                        setBrandingSettings((prev) => ({
                          ...prev,
                          logoUrl: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customDomain">Custom Domain</Label>
                    <Input
                      id="customDomain"
                      placeholder="chat.yourcompany.com"
                      value={brandingSettings.customDomain}
                      onChange={(e) =>
                        setBrandingSettings((prev) => ({
                          ...prev,
                          customDomain: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="primaryColor"
                        type="color"
                        value={brandingSettings.primaryColor}
                        onChange={(e) =>
                          setBrandingSettings((prev) => ({
                            ...prev,
                            primaryColor: e.target.value,
                          }))
                        }
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        value={brandingSettings.primaryColor}
                        onChange={(e) =>
                          setBrandingSettings((prev) => ({
                            ...prev,
                            primaryColor: e.target.value,
                          }))
                        }
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="secondaryColor"
                        type="color"
                        value={brandingSettings.secondaryColor}
                        onChange={(e) =>
                          setBrandingSettings((prev) => ({
                            ...prev,
                            secondaryColor: e.target.value,
                          }))
                        }
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        value={brandingSettings.secondaryColor}
                        onChange={(e) =>
                          setBrandingSettings((prev) => ({
                            ...prev,
                            secondaryColor: e.target.value,
                          }))
                        }
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <Label htmlFor="hideBranding">Hide Tempo Branding</Label>
                      <p className="text-xs text-muted-foreground">
                        Remove &quot;Powered by Tempo&quot; from widgets
                      </p>
                    </div>
                    <Switch
                      id="hideBranding"
                      checked={brandingSettings.hideTempobranding}
                      onCheckedChange={(checked) =>
                        setBrandingSettings((prev) => ({
                          ...prev,
                          hideTempobranding: checked,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Preview</h3>
                  <p className="text-sm text-muted-foreground">
                    See how your branding will look
                  </p>
                </div>
                <Button onClick={handleSaveBranding}>
                  <Palette className="h-4 w-4 mr-2" />
                  Save Branding
                </Button>
              </div>

              <div className="border rounded-lg p-6 bg-muted/20">
                <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                  <div
                    className="p-4 border-b"
                    style={{ backgroundColor: brandingSettings.primaryColor }}
                  >
                    <div className="flex items-center space-x-2">
                      {brandingSettings.logoUrl && (
                        <img
                          src={brandingSettings.logoUrl}
                          alt="Logo"
                          className="w-6 h-6"
                        />
                      )}
                      <span className="text-white font-medium">
                        {brandingSettings.companyName} Support
                      </span>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <p className="text-sm">
                        Hello! How can I help you today?
                      </p>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-blue-500 text-white rounded-lg p-3 max-w-xs">
                        <p className="text-sm">I need help with my account</p>
                      </div>
                    </div>
                  </div>
                  {!brandingSettings.hideTempobranding && (
                    <div className="px-4 pb-2">
                      <p className="text-xs text-gray-400 text-center">
                        Powered by Tempo
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add Webhook</CardTitle>
              <CardDescription>
                Configure webhooks to receive real-time notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="webhookName">Name</Label>
                  <Input
                    id="webhookName"
                    placeholder="Slack Notifications"
                    value={newWebhook.name}
                    onChange={(e) =>
                      setNewWebhook((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="webhookUrl">Webhook URL</Label>
                  <Input
                    id="webhookUrl"
                    placeholder="https://hooks.slack.com/..."
                    value={newWebhook.url}
                    onChange={(e) =>
                      setNewWebhook((prev) => ({
                        ...prev,
                        url: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={handleAddWebhook} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Webhook
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Webhook Endpoints</CardTitle>
              <CardDescription>
                Manage your webhook endpoints and their event subscriptions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {webhooks.map((webhook) => (
                  <div
                    key={webhook.id}
                    className="border rounded-lg p-4 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{webhook.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {webhook.url}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Last triggered: {webhook.lastTriggered}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(webhook.status)}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveWebhook(webhook.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Events</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                        {availableEvents.map((event) => (
                          <div
                            key={event}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="checkbox"
                              id={`${webhook.id}-${event}`}
                              checked={webhook.events.includes(event)}
                              onChange={() =>
                                handleToggleWebhookEvent(webhook.id, event)
                              }
                              className="rounded"
                            />
                            <Label
                              htmlFor={`${webhook.id}-${event}`}
                              className="text-xs"
                            >
                              {event}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div>
                        <Label className="text-sm font-medium">
                          Webhook Secret
                        </Label>
                        <p className="text-xs text-muted-foreground font-mono">
                          {webhook.secret}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Test Webhook
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security and access control settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-muted-foreground">
                      Require 2FA for all admin users
                    </p>
                  </div>
                  <Switch />
                </div>
                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">IP Whitelist</h3>
                    <p className="text-sm text-muted-foreground">
                      Restrict access to specific IP addresses
                    </p>
                  </div>
                  <Switch />
                </div>
                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Session Timeout</h3>
                    <p className="text-sm text-muted-foreground">
                      Automatically log out inactive users
                    </p>
                  </div>
                  <Select defaultValue="24">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 hour</SelectItem>
                      <SelectItem value="8">8 hours</SelectItem>
                      <SelectItem value="24">24 hours</SelectItem>
                      <SelectItem value="168">7 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Audit Logging</h3>
                    <p className="text-sm text-muted-foreground">
                      Log all user actions and system events
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />

                <div className="pt-4">
                  <Button>
                    <Shield className="h-4 w-4 mr-2" />
                    Save Security Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data & Privacy</CardTitle>
              <CardDescription>
                Manage data retention and privacy settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dataRetention">Data Retention Period</Label>
                <Select defaultValue="365">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                    <SelectItem value="1095">3 years</SelectItem>
                    <SelectItem value="-1">Forever</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  How long to keep conversation data and analytics
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">GDPR Compliance</h3>
                  <p className="text-sm text-muted-foreground">
                    Enable GDPR data processing features
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Data Export</h3>
                  <p className="text-sm text-muted-foreground">
                    Allow users to export their data
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="pt-4">
                <Button variant="outline">Export All Data</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnterpriseSettings;
