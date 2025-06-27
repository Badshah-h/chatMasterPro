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
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Download,
  TrendingUp,
  TrendingDown,
  MessageSquare,
  Clock,
  Users,
  Star,
  BarChart3,
  PieChart,
  LineChart,
  Calendar,
  Filter,
  RefreshCw,
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

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d");
  const [selectedMetric, setSelectedMetric] = useState("conversations");

  const stats = {
    conversations: { total: 2350, change: 20.1 },
    duration: { total: "4m 32s", change: 5.2 },
    resolution: { total: "87.3%", change: 2.1 },
    satisfaction: { total: "4.8/5", change: 4.2 },
  };

  const topTopics = [
    { name: "Product Support", percentage: 45, count: 1058, trend: "up" },
    { name: "Billing Questions", percentage: 23, count: 541, trend: "down" },
    { name: "Technical Issues", percentage: 18, count: 423, trend: "up" },
    { name: "General Inquiries", percentage: 14, count: 329, trend: "stable" },
  ];

  const performanceMetrics = [
    { name: "Response Time", value: 92, target: 95, status: "warning" },
    { name: "Resolution Rate", value: 87, target: 90, status: "warning" },
    { name: "User Satisfaction", value: 96, target: 95, status: "success" },
    { name: "AI Accuracy", value: 89, target: 85, status: "success" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-500";
      case "warning":
        return "text-yellow-500";
      case "error":
        return "text-red-500";
      default:
        return "text-muted-foreground";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-green-500" />;
      case "down":
        return <TrendingDown className="h-3 w-3 text-red-500" />;
      default:
        return <div className="h-3 w-3" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Analytics Dashboard
          </h2>
          <p className="text-muted-foreground mt-2">
            Comprehensive insights into your AI chat widget performance
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Conversations"
          value={stats.conversations.total.toLocaleString()}
          change={stats.conversations.change}
          icon={MessageSquare}
          trend="up"
          description="from last month"
        />
        <StatCard
          title="Avg Session Duration"
          value={stats.duration.total}
          change={stats.duration.change}
          icon={Clock}
          trend="up"
          description="from last month"
        />
        <StatCard
          title="Resolution Rate"
          value={stats.resolution.total}
          change={stats.resolution.change}
          icon={BarChart3}
          trend="up"
          description="from last month"
        />
        <StatCard
          title="Customer Satisfaction"
          value={stats.satisfaction.total}
          change={stats.satisfaction.change}
          icon={Star}
          trend="up"
          description="from last month"
        />
      </div>

      {/* Main Analytics Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="conversations"
            className="flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Conversations
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Conversation Volume Chart */}
            <Card className="lg:col-span-2 bg-gradient-to-br from-background to-muted/10 border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5" />
                  Conversation Volume
                </CardTitle>
                <CardDescription>
                  Daily conversation volume over the selected period
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground border rounded-lg bg-muted/20">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Interactive line chart would be rendered here</p>
                    <p className="text-sm">
                      Showing conversation trends over time
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Topics */}
            <Card className="bg-gradient-to-br from-background to-muted/10 border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Top Topics
                </CardTitle>
                <CardDescription>
                  Most frequently discussed topics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topTopics.map((topic, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">
                            {topic.name}
                          </span>
                          {getTrendIcon(topic.trend)}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {topic.count}
                          </span>
                          <Badge variant="outline">{topic.percentage}%</Badge>
                        </div>
                      </div>
                      <Progress value={topic.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="conversations" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-gradient-to-br from-background to-muted/10 border-border/50">
              <CardHeader>
                <CardTitle>Conversation Patterns</CardTitle>
                <CardDescription>
                  Peak hours and conversation distribution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] flex items-center justify-center text-muted-foreground border rounded-lg bg-muted/20">
                  <div className="text-center">
                    <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Heatmap chart would be rendered here</p>
                    <p className="text-sm">
                      Showing conversation patterns by time
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-background to-muted/10 border-border/50">
              <CardHeader>
                <CardTitle>Response Quality</CardTitle>
                <CardDescription>
                  AI response accuracy and user feedback
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Helpful Responses
                    </span>
                    <span className="text-sm text-muted-foreground">89.2%</span>
                  </div>
                  <Progress value={89.2} className="h-2" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Accurate Information
                    </span>
                    <span className="text-sm text-muted-foreground">92.7%</span>
                  </div>
                  <Progress value={92.7} className="h-2" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      User Satisfaction
                    </span>
                    <span className="text-sm text-muted-foreground">94.1%</span>
                  </div>
                  <Progress value={94.1} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card className="bg-gradient-to-br from-background to-muted/10 border-border/50">
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>
                Key performance indicators and targets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="space-y-3 p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{metric.name}</span>
                      <Badge
                        variant={
                          metric.status === "success" ? "default" : "outline"
                        }
                        className={getStatusColor(metric.status)}
                      >
                        {metric.value}%
                      </Badge>
                    </div>
                    <Progress value={metric.value} className="h-2" />
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Target: {metric.target}%</span>
                      <span
                        className={`font-medium ${
                          metric.value >= metric.target
                            ? "text-green-500"
                            : "text-yellow-500"
                        }`}
                      >
                        {metric.value >= metric.target
                          ? "On Track"
                          : "Below Target"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-gradient-to-br from-background to-muted/10 border-border/50">
              <CardHeader>
                <CardTitle>User Behavior Insights</CardTitle>
                <CardDescription>
                  Understanding user interaction patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Peak Usage Hours</h4>
                    <p className="text-sm text-muted-foreground">
                      Most conversations occur between 9 AM - 5 PM on weekdays
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Common User Journey</h4>
                    <p className="text-sm text-muted-foreground">
                      Users typically ask 2-3 questions before finding
                      resolution
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Escalation Rate</h4>
                    <p className="text-sm text-muted-foreground">
                      12.7% of conversations require human intervention
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-background to-muted/10 border-border/50">
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
                <CardDescription>
                  AI-powered suggestions for improvement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
                    <h4 className="font-medium mb-2 text-green-800 dark:text-green-200">
                      Optimize Response Time
                    </h4>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Consider adding more AI models during peak hours
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
                    <h4 className="font-medium mb-2 text-blue-800 dark:text-blue-200">
                      Expand Knowledge Base
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Add more content about billing and technical issues
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg border-purple-200 bg-purple-50 dark:bg-purple-950 dark:border-purple-800">
                    <h4 className="font-medium mb-2 text-purple-800 dark:text-purple-200">
                      Improve User Experience
                    </h4>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      Consider adding quick action buttons for common queries
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
