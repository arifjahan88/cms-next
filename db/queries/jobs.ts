import { asc, desc, eq } from 'drizzle-orm';
import { db } from '@/db';
import { jobOpenings, type JobOpeningRow, type NewJobOpening } from '@/db/schema';

export const JOBS_CACHE_TAG = 'jobs';

export type JobOpeningDto = {
  id: string;
  slug: string;
  title: string;
  department: string;
  type: string;
  location: string;
  description: string;
  applyHref: string;
  status: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

function serialize(row: JobOpeningRow): JobOpeningDto {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    department: row.department,
    type: row.type,
    location: row.location,
    description: row.description,
    applyHref: row.applyHref,
    status: row.status,
    sortOrder: row.sortOrder,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

export async function listAdminJobOpenings() {
  const rows = await db.select().from(jobOpenings).orderBy(desc(jobOpenings.updatedAt));
  return rows.map(serialize);
}

export async function listPublishedJobOpenings() {
  const rows = await db
    .select()
    .from(jobOpenings)
    .where(eq(jobOpenings.status, 'published'))
    .orderBy(asc(jobOpenings.sortOrder));
  return rows.map(serialize);
}

export async function getJobOpeningById(id: string) {
  const [row] = await db.select().from(jobOpenings).where(eq(jobOpenings.id, id)).limit(1);
  return row ? serialize(row) : null;
}

export async function createJobOpening(values: NewJobOpening) {
  const [row] = await db.insert(jobOpenings).values(values).returning();
  return row ? serialize(row) : null;
}

export async function updateJobOpening(id: string, patch: Partial<NewJobOpening>) {
  const [row] = await db
    .update(jobOpenings)
    .set({ ...patch, updatedAt: new Date() })
    .where(eq(jobOpenings.id, id))
    .returning();
  return row ? serialize(row) : null;
}

export async function deleteJobOpening(id: string) {
  const [row] = await db.delete(jobOpenings).where(eq(jobOpenings.id, id)).returning();
  return row ? serialize(row) : null;
}
