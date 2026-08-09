"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Container } from "@/components/shared/container";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeIn } from "@/components/shared/motion/fade-in";
import { StaggerChildren, StaggerItem } from "@/components/shared/motion/stagger-children";
import { BlogSidebar } from "@/features/blog/components/blog-sidebar";
import { blogCategories, blogHero, blogPosts, latestSection } from "@/features/blog/data/blog";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

function authorInitials(name?: string) {
  if (!name) return "ZT";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function BlogListing() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All Topics");
  const [selectCategory, setSelectCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    const activeCategory =
      selectCategory !== "all" ? selectCategory : category === "All Topics" ? "all" : category;

    return blogPosts.filter((post) => {
      const matchesCategory = activeCategory === "all" || post.category === activeCategory;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [category, query, selectCategory]);

  const featured = filtered.find((post) => post.featured) ?? filtered[0];
  const secondary = filtered.filter((post) => post.id !== featured?.id).slice(0, 3);
  const latest = filtered
    .filter((post) => post.id !== featured?.id && !secondary.some((s) => s.id === post.id))
    .slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-linear-to-br from-surface via-background to-primary/5 py-12 md:py-16">
        <Container>
          <PageBreadcrumb items={[...blogHero.breadcrumb]} />
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <FadeIn>
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                {blogHero.title} <span className="text-primary">{blogHero.highlight}</span>
              </h1>
              <p className="mt-4 max-w-xl text-muted-foreground md:text-lg">
                {blogHero.description}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={blogHero.searchPlaceholder}
                    className="h-11 pl-9"
                    aria-label="Search articles"
                  />
                </div>
                <Select
                  value={selectCategory}
                  onValueChange={(value) => {
                    if (!value) return;
                    setSelectCategory(value);
                    setCategory(value === "all" ? "All Topics" : value);
                  }}
                >
                  <SelectTrigger className="h-11 min-w-48">
                    <SelectValue placeholder={blogHero.categoryPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {blogCategories
                      .filter((item) => item.label !== "All Topics")
                      .map((item) => (
                        <SelectItem key={item.label} value={item.label}>
                          {item.label}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <ImagePlaceholder
                label={blogHero.illustrationLabel}
                className="aspect-4/3 min-h-70 rounded-2xl shadow-xl shadow-primary/10"
              />
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="border-b py-5 md:py-6">
        <Container>
          <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden">
            {blogCategories.map((item) => {
              const Icon = getIcon(item.icon);
              const active = category === item.label;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    setCategory(item.label);
                    setSelectCategory(item.label === "All Topics" ? "all" : item.label);
                  }}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                    active
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border bg-background text-foreground hover:border-primary/40 hover:bg-primary/5",
                  )}
                >
                  <Icon className="size-4 stroke-[1.5]" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-12 md:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
            <div className="space-y-12">
              <div className="space-y-4">
                {featured ? (
                  <FadeIn>
                    <Card className="overflow-hidden border shadow-sm p-0">
                      <div className="grid md:grid-cols-[1.05fr_1fr]">
                        <div className="relative min-h-56 bg-muted md:min-h-full">
                          <ImagePlaceholder
                            label="[Blog Cover]"
                            className="absolute inset-0 rounded-none border-0 md:rounded-r-none"
                          />
                          <Badge className="absolute top-4 left-4">Featured</Badge>
                        </div>
                        <CardContent className="flex flex-col justify-center gap-3 p-6 md:p-7">
                          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                            <Badge variant="secondary">{featured.category}</Badge>
                            <span>{featured.date}</span>
                            <span>·</span>
                            <span>{featured.readTime} read</span>
                          </div>
                          <h2 className="text-xl font-bold tracking-tight md:text-2xl">
                            {featured.title}
                          </h2>
                          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                            {featured.excerpt}
                          </p>
                          <div className="flex items-center justify-between gap-3 pt-1">
                            <div className="flex items-center gap-2">
                              <Avatar size="sm">
                                <AvatarFallback>{authorInitials(featured.author)}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">{featured.author}</span>
                            </div>
                            <Link
                              href={featured.href}
                              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                            >
                              Read More <ArrowRight className="size-3.5" />
                            </Link>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </FadeIn>
                ) : (
                  <p className="text-muted-foreground">No articles match your filters.</p>
                )}

                {secondary.length > 0 ? (
                  <StaggerChildren className="space-y-3">
                    {secondary.map((post) => (
                      <StaggerItem key={post.id} hoverLift={false}>
                        <Card className="overflow-hidden border shadow-sm transition-shadow hover:shadow-md p-0">
                          <div className="grid sm:grid-cols-[160px_1fr]">
                            <div className="relative min-h-28 bg-muted sm:min-h-full">
                              <ImagePlaceholder
                                label="[Blog Cover]"
                                className="absolute inset-0 rounded-none border-0"
                              />
                            </div>
                            <CardContent className="flex flex-col justify-center gap-1.5 p-4 sm:p-5">
                              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                                <Badge variant="outline">{post.category}</Badge>
                                <span>{post.date}</span>
                                <span>·</span>
                                <span>{post.readTime}</span>
                              </div>
                              <h3 className="text-base font-semibold leading-snug sm:text-lg">
                                {post.title}
                              </h3>
                              <p className="line-clamp-2 text-sm text-muted-foreground">
                                {post.excerpt}
                              </p>
                              <Link
                                href={post.href}
                                className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                              >
                                Read More <ArrowRight className="size-3.5" />
                              </Link>
                            </CardContent>
                          </div>
                        </Card>
                      </StaggerItem>
                    ))}
                  </StaggerChildren>
                ) : null}
              </div>

              <div>
                <SectionHeader
                  title={latestSection.title}
                  description={latestSection.description}
                  accent
                />
                <StaggerChildren className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {latest.map((post) => (
                    <StaggerItem key={post.id}>
                      <Card className="h-full overflow-hidden border shadow-sm transition-shadow hover:shadow-md p-0">
                        <div className="relative aspect-16/10 bg-muted">
                          <ImagePlaceholder
                            label="[Blog Cover]"
                            className="absolute inset-0 rounded-none border-0"
                          />
                        </div>
                        <CardContent className="flex h-full flex-col gap-2 p-5">
                          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                            <Badge variant="secondary">{post.category}</Badge>
                            <span>{post.readTime}</span>
                          </div>
                          <h3 className="text-base font-semibold leading-snug">{post.title}</h3>
                          <p className="line-clamp-2 text-sm text-muted-foreground">
                            {post.excerpt}
                          </p>
                          <Link
                            href={post.href}
                            className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium text-primary hover:underline"
                          >
                            Read More <ArrowRight className="size-3.5" />
                          </Link>
                        </CardContent>
                      </Card>
                    </StaggerItem>
                  ))}
                </StaggerChildren>

                <div className="mt-8 flex justify-center">
                  <Button
                    variant="outline"
                    className="h-11 px-6"
                    render={<Link href={latestSection.actionHref} />}
                  >
                    {latestSection.actionLabel}
                    <ArrowRight data-icon="inline-end" />
                  </Button>
                </div>
              </div>
            </div>

            <BlogSidebar />
          </div>
        </Container>
      </section>
    </>
  );
}
