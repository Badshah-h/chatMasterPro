"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Github,
  Mail,
  Sparkles,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { ThemeSwitcher } from "@/components/theme-switcher";

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock success for demo
      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    // Simulate social login
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/dashboard";
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Multi-AI Widget Builder
          </h1>
        </div>
        <ThemeSwitcher />
      </header>

      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Left Column - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-500 to-purple-600 p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-32 -translate-x-32" />

          <div className="relative z-10 flex flex-col justify-center max-w-md">
            <div className="space-y-6">
              <Badge className="bg-white/20 text-white border-white/30 w-fit">
                Welcome Back
              </Badge>
              <h2 className="text-4xl font-bold leading-tight">
                Sign in to your
                <br />
                AI Dashboard
              </h2>
              <p className="text-xl opacity-90">
                Access your widgets, analytics, and AI providers from one
                powerful dashboard.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5" />
                  <span>Manage multiple AI providers</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5" />
                  <span>Real-time analytics & insights</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5" />
                  <span>Advanced customization tools</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Login Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold">Welcome back</h1>
              <p className="text-muted-foreground">
                Sign in to your account to continue
              </p>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {success && (
              <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 dark:bg-green-950 dark:border-green-800 dark:text-green-300">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">
                  Login successful! Redirecting...
                </span>
              </div>
            )}

            <Card className="border-0 shadow-lg">
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-2xl text-center">Sign In</CardTitle>
                <CardDescription className="text-center">
                  Enter your email and password to access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="Enter your email"
                              className="h-11"
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      rules={{
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="h-11 pr-10"
                                disabled={isLoading}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-0 h-11 w-11 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                                disabled={isLoading}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex items-center justify-between">
                      <label className="flex items-center space-x-2 text-sm">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                          {...form.register("rememberMe")}
                          disabled={isLoading}
                        />
                        <span>Remember me</span>
                      </label>
                      <Link
                        href="/auth/password-reset"
                        className="text-sm text-primary hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <Button
                      type="submit"
                      className="w-full h-11 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </form>
                </Form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="h-11"
                    onClick={() => handleSocialLogin("google")}
                    disabled={isLoading}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    className="h-11"
                    onClick={() => handleSocialLogin("github")}
                    disabled={isLoading}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                </div>

                <div className="text-center text-sm">
                  <span className="text-muted-foreground">
                    Don't have an account?{" "}
                  </span>
                  <Link
                    href="/auth/register"
                    className="text-primary hover:underline font-medium"
                  >
                    Sign up
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
