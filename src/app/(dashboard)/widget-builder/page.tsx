import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import WidgetBuilder from "@/components/dashboard/WidgetBuilder";

export default function WidgetBuilderPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Widget Builder</h2>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Widget
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Widget Builder</CardTitle>
          <CardDescription>
            Customize your AI chat widget appearance and behavior
          </CardDescription>
        </CardHeader>
        <CardContent>
          <WidgetBuilder />
        </CardContent>
      </Card>
    </div>
  );
}
