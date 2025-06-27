import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  Settings,
  PlusCircle,
  LayoutDashboard,
  MessageSquare,
  BarChart3,
} from "lucide-react";
import WidgetBuilder from "@/components/dashboard/WidgetBuilder";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">Multi-AI Widget Builder</h1>
        </div>
        <div className="flex items-center gap-4">
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

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden w-64 flex-col border-r bg-background md:flex">
          <nav className="grid gap-2 p-4">
            <Button variant="ghost" className="justify-start gap-2">
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </Button>
            <Button variant="secondary" className="justify-start gap-2">
              <MessageSquare className="h-5 w-5" />
              Widget Builder
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <BarChart3 className="h-5 w-5" />
              Analytics
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Widget Builder</h2>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Widget
            </Button>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Widget Builder</CardTitle>
                <CardDescription>
                  Customize your AI chat widget appearance and behavior
                </CardDescription>
              </CardHeader>
              <CardContent>
                <WidgetBuilder />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
