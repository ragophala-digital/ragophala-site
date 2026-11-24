import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

type Post = (req: Request) => Promise<Response>;
let POST: Post;
let dir: string;

const body = (over: Record<string, unknown> = {}) => ({ name: "Thandi Nkosi", email: "thandi@example.com", company: "", product: "bookflow", country: "", consent: true, website: "", startedAt: Date.now() - 10_000, ...over });
let n = 0;
const call = (payload: unknown, headers: Record<string, string> = {}) =>
  POST(new Request("http://localhost/api/products/waitlist", { method: "POST", headers: { "Content-Type": "application/json", "x-forwarded-for": `10.0.0.${++n}`, ...headers }, body: typeof payload === "string" ? payload : JSON.stringify(payload) }));

beforeAll(async () => {
  dir = await mkdtemp(join(tmpdir(), "rd-route-"));
  process.env.ENQUIRY_DATA_DIR = dir;
  ({ POST } = (await import("@/app/api/products/waitlist/route")) as { POST: Post });
});
afterAll(async () => {
  delete process.env.ENQUIRY_DATA_DIR;
  await rm(dir, { recursive: true, force: true });
});

const saved = async () => {
  try {
    return (JSON.parse(await readFile(join(dir, "waitlist.json"), "utf8")) as unknown[]).length;
  } catch {
    return 0;
  }
};

describe("POST /api/products/waitlist", () => {
  it("stores a valid registration and reports success only after saving", async () => {
    const res = await call(body());
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true, duplicate: false });
    expect(await saved()).toBe(1);
  });

  it("recognises a duplicate without storing it twice", async () => {
    const res = await call(body());
    expect(await res.json()).toEqual({ ok: true, duplicate: true });
    expect(await saved()).toBe(1);
  });

  it("rejects invalid input on the server with field errors", async () => {
    const res = await call(body({ email: "nope", product: "invented" }));
    expect(res.status).toBe(400);
    const j = (await res.json()) as { fieldErrors: Record<string, string> };
    expect(j.fieldErrors.email).toBeDefined();
    expect(j.fieldErrors.product).toBeDefined();
  });

  it("rejects malformed JSON, oversized bodies and foreign origins", async () => {
    expect((await call("{not json")).status).toBe(400);
    expect((await call(JSON.stringify(body({ company: "x".repeat(5000) })))).status).toBe(413);
    expect((await call(body(), { origin: "https://evil.example", host: "localhost" })).status).toBe(403);
  });

  it("silently ignores bots that fill the honeypot and fast submissions", async () => {
    const before = await saved();
    const bot = await call(body({ email: "bot@example.com", website: "http://spam.test" }));
    expect(bot.status).toBe(200);
    expect(await saved()).toBe(before);
    const fast = await call(body({ email: "fast@example.com", startedAt: Date.now() }));
    expect(fast.status).toBe(400);
    expect(await saved()).toBe(before);
  });

  it("rate limits repeated attempts from one address", async () => {
    const ip = { "x-forwarded-for": "203.0.113.9" };
    const codes: number[] = [];
    for (let i = 0; i < 8; i++) codes.push((await call(body({ email: `r${i}@example.com`, startedAt: Date.now() }), ip)).status);
    expect(codes).toContain(429);
  });
});
