import { asc, eq } from 'drizzle-orm';
import { db } from '@/db';
import { users, type NewUser, type User, type UserRole } from '@/db/schema';

export type UserDto = {
  id: string;
  email: string;
  name: string;
  role: number;
  createdAt: Date;
  updatedAt: Date;
};

function serialize(row: User): UserDto {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    role: row.role,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

export async function listUsers() {
  const rows = await db.select().from(users).orderBy(asc(users.name));
  return rows.map(serialize);
}

export async function getUserById(id: string) {
  const [row] = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return row ? serialize(row) : null;
}

export async function getUserByEmail(email: string) {
  const [row] = await db
    .select()
    .from(users)
    .where(eq(users.email, email.toLowerCase()))
    .limit(1);
  return row ?? null;
}

export async function createUser(values: {
  email: string;
  name: string;
  passwordHash: string;
  role: UserRole;
}) {
  const [row] = await db
    .insert(users)
    .values({
      email: values.email.toLowerCase(),
      name: values.name,
      passwordHash: values.passwordHash,
      role: values.role,
    } satisfies NewUser)
    .returning();
  return row ? serialize(row) : null;
}

export async function updateUser(
  id: string,
  values: Partial<{
    email: string;
    name: string;
    passwordHash: string;
    role: UserRole;
  }>
) {
  const payload: Partial<NewUser> = {};
  if (values.email !== undefined) payload.email = values.email.toLowerCase();
  if (values.name !== undefined) payload.name = values.name;
  if (values.passwordHash !== undefined) payload.passwordHash = values.passwordHash;
  if (values.role !== undefined) payload.role = values.role;

  const [row] = await db.update(users).set(payload).where(eq(users.id, id)).returning();
  return row ? serialize(row) : null;
}

export async function deleteUser(id: string) {
  const [row] = await db.delete(users).where(eq(users.id, id)).returning({ id: users.id });
  return Boolean(row);
}
