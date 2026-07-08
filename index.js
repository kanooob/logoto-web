const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 8080;

// 1. Sert d'abord les fichiers statiques normalement (CSS, Images, JS)
app.use(express.static(path.join(__dirname, 'public')));

// 2. Permet d'accéder aux pages sans taper ".html" dans l'URL (ex: site.com/page2)
app.get('/:page', (req, res, next) => {
    const pageName = req.params.page;
    const filePath = path.join(__dirname, 'public', `${pageName}.html`);
    
    res.sendFile(filePath, (err) => {
        if (err) {
            // Si le fichier HTML n'existe pas, on passe à la suite (Erreur 404)
            next();
        }
    });
});

// 3. Page d'accueil par défaut (site.com/)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 4. Gestion de l'erreur 404 : Renvoie ton fichier 404.html personnalisé
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});
