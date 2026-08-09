export const overviewStats = [
  {
    label: 'Total Users',
    value: '1,248',
    change: '+12.5%',
    positive: true,
    icon: 'users',
    color: 'bg-blue-500/15 text-blue-600',
  },
  {
    label: 'Active Projects',
    value: '86',
    change: '+8.2%',
    positive: true,
    icon: 'folder',
    color: 'bg-emerald-500/15 text-emerald-600',
  },
  {
    label: 'New Leads',
    value: '342',
    change: '+18.1%',
    positive: true,
    icon: 'userPlus',
    color: 'bg-violet-500/15 text-violet-600',
  },
  {
    label: 'Open Tickets',
    value: '24',
    change: '-4.3%',
    positive: false,
    icon: 'ticket',
    color: 'bg-orange-500/15 text-orange-600',
  },
  {
    label: 'Revenue',
    value: '$48.2k',
    change: '+6.7%',
    positive: true,
    icon: 'dollar',
    color: 'bg-sky-500/15 text-sky-600',
  },
] as const;

export const websiteMetrics = [
  { label: 'Visitors', value: '24.8k', change: '+12%', positive: true },
  { label: 'Page Views', value: '86.2k', change: '+8%', positive: true },
  { label: 'Bounce Rate', value: '32.4%', change: '-2.1%', positive: true },
  { label: 'Avg. Session', value: '3m 42s', change: '+0.4%', positive: true },
] as const;

export const websiteTraffic = [
  { date: 'May 15', thisWeek: 4200, lastWeek: 3800 },
  { date: 'May 16', thisWeek: 5100, lastWeek: 4100 },
  { date: 'May 17', thisWeek: 4800, lastWeek: 4500 },
  { date: 'May 18', thisWeek: 6200, lastWeek: 5000 },
  { date: 'May 19', thisWeek: 5800, lastWeek: 4700 },
  { date: 'May 20', thisWeek: 7100, lastWeek: 5500 },
  { date: 'May 21', thisWeek: 6900, lastWeek: 6000 },
];

export const leadsBreakdown = [
  { name: 'New Leads', value: 820, fill: 'var(--color-new)' },
  { name: 'Contacted', value: 640, fill: 'var(--color-contacted)' },
  { name: 'Qualified', value: 480, fill: 'var(--color-qualified)' },
  { name: 'Proposal Sent', value: 360, fill: 'var(--color-proposal)' },
  { name: 'Closed Won', value: 243, fill: 'var(--color-won)' },
];

export const recentProjects = [
  {
    id: '1',
    title: 'MediCare+ Hospital Platform',
    category: 'Healthcare',
    status: 'In Progress',
    statusColor: 'bg-blue-500/15 text-blue-700',
  },
  {
    id: '2',
    title: 'FinSmart Banking App',
    category: 'FinTech',
    status: 'Completed',
    statusColor: 'bg-emerald-500/15 text-emerald-700',
  },
  {
    id: '3',
    title: 'HabiPro Property Suite',
    category: 'Real Estate',
    status: 'In Progress',
    statusColor: 'bg-blue-500/15 text-blue-700',
  },
  {
    id: '4',
    title: 'ShopHub Marketplace',
    category: 'E-commerce',
    status: 'On Hold',
    statusColor: 'bg-orange-500/15 text-orange-700',
  },
  {
    id: '5',
    title: 'EduLearn LMS',
    category: 'Education',
    status: 'Completed',
    statusColor: 'bg-emerald-500/15 text-emerald-700',
  },
] as const;

export const recentActivity = [
  {
    id: '1',
    title: 'New user registered',
    time: '10 mins ago',
    icon: 'user',
  },
  {
    id: '2',
    title: 'Project status updated to Completed',
    time: '32 mins ago',
    icon: 'check',
  },
  {
    id: '3',
    title: 'New lead from Contact form',
    time: '1 hour ago',
    icon: 'mail',
  },
  {
    id: '4',
    title: 'Blog post published',
    time: '2 hours ago',
    icon: 'file',
  },
  {
    id: '5',
    title: 'System backup completed',
    time: '4 hours ago',
    icon: 'server',
  },
] as const;

export const systemOverview = [
  { label: 'Server Uptime', value: 99.9, display: '99.9%', color: 'bg-emerald-500' },
  { label: 'Disk Usage', value: 68, display: '68%', color: 'bg-blue-500' },
  { label: 'Memory Usage', value: 54, display: '54%', color: 'bg-orange-500' },
  { label: 'CPU Usage', value: 42, display: '42%', color: 'bg-violet-500' },
  { label: 'Database Size', value: 25, display: '12.4 GB / 50 GB', color: 'bg-teal-500' },
] as const;
