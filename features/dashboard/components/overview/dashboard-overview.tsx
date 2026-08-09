"use client";

import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  DollarSign,
  FileText,
  FolderKanban,
  Mail,
  Server,
  Ticket,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";
import { CartesianGrid, Line, LineChart, Pie, PieChart, XAxis, YAxis } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  leadsBreakdown,
  overviewStats,
  recentActivity,
  recentProjects,
  systemOverview,
  websiteMetrics,
  websiteTraffic,
} from "@/features/dashboard/data/overview";

const statIcons: Record<string, LucideIcon> = {
  users: Users,
  folder: FolderKanban,
  userPlus: UserPlus,
  ticket: Ticket,
  dollar: DollarSign,
};

const activityIcons: Record<string, LucideIcon> = {
  user: UserPlus,
  check: CheckCircle2,
  mail: Mail,
  file: FileText,
  server: Server,
};

const trafficConfig = {
  thisWeek: { label: "This Week", color: "hsl(221 83% 53%)" },
  lastWeek: { label: "Last Week", color: "hsl(214 95% 80%)" },
} satisfies ChartConfig;

const leadsConfig = {
  new: { label: "New Leads", color: "hsl(221 83% 53%)" },
  contacted: { label: "Contacted", color: "hsl(262 83% 58%)" },
  qualified: { label: "Qualified", color: "hsl(173 80% 40%)" },
  proposal: { label: "Proposal Sent", color: "hsl(32 95% 44%)" },
  won: { label: "Closed Won", color: "hsl(142 71% 45%)" },
} satisfies ChartConfig;

const totalLeads = leadsBreakdown.reduce((sum, item) => sum + item.value, 0);

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Welcome back, Admin! 👋
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Here&apos;s what&apos;s happening with your business today.
          </p>
        </div>
        <Button variant="outline" size="sm" className="h-9 gap-2 self-start">
          <Calendar className="size-4" />
          May 15 – May 21, 2024
        </Button>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {overviewStats.map((stat) => {
          const Icon = statIcons[stat.icon] ?? Users;
          return (
            <Card key={stat.label} className="border-border/80 shadow-sm p-0">
              <CardContent className="flex flex-col gap-3 p-4">
                <div className="flex items-center justify-between">
                  <span
                    className={`flex size-10 items-center justify-center rounded-full ${stat.color}`}
                  >
                    <Icon className="size-4" />
                  </span>
                  <span
                    className={`inline-flex items-center gap-0.5 text-xs font-semibold ${
                      stat.positive ? "text-emerald-600" : "text-destructive"
                    }`}
                  >
                    {stat.positive ? (
                      <ArrowUpRight className="size-3.5" />
                    ) : (
                      <ArrowDownRight className="size-3.5" />
                    )}
                    {stat.change}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">vs last 7 days</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <Card className="border-border/80 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-bold">Website Overview</CardTitle>
            <Select defaultValue="week">
              <SelectTrigger className="h-8 w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {websiteMetrics.map((m) => (
                <div key={m.label} className="rounded-lg border bg-muted/30 px-3 py-2">
                  <p className="text-[11px] text-muted-foreground">{m.label}</p>
                  <p className="text-sm font-bold">{m.value}</p>
                  <p
                    className={`text-[10px] font-medium ${
                      m.positive ? "text-emerald-600" : "text-destructive"
                    }`}
                  >
                    {m.change}
                  </p>
                </div>
              ))}
            </div>
            <ChartContainer config={trafficConfig} className="aspect-auto h-56">
              <LineChart data={websiteTraffic} accessibilityLayer>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(v) => `${v / 1000}K`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Line
                  type="monotone"
                  dataKey="thisWeek"
                  stroke="var(--color-thisWeek)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="lastWeek"
                  stroke="var(--color-lastWeek)"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-border/80 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-bold">Leads Overview</CardTitle>
            <Select defaultValue="week">
              <SelectTrigger className="h-8 w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <ChartContainer config={leadsConfig} className="mx-auto aspect-square max-h-48">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                <Pie
                  data={leadsBreakdown}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={80}
                  strokeWidth={2}
                />
                <text
                  x="50%"
                  y="48%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-foreground text-lg font-bold"
                >
                  {totalLeads.toLocaleString()}
                </text>
                <text
                  x="50%"
                  y="58%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-muted-foreground text-[10px]"
                >
                  Total Leads
                </text>
              </PieChart>
            </ChartContainer>
            <ul className="mt-2 space-y-2">
              {leadsBreakdown.map((item) => (
                <li key={item.name} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full" style={{ background: item.fill }} />
                    {item.name}
                  </span>
                  <span className="font-medium tabular-nums">
                    {item.value}{" "}
                    <span className="text-muted-foreground">
                      ({Math.round((item.value / totalLeads) * 100)}%)
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="/dashboard/coming-soon?section=Leads"
              className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline"
            >
              View all leads →
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Bottom row */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="border-border/80 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-base font-bold">Recent Projects</CardTitle>
            <Link
              href="/dashboard/coming-soon?section=Projects"
              className="text-xs font-semibold text-primary hover:underline"
            >
              View All
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                className="flex items-center gap-3 rounded-lg border px-3 py-2.5"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FolderKanban className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{project.title}</p>
                  <p className="text-xs text-muted-foreground">{project.category}</p>
                </div>
                <Badge
                  variant="secondary"
                  className={`border-0 font-medium ${project.statusColor}`}
                >
                  {project.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/80 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-base font-bold">Recent Activity</CardTitle>
            <Link
              href="/dashboard/coming-soon?section=Activity"
              className="text-xs font-semibold text-primary hover:underline"
            >
              View All
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((item) => {
              const Icon = activityIcons[item.icon] ?? CheckCircle2;
              return (
                <div key={item.id} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <Icon className="size-3.5" />
                  </span>
                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="border-border/80 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold">System Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemOverview.map((item) => (
              <Progress key={item.label} value={item.value} className="gap-1.5">
                <div className="flex w-full items-center justify-between">
                  <ProgressLabel>{item.label}</ProgressLabel>
                  <ProgressValue>{() => item.display}</ProgressValue>
                </div>
              </Progress>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
