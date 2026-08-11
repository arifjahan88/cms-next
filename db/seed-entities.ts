import { slugify } from '@/lib/slugify';
import { blogPosts as staticPosts } from '@/features/blog/data/blog';
import { caseStudies as staticCaseStudies } from '@/features/case-studies/data/case-studies';
import { jobs as staticJobs } from '@/features/careers/data/careers';
import { portfolioProjects as staticPortfolio } from '@/features/portfolio/data/portfolio';
import { eq } from 'drizzle-orm';
import { db } from './index';
import { blogPosts, caseStudies, jobOpenings, portfolioProjects } from './schema';

function parseDate(dateStr: string): Date {
  const d = new Date(dateStr);
  return Number.isNaN(d.getTime()) ? new Date() : d;
}

export async function seedBlogPosts() {
  for (let i = 0; i < staticPosts.length; i++) {
    const post = staticPosts[i]!;
    const slug = slugify(post.title);

    const [existing] = await db
      .select({ id: blogPosts.id })
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .limit(1);

    if (existing) {
      console.log(`Blog post already exists: ${slug}`);
      continue;
    }

    await db.insert(blogPosts).values({
      slug,
      title: post.title,
      excerpt: post.excerpt,
      body: `${post.excerpt}\n\n*Full article content coming soon.*`,
      category: post.category,
      author: post.author ?? 'Zamil Team',
      image: post.image,
      readTime: post.readTime,
      featured: post.featured ?? false,
      status: 'published',
      publishedAt: parseDate(post.date),
      sortOrder: i,
    });

    console.log(`Seeded blog post: ${slug}`);
  }
}

export async function seedCaseStudies() {
  for (let i = 0; i < staticCaseStudies.length; i++) {
    const cs = staticCaseStudies[i]!;
    const slug = slugify(cs.title);

    const [existing] = await db
      .select({ id: caseStudies.id })
      .from(caseStudies)
      .where(eq(caseStudies.slug, slug))
      .limit(1);

    if (existing) {
      console.log(`Case study already exists: ${slug}`);
      continue;
    }

    await db.insert(caseStudies).values({
      slug,
      title: cs.title,
      description: cs.description,
      category: cs.category,
      image: cs.image,
      challenge: cs.challenge ?? '',
      solution: cs.solution ?? '',
      techStack: cs.techStack,
      metrics: cs.metrics ?? [],
      featured: i < 2,
      status: 'published',
      publishedAt: parseDate(cs.date),
      sortOrder: i,
    });

    console.log(`Seeded case study: ${slug}`);
  }
}

export async function seedJobOpenings() {
  for (let i = 0; i < staticJobs.length; i++) {
    const job = staticJobs[i]!;
    const slug = slugify(job.title);

    const [existing] = await db
      .select({ id: jobOpenings.id })
      .from(jobOpenings)
      .where(eq(jobOpenings.slug, slug))
      .limit(1);

    if (existing) {
      console.log(`Job opening already exists: ${slug}`);
      continue;
    }

    await db.insert(jobOpenings).values({
      slug,
      title: job.title,
      department: job.department,
      type: job.type,
      location: job.location,
      description: job.description,
      applyHref: job.href,
      status: 'published',
      sortOrder: i,
    });

    console.log(`Seeded job opening: ${slug}`);
  }
}

export async function seedPortfolioProjects() {
  for (let i = 0; i < staticPortfolio.length; i++) {
    const project = staticPortfolio[i]!;
    const slug = slugify(project.title);

    const [existing] = await db
      .select({ id: portfolioProjects.id })
      .from(portfolioProjects)
      .where(eq(portfolioProjects.slug, slug))
      .limit(1);

    if (existing) {
      console.log(`Portfolio project already exists: ${slug}`);
      continue;
    }

    await db.insert(portfolioProjects).values({
      slug,
      title: project.title,
      description: project.description,
      category: project.category,
      image: project.image,
      href: `/case-studies/${slug}`,
      projectDate: project.date,
      status: 'published',
      sortOrder: i,
    });

    console.log(`Seeded portfolio project: ${slug}`);
  }
}
