import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { t } from '../translations';
import { ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Layout: React.FC = () => {
  const { lang, toggleLang } = useLanguage();
  const location = useLocation();
  const translations = t[lang];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex flex-col md:flex-row justify-between items-center py-5 px-6 md:px-12 w-full max-w-7xl mx-auto gap-4 md:gap-0">
        <Link to="/" className="flex items-center gap-3 text-white hover:scale-105 transition-transform">
          <img src="https://raw.githubusercontent.com/kanooob/logoto-web/refs/heads/main/icon.png" alt="Logoto Logo" className="w-10 h-10 object-contain hover:rotate-12 transition-transform" />
          <div className="text-2xl font-black tracking-wide">Logoto</div>
        </Link>

        <nav className="flex flex-col md:flex-row items-center gap-4 md:gap-10">
          <ul className="flex gap-6 text-white font-semibold opacity-80">
            <li>
              <Link to={`/${lang}`} className={`hover:opacity-100 hover:text-logoto-olive-light transition-colors ${location.pathname === `/${lang}` || location.pathname === '/' ? 'text-logoto-olive-light opacity-100' : ''}`}>
                {translations.nav.home}
              </Link>
            </li>
            <li>
              <Link to={`/${lang}/help`} className={`hover:opacity-100 hover:text-logoto-olive-light transition-colors ${location.pathname.includes('/help') ? 'text-logoto-olive-light opacity-100' : ''}`}>
                {translations.nav.docs}
              </Link>
            </li>
            <li>
              <a href="https://discord.com/invite/TPXFVYVnXe" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 hover:text-logoto-olive-light transition-colors">
                {translations.nav.support}
              </a>
            </li>
          </ul>

          <div className="flex items-center gap-4">
            <button onClick={toggleLang} className="font-bold flex items-center gap-1 hover:text-logoto-olive-light transition-colors">
              {lang.toUpperCase()} <ArrowDown size={16} />
            </button>
            <a href="https://discord.com/oauth2/authorize?client_id=1431383390162124920" target="_blank" rel="noopener noreferrer" className="bg-logoto-olive hover:bg-logoto-olive-dark text-white px-5 py-2.5 rounded-lg font-bold transition-all shadow-md">
              {translations.nav.addBot}
            </a>
          </div>
        </nav>
      </header>

      <main className="flex-1 flex flex-col w-full max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col w-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-logoto-footer py-6 px-6 md:px-12 w-full mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto text-sm opacity-70 gap-4 md:gap-0">
          <p>{translations.footer.hostedInfo}</p>
          <div className="flex gap-6">
            <Link to={`/${lang}/legal#tos`} className="hover:text-logoto-olive-light transition-colors">{translations.footer.tos}</Link>
            <Link to={`/${lang}/legal#privacy`} className="hover:text-logoto-olive-light transition-colors">{translations.footer.privacy}</Link>
            <a href="https://github.com/kanooob/Logoto" target="_blank" rel="noopener noreferrer" className="hover:text-logoto-olive-light transition-colors">{translations.footer.source}</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
