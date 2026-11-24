import { createHash, randomUUID } from "crypto";
import { promises as fs } from "fs";
import os from "os";
import path from "path";
import type { AddResult, WaitlistEntry, WaitlistInput, WaitlistStore } from "./waitlist";

/**
 * File-backed waitlist storage for self-hosted or local use, following the same rules as the enquiry store:
 * owner-only files, outside /public, no public read route, and only the data we need.
 *
 * On serverless hosts (for example Vercel) the filesystem is not durable. Before relying on the waitlist there,
 * implement `WaitlistStore` against PostgreSQL or another persistent database and return it from `getWaitlistStore`.
 */
const DIR = process.env.ENQUIRY_DATA_DIR || (process.env.VERCEL ? path.join(os.tmpdir(), "ragophala-data") : path.join(process.cwd(), ".data"));
const retention = Number(process.env.DATA_RETENTION_DAYS) > 0 ? Number(process.env.DATA_RETENTION_DAYS) : 365;

const dupKey = (email: string, product: string) => createHash("sha256").update(`${email}|${product}`).digest("hex");

export function createFileWaitlistStore(dir: string = DIR): WaitlistStore {
  const file = path.join(dir, "waitlist.json");
  let queue: Promise<unknown> = Promise.resolve();
  const exclusive = <T>(fn: () => Promise<T>): Promise<T> => {
    const run = queue.then(fn, fn);
    queue = run.catch(() => undefined);
    return run;
  };
  const readAll = async (): Promise<(WaitlistEntry & { key?: string })[]> => {
    try {
      return JSON.parse(await fs.readFile(file, "utf8")) as (WaitlistEntry & { key?: string })[];
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
      throw err;
    }
  };
  return {
    add: (input: WaitlistInput): Promise<AddResult> =>
      exclusive(async () => {
        const cutoff = Date.now() - retention * 86_400_000;
        const all = (await readAll()).filter((e) => new Date(e.createdAt).getTime() >= cutoff);
        const key = dupKey(input.email, input.product);
        if (all.some((e) => e.key === key)) return { status: "duplicate" };
        const now = new Date().toISOString();
        all.push({ id: randomUUID(), createdAt: now, consentAt: now, name: input.name, email: input.email, company: input.company, product: input.product, country: input.country, key });
        await fs.mkdir(dir, { recursive: true, mode: 0o700 });
        const tmp = `${file}.${process.pid}.tmp`;
        await fs.writeFile(tmp, JSON.stringify(all, null, 2), { mode: 0o600 });
        await fs.rename(tmp, file);
        return { status: "created" };
      }),
  };
}

let shared: WaitlistStore | undefined;
export const getWaitlistStore = (): WaitlistStore => (shared ??= createFileWaitlistStore());
