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
import { FilterPills } from "@/components/shared/filter-pills";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { FadeIn } from "@/components/shared/motion/fade-in";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/shared/motion/stagger-children";
import { BlogSidebar } from "@/features/blog/components/blog-sidebar";
import { NewsletterBanner } from "@/features/blog/components/newsletter-banner";
import {
  blogCategories,
  blogHero,
  blogPosts,
} from "@/features/blog/data/blog";

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
      selectCategory !== "all"
        ? selectCategory
        : category === "All Topics"
          ? "all"
          : category;

    return blogPosts.filter((post) => {
      const matchesCategory =
        activeCategory === "all" || post.category === activeCategory;
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
  const secondary = filtered
    .filter((post) => post.id !== featured?.id)
    .slice(0, 3);
  const latest = filtered
    .filter(
      (post) =>
        post.id !== featured?.id && !secondary.some((s) => s.id === post.id)
    )
    .slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-surface via-background to-primary/5 py-12 md:py-16">
        <Container>
          <PageBreadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Blog" }]}
          />
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <FadeIn>
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                {blogHero.title}{" "}
                <span className="text-primary">{blogHero.highlight}</span>
              </h1>
              <p className="mt-4 max-w-xl text-muted-foreground md:text-lg">
                {blogHero.description}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search articles..."
                    className="h-11 pl-9"
                  />
                </div>
                <Select
                  value={selectCategory}
                  onValueChange={(value) => {
                    if (!value) return;
                    setSelectCategory(value);
                    setCategory(
                      value === "all" ? "All Topics" : value
                    );
                  }}
                >
                  <SelectTrigger className="h-11 min-w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Topics</SelectItem>
                    {blogCategories
                      .filter((item) => item !== "All Topics")
                      .map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border bg-white shadow-xl shadow-primary/10">
                <ImagePlaceholder
                  label="[Blog Cover]"
                  className="absolute inset-0 rounded-xl"
                />
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="border-b py-6">
        <Container>
          <FilterPills
            items={[...blogCategories]}
            value={category}
            onChange={(value) => {
              setCategory(value);
              setSelectCategory(
                value === "All Topics" ? "all" : value
              );
            }}
          />
        </Container>
      </section>

      <section className="py-12 md:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
            <div className="space-y-10">
              {featured ? (
                <FadeIn>
                  <Card className="overflow-hidden border shadow-sm">
                    <div className="relative aspect-[21/9] bg-muted md:aspect-[21/8]">
                      <ImagePlaceholder
                        label="[Blog Cover]"
                        className="absolute inset-0 rounded-xl"
                      />
                      <Badge className="absolute left-4 top-4">
                        Featured
                      </Badge>
                    </div>
                    <CardContent className="space-y-3 p-6">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="secondary">{featured.category}</Badge>
                        <span>{featured.date}</span>
                        <span>·</span>
                        <span>{featured.readTime} read</span>
                      </div>
                      <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                        {featured.title}
                      </h2>
                      <p className="max-w-3xl text-muted-foreground">
                        {featured.excerpt}
                      </p>
                      <div className="flex items-center justify-between gap-3 pt-2">
                        <div className="flex items-center gap-2">
                          <Avatar size="sm">
                            <AvatarFallback>
                              {authorInitials(featured.author)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">
                            {featured.author}
                          </span>
                        </div>
                        <Link
                          href={featured.href}
                          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                        >
                          Read article <ArrowRight className="size-3.5" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>
              ) : (
                <p className="text-muted-foreground">
                  No articles match your filters.
                </p>
              )}

              {secondary.length > 0 ? (
                <StaggerChildren className="space-y-4">
                  {secondary.map((post) => (
                    <StaggerItem key={post.id}>
                      <Card className="overflow-hidden border shadow-sm">
                        <div className="grid sm:grid-cols-[200px_1fr]">
                          <div className="relative min-h-36 bg-muted">
                            <ImagePlaceholder
                              label="[Blog Cover]"
                              className="absolute inset-0 rounded-xl"
                            />
                          </div>
                          <CardContent className="flex flex-col justify-center gap-2 p-5">
                            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                              <Badge variant="outline">{post.category}</Badge>
                              <span>{post.date}</span>
                              <span>·</span>
                              <span>{post.readTime}</span>
                            </div>
                            <h3 className="text-lg font-semibold leading-snug">
                              {post.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {post.excerpt}
                            </p>
                            <Link
                              href={post.href}
                              className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                            >
                              Read more <ArrowRight className="size-3.5" />
                            </Link>
                          </CardContent>
                        </div>
                      </Card>
                    </StaggerItem>
                  ))}
                </StaggerChildren>
              ) : null}
            </div>

            <BlogSidebar />
          </div>
        </Container>
      </section>

      <NewsletterBanner />

      <section className="pb-16 pt-4 md:pb-20">
        <Container>
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Latest Articles
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Fresh perspectives from our product and engineering teams.
              </p>
            </div>
            <Button
              variant="outline"
              className="hidden sm:inline-flex"
              render={<Link href="/blog" />}
            >
              View All
              <ArrowRight data-icon="inline-end" />
            </Button>
          </div>

          <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latest.map((post) => (
              <StaggerItem key={post.id}>
                <Card className="h-full overflow-hidden border shadow-sm">
                  <div className="relative aspect-[16/10] bg-muted">
                    <ImagePlaceholder
                      label="[Blog Cover]"
                      className="absolute inset-0 rounded-xl"
                    />
                  </div>
                  <CardContent className="flex h-full flex-col gap-2 p-5">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="secondary">{post.category}</Badge>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-lg font-semibold leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <Link
                      href={post.href}
                      className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium text-primary hover:underline"
                    >
                      Read article <ArrowRight className="size-3.5" />
                    </Link>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerChildren>

          <div className="mt-8 flex justify-center sm:hidden">
            <Button variant="outline" render={<Link href="/blog" />}>
              View All
              <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
