import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { FunnelCanvas } from './FunnelCanvas';

interface HeroProps {
  lang: 'nl' | 'en';
  isReady?: boolean;
}

const contentDict = {
  nl: {
    h1: (
      <>
        Echte leads. <br className="hidden md:block"/>
        Voorspelbare <span className="font-serif italic font-light text-[#9bbcd9] drop-shadow-[0_2px_10px_rgba(155,188,217,0.3)] relative pr-2">groei.</span>
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
        Predictable <span className="font-serif italic font-light text-[#9bbcd9] drop-shadow-[0_2px_10px_rgba(155,188,217,0.3)] relative pr-2">growth.</span>
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

export function Hero({ lang, isReady = false }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  const { scrollYProgress: rawProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // "Uitbollen" - smooth spring physics for buttery scroll animations
  const scrollYProgress = useSpring(rawProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001
  });

  // --- Background Canvas ---
  const bgBlurValue = useTransform(scrollYProgress, [0.7, 1], [0, prefersReducedMotion ? 0 : 20]);
  const bgOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

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
    ["0px 0px 0px rgba(155,188,217,0)", prefersReducedMotion ? "0px 0px 0px rgba(155,188,217,0)" : "0px 0px 60px rgba(155,188,217,0.5)"]
  );
  const p2Display = useTransform(scrollYProgress, v => (v < 0.64 ? "none" : "flex") as "none" | "flex");

  const content = contentDict[lang];

  return (
    <section ref={containerRef} className="relative bg-[#0b1a29]" style={{ height: "400vh" }}>
      
      <div 
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundColor: '#0b1a29',
          backgroundImage: "linear-gradient(to bottom, rgba(11, 26, 41, 0.5), rgba(11, 26, 41, 0.95)), url('/carabusMETTEKST.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        
        {/* Background Vortex - Only render when ready on mobile */}
        {(isReady || !isMobile) && (
          <motion.div 
            className="absolute inset-0 w-full h-full z-0 pointer-events-none origin-center"
            style={{ 
              opacity: bgOpacity,
              willChange: "opacity"
            }}
          >
            <FunnelCanvas scrollProgress={scrollYProgress} />
          </motion.div>
        )}
        
        <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-[var(--color-agency-accent)]/15 rounded-full blur-[140px] pointer-events-none z-0" />
        <div className="absolute bottom-[10%] right-[20%] w-[45%] h-[45%] bg-[#9bbcd9]/5 rounded-full blur-[160px] pointer-events-none z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(11,26,41,0.7)_0%,transparent_60%)] blur-[20px] pointer-events-none z-0" />
        
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
            className="font-display text-[48px] sm:text-[64px] md:text-[80px] lg:text-[96px] font-bold tracking-[-0.03em] text-white leading-[1.05] mb-8 max-w-[1000px] drop-shadow-2xl"
          >
            {content.h1}
          </motion.h1>

          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-[17px] sm:text-[19px] md:text-[21px] text-white/85 font-light max-w-[740px] leading-[1.8] text-center"
          >
            {content.p}
          </motion.p>

          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-12"
          >
            <button 
              onClick={() => document.getElementById('boeken')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-[#9bbcd9] text-[#0b1a29] rounded-full font-bold text-lg hover:bg-[#6b9ec7] transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              {content.ctaPrimary}
              <ArrowUpRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => document.getElementById('werkwijze')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
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
              className="font-display text-[40px] sm:text-[60px] md:text-[80px] font-bold text-white text-center tracking-[-0.03em] leading-tight drop-shadow-[0_0_30px_rgba(0,0,0,0.5)] max-w-[900px]"
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
            className="font-display text-[44px] sm:text-[64px] md:text-[90px] font-bold text-white text-center tracking-[-0.02em] leading-tight max-w-[900px]"
          >
            {content.punchline2_1}{" "}
            <span className="text-white/50 italic font-serif tracking-normal">{content.punchline2_2}</span><br />
            {content.punchline2_3}{" "}
            <span className="text-[#9bbcd9] italic font-serif tracking-normal">{content.punchline2_4}</span>
          </motion.h2>
        </motion.div>

      </div>
    </section>
  );
}
