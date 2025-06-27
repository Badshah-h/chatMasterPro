"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import AIProviderManager from "@/components/dashboard/AIProviderManager";
import { PageHeader } from "@/components/dashboard/page-header";

export default function AIProviderPage() {
 
  return (
    <div className="space-y-6 bg-background p-6 w-full h-full">
      <PageHeader
        title="AI Providers"
        description="Manage your AI service providers and models"
        buttonText="Add Provider"
        buttonIcon={Plus}
        onButtonClick={() => { }}
      />

      <AIProviderManager />

    </div>
  );
}
