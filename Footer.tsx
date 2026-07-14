export type Language = "en" | "fr";

export type Page = "home" | "docs" | "legal" | "not-found";

export interface Stats {
  server: number;
  online: boolean;
}

export type DocsSection = "setup" | "how-it-works" | "commands" | "events" | "links";

export type EventTab = "logo" | "name" | "banner" | "invite";

export type ImageMethod = "github" | "imgbb";

export type LegalSection = "tos" | "privacy";
