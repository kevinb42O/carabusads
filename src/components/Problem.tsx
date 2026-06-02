import { X, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface ProblemProps {
  lang: 'nl' | 'en';
}

export function Problem({ lang }: ProblemProps) {
  const content = {
    nl: {
      badge: "Herkenbaar?",
      h2: "Je geeft duizenden euro's uit aan ads, maar het levert te weinig op.",
      p: "Je hebt al geïnvesteerd in Google Ads of Social campagnes. Misschien via een bureau, misschien zelf. De kliks komen binnen, maar de telefoon gaat niet vaker. Je weet dat het beter kan — maar niet waar het fout loopt.",
      badTitle: "Wat je nu waarschijnlijk meemaakt",
      badBullets: [
        "Advertentieverkeer dat naar je homepage gaat in plaats van een gerichte landingspagina",
        "Geen duidelijk beeld welke campagnes écht omzet opleveren",
        "Rapportages vol impressies en klikken, maar weinig over daadwerkelijke leads",
        "Het gevoel dat je bureau je account niet echt kent"
      ],
      goodTitle: "Hoe wij het aanpakken",
      goodBullets: [
        "Elke campagne gekoppeld aan een landingspagina gebouwd voor conversie",
        "Server-side tracking zodat je exact weet welke euro wat oplevert",
        "Wekelijkse rapportage op leads, kosten per lead en omzet",
        "Eén vast aanspreekpunt dat je account dagelijks beheert"
      ],
    },
    en: {
      badge: "Sound familiar?",
      h2: "You're spending thousands on ads, but the returns don't add up.",
      p: "You've invested in Google Ads or Social campaigns — maybe through an agency, maybe yourself. The clicks are coming in, but the phone isn't ringing more. You know it can be better — you just don't know where it's going wrong.",
      badTitle: "What you're probably experiencing",
      badBullets: [
        "Ad traffic landing on your homepage instead of a dedicated conversion page",
        "No clear picture of which campaigns actually generate revenue",
        "Reports full of impressions and clicks, but little on actual leads",
        "The feeling that your agency doesn't truly know your account"
      ],
      goodTitle: "How we approach it",
      goodBullets: [
        "Every campaign linked to a landing page built for conversion",
        "Server-side tracking so you know exactly which euro drives what",
        "Weekly reporting on leads, cost per lead, and revenue",
        "One dedicated specialist managing your account daily"
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

  return (
    <section id="pijnpunt" className="section-padding bg-[var(--color-agency-bg)] w-full relative overflow-hidden">
      {/* Ambient background glow */}
      <motion.div 
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[var(--color-agency-accent)]/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" 
      />

      <div className="max-w-[1100px] mx-auto w-full relative z-10">
        
        {/* Header */}
        <motion.div 
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-[640px] mb-16"
        >
          <motion.div variants={headerItem} className="section-badge">
            {content.badge}
          </motion.div>
          
          <motion.h2 variants={headerItem} className="font-display text-[32px] md:text-[42px] font-normal tracking-[-0.01em] mb-6 text-[var(--color-text-primary)] leading-[1.15]">
            {content.h2}
          </motion.h2>
          
          <motion.p variants={headerItem} className="text-[16px] sm:text-[17px] text-[var(--color-text-secondary)] font-light leading-[1.75]">
            {content.p}
          </motion.p>
        </motion.div>

        {/* Comparison Grid */}
        <motion.div 
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-2 gap-6 w-full"
        >
          
          {/* The problem */}
          <motion.div 
            variants={leftCardVariants}
            className="card-elevated rounded-xl p-7 sm:p-9 flex flex-col group relative overflow-hidden"
          >
            {/* Subtle red danger zone overlay on hover */}
            <div className="absolute inset-0 bg-red-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <h3 className="font-outfit font-semibold text-[18px] text-[var(--color-text-primary)] mb-6 transition-colors duration-300 group-hover:text-red-500/80">{content.badTitle}</h3>
            
            <ul className="flex flex-col gap-5">
              {content.badBullets.map((bullet, idx) => (
                <motion.li variants={badItemVariants} key={idx} className="flex items-start gap-4 text-[14px] sm:text-[15px] text-[var(--color-text-secondary)] font-light leading-relaxed group-hover:text-[var(--color-text-primary)] transition-colors duration-300">
                  <motion.div variants={crossIconVariants} className="mt-0.5 shrink-0">
                    <div className="size-6 rounded-full bg-red-50 flex items-center justify-center border border-red-100">
                      <X className="size-3.5 text-red-500" />
                    </div>
                  </motion.div>
                  <span className="pt-0.5">{bullet}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* The solution */}
          <motion.div 
            variants={rightCardVariants}
            className="dark-panel rounded-xl p-7 sm:p-9 flex flex-col relative overflow-hidden group hover:border-[var(--color-agency-accent)]/40 hover:shadow-[0_0_40px_rgba(45,125,111,0.15)] transition-colors duration-700"
          >
            {/* Animated shimmer effect across the panel */}
            <motion.div 
              initial={{ x: "-100%" }}
              whileInView={{ x: "200%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.8 }}
              className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg] pointer-events-none z-0"
            />

            {/* Subtle corner accent, animates on hover */}
            <motion.div 
              className="absolute -top-10 -right-10 w-60 h-60 bg-[var(--color-agency-accent)]/20 rounded-full blur-[60px] pointer-events-none transition-colors duration-700 group-hover:bg-[var(--color-agency-accent)]/30 group-hover:scale-110 z-0" 
            />
            
            <h3 className="font-outfit font-semibold text-[18px] text-white mb-6 relative z-10 transition-colors duration-300 group-hover:text-[var(--color-agency-accent-light)]">{content.goodTitle}</h3>
            
            <ul className="flex flex-col gap-5 relative z-10">
              {content.goodBullets.map((bullet, idx) => (
                <motion.li variants={goodItemVariants} key={idx} className="flex items-start gap-4 text-[14px] sm:text-[15px] text-white/85 font-light leading-relaxed">
                  <motion.div variants={checkIconVariants} className="mt-0.5 shrink-0">
                    <div className="size-6 rounded-full bg-[var(--color-agency-accent)]/10 flex items-center justify-center border border-[var(--color-agency-accent)]/30">
                      <Check className="size-3.5 text-[var(--color-agency-accent)]" />
                    </div>
                  </motion.div>
                  <span className="pt-0.5">{bullet}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
