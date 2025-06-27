"use client";

import React from "react";
import { Settings } from "lucide-react";
import EnterpriseSettings from "@/components/dashboard/EnterpriseSettings";
import { PageHeader } from "@/components/dashboard/page-header";

export default function EnterpriseSettingsPage() {
  return (
    <div className="space-y-6 bg-background p-6 w-full h-full">
      <PageHeader
        title="Enterprise Settings"
        description="Manage team access, branding, and integrations"
        showButton={false}
      />

      <EnterpriseSettings />
    </div>
  );
}
