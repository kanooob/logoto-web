import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { t } from '../translations';
import { motion } from 'motion/react';
import { Zap, CloudOff } from 'lucide-react';

const Home: React.FC = () => {
  const { lang } = useLanguage();
  const translations = t[lang].home;
  const [stats, setStats] = useState<{ server: string, online: boolean } | null>(null);

  useEffect(() => {
    fetch('/api/stats')
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error('Unable to load stats', err));
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-black mb-6 leading-tight"
      >
        {translations.titleLine1} <br />
        <span className="text-logoto-olive-light">{translations.titleLine2}</span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-lg md:text-xl opacity-80 max-w-2xl mb-10"
      >
        {translations.subtitle}
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4 mb-12"
      >
        <a href="https://discord.com/oauth2/authorize?client_id=1431383390162124920" target="_blank" rel="noopener noreferrer" className="bg-logoto-olive text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-logoto-olive-dark hover:scale-105 transition-all shadow-lg">
          {translations.addDiscordBtn}
        </a>
        <a href={`/${lang}/help`} className="bg-logoto-item text-white border border-transparent hover:border-logoto-olive px-8 py-3 rounded-lg font-bold text-lg hover:bg-logoto-code transition-all shadow-lg">
          {translations.learnMoreBtn}
        </a>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center gap-2 bg-logoto-item px-5 py-2.5 rounded-full text-sm font-semibold border border-white/5"
      >
        {stats?.online === false ? (
          <CloudOff size={18} className="text-gray-400" />
        ) : (
          <Zap size={18} className="text-yellow-400" />
        )}
        <span>
          {stats?.server && stats.server !== 'fallback' 
            ? translations.serversText.replace('{count}', stats.server) 
            : translations.serversFallback}
        </span>
      </motion.div>
    </div>
  );
};

export default Home;
