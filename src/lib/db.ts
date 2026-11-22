import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";

const dbDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, "teddypups.db");
const db = new DatabaseSync(dbPath);

// Initialize schema
db.exec(`
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

export interface EnquiryInput {
  name: string;
  phone: string;
  email?: string;
  area?: string;
  puppyId?: string;
  puppyName?: string;
  message?: string;
}

export function saveEnquiry(data: EnquiryInput) {
  const id = crypto.randomUUID();
  const stmt = db.prepare(`
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
  return { id, ...data };
}

export function getAllEnquiries() {
  const stmt = db.prepare("SELECT * FROM enquiries ORDER BY created_at DESC");
  return stmt.all();
}

export default db;
