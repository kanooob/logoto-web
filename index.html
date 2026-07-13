import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { legalData } from '../data/legalContent';
import { t } from '../translations';
import Markdown from 'react-markdown';
import { Scale } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Legal: React.FC = () => {
  const { lang } = useLanguage();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<'tos' | 'privacy'>('tos');

  const data = legalData[lang];
  const translations = t[lang].legal;

  useEffect(() => {
    if (location.hash === '#privacy') {
      setActiveSection('privacy');
    } else {
      setActiveSection('tos');
    }
  }, [location]);

  return (
    <div className="flex flex-col md:flex-row w-full px-6 py-10 gap-10">
      <aside className="w-full md:w-64 flex-shrink-0 flex flex-col gap-4">
        <button
          onClick={() => { setActiveSection('tos'); window.history.replaceState(null, '', '#tos') }}
          className={`text-left font-bold text-lg px-4 py-2 rounded-lg transition-all ${
            activeSection === 'tos' 
              ? 'bg-logoto-olive/10 text-logoto-olive-light border-l-4 border-logoto-olive-light' 
              : 'text-white/60 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
          }`}
        >
          {translations.sidebarTos}
        </button>
        <button
          onClick={() => { setActiveSection('privacy'); window.history.replaceState(null, '', '#privacy') }}
          className={`text-left font-bold text-lg px-4 py-2 rounded-lg transition-all ${
            activeSection === 'privacy' 
              ? 'bg-logoto-olive/10 text-logoto-olive-light border-l-4 border-logoto-olive-light' 
              : 'text-white/60 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
          }`}
        >
          {translations.sidebarPrivacy}
        </button>
      </aside>

      <div className="hidden md:block w-[1px] bg-white/10 self-stretch"></div>

      <main className="flex-1 max-w-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
          >
            <h1 className="text-3xl font-black text-logoto-olive-light mb-6 flex items-center gap-2">
              <Scale className="opacity-50" />
              {data[activeSection].title}
            </h1>

            <div className="markdown-body">
              <Markdown>{data[activeSection].content}</Markdown>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Legal;
