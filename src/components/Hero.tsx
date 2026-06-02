import { motion } from 'motion/react';
import { ArrowUpRight, ChevronRight, Sparkles } from 'lucide-react';
import { FunnelCanvas } from './FunnelCanvas';

interface HeroProps {
  lang: 'nl' | 'en';
}

export function Hero({ lang }: HeroProps) {

  const content = {
    nl: {
      h1: (
        <>
          Meer klanten. <br className="hidden md:block"/>
          Minder <span className="font-serif italic font-light text-[#5CCBBA] drop-shadow-[0_2px_10px_rgba(92,203,186,0.3)] relative pr-2">budgetverspilling.</span>
        </>
      ),
      p: "Wij beheren je Google & Social Ads en bouwen de funnels die klikken omzetten in leads en omzet. Eén vast aanspreekpunt, volledige transparantie, focus op netto resultaat.",
      ctaPrimary: "Plan een kennismaking",
      ctaSecondary: "Bekijk onze resultaten"
    },
    en: {
      h1: (
        <>
          More clients. <br className="hidden md:block"/>
          Less <span className="font-serif italic font-light text-[#5CCBBA] drop-shadow-[0_2px_10px_rgba(92,203,186,0.3)] relative pr-2">wasted budget.</span>
        </>
      ),
      p: "We manage your Google & Social Ads and build the funnels that turn clicks into leads and revenue. One single point of contact, complete transparency, focused on net results.",
      ctaPrimary: "Schedule a call",
      ctaSecondary: "View our results"
    }
  }[lang];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1a2e2e]">
      
      {/* Ultra Professional 3D Funnel Animation */}
      <FunnelCanvas />
      
      {/* Ambient Glows */}
      <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-[var(--color-agency-accent)]/15 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[20%] w-[45%] h-[45%] bg-[#5CCBBA]/5 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Main Content Container - Centered Alignment for Extreme High-End Aesthetic */}
      <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center justify-center text-center px-6 sm:px-12 md:px-16 relative z-10 pt-[12vh] pb-12">
        
        {/* Subtle backdrop to make typography pop against the animation */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(26,46,46,0.7)_0%,transparent_60%)] blur-[20px] pointer-events-none -z-10" />
        
        {/* Main Heading */}
        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[48px] sm:text-[64px] md:text-[80px] lg:text-[96px] font-bold tracking-[-0.03em] text-white leading-[1.05] mb-8 max-w-[1000px] drop-shadow-2xl"
        >
          {content.h1}
        </motion.h1>

        {/* Supporting Copy */}
        <motion.p 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-[17px] sm:text-[19px] md:text-[21px] text-white/85 font-light max-w-[740px] leading-[1.8] mb-12 text-center"
        >
          {content.p}
        </motion.p>

        {/* Centered Actions */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto mt-6"
        >
          <a 
            href="#boeken"
            className="w-full sm:w-auto bg-white text-[#0a1919] px-9 py-5 rounded-full text-[13px] font-bold tracking-widest uppercase transition-all duration-500 shadow-[0_0_40px_rgba(92,203,186,0.15)] hover:shadow-[0_0_60px_rgba(92,203,186,0.3)] ring-1 ring-white/50 hover:ring-white flex items-center justify-center gap-3 group cursor-pointer"
          >
            {content.ctaPrimary}
            <ArrowUpRight className="size-4 text-[var(--color-agency-accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          
          <a 
            href="#diensten"
            className="w-full sm:w-auto text-white/70 hover:text-white px-6 py-5 text-[13px] font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              {content.ctaSecondary}
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
            {/* Subtle hover underline effect for secondary CTA */}
            <span className="absolute bottom-4 left-6 right-10 h-[1px] bg-white/30 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
          </a>
        </motion.div>

        
      </div>

    </section>
  );
}
