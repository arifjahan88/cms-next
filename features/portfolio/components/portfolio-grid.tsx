"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Container } from "@/components/shared/container";
import { FilterPills } from "@/components/shared/filter-pills";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/shared/motion/stagger-children";
import {
  portfolioFilters,
  portfolioProjects,
  portfolioSortOptions,
} from "@/features/portfolio/data/portfolio";

type SortValue = (typeof portfolioSortOptions)[number]["value"];

export function PortfolioGrid() {
  const [category, setCategory] = useState<string>("All Projects");
  const [sort, setSort] = useState<SortValue>("latest");

  const projects = useMemo(() => {
    const filtered =
      category === "All Projects"
        ? portfolioProjects
        : portfolioProjects.filter((item) => item.category === category);

    return [...filtered].sort((a, b) => {
      if (sort === "az") return a.title.localeCompare(b.title);
      if (sort === "oldest") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [category, sort]);

  return (
    <section className="py-12 md:py-16">
      <Container>
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <FilterPills
            items={[...portfolioFilters]}
            value={category}
            onChange={setCategory}
          />
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by</span>
            <Select
              value={sort}
              onValueChange={(value) => {
                if (value) setSort(value as SortValue);
              }}
            >
              <SelectTrigger className="min-w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {portfolioSortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <p className="mb-6 text-sm text-muted-foreground">
          Showing {projects.length} project{projects.length === 1 ? "" : "s"}
        </p>

        <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((item) => (
            <StaggerItem key={item.id}>
              <Card className="h-full overflow-hidden border shadow-sm transition-shadow hover:shadow-md">
                <div className="relative aspect-[16/10] bg-muted">
                  <ImagePlaceholder
                    label="[Project Preview Image]"
                    className="absolute inset-0 rounded-xl"
                  />
                  <Badge className="absolute left-3 top-3">{item.category}</Badge>
                </div>
                <CardContent className="flex flex-col gap-3 p-5">
                  <h3 className="text-lg font-semibold leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                  <Link
                    href={item.href}
                    className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    View Case Study <ArrowRight className="size-3.5" />
                  </Link>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
