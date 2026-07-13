export type Language = 'en' | 'fr';

export interface Translations {
  nav: {
    home: string;
    docs: string;
    support: string;
    addBot: string;
  };
  home: {
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    addDiscordBtn: string;
    learnMoreBtn: string;
    serversText: string;
    serversFallback: string;
  };
  footer: {
    hostedInfo: string;
    tos: string;
    privacy: string;
    source: string;
  };
  docs: {
    sidebarSetup: string;
    sidebarHowItWorks: string;
    sidebarCommands: string;
    sidebarEvents: string;
    sidebarLinks: string;
  };
  legal: {
    sidebarTos: string;
    sidebarPrivacy: string;
  };
  notFound: {
    title: string;
    description: string;
  };
}
