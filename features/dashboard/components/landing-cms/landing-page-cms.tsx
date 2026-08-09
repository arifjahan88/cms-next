"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Briefcase,
  Building2,
  ChevronRight,
  Copy,
  Eye,
  FolderKanban,
  GripVertical,
  Info,
  LayoutTemplate,
  Mail,
  MessageSquare,
  Monitor,
  Plus,
  Save,
  Smartphone,
  Tablet,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import {
  heroSectionForm,
  landingApiCurl,
  landingApiSample,
  landingSections,
} from "@/features/dashboard/data/landing-cms";
import { cn } from "@/lib/utils";

const sectionIcons: Record<string, LucideIcon> = {
  layout: LayoutTemplate,
  users: Users,
  info: Info,
  briefcase: Briefcase,
  building: Building2,
  folder: FolderKanban,
  message: MessageSquare,
  mail: Mail,
};

export function LandingPageCms() {
  const [activeId, setActiveId] = useState<string>(landingSections[0].id);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">(
    "desktop"
  );
  const [apiTab, setApiTab] = useState<"json" | "curl">("json");
  const active = landingSections.find((s) => s.id === activeId) ?? landingSections[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight md:text-2xl">
              Landing Page Content Management
            </h2>
            <Badge className="border-0 bg-emerald-500/15 font-medium text-emerald-700 hover:bg-emerald-500/15">
              Published
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage sections, copy, and media for the public landing page.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-9"
            onClick={() => toast.message("Preview opening…")}
          >
            <Eye data-icon="inline-start" />
            Preview
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-9"
            onClick={() => toast.success("Draft saved")}
          >
            <Save data-icon="inline-start" />
            Save Draft
          </Button>
          <Button
            size="sm"
            className="h-9"
            onClick={() => toast.success("Published successfully")}
          >
            Publish
          </Button>
        </div>
      </div>

      {/* 3-column body */}
      <div className="grid gap-4 xl:grid-cols-[0.85fr_1.25fr_1fr]">
        {/* Sections list */}
        <Card className="border-border/80 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold">Sections</CardTitle>
            <p className="text-xs text-muted-foreground">
              Reorder sections by drag & drop
            </p>
          </CardHeader>
          <CardContent className="space-y-2">
            {landingSections.map((section) => {
              const Icon = sectionIcons[section.icon] ?? LayoutTemplate;
              const isActive = section.id === activeId;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveId(section.id)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-lg border px-2.5 py-2.5 text-left transition",
                    isActive
                      ? "border-primary/40 bg-primary/5"
                      : "hover:bg-muted/50"
                  )}
                >
                  <GripVertical className="size-4 shrink-0 text-muted-foreground" />
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                    <Icon className="size-3.5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold">
                      {section.title}
                    </span>
                    <Badge
                      variant="secondary"
                      className={cn(
                        "mt-1 h-5 border-0 px-1.5 text-[10px]",
                        section.status === "Published"
                          ? "bg-emerald-500/15 text-emerald-700"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {section.status}
                    </Badge>
                  </span>
                  <ChevronRight className="size-3.5 text-muted-foreground" />
                </button>
              );
            })}
            <Button
              variant="outline"
              className="mt-2 h-10 w-full border-dashed border-primary/40 text-primary"
              onClick={() => toast.message("Add section coming soon")}
            >
              <Plus data-icon="inline-start" />
              Add New Section
            </Button>
          </CardContent>
        </Card>

        {/* Edit panel */}
        <Card className="border-border/80 shadow-sm">
          <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-3">
            <div className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <LayoutTemplate className="size-4" />
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <CardTitle className="text-base font-bold">
                    {active.title}
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className="border-0 bg-emerald-500/15 text-emerald-700"
                  >
                    {active.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">ID: {active.id}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="content">
              <TabsList className="mb-4 w-full justify-start">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="visibility">Visibility</TabsTrigger>
              </TabsList>
              <TabsContent value="content" className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Section Title (Small)</Label>
                  <Input defaultValue={heroSectionForm.sectionTitle} />
                </div>
                <div className="space-y-1.5">
                  <Label>Main Heading</Label>
                  <Input defaultValue={heroSectionForm.mainHeading} />
                </div>
                <div className="space-y-1.5">
                  <Label>Description</Label>
                  <Textarea
                    rows={3}
                    defaultValue={heroSectionForm.description}
                  />
                </div>

                <div className="rounded-lg border p-3 space-y-3">
                  <p className="text-sm font-semibold">Primary Button</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label>Text</Label>
                      <Input defaultValue={heroSectionForm.primaryButton.text} />
                    </div>
                    <div className="space-y-1.5">
                      <Label>URL</Label>
                      <Input defaultValue={heroSectionForm.primaryButton.url} />
                    </div>
                  </div>
                  <label className="flex items-center gap-2 text-sm">
                    <Checkbox defaultChecked={false} />
                    Open in new tab
                  </label>
                </div>

                <div className="rounded-lg border p-3 space-y-3">
                  <p className="text-sm font-semibold">Secondary Button</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label>Text</Label>
                      <Input
                        defaultValue={heroSectionForm.secondaryButton.text}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label>URL</Label>
                      <Input
                        defaultValue={heroSectionForm.secondaryButton.url}
                      />
                    </div>
                  </div>
                  <label className="flex items-center gap-2 text-sm">
                    <Checkbox defaultChecked={false} />
                    Open in new tab
                  </label>
                </div>

                <div className="space-y-2">
                  <Label>Background</Label>
                  <div className="flex items-center gap-3 rounded-lg border p-3">
                    <ImagePlaceholder
                      label="[BG]"
                      className="size-14 shrink-0 rounded-md"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {heroSectionForm.background.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {heroSectionForm.background.size}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toast.message("Change media")}
                    >
                      Change
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => toast.message("Deleted (demo)")}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="seo" className="text-sm text-muted-foreground">
                SEO fields for this section will appear here.
              </TabsContent>
              <TabsContent
                value="settings"
                className="text-sm text-muted-foreground"
              >
                Section settings will appear here.
              </TabsContent>
              <TabsContent
                value="visibility"
                className="text-sm text-muted-foreground"
              >
                Visibility rules will appear here.
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Live preview */}
        <Card className="border-border/80 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-base font-bold">Live Preview</CardTitle>
            <div className="flex gap-1">
              {(
                [
                  ["desktop", Monitor],
                  ["tablet", Tablet],
                  ["mobile", Smartphone],
                ] as const
              ).map(([device, Icon]) => (
                <Button
                  key={device}
                  variant={previewDevice === device ? "default" : "ghost"}
                  size="icon-sm"
                  onClick={() => setPreviewDevice(device)}
                  aria-label={device}
                >
                  <Icon className="size-3.5" />
                </Button>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <div
              className={cn(
                "mx-auto overflow-hidden rounded-xl border bg-muted/30",
                previewDevice === "desktop" && "w-full",
                previewDevice === "tablet" && "w-[85%]",
                previewDevice === "mobile" && "w-[55%]"
              )}
            >
              <ImagePlaceholder
                label="[Landing Page Live Preview]"
                className="aspect-3/4 min-h-80 rounded-none border-0"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* API panel */}
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
            <span className="min-w-0 flex-1 truncate">
              https://api.zaimahtech.com/v1/pages/landing/{active.id}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="h-7"
              onClick={() => {
                void navigator.clipboard.writeText(
                  `https://api.zaimahtech.com/v1/pages/landing/${active.id}`
                );
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
              {apiTab === "json" ? landingApiSample : landingApiCurl}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
