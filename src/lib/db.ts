import { Pool } from "pg";
import type { DatabaseSync as SQLiteDatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";

export interface EnquiryInput {
  name: string;
  phone: string;
  email?: string;
  area?: string;
  puppyId?: string;
  puppyName?: string;
  message?: string;
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  area: string | null;
  puppy_id: string | null;
  puppy_name: string | null;
  message: string | null;
  created_at: string;
}

// Check for PostgreSQL connection string in environment variables
const postgresUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;

let pgPool: Pool | null = null;
let sqliteDb: SQLiteDatabaseSync | null = null;
let schemaInitialized = false;

if (postgresUrl) {
  // Use PostgreSQL (Neon, Supabase, Vercel Postgres, Railway, AWS RDS, Docker, etc.)
  pgPool = new Pool({
    connectionString: postgresUrl,
    ssl: postgresUrl.includes("localhost") || postgresUrl.includes("127.0.0.1")
      ? false
      : { rejectUnauthorized: false },
    max: 10,
    idleTimeoutMillis: 30000,
  });
} else {
  // Fallback to local SQLite for offline development if no DATABASE_URL is provided
  const { DatabaseSync } = require("node:sqlite");
  const dbDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  const dbPath = path.join(dbDir, "teddypups.db");
  sqliteDb = new DatabaseSync(dbPath);
}

async function ensureSchema() {
  if (schemaInitialized) return;

  if (pgPool) {
    await pgPool.query(`
      CREATE TABLE IF NOT EXISTS enquiries (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT,
        area TEXT,
        puppy_id TEXT,
        puppy_name TEXT,
        message TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
  } else if (sqliteDb) {
    sqliteDb.exec(`
      CREATE TABLE IF NOT EXISTS enquiries (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT,
        area TEXT,
        puppy_id TEXT,
        puppy_name TEXT,
        message TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  schemaInitialized = true;
}

export async function saveEnquiry(data: EnquiryInput): Promise<{ id: string } & EnquiryInput> {
  await ensureSchema();
  const id = crypto.randomUUID();

  if (pgPool) {
    await pgPool.query(
      `
      INSERT INTO enquiries (id, name, phone, email, area, puppy_id, puppy_name, message)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `,
      [
        id,
        data.name.trim(),
        data.phone.trim(),
        data.email?.trim() || null,
        data.area?.trim() || null,
        data.puppyId || null,
        data.puppyName || null,
        data.message?.trim() || null,
      ]
    );
  } else if (sqliteDb) {
    const stmt = sqliteDb.prepare(`
      INSERT INTO enquiries (id, name, phone, email, area, puppy_id, puppy_name, message)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      id,
      data.name.trim(),
      data.phone.trim(),
      data.email?.trim() || null,
      data.area?.trim() || null,
      data.puppyId || null,
      data.puppyName || null,
      data.message?.trim() || null
    );
  }

  return { id, ...data };
}

export async function getAllEnquiries(): Promise<Enquiry[]> {
  await ensureSchema();

  if (pgPool) {
    const res = await pgPool.query(
      "SELECT * FROM enquiries ORDER BY created_at DESC"
    );
    return res.rows.map((r: any) => ({
      id: String(r.id),
      name: String(r.name),
      phone: String(r.phone),
      email: r.email ? String(r.email) : null,
      area: r.area ? String(r.area) : null,
      puppy_id: r.puppy_id ? String(r.puppy_id) : null,
      puppy_name: r.puppy_name ? String(r.puppy_name) : null,
      message: r.message ? String(r.message) : null,
      created_at: new Date(r.created_at).toISOString(),
    }));
  } else if (sqliteDb) {
    const stmt = sqliteDb.prepare("SELECT * FROM enquiries ORDER BY created_at DESC");
    const rows = stmt.all() as any[];
    return rows.map((r) => ({
      id: String(r.id),
      name: String(r.name),
      phone: String(r.phone),
      email: r.email ? String(r.email) : null,
      area: r.area ? String(r.area) : null,
      puppy_id: r.puppy_id ? String(r.puppy_id) : null,
      puppy_name: r.puppy_name ? String(r.puppy_name) : null,
      message: r.message ? String(r.message) : null,
      created_at: String(r.created_at),
    }));
  }

  return [];
}

export async function deleteEnquiry(id: string): Promise<void> {
  await ensureSchema();

  if (pgPool) {
    await pgPool.query("DELETE FROM enquiries WHERE id = $1", [id]);
  } else if (sqliteDb) {
    const stmt = sqliteDb.prepare("DELETE FROM enquiries WHERE id = ?");
    stmt.run(id);
  }
}
