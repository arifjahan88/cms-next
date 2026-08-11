import { and, asc, desc, eq } from 'drizzle-orm';
import { db } from '@/db';
import { caseStudies, type CaseStudyRow, type NewCaseStudy } from '@/db/schema';

export const CASE_STUDIES_CACHE_TAG = 'case-studies';

export function caseStudySlugTag(slug: string) {
  return `case-study:${slug}`;
}

export type CaseStudyDto = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  image: string;
  challenge: string;
  solution: string;
  techStack: string[];
  metrics: { value: string; label: string }[];
  featured: boolean;
  status: string;
  seoTitle: string | null;
  seoDescription: string | null;
  publishedAt: Date | null;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

function serialize(row: CaseStudyRow): CaseStudyDto {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    category: row.category,
    image: row.image,
    challenge: row.challenge,
    solution: row.solution,
    techStack: (row.techStack as string[]) ?? [],
    metrics: (row.metrics as { value: string; label: string }[]) ?? [],
    featured: row.featured,
    status: row.status,
    seoTitle: row.seoTitle,
    seoDescription: row.seoDescription,
    publishedAt: row.publishedAt,
    sortOrder: row.sortOrder,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

export async function listAdminCaseStudies() {
  const rows = await db.select().from(caseStudies).orderBy(desc(caseStudies.updatedAt));
  return rows.map(serialize);
}

export async function listPublishedCaseStudies() {
  const rows = await db
    .select()
    .from(caseStudies)
    .where(eq(caseStudies.status, 'published'))
    .orderBy(desc(caseStudies.publishedAt), asc(caseStudies.sortOrder));
  return rows.map(serialize);
}

export async function listFeaturedCaseStudies(limit = 4) {
  const rows = await db
    .select()
    .from(caseStudies)
    .where(and(eq(caseStudies.status, 'published'), eq(caseStudies.featured, true)))
    .orderBy(asc(caseStudies.sortOrder))
    .limit(limit);
  return rows.map(serialize);
}

export async function getCaseStudyById(id: string) {
  const [row] = await db.select().from(caseStudies).where(eq(caseStudies.id, id)).limit(1);
  return row ? serialize(row) : null;
}

export async function getPublishedCaseStudyBySlug(slug: string) {
  const [row] = await db
    .select()
    .from(caseStudies)
    .where(and(eq(caseStudies.slug, slug), eq(caseStudies.status, 'published')))
    .limit(1);
  return row ? serialize(row) : null;
}

export async function createCaseStudy(values: NewCaseStudy) {
  const [row] = await db.insert(caseStudies).values(values).returning();
  return row ? serialize(row) : null;
}

export async function updateCaseStudy(id: string, patch: Partial<NewCaseStudy>) {
  const [row] = await db
    .update(caseStudies)
    .set({ ...patch, updatedAt: new Date() })
    .where(eq(caseStudies.id, id))
    .returning();
  return row ? serialize(row) : null;
}

export async function deleteCaseStudy(id: string) {
  const [row] = await db.delete(caseStudies).where(eq(caseStudies.id, id)).returning();
  return row ? serialize(row) : null;
}
