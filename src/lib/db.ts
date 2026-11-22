import { MongoClient, ObjectId, type Db } from "mongodb";
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

// Check for MongoDB connection string in environment variables (MongoDB Atlas, local, etc.)
const mongoUri = process.env.MONGODB_URI || process.env.DATABASE_URL;
const isMongo = Boolean(
  mongoUri && (mongoUri.startsWith("mongodb://") || mongoUri.startsWith("mongodb+srv://"))
);

let clientPromise: Promise<MongoClient> | null = null;
let sqliteDb: SQLiteDatabaseSync | null = null;

if (isMongo && mongoUri) {
  // Use global clientPromise in development to prevent duplicate connections on HMR
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (process.env.NODE_ENV === "development") {
    if (!globalWithMongo._mongoClientPromise) {
      const client = new MongoClient(mongoUri);
      globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    const client = new MongoClient(mongoUri);
    clientPromise = client.connect();
  }
} else {
  // Graceful fallback to local SQLite for offline development if MONGODB_URI is not set
  const { DatabaseSync } = require("node:sqlite");
  const dbDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  const dbPath = path.join(dbDir, "teddypups.db");
  sqliteDb = new DatabaseSync(dbPath);

  sqliteDb?.exec(`
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

async function getMongoDb(): Promise<Db | null> {
  if (!clientPromise) return null;
  const client = await clientPromise;
  const dbName = process.env.MONGODB_DB || "teddypups";
  return client.db(dbName);
}

export async function saveEnquiry(data: EnquiryInput): Promise<{ id: string } & EnquiryInput> {
  const db = await getMongoDb();

  if (db) {
    const doc = {
      name: data.name.trim(),
      phone: data.phone.trim(),
      email: data.email?.trim() || null,
      area: data.area?.trim() || null,
      puppy_id: data.puppyId || null,
      puppy_name: data.puppyName || null,
      message: data.message?.trim() || null,
      created_at: new Date(),
    };

    const res = await db.collection("enquiries").insertOne(doc);
    return { id: res.insertedId.toString(), ...data };
  } else if (sqliteDb) {
    const id = crypto.randomUUID();
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
    return { id, ...data };
  }

  return { id: crypto.randomUUID(), ...data };
}

export async function getAllEnquiries(): Promise<Enquiry[]> {
  const db = await getMongoDb();

  if (db) {
    const docs = await db
      .collection("enquiries")
      .find({})
      .sort({ created_at: -1 })
      .toArray();

    return docs.map((doc) => ({
      id: doc._id.toString(),
      name: String(doc.name || ""),
      phone: String(doc.phone || ""),
      email: doc.email ? String(doc.email) : null,
      area: doc.area ? String(doc.area) : null,
      puppy_id: doc.puppy_id ? String(doc.puppy_id) : null,
      puppy_name: doc.puppy_name ? String(doc.puppy_name) : null,
      message: doc.message ? String(doc.message) : null,
      created_at: doc.created_at ? new Date(doc.created_at).toISOString() : new Date().toISOString(),
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
  const db = await getMongoDb();

  if (db) {
    let query: any;
    try {
      query = { _id: new ObjectId(id) };
    } catch {
      query = { id };
    }
    await db.collection("enquiries").deleteOne(query);
  } else if (sqliteDb) {
    const stmt = sqliteDb.prepare("DELETE FROM enquiries WHERE id = ?");
    stmt.run(id);
  }
}
