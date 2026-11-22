import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { MongoClient } from 'mongodb';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Load .env
const envPath = path.join(rootDir, '.env');
if (fs.existsSync(envPath)) {
  if (typeof process.loadEnvFile === 'function') {
    process.loadEnvFile(envPath);
  } else {
    const envContent = fs.readFileSync(envPath, 'utf8');
    for (const line of envContent.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

const mongoUri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'teddypups';

if (!mongoUri || (!mongoUri.startsWith('mongodb://') && !mongoUri.startsWith('mongodb+srv://'))) {
  console.error('\n❌ Error: Valid MONGODB_URI not found in .env');
  console.error('Please open .env and paste your MongoDB URI, for example:');
  console.error('MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority\n');
  process.exit(1);
}

async function runMigration() {
  console.log(`\n🐾 Connecting to MongoDB (${dbName})...`);
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    console.log('✅ Successfully connected to MongoDB!');
    const db = client.db(dbName);

    // 1. Puppies
    const puppiesPath = path.join(rootDir, 'src/data/puppies.json');
    if (fs.existsSync(puppiesPath)) {
      const puppies = JSON.parse(fs.readFileSync(puppiesPath, 'utf8'));
      const col = db.collection('puppies');
      console.log(`\n📦 Migrating ${puppies.length} puppies into "puppies" collection...`);
      for (const pup of puppies) {
        await col.updateOne(
          { slug: pup.slug },
          { $set: { ...pup, updatedAt: new Date() } },
          { upsert: true }
        );
      }
      await col.createIndex({ slug: 1 }, { unique: true });
      await col.createIndex({ breed: 1 });
      await col.createIndex({ status: 1 });
      console.log(`✅ "puppies" collection synced (${puppies.length} records).`);
    }

    // 2. Happy Families
    const familiesPath = path.join(rootDir, 'src/data/happy_families.json');
    if (fs.existsSync(familiesPath)) {
      const families = JSON.parse(fs.readFileSync(familiesPath, 'utf8'));
      const col = db.collection('happy_families');
      console.log(`\n📸 Migrating ${families.length} stories into "happy_families" collection...`);
      for (const fam of families) {
        await col.updateOne(
          { id: fam.id },
          { $set: { ...fam, updatedAt: new Date() } },
          { upsert: true }
        );
      }
      await col.createIndex({ id: 1 }, { unique: true });
      console.log(`✅ "happy_families" collection synced (${families.length} records).`);
    }

    // 3. FAQs
    const faqsPath = path.join(rootDir, 'src/data/faqs.json');
    if (fs.existsSync(faqsPath)) {
      const faqs = JSON.parse(fs.readFileSync(faqsPath, 'utf8'));
      const col = db.collection('faqs');
      console.log(`\n❓ Migrating ${faqs.length} FAQs into "faqs" collection...`);
      for (const faq of faqs) {
        await col.updateOne(
          { id: faq.id },
          { $set: { ...faq, updatedAt: new Date() } },
          { upsert: true }
        );
      }
      await col.createIndex({ id: 1 }, { unique: true });
      console.log(`✅ "faqs" collection synced (${faqs.length} records).`);
    }

    console.log('\n🎉 All TeddyPups data & photo references successfully migrated to MongoDB!\n');
  } catch (err) {
    console.error('\n❌ Migration failed:', err);
    process.exit(1);
  } finally {
    await client.close();
  }
}

runMigration();
