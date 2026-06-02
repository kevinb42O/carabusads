import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { LogoCloud } from './components/LogoCloud';
import { Problem } from './components/Problem';
import { Services } from './components/Services';
import { Results } from './components/Results';
import { Methodology } from './components/Methodology';
import { Boutique } from './components/Boutique';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { ChatWidget } from './components/ChatWidget';
import { LegalPage } from './components/LegalPage';

export default function App() {
  const [activePage, setActivePage] = useState<'home' | 'privacy' | 'terms'>('home');
  const [lang, setLang] = useState<'nl' | 'en'>(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (hostname.endsWith('.be')) return 'nl';
      if (hostname.endsWith('.com')) return 'en';
    }
    return 'nl';
  });

  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      <Header lang={lang} setLang={setLang} setActivePage={setActivePage} />
      <main className="flex-1 w-full flex flex-col">
        {activePage === 'home' ? (
          <>
            <Hero lang={lang} />
        <LogoCloud lang={lang} />
        <Problem lang={lang} />
        <Services lang={lang} />
        <Results lang={lang} />
        <Methodology lang={lang} />
            <Boutique lang={lang} />
            <CTA lang={lang} />
          </>
        ) : (
          <LegalPage type={activePage as 'privacy' | 'terms'} lang={lang} onBack={() => setActivePage('home')} />
        )}
      </main>
      <Footer lang={lang} setActivePage={setActivePage} />
      <ChatWidget lang={lang} />
    </div>
  );
}
