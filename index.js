const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let serverCount = "0";
let lastUpdate = Date.now(); // Enregistre l'heure du dernier ping (initialisé au démarrage)
const SECRET_KEY = process.env.SECRET_KEY;

app.use(express.static(path.join(__dirname, 'public')));

// Ta route POST ultra-robuste qui fonctionne parfaitement
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
        
        // CORRECTION : On met à jour l'heure dès que le bot envoie ses stats avec succès
        lastUpdate = Date.now(); 

        console.log(`[Bot] Compteur mis à jour avec succès : ${serverCount}`);
        return res.json({ success: true, message: "Compteur mis a jour", current: serverCount });
    }
    
    console.log("Corps brut et URL reçus (Échec) :", req.body, req.query);
    res.status(400).json({ error: "Donnees manquantes" });
});

// La route GET améliorée (Le meilleur des deux mondes)
app.get('/api/stats', (req, res) => {
    // 1. Calcul de l'inactivité (10 minutes = 600 000 ms)
    const tenMinutes = 10 * 60 * 1000;
    const isOnline = (Date.now() - lastUpdate) < tenMinutes;

    // 2. Gestion propre du fallback sans bloquer la réponse
    let currentServer = serverCount;
    if (!serverCount || serverCount === "0") {
        currentServer = "fallback";
    }

    // 3. On renvoie l'objet complet attendu par tes pages FR et EN
    res.json({ 
        server: currentServer,
        online: isOnline 
    });
});

app.get(['/', '/index.html'], (req, res) => {
    const targetLang = req.acceptsLanguages(['fr', 'en']) || 'en';
    res.redirect(`/${targetLang}`);
});

app.get(['/help', '/help.html'], (req, res) => {
    const targetLang = req.acceptsLanguages(['fr', 'en']) || 'en';
    res.redirect(`/${targetLang}/help`);
});

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
                    next();
                }
            });
        }
    });
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
    console.log(`Serveur lance sur le port ${PORT}`);
});
