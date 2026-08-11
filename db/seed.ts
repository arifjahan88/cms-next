import 'dotenv/config';
import { eq } from 'drizzle-orm';
import { hashPassword } from '@/lib/auth/password';
import { db } from './index';
import { UserRole, users } from './schema';
import { seedNavigation } from './seed-navigation';

async function seedAdmin() {
  const email = (process.env.SEED_ADMIN_EMAIL ?? 'admin@zamil.local').toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD ?? 'ChangeMe123!';
  const name = process.env.SEED_ADMIN_NAME ?? 'Admin User';

  const [existing] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existing) {
    console.log(`Admin already exists: ${email}`);
    return;
  }

  const passwordHash = await hashPassword(password);

  await db.insert(users).values({
    email,
    passwordHash,
    name,
    role: UserRole.Admin,
  });

  console.log(`Seeded admin user: ${email}`);
}

async function seed() {
  await seedAdmin();
  await seedNavigation();
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  });
