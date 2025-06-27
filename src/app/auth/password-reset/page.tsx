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
  Mail,
  Sparkles,
  Loader2,
  CheckCircle,
  AlertCircle,
  KeyRound,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { ThemeSwitcher } from "@/components/theme-switcher";

interface PasswordResetFormData {
  email: string;
}

export default function PasswordResetPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<PasswordResetFormData>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: PasswordResetFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock success for demo
      setSuccess(true);
    } catch (err) {
      setError("Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6">
        <Link
          href="/auth/login"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back to Sign In</span>
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
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-500 to-red-600 p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-32 -translate-x-32" />

          <div className="relative z-10 flex flex-col justify-center max-w-md">
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <KeyRound className="h-8 w-8" />
              </div>
              <h2 className="text-4xl font-bold leading-tight">
                Reset Your
                <br />
                Password
              </h2>
              <p className="text-xl opacity-90">
                Don't worry, it happens to the best of us. We'll send you a
                secure link to reset your password.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5" />
                  <span>Secure password reset process</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5" />
                  <span>Link expires in 1 hour</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5" />
                  <span>Your data remains protected</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Reset Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold">Forgot your password?</h1>
              <p className="text-muted-foreground">
                Enter your email address and we'll send you a link to reset your
                password
              </p>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {success ? (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto">
                    <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">Check your email</h2>
                    <p className="text-muted-foreground">
                      We've sent a password reset link to your email address.
                      Please check your inbox and follow the instructions.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Didn't receive the email? Check your spam folder or try
                      again.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSuccess(false);
                        form.reset();
                      }}
                      className="w-full"
                    >
                      Try Again
                    </Button>
                    <Link href="/auth/login">
                      <Button variant="ghost" className="w-full">
                        Back to Sign In
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-0 shadow-lg">
                <CardHeader className="space-y-1 pb-4">
                  <CardTitle className="text-2xl text-center">
                    Reset Password
                  </CardTitle>
                  <CardDescription className="text-center">
                    Enter your email address to receive a reset link
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
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                  {...field}
                                  type="email"
                                  placeholder="Enter your email address"
                                  className="h-11 pl-10"
                                  disabled={isLoading}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full h-11 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending reset link...
                          </>
                        ) : (
                          "Send Reset Link"
                        )}
                      </Button>
                    </form>
                  </Form>

                  <div className="text-center text-sm space-y-2">
                    <p className="text-muted-foreground">
                      Remember your password?
                    </p>
                    <Link
                      href="/auth/login"
                      className="text-primary hover:underline font-medium"
                    >
                      Back to Sign In
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
