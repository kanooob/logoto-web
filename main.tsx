import React, { useEffect, useState } from "react";
import { Plus, BookOpen, Image as ImageIcon, Type, Sparkles, LayoutGrid, AlertCircle } from "lucide-react";
import { Language, Stats } from "../types";
import { navigateTo } from "../utils/routing";

interface HomeProps {
  currentLang: Language;
}

export default function Home({ currentLang }: HomeProps) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  const inviteUrl = "https://discord.com/oauth2/authorize?client_id=1431383390162124920";

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => {
        if (!res.ok) throw new Error("Stats request failed");
        return res.json();
      })
      .then((data) => {
        setStats(data);
        setIsLoadingStats(false);
      })
      .catch((err) => {
        console.error("Unable to load stats:", err);
        setStats({ server: 184, online: false }); // Fallback with offline marker
        setIsLoadingStats(false);
      });
  }, []);

  const handleLearnMore = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateTo("docs", currentLang, "#setup");
  };

  const text = {
    en: {
      titlePre: "The best Discord bot",
      titleSpan: "to automate your visual identity",
      subtitle: "Automatically update your Discord server's logo, banner, invite image, and name in a single click.",
      ctaAdd: "Add to Discord",
      ctaLearn: "Learn more",
      badgeLoading: "⚡ Loading statistics...",
      badgeOffline: "☁️ Used on many servers",
      badgeOnline: (count: number) => `⚡ Used on over ${count} servers`,
      featuresTitle: "What can you automate?",
      featuresSubtitle: "Logoto takes care of scheduled design swaps seamlessly so you can focus on building your community.",
      logoTitle: "Server Icon",
      logoDesc: "Keep your server icon fresh by scheduling automatic swaps for holidays, seasons, or special events.",
      nameTitle: "Server Name",
      nameDesc: "Dynamically adjust your server's textual title to align with current celebrations.",
      bannerTitle: "Server Banner",
      bannerDesc: "Elevate your visual atmosphere with scheduled background banners (Requires Boost Level 2).",
      inviteTitle: "Invite Splash",
      inviteDesc: "Create highly professional first impressions by custom-styling your invite backgrounds (Requires Boost Level 1).",
    },
    fr: {
      titlePre: "Le meilleur bot Discord",
      titleSpan: "pour automatiser votre identité visuelle",
      subtitle: "Mettez à jour automatiquement le logo, la bannière, l'image d'invitation et le nom de votre serveur Discord en un seul clic.",
      ctaAdd: "Ajouter à Discord",
      ctaLearn: "En savoir plus",
      badgeLoading: "⚡ Chargement des statistiques...",
      badgeOffline: "☁️ Utilisé sur de nombreux serveurs",
      badgeOnline: (count: number) => `⚡ Utilisé sur plus de ${count} serveurs`,
      featuresTitle: "Que pouvez-vous automatiser ?",
      featuresSubtitle: "Logoto gère vos planifications graphiques en toute autonomie pour que vous restiez concentré sur votre communauté.",
      logoTitle: "Changement de Logo",
      logoDesc: "Gardez votre photo de profil de serveur dynamique en planifiant des logos saisonniers ou festifs.",
      nameTitle: "Changement de Nom",
      nameDesc: "Modifiez de façon autonome le titre textuel de votre communauté pour des événements ciblés.",
      bannerTitle: "Changement de Bannière",
      bannerDesc: "Soignez votre image en modifiant votre bannière d'arrière-plan de salons (Niveau 2 de Boost).",
      inviteTitle: "Fond d'invitation",
      inviteDesc: "Personnalisez l'illustration d'arrière-plan affichée lors des invitations web (Niveau 1 de Boost).",
    },
  }[currentLang];

  return (
    <div className="flex-1 w-full flex flex-col justify-center items-center py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-4xl text-center space-y-8 animate-fadeIn">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
          {text.titlePre} <br />
          <span className="text-[#a3ab72] relative inline-block drop-shadow-[0_2px_10px_rgba(163,171,114,0.15)]">
            {text.titleSpan}
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-medium">
          {text.subtitle}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
          <a
            href={inviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#8c935d] hover:bg-[#767d4f] text-white font-bold text-lg py-4 px-8 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-[#8c935d]/20 active:translate-y-0"
            id="hero-add-to-discord"
          >
            <Plus className="w-5 h-5" />
            {text.ctaAdd}
          </a>
          <a
            href="#setup"
            onClick={handleLearnMore}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 border-2 border-[#a3ab72] hover:bg-[#a3ab72]/10 text-[#a3ab72] font-bold text-lg py-4 px-8 rounded-xl transition-all duration-300 transform hover:-translate-y-1"
            id="hero-learn-more"
          >
            <BookOpen className="w-5 h-5" />
            {text.ctaLearn}
          </a>
        </div>

        {/* Server Statistics Badge */}
        <div className="inline-flex items-center pt-4">
          <div className="bg-[#8c935d]/10 border border-[#8c935d]/40 rounded-full py-2 px-6 text-sm font-semibold text-white/90 tracking-wide flex items-center gap-2 shadow-inner">
            {isLoadingStats ? (
              <span>{text.badgeLoading}</span>
            ) : stats?.online ? (
              <span>{text.badgeOnline(stats.server)}</span>
            ) : (
              <span>{text.badgeOffline}</span>
            )}
          </div>
        </div>
      </div>

      {/* Feature Bento Grid */}
      <section className="w-full max-w-6xl mt-24 sm:mt-32 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#a3ab72] tracking-tight">
            {text.featuresTitle}
          </h2>
          <p className="text-sm sm:text-base text-white/60 max-w-xl mx-auto leading-relaxed">
            {text.featuresSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-[#2f3136] hover:bg-[#2f3136]/90 border border-white/5 hover:border-[#8c935d]/30 p-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-xl group">
            <div className="bg-[#8c935d]/10 w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-[#a3ab72] group-hover:bg-[#8c935d]/20 transition-colors">
              <ImageIcon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#a3ab72] transition-colors">
              {text.logoTitle}
            </h3>
            <p className="text-sm text-white/70 leading-relaxed font-medium">
              {text.logoDesc}
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#2f3136] hover:bg-[#2f3136]/90 border border-white/5 hover:border-[#8c935d]/30 p-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-xl group">
            <div className="bg-[#8c935d]/10 w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-[#a3ab72] group-hover:bg-[#8c935d]/20 transition-colors">
              <Type className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#a3ab72] transition-colors">
              {text.nameTitle}
            </h3>
            <p className="text-sm text-white/70 leading-relaxed font-medium">
              {text.nameDesc}
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#2f3136] hover:bg-[#2f3136]/90 border border-white/5 hover:border-[#8c935d]/30 p-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-xl group">
            <div className="bg-[#8c935d]/10 w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-[#a3ab72] group-hover:bg-[#8c935d]/20 transition-colors">
              <LayoutGrid className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#a3ab72] transition-colors">
              {text.bannerTitle}
            </h3>
            <p className="text-sm text-white/70 leading-relaxed font-medium">
              {text.bannerDesc}
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-[#2f3136] hover:bg-[#2f3136]/90 border border-white/5 hover:border-[#8c935d]/30 p-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-xl group">
            <div className="bg-[#8c935d]/10 w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-[#a3ab72] group-hover:bg-[#8c935d]/20 transition-colors">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#a3ab72] transition-colors">
              {text.inviteTitle}
            </h3>
            <p className="text-sm text-white/70 leading-relaxed font-medium">
              {text.inviteDesc}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
