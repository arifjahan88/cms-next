import { desc, eq } from 'drizzle-orm';
import { db } from '@/db';
import {
  consultationBookings,
  type ConsultationBookingRow,
  type NewConsultationBooking,
} from '@/db/schema';

export type ConsultationBookingDto = {
  id: string;
  fullName: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  projectType: string;
  description: string;
  budget: string | null;
  preferredDate: string | null;
  preferredTime: string | null;
  referral: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

function serialize(row: ConsultationBookingRow): ConsultationBookingDto {
  return {
    id: row.id,
    fullName: row.fullName,
    email: row.email,
    company: row.company,
    phone: row.phone,
    service: row.service,
    projectType: row.projectType,
    description: row.description,
    budget: row.budget,
    preferredDate: row.preferredDate,
    preferredTime: row.preferredTime,
    referral: row.referral,
    status: row.status,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

export async function listConsultationBookings() {
  const rows = await db
    .select()
    .from(consultationBookings)
    .orderBy(desc(consultationBookings.createdAt));
  return rows.map(serialize);
}

export async function getConsultationBookingById(id: string) {
  const [row] = await db
    .select()
    .from(consultationBookings)
    .where(eq(consultationBookings.id, id))
    .limit(1);
  return row ? serialize(row) : null;
}

export async function createConsultationBooking(values: NewConsultationBooking) {
  const [row] = await db.insert(consultationBookings).values(values).returning();
  return row ? serialize(row) : null;
}

export async function updateConsultationBooking(
  id: string,
  patch: { status?: string }
) {
  const [row] = await db
    .update(consultationBookings)
    .set({ ...patch, updatedAt: new Date() })
    .where(eq(consultationBookings.id, id))
    .returning();
  return row ? serialize(row) : null;
}

export async function deleteConsultationBooking(id: string) {
  const [row] = await db
    .delete(consultationBookings)
    .where(eq(consultationBookings.id, id))
    .returning();
  return row ? serialize(row) : null;
}
