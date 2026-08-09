"use client";

import Link from "next/link";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import {
  aboutCard,
  exploreTopics,
  popularPosts,
} from "@/features/blog/data/blog";

export function BlogSidebar() {
  return (
    <aside className="space-y-6">
      <Card className="overflow-hidden border shadow-sm">
        <div className="relative aspect-[16/10] bg-muted">
          <ImagePlaceholder
            label="[Blog Thumbnail]"
            className="absolute inset-0 rounded-xl"
          />
        </div>
        <CardContent className="space-y-2 p-5">
          <h3 className="text-base font-semibold">{aboutCard.title}</h3>
          <p className="text-sm text-muted-foreground">
            {aboutCard.description}
          </p>
        </CardContent>
      </Card>

      <Card className="border shadow-sm">
        <CardContent className="space-y-4 p-5">
          <h3 className="text-base font-semibold">Popular Posts</h3>
          <ol className="space-y-4">
            {popularPosts.map((post, index) => (
              <li key={post.id} className="flex gap-3">
                <span className="text-lg font-bold text-primary/40">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <Link
                    href={post.href}
                    className="text-sm font-medium leading-snug hover:text-primary"
                  >
                    {post.title}
                  </Link>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {post.date} · {post.readTime}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <Card className="border shadow-sm">
        <CardContent className="space-y-3 p-5">
          <h3 className="text-base font-semibold">Subscribe</h3>
          <p className="text-sm text-muted-foreground">
            Get product and engineering insights in your inbox.
          </p>
          <form
            className="space-y-2"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Thanks for subscribing!");
              (e.target as HTMLFormElement).reset();
            }}
          >
            <Input
              type="email"
              name="email"
              required
              placeholder="you@company.com"
              className="h-10"
            />
            <Button type="submit" className="w-full">
              Subscribe
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border shadow-sm">
        <CardContent className="space-y-3 p-5">
          <h3 className="text-base font-semibold">Explore Topics</h3>
          <div className="flex flex-wrap gap-2">
            {exploreTopics.map((topic) => (
              <Badge key={topic} variant="secondary">
                {topic}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
