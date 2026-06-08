import { motion } from 'motion/react';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { FunnelCanvas } from './FunnelCanvas';

interface HeroMobileProps {
  lang: 'nl' | 'en';
  onReady?: () => void;
  content: any;
}

export function HeroMobile({ lang, onReady, content }: HeroMobileProps) {
  return (
    <section className="relative w-full min-h-screen bg-[#6093ac] overflow-hidden flex flex-col items-center justify-center pt-20">
      {/* End-state background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/carabusDarkBlue.png')" }}
      />

      {/* Background Vortex */}
      <div className="absolute inset-0 w-full h-full z-[1] pointer-events-none origin-center">
        <FunnelCanvas onReady={onReady} />
      </div>
      
      <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-[var(--color-agency-accent)]/15 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[20%] w-[45%] h-[45%] bg-[#9bbcd9]/5 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(96,147,172,0.7)_0%,transparent_60%)] blur-[20px] pointer-events-none z-0" />
      
      {/* PHASE 1: STATIC ON MOBILE */}
      <div className="relative w-full max-w-[1200px] mx-auto flex flex-col items-center justify-center text-center px-6 z-10">
        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[36px] sm:text-[56px] font-bold tracking-[-0.03em] text-[#0b1a29] leading-[1.05] mb-5 max-w-[1000px]"
        >
          {content.h1}
        </motion.h1>

        <motion.p 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-[15px] sm:text-[18px] text-[#0b1a29]/85 font-light max-w-[740px] leading-[1.7] text-center"
        >
          {content.p}
        </motion.p>

        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-3 mt-8 w-full"
        >
          <button 
            onClick={() => document.getElementById('boeken')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-7 py-3.5 bg-[#0b1a29] text-white rounded-full font-bold text-base hover:bg-[#132b3f] transition-colors flex items-center justify-center gap-2 w-full shadow-xl"
          >
            {content.ctaPrimary}
            <ArrowUpRight className="w-5 h-5" />
          </button>
          <button 
            onClick={() => document.getElementById('werkwijze')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-7 py-3.5 bg-transparent border border-[#0b1a29]/20 text-[#0b1a29] rounded-full font-bold text-base hover:bg-[#0b1a29]/5 transition-colors flex items-center justify-center gap-2 w-full"
          >
            {content.ctaSecondary}
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
