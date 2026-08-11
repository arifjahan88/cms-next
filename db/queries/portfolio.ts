import { asc, desc, eq } from 'drizzle-orm';
import { db } from '@/db';
import {
  portfolioProjects,
  type NewPortfolioProject,
  type PortfolioProjectRow,
} from '@/db/schema';

export const PORTFOLIO_CACHE_TAG = 'portfolio';

export type PortfolioProjectDto = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  image: string;
  href: string;
  projectDate: string;
  status: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

function serialize(row: PortfolioProjectRow): PortfolioProjectDto {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    category: row.category,
    image: row.image,
    href: row.href,
    projectDate: row.projectDate,
    status: row.status,
    sortOrder: row.sortOrder,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

export async function listAdminPortfolioProjects() {
  const rows = await db
    .select()
    .from(portfolioProjects)
    .orderBy(desc(portfolioProjects.updatedAt));
  return rows.map(serialize);
}

export async function listPublishedPortfolioProjects() {
  const rows = await db
    .select()
    .from(portfolioProjects)
    .where(eq(portfolioProjects.status, 'published'))
    .orderBy(asc(portfolioProjects.sortOrder));
  return rows.map(serialize);
}

export async function getPortfolioProjectById(id: string) {
  const [row] = await db
    .select()
    .from(portfolioProjects)
    .where(eq(portfolioProjects.id, id))
    .limit(1);
  return row ? serialize(row) : null;
}

export async function createPortfolioProject(values: NewPortfolioProject) {
  const [row] = await db.insert(portfolioProjects).values(values).returning();
  return row ? serialize(row) : null;
}

export async function updatePortfolioProject(id: string, patch: Partial<NewPortfolioProject>) {
  const [row] = await db
    .update(portfolioProjects)
    .set({ ...patch, updatedAt: new Date() })
    .where(eq(portfolioProjects.id, id))
    .returning();
  return row ? serialize(row) : null;
}

export async function deletePortfolioProject(id: string) {
  const [row] = await db
    .delete(portfolioProjects)
    .where(eq(portfolioProjects.id, id))
    .returning();
  return row ? serialize(row) : null;
}
