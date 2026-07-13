import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  let serverCount = "0";
  let lastUpdate = Date.now();
  const SECRET_KEY = process.env.SECRET_KEY || "dev-secret-key";

  // Webhook for bot to report its server count
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
    
    res.status(400).json({ error: "Donnees manquantes" });
  });

  // Frontend API to read stats
  app.get('/api/stats', (req, res) => {
    const tenMinutes = 10 * 60 * 1000;
    const isOnline = (Date.now() - lastUpdate) < tenMinutes;

    if (!serverCount || serverCount === "0") {
      return res.json({ server: "fallback", online: isOnline });
    }

    res.json({ server: serverCount, online: isOnline });
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
