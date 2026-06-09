import { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
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

const ChatWidget = lazy(() => import('./components/ChatWidget').then(m => ({ default: m.ChatWidget })));
const LegalPage = lazy(() => import('./components/LegalPage').then(m => ({ default: m.LegalPage })));

export default function App() {
  const [activePage, setActivePage] = useState<'home' | 'privacy' | 'terms'>('home');
  const [isReady, setIsReady] = useState(false);
  const dismissedRef = useRef(false);

  // Called by FunnelCanvas after its very first frame is drawn.
  // Also fires automatically after 6s as a safety fallback.
  const handleCanvasReady = useCallback(() => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    setIsReady(true);
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.style.pointerEvents = 'none';
      preloader.style.transition = 'opacity 0.5s ease-out';
      preloader.style.opacity = '0';
      setTimeout(() => preloader.remove(), 500);
    }
  }, []);

  useEffect(() => {
    // Hard fallback: dismiss after 6s no matter what
    const fallback = setTimeout(handleCanvasReady, 6000);
    return () => clearTimeout(fallback);
  }, [handleCanvasReady]);

  // Note: Removed body overflow locking here because it breaks Framer Motion's whileInView IntersectionObservers on iOS Safari, resulting in a completely empty page.
  useEffect(() => {
    // Just scroll to top on mount to ensure clean start
    window.scrollTo(0, 0);
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
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      <Header lang={lang} setLang={setLang} setActivePage={setActivePage} />
      <main className="flex-1 w-full flex flex-col">
        {activePage === 'home' ? (
          <>
            <Hero lang={lang} isReady={isReady} onReady={handleCanvasReady} />
            <LogoCloud lang={lang} />
            <Problem lang={lang} />
            <Services lang={lang} />
            <Results lang={lang} />
            <Methodology lang={lang} />
            <Boutique lang={lang} />
            <CTA lang={lang} />
          </>
        ) : (
          <Suspense fallback={<div className="h-screen w-full" />}>
            <LegalPage type={activePage as 'privacy' | 'terms'} lang={lang} onBack={() => setActivePage('home')} />
          </Suspense>
        )}
      </main>
      <Suspense fallback={null}>
        <Footer lang={lang} setActivePage={setActivePage} />
        <ChatWidget lang={lang} />
      </Suspense>
    </div>
  );
}
