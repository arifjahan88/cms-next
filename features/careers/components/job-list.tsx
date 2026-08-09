"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import {
  jobDepartments,
  jobLocations,
  jobs,
} from "@/features/careers/data/careers";

export function JobList() {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState<string>("All Departments");
  const [location, setLocation] = useState<string>("All Locations");
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter((job) => {
      const matchesQuery =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.description.toLowerCase().includes(q) ||
        job.department.toLowerCase().includes(q);
      const matchesDept =
        department === "All Departments" || job.department === department;
      const matchesLoc =
        location === "All Locations" || job.location === location;
      return matchesQuery && matchesDept && matchesLoc;
    });
  }, [query, department, location]);

  const visible = showAll ? filtered : filtered.slice(0, 5);

  return (
    <section id="open-positions" className="scroll-mt-28 py-16 md:py-20">
      <Container>
        <SectionHeader
          eyebrow="Open Positions"
          title="Find a role that fits"
          description="Search by keyword or filter by department and location."
        />

        <div className="mb-8 grid gap-3 md:grid-cols-[1fr_220px_220px]">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search roles..."
              className="h-10 pl-9"
              aria-label="Search open positions"
            />
          </div>
          <Select value={department} onValueChange={(v) => setDepartment(v ?? "All Departments")}>
            <SelectTrigger className="h-10 w-full">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              {jobDepartments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={location} onValueChange={(v) => setLocation(v ?? "All Locations")}>
            <SelectTrigger className="h-10 w-full">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              {jobLocations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          {visible.length === 0 ? (
            <div className="rounded-xl border border-dashed bg-muted/30 px-6 py-12 text-center">
              <p className="font-medium">No roles match your filters</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try another keyword or send us your CV below.
              </p>
            </div>
          ) : (
            visible.map((job) => (
              <article
                key={job.id}
                className="rounded-xl border bg-background p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold">{job.title}</h3>
                      <Badge variant="secondary">{job.type}</Badge>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {job.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="font-medium text-foreground/80">
                        {job.department}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="size-3.5" />
                        {job.location}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="shrink-0 border-primary text-primary hover:bg-primary/5"
                    render={<Link href={job.href} />}
                  >
                    Apply Now
                    <ArrowRight data-icon="inline-end" />
                  </Button>
                </div>
              </article>
            ))
          )}
        </div>

        {filtered.length > 5 ? (
          <div className="mt-8 flex justify-center">
            <Button
              type="button"
              variant="outline"
              className="h-10 px-5"
              onClick={() => setShowAll((v) => !v)}
            >
              {showAll ? "Show Less" : `View All (${filtered.length})`}
            </Button>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
