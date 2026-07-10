const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 8080;

// 1. Sert d'abord les fichiers statiques normalement (CSS, Images, JS)
app.use(express.static(path.join(__dirname, 'public')));

// 3. Page d'accueil par défaut (site.com/) et redirection /index.html
// Détecte la langue du navigateur et redirige vers /fr ou /en
app.get(['/', '/index.html'], (req, res) => {
    const targetLang = req.acceptsLanguages(['fr', 'en']) || 'en';
    res.redirect(`/${targetLang}`);
});

// 2. Permet d'accéder aux pages ET sous-pages sans taper ".html" (ex: site.com/fr/help)
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

// 4. Gestion de l'erreur 404 : Renvoie ton fichier 404.html personnalisé
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});
