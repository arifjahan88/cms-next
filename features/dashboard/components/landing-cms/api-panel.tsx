"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Copy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  landingApiCurl,
  landingApiEndpoint,
  landingApiJson,
  type LandingContent,
  type SectionId,
} from "@/features/dashboard/data/landing-cms";
import { cn } from "@/lib/utils";

export function ApiPanel({
  sectionId,
  content,
}: {
  sectionId: SectionId;
  content: LandingContent;
}) {
  const [apiTab, setApiTab] = useState<"json" | "curl">("json");
  const endpoint = landingApiEndpoint(sectionId);

  return (
    <Card className="border-border/80 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-bold">
          Content API (Headless CMS)
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Fetch published section content for your frontend or integrations.
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Select defaultValue="production">
            <SelectTrigger className="h-8 w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="production">Production</SelectItem>
              <SelectItem value="staging">Staging</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="link"
            size="sm"
            className="h-8 px-0"
            onClick={() => toast.message("API docs coming soon")}
          >
            View API Docs
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-2 rounded-lg border bg-muted/30 px-3 py-2 font-mono text-xs">
          <Badge className="bg-emerald-600 font-semibold hover:bg-emerald-600">
            GET
          </Badge>
          <span className="min-w-0 flex-1 truncate">{endpoint}</span>
          <Button
            variant="outline"
            size="sm"
            className="h-7"
            onClick={() => {
              void navigator.clipboard.writeText(endpoint);
              toast.success("Copied endpoint");
            }}
          >
            <Copy data-icon="inline-start" />
            Copy
          </Button>
        </div>
        <div className="overflow-hidden rounded-xl border bg-brand-navy text-brand-navy-foreground">
          <div className="flex gap-1 border-b border-white/10 px-3 py-2">
            <button
              type="button"
              onClick={() => setApiTab("json")}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium",
                apiTab === "json" ? "bg-white/15" : "text-white/60"
              )}
            >
              JSON
            </button>
            <button
              type="button"
              onClick={() => setApiTab("curl")}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium",
                apiTab === "curl" ? "bg-white/15" : "text-white/60"
              )}
            >
              cURL
            </button>
          </div>
          <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-white/85">
            {apiTab === "json"
              ? landingApiJson(sectionId, content)
              : landingApiCurl(sectionId)}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}
