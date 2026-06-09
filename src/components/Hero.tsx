import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { FunnelCanvas } from './FunnelCanvas';
import { HeroMobile } from './HeroMobile';

interface HeroProps {
  lang: 'nl' | 'en';
  isReady?: boolean;
  onReady?: () => void;
}

const contentDict = {
  nl: {
    h1: (
      <>
        Echte leads. <br className="hidden md:block"/>
        Voorspelbare <span className="font-serif italic font-light text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.4)] relative pr-2">groei.</span>
      </>
    ),
    p: "Wij bouwen advertentiecampagnes die écht werken. Geen ijdelheidsstatistieken, maar een heldere strategie om de juiste klanten naar je bedrijf te halen.",
    ctaPrimary: "Gratis Audit Aanvragen",
    ctaSecondary: "Bekijk ons werk",
    punchline1: "De meeste bureaus gokken maar wat.",
    punchline2_1: "Wij meten",
    punchline2_2: "alles.",
    punchline2_3: "Wij leveren",
    punchline2_4: "resultaat."
  },
  en: {
    h1: (
      <>
        Real leads. <br className="hidden md:block"/>
        Predictable <span className="font-serif italic font-light text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.4)] relative pr-2">growth.</span>
      </>
    ),
    p: "We build advertising campaigns that actually work. No vanity metrics, just a clear strategy to bring the right customers to your business.",
    ctaPrimary: "Get a Free Audit",
    ctaSecondary: "View our work",
    punchline1: "Most agencies just guess.",
    punchline2_1: "We measure",
    punchline2_2: "everything.",
    punchline2_3: "We deliver",
    punchline2_4: "results."
  }
};

export function Hero({ lang, isReady = false, onReady }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const { scrollYProgress: rawProgress } = useScroll({
    target: containerRef,
    offset: ["start start", isMobile ? "end start" : "end end"]
  });

  // Always call useSpring (rules of hooks), but only USE it on desktop.
  // On mobile the spring lags badly behind fast touch swipes — phases get skipped.
  const springProgress = useSpring(rawProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001
  });
  const scrollYProgress = springProgress;

  // --- Background Canvas ---
  const bgBlurValue = useTransform(scrollYProgress, [0.7, 1], [0, prefersReducedMotion ? 0 : 20]);
  const bgOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  // --- End-state background image --- fades in ONLY at the very end of the hero animation
  // Max opacity 0.3 so it's atmospheric/visible behind the animation, never fully covers
  const bgImageOpacity = useTransform(scrollYProgress, [0.75, 0.98], [0, 0.3]);

  // --- Phase 1: The Fly-Through (Initial Content) ---
  const initialScale = useTransform(scrollYProgress, [0, 0.25], [1, prefersReducedMotion ? 1 : 4]);
  const initialOpacity = useTransform(scrollYProgress, [0.1, 0.25], [1, 0]);
  const initialBlur = useTransform(scrollYProgress, [0, 0.25], ["blur(0px)", prefersReducedMotion ? "blur(0px)" : "blur(20px)"]);
  const initialPointerEvents = useTransform(scrollYProgress, v => (v > 0.05 ? "none" : "auto") as "none" | "auto");
  const initialDisplay = useTransform(scrollYProgress, v => (v > 0.26 ? "none" : "flex") as "none" | "flex");

  // --- Phase 2: The Masked Reveal (Punchline 1) ---
  const p1Opacity = useTransform(scrollYProgress, [0.25, 0.35, 0.5, 0.6], [0, 1, 1, 0]);
  const p1Y = useTransform(scrollYProgress, [0.25, 0.35], [prefersReducedMotion ? 0 : 100, 0]);
  const p1Scale = useTransform(scrollYProgress, [0.35, 0.6], [1, prefersReducedMotion ? 1 : 0.8]);
  const p1Blur = useTransform(scrollYProgress, [0.5, 0.6], ["blur(0px)", prefersReducedMotion ? "blur(0px)" : "blur(15px)"]);
  const p1Display = useTransform(scrollYProgress, v => (v < 0.24 || v > 0.61 ? "none" : "flex") as "none" | "flex");

  // --- Phase 3: The Glowing Focus (Punchline 2) ---
  const p2Opacity = useTransform(scrollYProgress, [0.65, 0.75, 0.9, 1], [0, 1, 1, 0]);
  const p2Scale = useTransform(scrollYProgress, [0.65, 0.9], [prefersReducedMotion ? 1 : 1.1, 1]);
  const p2TextShadow = useTransform(
    scrollYProgress, 
    [0.65, 0.8], 
    ["0px 0px 0px rgba(255,255,255,0)", prefersReducedMotion ? "0px 0px 0px rgba(255,255,255,0)" : "0px 0px 40px rgba(255,255,255,0.6)"]
  );
  const p2Display = useTransform(scrollYProgress, v => (v < 0.64 ? "none" : "flex") as "none" | "flex");

  // Early return for mobile AFTER all hooks have been called
  if (isMobile) {
    return <HeroMobile lang={lang} onReady={onReady} content={contentDict[lang]} />;
  }

  const content = contentDict[lang];

  return (
    <section ref={containerRef} className="relative bg-[#6093ac]" style={{ height: "400vh" }}>
      
      <div 
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: '#6093ac' }}
      >
        
        {/* End-state background: fades in ONLY at the end of the hero animation */}
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none bg-cover bg-center bg-no-repeat"
          style={{
            opacity: bgImageOpacity,
            backgroundImage: "linear-gradient(to bottom, rgba(96, 147, 172, 0.5), rgba(96, 147, 172, 0.95)), url('/carabusMETTEKST.png')"
          }}
        />

        {/* Background Vortex: always rendered — preloader waits for first canvas frame */}
        <motion.div 
          className="absolute inset-0 w-full h-full z-[1] pointer-events-none origin-center"
          style={{ 
            opacity: bgOpacity,
            willChange: "opacity"
          }}
        >
          <FunnelCanvas scrollProgress={scrollYProgress} onReady={onReady} />
        </motion.div>
        
        <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-[var(--color-agency-accent)]/15 rounded-full blur-[140px] pointer-events-none z-0" />
        <div className="absolute bottom-[10%] right-[20%] w-[45%] h-[45%] bg-[#9bbcd9]/5 rounded-full blur-[160px] pointer-events-none z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(96,147,172,0.7)_0%,transparent_60%)] blur-[20px] pointer-events-none z-0" />
        
        {/* PHASE 1: FLY-THROUGH */}
        <motion.div 
          style={{ 
            opacity: initialOpacity, 
            scale: initialScale,
            filter: initialBlur,
            display: initialDisplay,
            pointerEvents: initialPointerEvents,
            willChange: "transform, opacity, filter"
          }}
          className="absolute inset-0 w-full max-w-[1200px] mx-auto flex flex-col items-center justify-center text-center px-6 sm:px-12 md:px-16 z-10 origin-center"
        >
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[36px] sm:text-[56px] md:text-[80px] lg:text-[96px] font-bold tracking-[-0.03em] text-[#0b1a29] leading-[1.05] mb-5 sm:mb-8 max-w-[1000px]"
          >
            {content.h1}
          </motion.h1>

          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-[15px] sm:text-[18px] md:text-[21px] text-[#0b1a29]/85 font-light max-w-[740px] leading-[1.7] text-center"
          >
            {content.p}
          </motion.p>

          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-3 mt-8 sm:mt-12 w-full sm:w-auto"
          >
            <button 
              onClick={() => document.getElementById('boeken')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-7 py-3.5 sm:py-4 bg-[#0b1a29] text-white rounded-full font-bold text-base sm:text-lg hover:bg-[#132b3f] transition-colors flex items-center justify-center gap-2 w-full sm:w-auto shadow-xl"
            >
              {content.ctaPrimary}
              <ArrowUpRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => document.getElementById('werkwijze')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-7 py-3.5 sm:py-4 bg-transparent border border-[#0b1a29]/20 text-[#0b1a29] rounded-full font-bold text-base sm:text-lg hover:bg-[#0b1a29]/5 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              {content.ctaSecondary}
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>

        </motion.div>

        {/* PHASE 2: MASKED REVEAL */}
        <motion.div
          style={{
            opacity: p1Opacity,
            scale: p1Scale,
            filter: p1Blur,
            display: p1Display,
            willChange: "transform, opacity, filter"
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 px-6 origin-center"
        >
          {/* Overflow hidden mask container */}
          <div className="overflow-hidden py-4">
            <motion.h2 
              style={{ y: p1Y }}
              className="font-display text-[34px] sm:text-[56px] md:text-[80px] font-bold text-[#0b1a29] text-center tracking-[-0.03em] leading-tight max-w-[900px]"
            >
              {content.punchline1}
            </motion.h2>
          </div>
        </motion.div>

        {/* PHASE 3: GLOWING FOCUS */}
        <motion.div
          style={{
            opacity: p2Opacity,
            scale: p2Scale,
            display: p2Display,
            willChange: "transform, opacity"
          }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 px-6 origin-center"
        >
          <motion.h2 
            style={{ textShadow: p2TextShadow }}
            className="font-display text-[38px] sm:text-[58px] md:text-[90px] font-bold text-[#0b1a29] text-center tracking-[-0.02em] leading-tight max-w-[900px]"
          >
            {content.punchline2_1}{" "}
            <span className="text-[#0b1a29]/50 italic font-serif tracking-normal">{content.punchline2_2}</span><br />
            {content.punchline2_3}{" "}
            <span className="text-white italic font-serif tracking-normal">{content.punchline2_4}</span>
          </motion.h2>
        </motion.div>

      </div>
    </section>
  );
}
