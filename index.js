const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 8080;

// 1. Sert d'abord les fichiers statiques normalement (CSS, Images, JS)
app.use(express.static(path.join(__dirname, 'public')));

// 3. Page d'accueil par défaut (site.com/)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 2. MODIFIÉ : Permet d'accéder aux pages ET sous-pages sans taper ".html" (ex: site.com/page2 ou site.com/fr/help)
app.get('/*', (req, res, next) => {
    let reqPath = req.params[0] || req.path;

    // Si l'URL se termine par un "/", on cherche un fichier index.html dans ce dossier (ex: /fr/ -> /fr/index.html)
    if (reqPath.endsWith('/')) {
        reqPath += 'index';
    }

    const filePath = path.join(__dirname, 'public', `${reqPath}.html`);
    
    res.sendFile(filePath, (err) => {
        if (err) {
            // Si le fichier précis n'existe pas, on tente de voir si c'est un dossier sans "/" (ex: /fr -> /fr/index.html)
            const indexPath = path.join(__dirname, 'public', reqPath, 'index.html');
            res.sendFile(indexPath, (err2) => {
                if (err2) {
                    // Si rien ne correspond, on passe à la suite (Erreur 404)
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
