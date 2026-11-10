/** Static contact channels. None of these publish the hidden lead inbox. */
export function contactChannel() {
  const action = process.env.NEXT_PUBLIC_CONTACT_FORM_ACTION?.trim() ?? "";
  const whatsapp = (process.env.NEXT_PUBLIC_WHATSAPP ?? "").replace(/[^\d]/g, "");
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ?? "";
  return { action, whatsapp, email };
}
