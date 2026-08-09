"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Container } from "@/components/shared/container";

export function NewsletterBanner() {
  return (
    <section className="py-8">
      <Container>
        <div className="rounded-2xl bg-primary px-6 py-8 text-primary-foreground md:px-10 md:py-10">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Stay ahead of the curve
              </h2>
              <p className="mt-2 max-w-xl text-sm text-white/80">
                Monthly insights on shipping software, product strategy, and
                industry trends—straight from our delivery teams.
              </p>
            </div>
            <form
              className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("You're on the list. Welcome aboard!");
                (e.target as HTMLFormElement).reset();
              }}
            >
              <Input
                type="email"
                name="email"
                required
                placeholder="Work email"
                className="h-11 border-white/30 bg-white text-foreground"
              />
              <Button
                type="submit"
                variant="secondary"
                className="h-11 shrink-0 px-5"
              >
                Join Newsletter
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
