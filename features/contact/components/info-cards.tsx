import Link from "next/link";
import { Link2 } from "lucide-react";
import { Container } from "@/components/shared/container";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/shared/motion/stagger-children";
import { contactChannels, followUs } from "@/features/contact/data/contact";
import { SITE } from "@/lib/constants";
import { getIcon } from "@/lib/icons";

const socialLinks = [
  { href: SITE.social.linkedin, label: "LinkedIn", short: "in" },
  { href: SITE.social.facebook, label: "Facebook", short: "f" },
  { href: SITE.social.twitter, label: "X", short: "𝕏" },
  { href: SITE.social.youtube, label: "YouTube", short: "▶" },
];

export function InfoCards() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <StaggerChildren className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {contactChannels.map((channel) => {
            const Icon = getIcon(channel.icon);
            return (
              <StaggerItem key={channel.id}>
                <a
                  href={channel.href}
                  className="flex h-full flex-col rounded-xl border bg-background p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className="mb-3 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="font-semibold">{channel.title}</h3>
                  <p className="mt-1 text-sm font-medium text-foreground/90">
                    {channel.description}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {channel.detail}
                  </p>
                </a>
              </StaggerItem>
            );
          })}
          <StaggerItem>
            <div className="flex h-full flex-col rounded-xl border bg-background p-5 shadow-sm">
              <span className="mb-3 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Link2 className="size-5" />
              </span>
              <h3 className="font-semibold">{followUs.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {followUs.detail}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {socialLinks.map(({ href, label, short }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="flex size-9 items-center justify-center rounded-lg border text-xs font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    {short}
                  </Link>
                ))}
              </div>
            </div>
          </StaggerItem>
        </StaggerChildren>
      </Container>
    </section>
  );
}
