import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { docsData } from '../data/docsContent';
import { t } from '../translations';
import Markdown from 'react-markdown';
import { Hash } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Documentation: React.FC = () => {
  const { lang } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<'setup' | 'howItWorks' | 'commands' | 'events' | 'links'>('setup');
  const [activeEventTab, setActiveEventTab] = useState('logo');
  const [activeLinkTab, setActiveLinkTab] = useState('github');

  const data = docsData[lang];
  const translations = t[lang].docs;

  const sections = [
    { id: 'setup', label: translations.sidebarSetup },
    { id: 'howItWorks', label: translations.sidebarHowItWorks },
    { id: 'commands', label: translations.sidebarCommands },
    { id: 'events', label: translations.sidebarEvents },
    { id: 'links', label: translations.sidebarLinks },
  ] as const;

  useEffect(() => {
    const hash = location.hash.replace('#', '').toLowerCase();
    const matchedSection = sections.find(sec => sec.id.toLowerCase() === hash);
    if (matchedSection) {
      setActiveSection(matchedSection.id as any);
    } else if (!hash) {
      navigate(`#setup`, { replace: true });
    }
  }, [location, navigate, sections]);

  const handleSectionClick = (id: string) => {
    navigate(`#${id}`);
  };

  return (
    <div className="flex flex-col md:flex-row w-full px-6 py-10 gap-10">
      <aside className="w-full md:w-64 flex-shrink-0 flex flex-col gap-4">
        {sections.map((sec) => (
          <button
            key={sec.id}
            onClick={() => handleSectionClick(sec.id)}
            className={`text-left font-bold text-lg px-4 py-2 rounded-lg transition-all ${
              activeSection === sec.id 
                ? 'bg-logoto-olive/10 text-logoto-olive-light border-l-4 border-logoto-olive-light' 
                : 'text-white/60 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
            }`}
          >
            {sec.label}
          </button>
        ))}
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
              <Hash className="opacity-50" />
              {data[activeSection].title}
            </h1>

            {activeSection === 'setup' || activeSection === 'howItWorks' || activeSection === 'commands' ? (
              <div className="markdown-body">
                <Markdown>{data[activeSection].content}</Markdown>
              </div>
            ) : null}

            {activeSection === 'events' && (
              <div className="flex flex-col gap-6">
                <div className="markdown-body">
                  <Markdown>{data.events.intro}</Markdown>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.events.tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveEventTab(tab.id)}
                      className={`p-5 rounded-lg border-2 text-left transition-all ${
                        activeEventTab === tab.id
                          ? 'border-logoto-olive-light bg-logoto-olive/10'
                          : 'border-transparent bg-logoto-item hover:bg-logoto-item/80'
                      }`}
                    >
                      <h3 className="text-xl font-bold mb-1">{tab.title}</h3>
                      <p className="text-sm opacity-70">{tab.desc}</p>
                    </button>
                  ))}
                </div>

                <div className="bg-logoto-footer p-6 rounded-lg border-l-4 border-logoto-olive-light mt-4">
                  <div className="markdown-body">
                    <Markdown>{data.events.tabs.find(t => t.id === activeEventTab)?.content || ''}</Markdown>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'links' && (
              <div className="flex flex-col gap-6">
                <div className="markdown-body">
                  <Markdown>{data.links.intro}</Markdown>
                </div>

                <div className="flex gap-4">
                  {data.links.tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveLinkTab(tab.id)}
                      className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${
                        activeLinkTab === tab.id
                          ? 'bg-logoto-olive text-white'
                          : 'bg-logoto-code text-white/80 hover:bg-logoto-code/80'
                      }`}
                    >
                      {tab.title}
                    </button>
                  ))}
                </div>

                <div className="bg-logoto-footer p-6 rounded-lg border-l-4 border-logoto-olive-light mt-4">
                  <div className="markdown-body">
                    <Markdown>{data.links.tabs.find(t => t.id === activeLinkTab)?.content || ''}</Markdown>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Documentation;
