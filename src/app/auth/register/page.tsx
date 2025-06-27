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
  User,
  Building,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { ThemeSwitcher } from "@/components/theme-switcher";

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<RegisterFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!data.agreeToTerms) {
      setError("Please agree to the terms and conditions");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock success for demo
      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/auth/email-confirmation";
      }, 1000);
    } catch (err) {
      setError("Registration failed. Please try again.");
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
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-500 to-blue-600 p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-32 -translate-x-32" />

          <div className="relative z-10 flex flex-col justify-center max-w-md">
            <div className="space-y-6">
              <Badge className="bg-white/20 text-white border-white/30 w-fit">
                Join Thousands of Users
              </Badge>
              <h2 className="text-4xl font-bold leading-tight">
                Start Building
                <br />
                Amazing AI Experiences
              </h2>
              <p className="text-xl opacity-90">
                Create your account and get access to powerful AI chat widgets
                in minutes.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Register Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold">Create your account</h1>
              <p className="text-muted-foreground">
                Get started with your free trial today
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
                  Account created! Please check your email.
                </span>
              </div>
            )}

            <Card className="border-0 shadow-lg">
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
                <CardDescription className="text-center">
                  Create your account to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
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

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with email
                    </span>
                  </div>
                </div>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        rules={{
                          required: "First name is required",
                          minLength: {
                            value: 2,
                            message: "First name must be at least 2 characters",
                          },
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="John"
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
                        name="lastName"
                        rules={{
                          required: "Last name is required",
                          minLength: {
                            value: 2,
                            message: "Last name must be at least 2 characters",
                          },
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Doe"
                                className="h-11"
                                disabled={isLoading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
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
                              placeholder="john@example.com"
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
                      name="company"
                      rules={{
                        required: "Company name is required",
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Your Company"
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
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                          message:
                            "Password must contain uppercase, lowercase, and number",
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
                                placeholder="Create a strong password"
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
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      rules={{
                        required: "Please confirm your password",
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                className="h-11 pr-10"
                                disabled={isLoading}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-0 h-11 w-11 hover:bg-transparent"
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                                disabled={isLoading}
                              >
                                {showConfirmPassword ? (
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
                    <div className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        className="mt-1 rounded border-gray-300"
                        {...form.register("agreeToTerms", {
                          required: "You must agree to the terms",
                        })}
                        disabled={isLoading}
                      />
                      <div className="text-sm leading-5">
                        <span className="text-muted-foreground">
                          I agree to the{" "}
                        </span>
                        <Link
                          href="/terms"
                          className="text-primary hover:underline"
                        >
                          Terms of Service
                        </Link>
                        <span className="text-muted-foreground"> and </span>
                        <Link
                          href="/privacy"
                          className="text-primary hover:underline"
                        >
                          Privacy Policy
                        </Link>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full h-11 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating account...
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  </form>
                </Form>

                <div className="text-center text-sm">
                  <span className="text-muted-foreground">
                    Already have an account?{" "}
                  </span>
                  <Link
                    href="/auth/login"
                    className="text-primary hover:underline font-medium"
                  >
                    Sign in
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
