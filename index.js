const express = require('express');
const path = require('path');
const app = express();

// Render fournit automatiquement le port via le process.env
const PORT = process.env.PORT || 8080;

// Servir tous les fichiers statiques (html, css, js, images) du dossier 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Redirection par défaut vers ton index.html si la route n'est pas spécifiée
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Site en ligne sur le port ${PORT}`);
});
