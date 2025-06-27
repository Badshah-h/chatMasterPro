"use client";

import React from "react";
import { Database } from "lucide-react";
import KnowledgeBaseIntegration from "@/components/dashboard/KnowledgeBaseIntegration";
import { PageHeader } from "@/components/dashboard/page-header";

export default function KnowledgeBasePage() {
  return (
    <div className="space-y-6 bg-background p-6 w-full h-full">
      <PageHeader
        title="Knowledge Base"
        description="Upload documents and configure web scraping to train your AI"
        showButton={false}
      />

      <KnowledgeBaseIntegration />
    </div>
  );
}
