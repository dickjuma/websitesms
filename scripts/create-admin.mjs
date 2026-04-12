import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";

const [emailArg, passwordArg, nameArg = "Administrator"] = process.argv.slice(2);

if (!emailArg || !passwordArg) {
  console.error("Usage: npm run create-admin -- <email> <password> [name]");
  process.exit(1);
}

const mongoUri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "sma_systems";

if (!mongoUri) {
  console.error("Missing MONGODB_URI in .env");
  process.exit(1);
}

const email = emailArg.trim().toLowerCase();
const password = passwordArg.trim();
const name = nameArg.trim() || "Administrator";

if (password.length < 8) {
  console.error("Password must be at least 8 characters long.");
  process.exit(1);
}

const client = new MongoClient(mongoUri);

try {
  await client.connect();

  const db = client.db(dbName);
  const admins = db.collection("admins");
  const existingAdmin = await admins.findOne({ email });

  if (existingAdmin) {
    console.error(`Admin already exists for ${email}`);
    process.exit(1);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await admins.insertOne({
    email,
    password: hashedPassword,
    name,
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  console.log(`Admin created: ${email}`);
  console.log(`Admin id: ${result.insertedId.toString()}`);
} catch (error) {
  console.error("Failed to create admin:", error);
  process.exit(1);
} finally {
  await client.close();
}
