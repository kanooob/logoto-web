import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { t } from '../translations';

const NotFound: React.FC = () => {
  const { lang } = useLanguage();
  const translations = t[lang];

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-8xl font-black text-logoto-olive-light mb-6"
      >
        404
      </motion.div>
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-4xl font-bold mb-4"
      >
        {translations.notFound.title}
      </motion.h1>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-lg opacity-80 max-w-md mb-10 whitespace-pre-line"
      >
        {translations.notFound.description}
      </motion.p>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Link to={`/${lang}`} className="bg-logoto-olive text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-logoto-olive-dark transition-all shadow-lg inline-block">
          {translations.nav.home}
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
