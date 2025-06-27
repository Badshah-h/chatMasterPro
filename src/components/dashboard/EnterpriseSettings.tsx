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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  Activity,
  UserPlus,
  UserMinus,
  Mail,
  MoreHorizontal,
  Search,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  Crown,
  Shield,
  AlertCircle,
  CheckCircle,
  Clock,
  Ban,
  Calendar,
  BarChart3,
  PieChart,
  LineChart,
} from "lucide-react";
import { useUsers } from "@/hooks/useUsers";
import { useStats } from "@/hooks/useStats";
import { useSubscriptions } from "@/hooks/useSubscriptions";
import { useToast } from "@/components/ui/use-toast";

// Mock data for demonstration - replace with real data from hooks
const mockStats = {
  users: {
    total: 12847,
    active: 11203,
    growth_rate: 12.5,
    new_today: 47,
  },
  revenue: {
    total: 284750,
    monthly: 23729,
    growth_rate: 8.3,
    arr: 284750,
  },
  subscriptions: {
    active: 8934,
    cancelled: 1203,
    churn_rate: 2.1,
    conversion_rate: 15.7,
  },
  widgets: {
    total: 3847,
    active: 3201,
    conversations: 89234,
    avg_response_time: 1.2,
  },
};

const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@company.com",
    role: "admin" as const,
    status: "active" as const,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-15T10:30:00Z",
    last_login: "2024-01-15T10:30:00Z",
    subscription: {
      plan: "Pro",
      status: "active",
      expires_at: "2024-02-15T10:30:00Z",
    },
    stats: {
      widgets_created: 12,
      conversations: 1847,
      last_active: "2024-01-15T10:30:00Z",
    },
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@startup.io",
    role: "user" as const,
    status: "active" as const,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    created_at: "2024-01-14T15:20:00Z",
    updated_at: "2024-01-14T15:20:00Z",
    last_login: "2024-01-14T15:20:00Z",
    subscription: {
      plan: "Starter",
      status: "active",
      expires_at: "2024-02-14T15:20:00Z",
    },
    stats: {
      widgets_created: 3,
      conversations: 234,
      last_active: "2024-01-14T15:20:00Z",
    },
  },
  {
    id: "3",
    name: "Bob Wilson",
    email: "bob@enterprise.com",
    role: "user" as const,
    status: "suspended" as const,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob",
    created_at: "2024-01-10T09:15:00Z",
    updated_at: "2024-01-10T09:15:00Z",
    last_login: "2024-01-10T09:15:00Z",
    subscription: {
      plan: "Enterprise",
      status: "past_due",
      expires_at: "2024-01-20T09:15:00Z",
    },
    stats: {
      widgets_created: 25,
      conversations: 5672,
      last_active: "2024-01-10T09:15:00Z",
    },
  },
];

const EnterpriseSettings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "user",
  });

  const { toast } = useToast();

  // In a real app, these would use the actual hooks
  // const { users, loading, createUser, updateUser, deleteUser } = useUsers();
  // const { stats } = useStats();
  // const { subscriptions } = useSubscriptions();

  const stats = mockStats;
  const users = mockUsers;
  const loading = false;

  const handleCreateUser = async () => {
    try {
      // await createUser(newUser);
      toast({
        title: "Success",
        description: "User created successfully",
      });
      setIsCreateUserOpen(false);
      setNewUser({ name: "", email: "", role: "user" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create user",
        variant: "destructive",
      });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      // await deleteUser(userId);
      toast({
        title: "Success",
        description: "User deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </Badge>
        );
      case "suspended":
        return (
          <Badge className="bg-red-500/10 text-red-500 border-red-500/20">
            <Ban className="w-3 h-3 mr-1" />
            Suspended
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return (
          <Badge className="bg-purple-500/10 text-purple-500 border-purple-500/20">
            <Crown className="w-3 h-3 mr-1" />
            Admin
          </Badge>
        );
      case "editor":
        return (
          <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">
            <Edit className="w-3 h-3 mr-1" />
            Editor
          </Badge>
        );
      case "user":
        return (
          <Badge className="bg-gray-500/10 text-gray-500 border-gray-500/20">
            <Users className="w-3 h-3 mr-1" />
            User
          </Badge>
        );
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  const StatCard = ({
    title,
    value,
    change,
    icon: Icon,
    trend,
  }: {
    title: string;
    value: string | number;
    change: number;
    icon: React.ElementType;
    trend: "up" | "down";
  }) => (
    <Card className="relative overflow-hidden bg-gradient-to-br from-background to-muted/20 border-border/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-xs text-muted-foreground">
          {trend === "up" ? (
            <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
          ) : (
            <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
          )}
          <span className={trend === "up" ? "text-green-500" : "text-red-500"}>
            {change > 0 ? "+" : ""}
            {change}%
          </span>
          <span className="ml-1">from last month</span>
        </div>
      </CardContent>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
    </Card>
  );

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    const matchesStatus =
      selectedStatus === "all" || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Enterprise Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive admin control center for your SaaS platform
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={stats.users.total.toLocaleString()}
          change={stats.users.growth_rate}
          icon={Users}
          trend="up"
        />
        <StatCard
          title="Monthly Revenue"
          value={`$${stats.revenue.monthly.toLocaleString()}`}
          change={stats.revenue.growth_rate}
          icon={DollarSign}
          trend="up"
        />
        <StatCard
          title="Active Subscriptions"
          value={stats.subscriptions.active.toLocaleString()}
          change={-stats.subscriptions.churn_rate}
          icon={CreditCard}
          trend="down"
        />
        <StatCard
          title="Widget Conversations"
          value={stats.widgets.conversations.toLocaleString()}
          change={15.2}
          icon={Activity}
          trend="up"
        />
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger
            value="subscriptions"
            className="flex items-center gap-2"
          >
            <CreditCard className="h-4 w-4" />
            Subscriptions
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card className="bg-gradient-to-br from-background to-muted/10 border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    User Management
                  </CardTitle>
                  <CardDescription>
                    Manage user accounts, roles, and permissions
                  </CardDescription>
                </div>
                <Dialog
                  open={isCreateUserOpen}
                  onOpenChange={setIsCreateUserOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add User
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Create New User</DialogTitle>
                      <DialogDescription>
                        Add a new user to your platform. They will receive an
                        invitation email.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={newUser.name}
                          onChange={(e) =>
                            setNewUser((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={newUser.email}
                          onChange={(e) =>
                            setNewUser((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          placeholder="john@company.com"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="role">Role</Label>
                        <Select
                          value={newUser.role}
                          onValueChange={(value) =>
                            setNewUser((prev) => ({ ...prev, role: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="editor">Editor</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsCreateUserOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleCreateUser}>Create User</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Users Table */}
              <div className="rounded-lg border bg-card/50 backdrop-blur-sm">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/50">
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Subscription</TableHead>
                      <TableHead>Activity</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow
                        key={user.id}
                        className="border-border/50 hover:bg-muted/20"
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback>
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getRoleBadge(user.role)}</TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="font-medium">
                              {user.subscription?.plan}
                            </div>
                            <div className="text-muted-foreground">
                              {user.subscription?.status}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{user.stats?.widgets_created} widgets</div>
                            <div className="text-muted-foreground">
                              {user.stats?.conversations} conversations
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit User
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="h-4 w-4 mr-2" />
                                Send Message
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <DropdownMenuItem
                                    onSelect={(e) => e.preventDefault()}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete User
                                  </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Are you sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This will
                                      permanently delete the user account and
                                      all associated data.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDeleteUser(user.id)}
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-gradient-to-br from-background to-muted/10 border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5" />
                  User Growth
                </CardTitle>
                <CardDescription>
                  User acquisition and growth trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Interactive chart would be rendered here</p>
                    <p className="text-sm">Using Chart.js or Recharts</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-background to-muted/10 border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Revenue Breakdown
                </CardTitle>
                <CardDescription>
                  Revenue distribution by plan type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <PieChart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Revenue pie chart would be rendered here</p>
                    <p className="text-sm">Showing plan distribution</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-background to-muted/10 border-border/50">
            <CardHeader>
              <CardTitle>Key Metrics</CardTitle>
              <CardDescription>
                Important performance indicators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Conversion Rate</span>
                    <span className="text-sm text-muted-foreground">
                      {stats.subscriptions.conversion_rate}%
                    </span>
                  </div>
                  <Progress
                    value={stats.subscriptions.conversion_rate}
                    className="h-2"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Churn Rate</span>
                    <span className="text-sm text-muted-foreground">
                      {stats.subscriptions.churn_rate}%
                    </span>
                  </div>
                  <Progress
                    value={stats.subscriptions.churn_rate}
                    className="h-2"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      User Satisfaction
                    </span>
                    <span className="text-sm text-muted-foreground">94.2%</span>
                  </div>
                  <Progress value={94.2} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subscriptions Tab */}
        <TabsContent value="subscriptions" className="space-y-6">
          <Card className="bg-gradient-to-br from-background to-muted/10 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Subscription Overview
              </CardTitle>
              <CardDescription>
                Monitor subscription health and revenue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="text-center p-4 rounded-lg bg-muted/20">
                  <div className="text-2xl font-bold text-green-500">
                    {stats.subscriptions.active.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Active Subscriptions
                  </div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/20">
                  <div className="text-2xl font-bold">
                    ${stats.revenue.monthly.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Monthly Recurring Revenue
                  </div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/20">
                  <div className="text-2xl font-bold">
                    ${stats.revenue.arr.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Annual Recurring Revenue
                  </div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/20">
                  <div className="text-2xl font-bold text-red-500">
                    {stats.subscriptions.churn_rate}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Churn Rate
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card className="bg-gradient-to-br from-background to-muted/10 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                System Configuration
              </CardTitle>
              <CardDescription>
                Manage platform settings and configurations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Platform Name</Label>
                    <Input defaultValue="Multi-AI Widget Builder" />
                  </div>
                  <div className="space-y-2">
                    <Label>Support Email</Label>
                    <Input defaultValue="support@platform.com" />
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Security Settings</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div>
                        <div className="font-medium">
                          Two-Factor Authentication
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Require 2FA for admin users
                        </div>
                      </div>
                      <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                        Enabled
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div>
                        <div className="font-medium">Session Timeout</div>
                        <div className="text-sm text-muted-foreground">
                          Auto-logout inactive users
                        </div>
                      </div>
                      <Badge variant="outline">24 hours</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnterpriseSettings;
