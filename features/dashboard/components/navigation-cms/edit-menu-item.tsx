"use client";

import { toast } from "sonner";
import { Link2, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
import { LucideIconPicker } from "@/features/dashboard/components/navigation-cms/shared/lucide-icon-picker";
import { SubItemsList } from "@/features/dashboard/components/navigation-cms/shared/sub-items-list";
import type { MenuItem } from "@/features/dashboard/data/navigation-cms";
import { cn } from "@/lib/utils";

export function EditMenuItem({
  item,
  onChange,
  onDelete,
  onSelectChild,
  onReorderChildren,
  onAddChild,
  onSaveDraft,
  onUpdate,
}: {
  item: MenuItem | null;
  onChange: (patch: Partial<MenuItem>) => void;
  onDelete: () => void;
  onSelectChild: (id: string) => void;
  onReorderChildren: (children: MenuItem[]) => void;
  onAddChild: () => void;
  onSaveDraft: () => void;
  onUpdate: () => void;
}) {
  if (!item) {
    return (
      <Card className="border-border/80 shadow-sm">
        <CardContent className="flex min-h-64 items-center justify-center p-8 text-center text-sm text-muted-foreground">
          Select a menu item to edit its details.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/80 shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle className="text-base font-bold">Edit Menu Item</CardTitle>
            <Badge
              variant="secondary"
              className={cn(
                "border-0",
                item.status === "Published"
                  ? "bg-emerald-500/15 text-emerald-700"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {item.status}
            </Badge>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-destructive hover:text-destructive"
          onClick={() => {
            onDelete();
            toast.success("Menu item deleted");
          }}
        >
          <Trash2 data-icon="inline-start" />
          Delete
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general">
          <TabsList className="mb-4 w-full justify-start">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="visibility">Visibility</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <div className="space-y-1.5">
              <Label>Label</Label>
              <Input
                value={item.label}
                onChange={(e) => onChange({ label: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>URL</Label>
              <div className="relative">
                <Link2 className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="pl-9"
                  value={item.href}
                  onChange={(e) => onChange({ href: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Icon (Optional)</Label>
              <LucideIconPicker
                value={item.icon}
                onChange={(icon) => onChange({ icon })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Open in</Label>
              <Select
                value={item.openIn}
                onValueChange={(v) => {
                  if (v === "same" || v === "new") onChange({ openIn: v });
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="same">Same Tab</SelectItem>
                  <SelectItem value="new">New Tab</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <SubItemsList
              items={item.children ?? []}
              onReorder={onReorderChildren}
              onSelect={onSelectChild}
              onAdd={onAddChild}
            />
          </TabsContent>

          <TabsContent value="visibility" className="space-y-4">
            <label className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={item.visible}
                onCheckedChange={(checked) =>
                  onChange({ visible: checked === true })
                }
              />
              Visible in menu
            </label>
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select
                value={item.status}
                onValueChange={(v) => {
                  if (v === "Published" || v === "Draft") {
                    onChange({ status: v });
                  }
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Published">Published</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <div className="space-y-1.5">
              <Label>CSS Class</Label>
              <Input
                value={item.cssClass ?? ""}
                onChange={(e) => onChange({ cssClass: e.target.value })}
                placeholder="nav-item-services"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Rel attribute</Label>
              <Input
                value={item.rel ?? ""}
                onChange={(e) => onChange({ rel: e.target.value })}
                placeholder="noopener noreferrer"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Textarea
                rows={3}
                value={item.description ?? ""}
                onChange={(e) => onChange({ description: e.target.value })}
                placeholder="Optional helper text for mega menus"
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="justify-end gap-2 border-t pt-4">
        <Button variant="ghost" onClick={onSaveDraft}>
          Save as Draft
        </Button>
        <Button onClick={onUpdate}>Update Menu Item</Button>
      </CardFooter>
    </Card>
  );
}
