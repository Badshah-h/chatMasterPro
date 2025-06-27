import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  Settings,
  LayoutDashboard,
  MessageSquare,
  BarChart3,
} from "lucide-react";
import WidgetBuilder from "@/components/dashboard/WidgetBuilder";
import { ThemeSwitcher } from "@/components/theme-switcher";
import DashboardLayout from "@/app/(dashboard)/layout";

export default function HomePage() {
  return (
    <div className="bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">Multi-AI Widget Builder</h1>
        </div>
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
          <Avatar>
            <AvatarImage
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=user123"
              alt="User"
            />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </header>
<DashboardLayout>
      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Welcome to Multi-AI Widget Builder</h2>
            <p className="text-lg text-muted-foreground">
              Build and customize AI-powered chat widgets for your website
            </p>
          </div>

          <div className="flex justify-center">
            <ThemeSwitcher/>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LayoutDashboard className="h-5 w-5" />
                  Dashboard
                </CardTitle>
                <CardDescription>
                  View analytics and manage your widgets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Go to Dashboard</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Widget Builder
                </CardTitle>
                <CardDescription>
                  Create and customize your chat widgets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Build Widget</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Analytics
                </CardTitle>
                <CardDescription>
                  Track performance and user engagement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">View Analytics</Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Start</CardTitle>
              <CardDescription>
                Get started with your first AI chat widget
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WidgetBuilder />
            </CardContent>
            </Card>
          </div>
        </main>
      </DashboardLayout>
    </div>
  );
}
