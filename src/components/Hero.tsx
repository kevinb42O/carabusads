import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { FunnelCanvas } from './FunnelCanvas';

interface HeroProps {
  lang: 'nl' | 'en';
}

export function Hero({ lang }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  
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
  const bgBlurValue = useTransform(scrollYProgress, [0.7, 1], [0, 20]);
  const bgOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  // --- Phase 1: The Fly-Through (Initial Content) ---
  // Instead of just fading out, the content flies past the camera.
  const initialScale = useTransform(scrollYProgress, [0, 0.25], [1, 4]);
  const initialOpacity = useTransform(scrollYProgress, [0.1, 0.25], [1, 0]);
  const initialBlur = useTransform(scrollYProgress, [0, 0.25], ["blur(0px)", "blur(20px)"]);
  const initialPointerEvents = useTransform(scrollYProgress, v => v > 0.05 ? "none" : "auto");
  const initialDisplay = useTransform(scrollYProgress, v => v > 0.26 ? "none" : "flex");

  // --- Phase 2: The Masked Reveal (Punchline 1) ---
  // Text slides up from a masked container and then recedes into the distance
  const p1Opacity = useTransform(scrollYProgress, [0.25, 0.35, 0.5, 0.6], [0, 1, 1, 0]);
  const p1Y = useTransform(scrollYProgress, [0.25, 0.35], [100, 0]);
  const p1Scale = useTransform(scrollYProgress, [0.35, 0.6], [1, 0.8]);
  const p1Blur = useTransform(scrollYProgress, [0.5, 0.6], ["blur(0px)", "blur(15px)"]);
  const p1Display = useTransform(scrollYProgress, v => v < 0.24 || v > 0.61 ? "none" : "flex");

  // --- Phase 3: The Glowing Focus (Punchline 2) ---
  // Fades in powerfully, settling into place with a massive glow.
  const p2Opacity = useTransform(scrollYProgress, [0.65, 0.75, 0.9, 1], [0, 1, 1, 0]);
  const p2Scale = useTransform(scrollYProgress, [0.65, 0.9], [1.1, 1]);
  const p2TextShadow = useTransform(
    scrollYProgress, 
    [0.65, 0.8], 
    ["0px 0px 0px rgba(92,203,186,0)", "0px 0px 60px rgba(92,203,186,0.5)"]
  );
  const p2Display = useTransform(scrollYProgress, v => v < 0.64 ? "none" : "flex");

  const content = {
    nl: {
      h1: (
        <>
          Gekwalificeerde leads. <br className="hidden md:block"/>
          Winstgevend <span className="font-serif italic font-light text-[#5CCBBA] drop-shadow-[0_2px_10px_rgba(92,203,186,0.3)] relative pr-2">schalen.</span>
        </>
      ),
      p: "Stop met betalen voor loze klikken. Wij ontwerpen data-gedreven campagnes en conversie-architectuur die onbekenden transformeert in high-ticket klanten.",
      ctaPrimary: "Vraag een Growth Audit aan",
      ctaSecondary: "Ontdek onze aanpak",
      punchline1: "De advertentiemarkt is een oceaan van ruis.",
      punchline2_1: "Wij filteren de",
      punchline2_2: "chaos.",
      punchline2_3: "Wij creëren",
      punchline2_4: "focus."
    },
    en: {
      h1: (
        <>
          Qualified pipeline. <br className="hidden md:block"/>
          Profitable <span className="font-serif italic font-light text-[#5CCBBA] drop-shadow-[0_2px_10px_rgba(92,203,186,0.3)] relative pr-2">scaling.</span>
        </>
      ),
      p: "Stop burning ad spend on unqualified traffic. We engineer data-driven campaigns and conversion architecture that turns strangers into high-paying clients.",
      ctaPrimary: "Request Growth Audit",
      ctaSecondary: "See our methodology",
      punchline1: "The ad market is an ocean of noise.",
      punchline2_1: "We filter the",
      punchline2_2: "chaos.",
      punchline2_3: "We create",
      punchline2_4: "focus."
    }
  }[lang];

  return (
    <section ref={containerRef} className="relative bg-[#1a2e2e]" style={{ height: "400vh" }}>
      
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Background Vortex */}
        <motion.div 
          className="absolute inset-0 w-full h-full z-0 pointer-events-none origin-center"
          style={{ 
            opacity: bgOpacity,
            filter: useTransform(bgBlurValue, v => `blur(${v}px)`)
          }}
        >
          <FunnelCanvas scrollProgress={scrollYProgress} />
        </motion.div>
        
        <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-[var(--color-agency-accent)]/15 rounded-full blur-[140px] pointer-events-none z-0" />
        <div className="absolute bottom-[10%] right-[20%] w-[45%] h-[45%] bg-[#5CCBBA]/5 rounded-full blur-[160px] pointer-events-none z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(26,46,46,0.7)_0%,transparent_60%)] blur-[20px] pointer-events-none z-0" />
        
        {/* PHASE 1: FLY-THROUGH */}
        <motion.div 
          style={{ 
            opacity: initialOpacity, 
            scale: initialScale,
            filter: initialBlur,
            display: initialDisplay,
            pointerEvents: initialPointerEvents as any
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
            className="font-sans text-[17px] sm:text-[19px] md:text-[21px] text-white/85 font-light max-w-[740px] leading-[1.8] mb-12 text-center"
          >
            {content.p}
          </motion.p>


        </motion.div>

        {/* PHASE 2: MASKED REVEAL */}
        <motion.div
          style={{
            opacity: p1Opacity,
            scale: p1Scale,
            filter: p1Blur,
            display: p1Display
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
            display: p2Display
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
            <span className="text-[#5CCBBA] italic font-serif tracking-normal">{content.punchline2_4}</span>
          </motion.h2>
        </motion.div>

      </div>
    </section>
  );
}

