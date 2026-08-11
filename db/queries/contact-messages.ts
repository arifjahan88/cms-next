import { desc, eq } from 'drizzle-orm';
import { db } from '@/db';
import {
  contactMessages,
  type ContactMessageRow,
  type NewContactMessage,
} from '@/db/schema';

export type ContactMessageDto = {
  id: string;
  fullName: string;
  email: string;
  company: string | null;
  phone: string | null;
  subject: string;
  message: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

function serialize(row: ContactMessageRow): ContactMessageDto {
  return {
    id: row.id,
    fullName: row.fullName,
    email: row.email,
    company: row.company,
    phone: row.phone,
    subject: row.subject,
    message: row.message,
    status: row.status,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

export async function listContactMessages() {
  const rows = await db
    .select()
    .from(contactMessages)
    .orderBy(desc(contactMessages.createdAt));
  return rows.map(serialize);
}

export async function getContactMessageById(id: string) {
  const [row] = await db
    .select()
    .from(contactMessages)
    .where(eq(contactMessages.id, id))
    .limit(1);
  return row ? serialize(row) : null;
}

export async function createContactMessage(values: NewContactMessage) {
  const [row] = await db.insert(contactMessages).values(values).returning();
  return row ? serialize(row) : null;
}

export async function updateContactMessage(
  id: string,
  patch: { status?: string }
) {
  const [row] = await db
    .update(contactMessages)
    .set({ ...patch, updatedAt: new Date() })
    .where(eq(contactMessages.id, id))
    .returning();
  return row ? serialize(row) : null;
}

export async function deleteContactMessage(id: string) {
  const [row] = await db
    .delete(contactMessages)
    .where(eq(contactMessages.id, id))
    .returning();
  return row ? serialize(row) : null;
}
