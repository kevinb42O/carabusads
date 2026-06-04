import { useState, useEffect } from 'react';
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
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Wait for critical resources and initial render to complete
    const handleReady = async () => {
      // Wait for fonts to be loaded
      if (document.fonts) {
        await document.fonts.ready;
      }
      
      // Wait for next frame to ensure render is complete
      await new Promise(resolve => requestAnimationFrame(resolve));
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      setIsReady(true);
      
      // Remove the HTML preloader smoothly
      const preloader = document.getElementById('preloader');
      if (preloader) {
        setTimeout(() => {
          preloader.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
          preloader.style.opacity = '0';
          preloader.style.transform = 'scale(1.05)';
          setTimeout(() => preloader.remove(), 600);
        }, 100);
      }
    };
    
    handleReady();
  }, []);
  const [lang, setLang] = useState<'nl' | 'en'>(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (hostname.endsWith('.be')) return 'nl';
      if (hostname.endsWith('.com')) return 'en';
    }
    return 'nl';
  });

  return (
    <div className="min-h-screen flex flex-col w-full overflow-clip">
      <Header lang={lang} setLang={setLang} setActivePage={setActivePage} />
      <main className="flex-1 w-full flex flex-col" style={{ opacity: isReady ? 1 : 0, transition: 'opacity 0.3s ease-in' }}>
        {activePage === 'home' ? (
          <>
            <Hero lang={lang} isReady={isReady} />
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
