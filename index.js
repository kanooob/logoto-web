const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let serverCount = "0";
let lastUpdate = Date.now();
const SECRET_KEY = process.env.SECRET_KEY;

// ------------- CACHE BETTER UPTIME -------------
let uptimeCache = null;
let uptimeCacheTime = 0;
const UPTIME_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes de cache
// -----------------------------------------------

// Serveur de fichiers statiques (CSS, JS, images) avec option de cache
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: '1d'
}));

// ------------- FICHIERS MOTEURS DE RECHERCHE (SEO) -------------
app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.sendFile(path.join(__dirname, 'public', 'robots.txt'));
});

app.get('/sitemap.xml', (req, res) => {
    res.type('application/xml');
    res.sendFile(path.join(__dirname, 'public', 'sitemap.xml'));
});
// -------------------------------------------------------------

// ------------- ROUTE STATUS BETTER UPTIME -------------
app.get('/api/status', async (req, res) => {
    const now = Date.now();

    // Verification du cache (5 minutes)
    if (uptimeCache && (now - uptimeCacheTime < UPTIME_CACHE_DURATION)) {
        return res.json(uptimeCache);
    }

    try {
        const response = await fetch('https://logoto.betteruptime.com/fr/index.json');
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);

        const json = await response.json();

        // 1. Filtrer pour garder uniquement la ressource "Logoto Bot"
        const resources = (json.included || []).filter(item => 
            item.type === 'status_page_resource' && 
            item.attributes && 
            item.attributes.public_name === 'Logoto Bot'
        );

        // 2. Formater le tableau des services
        const services = resources.map(item => {
            const attr = item.attributes || {};
            const availPct = attr.availability ? (attr.availability * 100).toFixed(2) : "100.00";
            
            return {
                name: attr.public_name || 'Logoto Bot',
                status: attr.status || 'operational',
                availability: availPct
            };
        });

        // 3. Calcul de la disponibilite globale (basee uniquement sur Logoto Bot)
        const globalAvail = services.length ? services[0].availability : "100.00";

        uptimeCache = {
            success: true,
            globalAvailability: globalAvail,
            services: services,
            cachedAt: new Date().toISOString()
        };

        uptimeCacheTime = now;
        res.json(uptimeCache);

    } catch (error) {
        console.error("Erreur récupération BetterUptime:", error.message);

        if (uptimeCache) {
            return res.json(uptimeCache);
        }

        res.status(500).json({ success: false, error: 'Impossible de récupérer le statut' });
    }
});
// ------------------------------------------------------------------

// ------------- UTILITAIRE & ROUTES API FUSEAU / DATE 00H -------------
function getDateAtMidnightZone() {
    const now = new Date();
    const utcHour = now.getUTCHours();
    
    let offset = (24 - utcHour) % 24;
    if (offset > 12) offset -= 24;

    const targetDate = new Date(now.getTime() + (offset * 3600 * 1000));
    return { offset, targetDate };
}

app.get('/api/fuzeau00h', (req, res) => {
    const { offset } = getDateAtMidnightZone();
    const formattedOffset = offset >= 0 ? `+${offset}` : `${offset}`;
    res.type('text/plain').send(formattedOffset);
});

app.get('/api/jour00h', (req, res) => {
    const { targetDate } = getDateAtMidnightZone();
    res.type('text/plain').send(targetDate.getUTCDate().toString());
});

app.get('/api/mois00h', (req, res) => {
    const { targetDate } = getDateAtMidnightZone();
    res.type('text/plain').send((targetDate.getUTCMonth() + 1).toString());
});
// ----------------------------------------------------------------------

// Route POST Compteur Serveur
app.post('/api/serveur-counte', (req, res) => {
    const clientKey = req.headers['key'];
    
    if (!SECRET_KEY || !clientKey || clientKey !== SECRET_KEY) {
        return res.status(404).json({ error: "Cle secrete invalide" });
    }
    
    let incomingCount = req.query.server;

    if (!incomingCount && req.body) {
        if (req.body.server) {
            incomingCount = req.body.server;
        } else if (typeof req.body === 'object' && Object.keys(req.body).length > 0) {
            incomingCount = Object.keys(req.body)[0];
        } else if (typeof req.body === 'string') {
            incomingCount = req.body;
        }
    }

    if (incomingCount && String(incomingCount).includes('[object Object]')) {
        incomingCount = null;
    }

    if (incomingCount !== null && incomingCount !== undefined) {
        serverCount = String(incomingCount).trim();
        lastUpdate = Date.now();

        console.log(`[Bot] Compteur mis à jour avec succès : ${serverCount}`);
        return res.json({ success: true, message: "Compteur mis a jour", current: serverCount });
    }
    
    console.log("Corps brut et URL reçus (Échec) :", req.body, req.query);
    res.status(400).json({ error: "Donnees manquantes" });
});

// Route GET Stats
app.get('/api/stats', (req, res) => {
    const tenMinutes = 10 * 60 * 1000;
    const isOnline = (Date.now() - lastUpdate) < tenMinutes;

    if (!serverCount || serverCount === "0") {
        return res.json({ server: "fallback", online: isOnline });
    }

    res.json({ 
        server: serverCount,
        online: isOnline
    });
});

// ------------- REDIRECTIONS DE LANGUE -------------
app.get(['/', '/index.html'], (req, res) => {
    const targetLang = req.acceptsLanguages(['fr', 'en']) || 'en';
    res.redirect(`/${targetLang}`);
});

app.get(['/help', '/help.html'], (req, res) => {
    const targetLang = req.acceptsLanguages(['fr', 'en']) || 'en';
    res.redirect(`/${targetLang}/help`);
});

app.get(['/legal', '/legal.html'], (req, res) => {
    const targetLang = req.acceptsLanguages(['fr', 'en']) || 'en';
    res.redirect(`/${targetLang}/legal`);
});

app.get(['/tos', '/tos.html'], (req, res) => {
    const targetLang = req.acceptsLanguages(['fr', 'en']) || 'en';
    res.redirect(`/${targetLang}/legal#tos`);
});

app.get(['/privacy', '/privacy.html'], (req, res) => {
    const targetLang = req.acceptsLanguages(['fr', 'en']) || 'en';
    res.redirect(`/${targetLang}/legal#privacy`);
});
// --------------------------------------------------

// ROUTAGE ET CHARGEMENT DES PAGES HTML
app.get('/*', (req, res, next) => {
    let reqPath = req.params[0] || req.path;
    if (reqPath.endsWith('/')) {
        reqPath += 'index';
    }
    const filePath = path.join(__dirname, 'public', `${reqPath}.html`);
    
    res.sendFile(filePath, (err) => {
        if (err) {
            const indexPath = path.join(__dirname, 'public', reqPath, 'index.html');
            res.sendFile(indexPath, (err2) => {
                if (err2) {
                    next(); // Passe au middleware 404
                }
            });
        }
    });
});

// GESTION ERREUR 404 (Code statut HTTP 404 explicite)
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});
