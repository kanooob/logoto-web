export const docsData = {
  fr: {
    setup: {
      title: "Configuration (Setup)",
      content: `Je suis le bot spécialisé dans l'automatisation du changement de logo, de nom, de bannière et d'image d'invitation de votre serveur Discord, sans nécessiter de configurations ou de lignes de code complexes.

## Premiers pas
Pour commencer à utiliser le bot au maximum de ses capacités, lancez simplement la commande de configuration initiale.

* \`/setup\` : Première commande à faire. Crée automatiquement la catégorie et les salons nécessaires (Logoto, log-logoto) pour un démarrage rapide.

> **NOTE IMPORTANTE :** Le salon nommé \`log-logoto\` **doit impérativement exister** sur votre serveur pour assurer le suivi technique.
>
> Le bot utilise ce salon pour envoyer ses messages techniques quotidiens de chargement. Attention, **ces messages ne sont envoyés que si un changement est effectivement programmé le jour même**. S'il n'y a aucun événement, aucun log n'est posté.`
    },
    howItWorks: {
      title: "Fonctionnement Général",
      content: `Logoto surveille de manière autonome la présence de salons textuels spécifiques au sein de votre serveur Discord pour planifier et exécuter vos mises à jour esthétiques.

> **Planification horaire :** Toutes les mises à jour et vérifications automatiques configurées sur votre serveur s'exécutent chaque jour précisément à **00h00 UTC**.

## Règles de priorité et limites
Pour garantir la stabilité du serveur et respecter les quotas de l'API Discord, Logoto applique des règles strictes de gestion quotidienne :

1. **Un seul changement par type et par jour :** Le nom du serveur peut changer une fois par jour, le logo une fois, la bannière une fois, et le fond d'invitation une fois.
2. **Modifications simultanées :** Il est tout à fait possible de changer le logo ET le nom (ou tout autre élément) le même jour. Les deux actions s'exécuteront à 00h00 UTC.
3. **Gestion des doublons (Priorité visuelle) :** Si vous avez créé par erreur plusieurs salons pour le même élément le même jour (par exemple deux salons \`l-25-12\` avec des logos différents), **c'est le salon situé le plus haut dans la liste de vos catégories Discord qui prime** et qui sera appliqué par le bot.`
    },
    commands: {
      title: "Les Commandes du Bot Logoto",
      content: `Découvrez la liste complète des commandes intégrées disponibles directement avec le système de Slash Commands de Discord :

* \`/setup\` : Première commande à faire. Crée automatiquement la catégorie et les salons nécessaires pour un démarrage rapide.
* \`/add-an-event\` : Crée automatiquement un salon de planification au bon format pour vos événements futurs.
* \`/help\` : Affiche la liste des commandes du bot.
* \`/info\` : Renvoie toutes les informations utiles concernant l'état actuel et le statut du bot.
* \`/ping\` : Obtenez la latence en temps réel entre le bot et l'API Discord.
* \`/invite\` : Obtenez le lien d'invitation officiel pour ajouter Logoto sur votre propre serveur.
* \`/support\` : Rejoignez notre serveur de support pour poser vos questions ou obtenir de l'aide.`
    },
    events: {
      title: "Ajouter un événement",
      intro: `Sélectionnez ci-dessous l'élément graphique ou textuel que vous souhaitez planifier automatiquement sur votre serveur Discord pour afficher le tutoriel détaillé de mise en place :

> **ATTENTION CONCERNANT LES IMAGES :** Ne copiez jamais de liens d'images directement depuis un salon Discord (liens CDN Discord). Ces derniers possèdent désormais des clés de sécurité temporaires et expirent au bout de 24 à 48 heures.`,
      tabs: [
        { id: 'logo', title: 'Changement de Logo', desc: 'Automatisez la photo de profil.', content: `### Configuration du Logo Automatique\n\n1. **Créez le Salon de Planification :**\n   Le salon doit suivre scrupuleusement le format : \`l-[JOUR]-[MOIS]\`.\n   *EXEMPLE : Pour Halloween (31 octobre) : \`l-31-10\`*\n2. **Préparez le Logo :**\n   Obtenez un **lien d'image permanent** (via GitHub ou ImgBB) se terminant par un format valide (\`.png\`, \`.jpg\`).\n   Taille recommandée : 512 × 512 pixels.\n3. **Planifiez le Changement :**\n   Modifiez le **Sujet du Salon** (Channel Topic) et collez l'URL permanente.\n4. **Résultat :**\n   Le bot changera automatiquement la photo de profil à 00h00 UTC.` },
        { id: 'name', title: 'Changement de Nom', desc: 'Modifiez automatiquement le titre.', content: `### Configuration du Nom Automatique\n\n1. **Créez le Salon de Planification :**\n   Le salon doit suivre le format : \`n-[JOUR]-[MOIS]\`.\n   *EXEMPLE : Pour le 1er Janvier : \`n-1-1\`*\n2. **Planifiez le Changement :**\n   Modifiez le **Sujet du Salon** (Channel Topic) et écrivez textuellement le **nouveau nom complet**.\n3. **Résultat :**\n   Le bot appliquera automatiquement le nouveau nom à 00h00 UTC.` },
        { id: 'banner', title: 'Changement de Bannière', desc: 'Planifiez une illustration.', content: `### Configuration de la Bannière Automatique\n\n*Note : Votre serveur doit posséder le niveau de Boost requis (Niveau 2+).*\n\n1. **Créez le Salon de Planification :**\n   Le salon doit suivre le format : \`b-[JOUR]-[MOIS]\`.\n2. **Préparez la Bannière :**\n   Générez un lien direct permanent d'une image externe (960 × 540 pixels).\n3. **Planifiez le Changement :**\n   Collez ce lien dans le **Sujet du Salon**.\n4. **Résultat :**\n   Logoto appliquera la bannière à 00h00 UTC.` },
        { id: 'invite', title: 'Fond d\'invitation', desc: 'Personnalisez l\'arrière-plan.', content: `### Configuration du Fond d'Invitation Automatique\n\n*Note : Votre serveur doit posséder le niveau de Boost requis (Niveau 1+).*\n\n1. **Créez le Salon de Planification :**\n   Le salon doit suivre le format : \`i-[JOUR]-[MOIS]\`.\n2. **Préparez l'Image :**\n   Générez un lien direct permanent (1920 × 1080 pixels).\n3. **Planifiez le Changement :**\n   Collez le lien dans le **Sujet du Salon**.\n4. **Résultat :**\n   L'illustration s'appliquera à 00h00 UTC.` }
      ]
    },
    links: {
      title: "Obtenir un lien d'image persistant",
      intro: `Pour que Logoto puisse appliquer vos logos, bannières ou images d'invitation à l'avenir, l'URL que vous lui fournissez doit rester accessible de manière permanente. Les liens directs Discord expirent rapidement. Choisissez l'une des méthodes recommandées :`,
      tabs: [
        { id: 'github', title: 'GitHub (Recommandé)', content: `### Héberger via GitHub (Ultra-stable)\n\n1. **Créez un dépôt public :** Allez sur GitHub, créez un dépôt **Public** avec un fichier README.\n2. **Téléversez vos images :** Cliquez sur "Add file" > "Upload files".\n3. **Obtenez l'URL brute (Raw) :** Cliquez sur votre image, puis sur le bouton **"Raw"**.\n   L'URL doit commencer par : \`https://raw.githubusercontent.com/...\`` },
        { id: 'imgbb', title: 'ImgBB / Imgur', content: `### Hébergeurs Gratuits (ImgBB / Imgur)\n\n1. Rendez-vous sur [ImgBB](https://imgbb.com).\n2. Téléversez votre image sans date d'expiration.\n3. Sélectionnez l'option **"Lien direct"** (Direct Link).\n4. Vérifiez que l'URL se termine par l'extension du fichier (\`.png\`, \`.jpg\`).\n5. Copiez ce lien direct dans le sujet de votre salon.` }
      ]
    }
  },
  en: {
    setup: {
      title: "Configuration (Setup)",
      content: `Logoto is a specialized bot designed to automate changing your Discord server's icon, name, banner, and invite splash backgrounds without requiring complex setup structures or lines of code.

## Getting Started
To begin utilizing the bot to its full capacity, simply run the initial server deployment command.

* \`/setup\` : The essential first command. Automatically builds the required category and logging channels (Logoto, log-logoto) for a quick launch.

> **IMPORTANT NOTE:** The channel named \`log-logoto\` **must exist** on your server to handle automatic operation diagnostics.
>
> The bot uses this channel to post daily engineering load logs. Note that **these updates are only generated if an automated asset swap is actively scheduled for that specific date**.`
    },
    howItWorks: {
      title: "General Workflow",
      content: `Logoto autonomously scans for the presence of specific scheduled text channels inside your Discord server to index, stage, and execute your visual updates.

> **Cron Schedule:** All automated verifications and server adjustments apply systematically every day at exactly **00:00 UTC**.

## Priority Rules & Limitations
To preserve server stability and comply with standard Discord API rate limits, Logoto follows specific handling parameters:

1. **One alteration per asset type daily:** The server name can change once per day, the server icon once, the banner once, and the invitation background splash once.
2. **Simultaneous edits:** You can perfectly combine icon adjustments AND a server name update on the exact same calendar date. Both execute at 00:00 UTC.
3. **Duplicate channels (Visual Priority):** If you accidentially build multiple channels for the same asset type on the same date, **the channel nested highest up in your Discord category list takes absolute priority**.`
    },
    commands: {
      title: "Logoto Bot Commands",
      content: `Explore the complete list of built-in features accessible straight out of the box using Discord's official Slash Commands:

* \`/setup\` : The essential first command. Automatically builds required channels.
* \`/add-an-event\` : Instantly creates a formatting-compliant text channel.
* \`/help\` : Displays the operational dashboard commands directory.
* \`/info\` : Returns technical data regarding operational status.
* \`/ping\` : Tests connection latency.
* \`/invite\` : Fetches the official authorization link.
* \`/support\` : Points to our central support server.`
    },
    events: {
      title: "Add an Event",
      intro: `Select a graphic or textual element below to display its detailed step-by-step scheduling implementation guide:

> **ASSET LINK WARNING:** Never copy direct image URLs straight out of a Discord text channel. These expire completely within 24 to 48 hours.`,
      tabs: [
        { id: 'logo', title: 'Server Icon', desc: 'Automate your profile picture.', content: `### Automated Server Icon Setup\n\n1. **Create the Planning Channel:**\n   Syntax: \`l-[DAY]-[MONTH]\`.\n   *EXAMPLE: For Halloween: \`l-31-10\`*\n2. **Prepare your Graphic File:**\n   Obtain a **permanent asset URL** (\`.png\`, \`.jpg\`).\n   Format: Square 512 × 512 pixels.\n3. **Schedule the Update:**\n   Paste your URL inside the **Channel Topic**.\n4. **Execution:**\n   The bot updates the icon at exactly 00:00 UTC.` },
        { id: 'name', title: 'Server Name', desc: 'Adjust the structural title.', content: `### Automated Server Name Setup\n\n1. **Create the Planning Channel:**\n   Syntax: \`n-[DAY]-[MONTH]\`.\n   *EXAMPLE: New Year: \`n-1-1\`*\n2. **Schedule the Update:**\n   Type your **complete new server text string** directly into the **Channel Topic**.\n3. **Execution:**\n   The bot updates the title at 00:00 UTC.` },
        { id: 'banner', title: 'Server Banner', desc: 'Schedule slide illustrations.', content: `### Automated Server Banner Setup\n\n*Note: Required server Boost tier status (Level 2+).*\n\n1. **Create the Planning Channel:**\n   Syntax: \`b-[DAY]-[MONTH]\`.\n2. **Prepare your Graphic File:**\n   Permanent direct URL (960 × 540 pixels).\n3. **Schedule the Update:**\n   Paste link into **Channel Topic**.\n4. **Execution:**\n   Logoto applies the graphic at 00:00 UTC.` },
        { id: 'invite', title: 'Invite Splash', desc: 'Personalize generic invites.', content: `### Automated Invite Splash Setup\n\n*Note: Required server Boost tier status (Level 1+).*\n\n1. **Create the Planning Channel:**\n   Syntax: \`i-[DAY]-[MONTH]\`.\n2. **Prepare your Graphic File:**\n   Permanent direct URL (1920 × 1080 pixels).\n3. **Schedule the Update:**\n   Paste URL straight into the **Channel Topic**.\n4. **Execution:**\n   Illustration rolls out at 00:00 UTC.` }
      ]
    },
    links: {
      title: "Get a Permanent Image Link",
      intro: `For Logoto to retrieve your assets, the URL must remain permanently online. Because direct Discord URLs break quickly, you must rely on a dedicated third-party asset hosting platform.`,
      tabs: [
        { id: 'github', title: 'GitHub (Recommended)', content: `### Hosting via GitHub (Ultra-Stable)\n\n1. **Create a public repository:** With a README file.\n2. **Upload your files:** Click "Add file" > "Upload files".\n3. **Get the Raw direct URL:** Click your file, then click the **"Raw"** button.\n   The URL should start with: \`https://raw.githubusercontent.com/...\`` },
        { id: 'imgbb', title: 'ImgBB / Imgur', content: `### Free Dedicated Image Hosts\n\n1. Navigate to [ImgBB](https://imgbb.com).\n2. Upload your graphics file (no expiration).\n3. Select the **"Direct Link"** option.\n4. Double-check the URL ends with an image extension (\`.png\`, \`.jpg\`).\n5. Paste this direct link into your Discord channel topic.` }
      ]
    }
  }
};
