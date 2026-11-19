import { createHash, randomUUID } from "crypto";
import { promises as fs } from "fs";
import os from "os";
import path from "path";
import type { Brief } from "./contact";
import type { Qualification } from "./ai/analyse";

export interface EnquiryRecord {
  id: string;
  createdAt: string;
  consentAt: string;
  fingerprint: string;
  source: "form" | "smart-intake";
  name: string;
  business: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  contactMethod?: string;
  message: string;
  extra: string;
  brief?: Brief;
  analysis?: Qualification;
  notification: { status: "pending" | "sent" | "failed" | "skipped"; attempts: number; at?: string; error?: string };
}

/**
 * File-backed store for self-hosted or local use. Data lives outside /public, files are written with owner-only
 * permissions, and there is no public read route. On serverless hosts (for example Vercel) the filesystem is
 * ephemeral: swap these functions for a hosted database before relying on stored enquiries.
 */
/** On Vercel the project folder is read-only, so fall back to the temporary folder (not durable: rely on email or a hosted database there). */
const DIR = process.env.ENQUIRY_DATA_DIR || (process.env.VERCEL ? path.join(os.tmpdir(), "ragophala-data") : path.join(process.cwd(), ".data"));
const FILE = path.join(DIR, "enquiries.json");
const RETENTION_DAYS = Number(process.env.DATA_RETENTION_DAYS) > 0 ? Number(process.env.DATA_RETENTION_DAYS) : 365;

export const retentionDays = () => RETENTION_DAYS;

let queue: Promise<unknown> = Promise.resolve();
/** Serialises read-modify-write cycles so concurrent submissions cannot overwrite each other. */
function exclusive<T>(fn: () => Promise<T>): Promise<T> {
  const run = queue.then(fn, fn);
  queue = run.catch(() => undefined);
  return run;
}

async function readAll(): Promise<EnquiryRecord[]> {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8")) as EnquiryRecord[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

async function writeAll(records: EnquiryRecord[]) {
  await fs.mkdir(DIR, { recursive: true, mode: 0o700 });
  const tmp = `${FILE}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(records, null, 2), { mode: 0o600 });
  await fs.rename(tmp, FILE);
}

export const fingerprint = (email: string, message: string) => createHash("sha256").update(`${email.toLowerCase()}|${message.slice(0, 200).toLowerCase()}`).digest("hex");

export const newId = () => randomUUID();

/** Adds a record, removing anything older than the retention period. */
export function addEnquiry(rec: EnquiryRecord): Promise<void> {
  return exclusive(async () => {
    const cutoff = Date.now() - RETENTION_DAYS * 86_400_000;
    const records = (await readAll()).filter((r) => new Date(r.createdAt).getTime() >= cutoff);
    records.push(rec);
    await writeAll(records);
  });
}

export function updateEnquiry(id: string, patch: Partial<EnquiryRecord>): Promise<void> {
  return exclusive(async () => {
    const records = await readAll();
    const i = records.findIndex((r) => r.id === id);
    if (i < 0) return;
    records[i] = { ...records[i], ...patch };
    await writeAll(records);
  });
}

export async function findRecentDuplicate(fp: string, windowMs: number): Promise<EnquiryRecord | undefined> {
  try {
    const now = Date.now();
    return (await readAll()).find((r) => r.fingerprint === fp && now - new Date(r.createdAt).getTime() < windowMs);
  } catch {
    return undefined;
  }
}

export async function listEnquiries(limit = 200): Promise<EnquiryRecord[]> {
  return (await readAll()).slice(-limit).reverse();
}
