"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { SiteLogo } from "@/components/shared/site-logo";
import { TopBar } from "@/features/layout/components/top-bar";
import { MobileNav } from "@/features/layout/components/mobile-nav";
import { OverflowNav } from "@/features/layout/components/overflow-nav";
import { mainNav } from "@/features/layout/data/nav";
import { useScrolled } from "@/hooks/use-scrolled";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const scrolled = useScrolled();

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <TopBar />
      <div
        className={cn(
          "border-b bg-background/95 backdrop-blur transition-shadow supports-backdrop-filter:bg-background/90",
          scrolled && "shadow-md"
        )}
      >
        <Container className="flex h-16 items-center gap-3">
          <SiteLogo />
          <OverflowNav items={mainNav} />
          <div className="ml-auto flex shrink-0 items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="hidden sm:inline-flex"
              render={<a href={SITE.phoneHref} />}
              aria-label="Call us"
            >
              <Phone className="size-4" />
            </Button>
            <a
              href={SITE.phoneHref}
              className="hidden items-center gap-1.5 text-sm font-medium text-primary xl:inline-flex"
            >
              {SITE.phone}
            </a>
            <Button
              variant="outline"
              className="hidden border-primary text-primary hover:bg-primary/5 md:inline-flex"
              render={<Link href="/contact" />}
            >
              Contact Us
            </Button>
            <Button
              className="hidden sm:inline-flex"
              render={<Link href="/book-consultation" />}
            >
              Book Free Consultation
            </Button>
            <MobileNav />
          </div>
        </Container>
      </div>
    </header>
  );
}
