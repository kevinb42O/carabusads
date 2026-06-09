import { X, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface ProblemProps {
  lang: 'nl' | 'en';
}

export function Problem({ lang }: ProblemProps) {
  const content = {
    nl: {
      badge: "De Bottleneck",
      h2: "Je ad spend stijgt, maar de agenda blijft pijnlijk leeg.",
      p: "Je investeert stevig in Google & Meta. De overzichten staan vol met weergaven en klikken, maar onderaan de streep ontbreekt de voorspelbare omzet. Je weet dat je budget weglekt, maar niet wáár.",
      badTitle: "Het verouderde model",
      badBullets: [
        "Dure advertentieklikken die doodlopen op een standaard homepage",
        "Geen idee welke advertentie daadwerkelijk nieuwe klanten oplevert",
        "Mooie rapporten over 'bereik' in plaats van echte winstgevendheid",
        "Een bureau dat maandelijks de factuur stuurt, maar niet meedenkt"
      ],
      goodTitle: "De Carabus Ads Aanpak",
      goodBullets: [
        "Een gerichte online ervaring voor elke specifieke advertentie",
        "Waterdichte metingen zodat je precies ziet wat een klant kost",
        "Keiharde focus op onderaan de streep: winst en warme leads",
        "Direct contact met de expert die écht aan jouw knoppen zit"
      ],
    },
    en: {
      badge: "The Bottleneck",
      h2: "Your ad spend is scaling, but your calendar is empty.",
      p: "You're heavily invested in Google & Meta. The dashboards are full of impressions and clicks, but you lack predictable revenue at the bottom line. You know your funnel is leaking, you just don't know where.",
      badTitle: "The broken model",
      badBullets: [
        "Expensive traffic hitting a generic homepage instead of a focused funnel",
        "Blind spots in attribution: no clue which ad actually drives MRR",
        "Vanity metrics: agencies reporting on 'reach' instead of Cost Per Acquisition",
        "A standard agency that sends the invoice but lacks proactive strategy"
      ],
      goodTitle: "The Carabus Ads Architecture",
      goodBullets: [
        "Dedicated conversion pipelines for every traffic source",
        "Server-side tracking (GTM) for bulletproof revenue attribution",
        "Relentless focus on ROAS, CAC, and qualified pipeline",
        "Direct access to the senior strategist pulling the levers"
      ],
    }
  }[lang];

  // Header Animation
  const headerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const headerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    },
  };

  // High-End Card Animations
  const customEase = [0.16, 1, 0.3, 1]; // Premium cubic-bezier easing

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const leftCardVariants = {
    hidden: { opacity: 0, x: -40, y: 20, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: customEase,
        staggerChildren: 0.12,
        delayChildren: 0.3
      }
    }
  };

  const rightCardVariants = {
    hidden: { opacity: 0, x: 40, y: 20, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: customEase,
        staggerChildren: 0.12,
        delayChildren: 0.4
      }
    }
  };

  const badItemVariants = {
    hidden: { opacity: 0, x: -15, scale: 0.95 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 150, damping: 15 }
    }
  };

  const goodItemVariants = {
    hidden: { opacity: 0, x: 15, scale: 0.95 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 150, damping: 15 }
    }
  };

  const checkIconVariants = {
    hidden: { scale: 0, rotate: -90, opacity: 0 },
    visible: { 
      scale: 1, 
      rotate: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 12, delay: 0.1 }
    }
  };

  const crossIconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 12 }
    }
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <section id="pijnpunt" className="section-padding bg-[var(--color-agency-bg)] w-full relative">
      {/* Ambient background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[var(--color-agency-accent)]/10 rounded-full blur-[140px] -translate-y-1/2" 
        />
      </div>

      <div className="max-w-[1200px] mx-auto w-full relative z-10 flex flex-col lg:flex-row items-start gap-12 lg:gap-24">
        
        {/* Left Side: Sticky Header */}
        <div className="lg:sticky lg:top-40 w-full lg:w-[45%] shrink-0 z-20">
          <motion.div 
            {...(!isMobile && { variants: headerVariants, initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.3 } })}
          >
            <motion.div variants={headerItem} className="section-badge mb-8">
              {content.badge}
            </motion.div>
            
            <motion.h2 variants={headerItem} className="font-display text-[36px] md:text-[48px] lg:text-[56px] font-normal tracking-[-0.02em] mb-6 text-[var(--color-text-primary)] leading-[1.1]">
              {content.h2}
            </motion.h2>
            
            <motion.p variants={headerItem} className="text-[17px] md:text-[19px] text-[var(--color-text-secondary)] font-light leading-[1.7] max-w-[480px]">
              {content.p}
            </motion.p>
          </motion.div>
        </div>

        {/* Right Side: Stacking Cards */}
        <div className="w-full lg:w-[55%] flex flex-col gap-10 relative z-30">
          
          {/* Card 1: The broken model */}
          <motion.div 
            {...(!isMobile && { initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-100px" } })}
            transition={{ duration: 0.8, ease: customEase }}
            className="card-elevated rounded-2xl p-8 sm:p-10 flex flex-col group relative overflow-hidden ring-1 ring-white/5"
          >
            {/* Abstract Background Indicator for bad (Red-ish gradient) */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-red-500/[0.03] rounded-full blur-[80px] group-hover:bg-red-500/[0.06] transition-colors duration-700 pointer-events-none" />
            
            <h3 className="font-outfit font-semibold text-[22px] text-[var(--color-text-primary)] mb-8 transition-colors duration-300 group-hover:text-[#6093ac]">{content.badTitle}</h3>
            
            <ul className="flex flex-col gap-6 relative z-10">
              {content.badBullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-4 text-[15px] sm:text-[16px] text-[var(--color-text-secondary)] font-light leading-relaxed group-hover:text-[var(--color-text-primary)] transition-colors duration-300">
                  <div className="mt-1.5 shrink-0 size-1.5 bg-red-500/50 rounded-full" />
                  <span className="pt-0">{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Card 2: The Solution */}
          <motion.div 
            {...(!isMobile && { initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-100px" } })}
            transition={{ duration: 0.8, ease: customEase }}
            className="dark-panel bg-[var(--color-agency-surface)] rounded-2xl p-8 sm:p-10 flex flex-col relative overflow-hidden group border border-[var(--color-agency-accent)]/20 hover:border-[var(--color-agency-accent)]/40 hover:shadow-[0_0_50px_rgba(45,125,111,0.15)] transition-all duration-700"
          >
            {/* Abstract Background Indicator for good (Green-ish matrix) */}
            <div className="absolute -top-10 -right-10 w-[400px] h-[400px] bg-[var(--color-agency-accent)]/10 rounded-full blur-[80px] pointer-events-none transition-all duration-700 group-hover:bg-[var(--color-agency-accent)]/20 group-hover:scale-110 z-0" />
            
            {/* Shimmer effect */}
            <motion.div 
              {...(!isMobile && { initial: { x: "-100%" }, whileInView: { x: "200%" }, viewport: { once: true } })}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-[var(--color-agency-accent)]/10 to-transparent skew-x-[-20deg] pointer-events-none z-0"
            />
            
            <h3 className="font-outfit font-semibold text-[22px] text-[var(--color-text-primary)] mb-8 relative z-10 transition-colors duration-300 group-hover:text-[#6093ac]">{content.goodTitle}</h3>
            
            <ul className="flex flex-col gap-6 relative z-10">
              {content.goodBullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-4 text-[15px] sm:text-[16px] text-[var(--color-text-secondary)] font-light leading-relaxed">
                  <div className="mt-1.5 shrink-0 size-2 bg-[#0b1a29] rounded-sm" />
                  <span className="pt-0">{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
