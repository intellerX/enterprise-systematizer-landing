import { describe, expect, it } from "vitest";
import {
  contactFormSchema,
  validateFiles,
} from "@/lib/validation/contact";

describe("contactFormSchema", () => {
  it("accepts a valid payload", () => {
    const parsed = contactFormSchema.safeParse({
      fullName: "Alex Rivera",
      businessEmail: "alex@example.com",
      phone: "",
      company: "Acme",
      role: "CTO",
      interest: "Fixed-scope pilot",
      message: "We need a measured AI pilot on our monorepo.",
      consent: true,
      website: "",
    });
    expect(parsed.success).toBe(true);
  });

  it("rejects honeypot fills", () => {
    const parsed = contactFormSchema.safeParse({
      fullName: "Bot",
      businessEmail: "bot@example.com",
      interest: "General consultation",
      message: "spam message here",
      consent: true,
      website: "http://spam.test",
    });
    expect(parsed.success).toBe(false);
  });

  it("requires consent", () => {
    const parsed = contactFormSchema.safeParse({
      fullName: "Alex Rivera",
      businessEmail: "alex@example.com",
      interest: "General consultation",
      message: "Enough characters here",
      consent: false,
      website: "",
    });
    expect(parsed.success).toBe(false);
  });
});

describe("validateFiles", () => {
  it("limits count and size", () => {
    const big = { size: 3 * 1024 * 1024 } as File;
    expect(validateFiles([big, big])).toMatch(/5 MB/);
    expect(validateFiles([big, big, big, big])).toMatch(/At most/);
  });
});
