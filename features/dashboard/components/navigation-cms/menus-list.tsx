"use client";

import { createElement, useState } from "react";
import { Reorder, useDragControls } from "motion/react";
import { toast } from "sonner";
import {
  GripVertical,
  Menu,
  MoreHorizontal,
  Plus,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { NavMenu } from "@/features/dashboard/data/navigation-cms";
import { cn } from "@/lib/utils";

const reorderSpring = {
  type: "spring" as const,
  stiffness: 420,
  damping: 32,
  mass: 0.65,
};

function menuIcon(id: string): LucideIcon {
  if (id === "mobile") return Smartphone;
  return Menu;
}

function MenuCard({
  menu,
  isActive,
  onSelect,
}: {
  menu: NavMenu;
  isActive: boolean;
  onSelect: () => void;
}) {
  const controls = useDragControls();
  const [dragging, setDragging] = useState(false);

  return (
    <Reorder.Item
      value={menu}
      as="li"
      layout
      initial={false}
      dragListener={false}
      dragControls={controls}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      transition={reorderSpring}
      whileDrag={{
        scale: 1.02,
        boxShadow: "0 12px 28px -8px rgba(15, 23, 42, 0.16)",
      }}
      className={cn(
        "list-none rounded-xl border bg-card p-3",
        dragging && "z-10 border-primary/50",
        !dragging && isActive && "border-primary/40 bg-primary/5",
        !dragging && !isActive && "hover:bg-muted/30"
      )}
    >
      <div className="flex items-start gap-2">
        <button
          type="button"
          aria-label={`Drag ${menu.title}`}
          className="mt-0.5 flex size-7 shrink-0 touch-none cursor-grab items-center justify-center rounded-md text-muted-foreground hover:bg-muted active:cursor-grabbing"
          onPointerDown={(e) => {
            e.preventDefault();
            controls.start(e);
          }}
        >
          <GripVertical className="size-3.5" />
        </button>
        <button
          type="button"
          onClick={onSelect}
          className="flex min-w-0 flex-1 gap-2.5 text-left"
        >
          <span
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground",
              isActive && "bg-primary/10 text-primary"
            )}
          >
            {createElement(menuIcon(menu.id), { className: "size-4" })}
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-bold">{menu.title}</span>
              <Badge
                variant="secondary"
                className={cn(
                  "h-5 border-0 px-1.5 text-[10px]",
                  menu.status === "Published"
                    ? "bg-emerald-500/15 text-emerald-700"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {menu.status}
              </Badge>
            </span>
            <span className="mt-0.5 block text-xs text-muted-foreground">
              {menu.description}
            </span>
          </span>
        </button>
        <button
          type="button"
          className="rounded-md p-1 text-muted-foreground hover:bg-muted"
          onClick={() => toast.message("Menu actions coming soon")}
          aria-label="Menu options"
        >
          <MoreHorizontal className="size-4" />
        </button>
      </div>
    </Reorder.Item>
  );
}

export function MenusList({
  menus,
  activeMenuId,
  onReorder,
  onSelect,
  onCreate,
}: {
  menus: NavMenu[];
  activeMenuId: string;
  onReorder: (next: NavMenu[]) => void;
  onSelect: (id: string) => void;
  onCreate: () => void;
}) {
  return (
    <Card className="border-border/80 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-bold">Menus</CardTitle>
        <p className="text-xs text-muted-foreground">
          Create and manage your navigation menus.
        </p>
      </CardHeader>
      <CardContent>
        <Reorder.Group
          as="ul"
          axis="y"
          values={menus}
          onReorder={onReorder}
          className="flex flex-col gap-2"
        >
          {menus.map((menu) => (
            <MenuCard
              key={menu.id}
              menu={menu}
              isActive={menu.id === activeMenuId}
              onSelect={() => onSelect(menu.id)}
            />
          ))}
        </Reorder.Group>
        <Button
          variant="outline"
          className="mt-3 h-10 w-full border-dashed border-primary/40 text-primary"
          onClick={onCreate}
        >
          <Plus data-icon="inline-start" />
          Create New Menu
        </Button>
      </CardContent>
    </Card>
  );
}
