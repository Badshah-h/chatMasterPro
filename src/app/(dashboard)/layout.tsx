import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  Settings,
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  Bot,
  Database,
  Shield,
} from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
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

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden w-64 flex-col border-r bg-background md:flex">
          <nav className="grid gap-2 p-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="justify-start gap-2 w-full">
                <LayoutDashboard className="h-5 w-5" />
                Dashboard
              </Button>
            </Link>
            <Link href="/widget-builder">
              <Button variant="ghost" className="justify-start gap-2 w-full">
                <MessageSquare className="h-5 w-5" />
                Widget Builder
              </Button>
            </Link>
            <Link href="/analytics">
              <Button variant="ghost" className="justify-start gap-2 w-full">
                <BarChart3 className="h-5 w-5" />
                Analytics
              </Button>
            </Link>
            <Link href="/ai-provider">
              <Button variant="ghost" className="justify-start gap-2 w-full">
                <Bot className="h-5 w-5" />
                AI Providers
              </Button>
            </Link>
            <Link href="/knowledge-base">
              <Button variant="ghost" className="justify-start gap-2 w-full">
                <Database className="h-5 w-5" />
                Knowledge Base
              </Button>
            </Link>
            <Link href="/enterprise-settings">
              <Button variant="ghost" className="justify-start gap-2 w-full">
                <Shield className="h-5 w-5" />
                Enterprise
              </Button>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
