"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  PlusCircle,
  TrendingUp,
  TrendingDown,
  Users,
  MessageSquare,
  Clock,
  Activity,
  CheckCircle,
  AlertCircle,
  Zap,
} from "lucide-react";

const StatCard = ({
  title,
  value,
  change,
  icon: Icon,
  trend,
  description,
}: {
  title: string;
  value: string | number;
  change: number;
  icon: React.ElementType;
  trend: "up" | "down";
  description: string;
}) => (
  <Card className="relative overflow-hidden bg-gradient-to-br from-background to-muted/20 border-border/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">
        {title}
      </CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <div className="flex items-center text-xs text-muted-foreground mt-1">
        {trend === "up" ? (
          <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
        ) : (
          <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
        )}
        <span className={trend === "up" ? "text-green-500" : "text-red-500"}>
          {change > 0 ? "+" : ""}
          {change}%
        </span>
        <span className="ml-1">{description}</span>
      </div>
    </CardContent>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
  </Card>
);

export default function DashboardPage() {
  const stats = {
    widgets: { total: 12, change: 16.7 },
    conversations: { total: 1234, change: 15.2 },
    responseTime: { total: "2.3s", change: -12.5 },
    satisfaction: { total: "94.2%", change: 3.1 },
  };

  const recentActivity = [
    {
      id: 1,
      type: "success",
      message: 'Widget "Support Chat" is online',
      time: "2 minutes ago",
      icon: CheckCircle,
      color: "bg-green-500",
    },
    {
      id: 2,
      type: "info",
      message: "New conversation started",
      time: "5 minutes ago",
      icon: MessageSquare,
      color: "bg-blue-500",
    },
    {
      id: 3,
      type: "warning",
      message: "Widget settings updated",
      time: "1 hour ago",
      icon: AlertCircle,
      color: "bg-yellow-500",
    },
    {
      id: 4,
      type: "success",
      message: "AI model response improved",
      time: "2 hours ago",
      icon: Zap,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Dashboard Overview
          </h2>
          <p className="text-muted-foreground mt-2">
            Monitor your AI chat widgets performance and analytics
          </p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Widget
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Widgets"
          value={stats.widgets.total}
          change={stats.widgets.change}
          icon={Users}
          trend="up"
          description="from last month"
        />
        <StatCard
          title="Conversations"
          value={stats.conversations.total.toLocaleString()}
          change={stats.conversations.change}
          icon={MessageSquare}
          trend="up"
          description="from last month"
        />
        <StatCard
          title="Response Time"
          value={stats.responseTime.total}
          change={stats.responseTime.change}
          icon={Clock}
          trend="down"
          description="improvement"
        />
        <StatCard
          title="Satisfaction"
          value={stats.satisfaction.total}
          change={stats.satisfaction.change}
          icon={Activity}
          trend="up"
          description="user rating"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 bg-gradient-to-br from-background to-muted/10 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest updates from your chat widgets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const IconComponent = activity.icon;
                return (
                  <div
                    key={activity.id}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/20 transition-colors"
                  >
                    <div
                      className={`w-8 h-8 rounded-full ${activity.color} flex items-center justify-center`}
                    >
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {activity.type}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="bg-gradient-to-br from-background to-muted/10 border-border/50">
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Uptime</span>
                <span className="text-sm text-muted-foreground">99.9%</span>
              </div>
              <Progress value={99.9} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Response Rate</span>
                <span className="text-sm text-muted-foreground">87.3%</span>
              </div>
              <Progress value={87.3} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">User Engagement</span>
                <span className="text-sm text-muted-foreground">76.8%</span>
              </div>
              <Progress value={76.8} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">AI Accuracy</span>
                <span className="text-sm text-muted-foreground">92.1%</span>
              </div>
              <Progress value={92.1} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-br from-background to-muted/10 border-border/50">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks and shortcuts for managing your widgets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <PlusCircle className="h-6 w-6" />
              <span>Create Widget</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Users className="h-6 w-6" />
              <span>Manage Users</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Activity className="h-6 w-6" />
              <span>View Analytics</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <MessageSquare className="h-6 w-6" />
              <span>Chat History</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
