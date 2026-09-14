import { z } from "zod";
import { site } from "@/content/site";

export const INTERESTS = site.contact.interests;

export const contactFormSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required").max(120),
  businessEmail: z
    .string()
    .trim()
    .email("Enter a valid business email")
    .max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  role: z.string().trim().max(120).optional().or(z.literal("")),
  interest: z.enum(INTERESTS),
  message: z.string().trim().min(10, "Message is required").max(5000),
  consent: z.boolean().refine((v) => v === true, {
    message: "Consent is required",
  }),
  /** Honeypot — must be empty */
  website: z
    .string()
    .optional()
    .refine((v) => !v, { message: "Rejected" }),
  assessmentSummary: z.string().max(4000).optional(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

export const MAX_FILES = 3;
export const MAX_TOTAL_BYTES = 5 * 1024 * 1024;

export function validateFiles(files: { size: number }[]) {
  if (files.length > MAX_FILES) {
    return `At most ${MAX_FILES} files allowed`;
  }
  const total = files.reduce((sum, f) => sum + f.size, 0);
  if (total > MAX_TOTAL_BYTES) {
    return "Total attachment size must be ≤ 5 MB";
  }
  return null;
}
