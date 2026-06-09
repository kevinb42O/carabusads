import { motion } from 'motion/react';
import { useIsMobile } from '../hooks/useIsMobile';
interface BoutiqueProps {
  lang: 'nl' | 'en';
}

export function Boutique({ lang }: BoutiqueProps) {
  const content = {
    nl: {
      badge: "Onze Filosofie",
      h2: "Direct access. Geen accountmanagers.",
      p1: "Bij grote bureaus word je binnengehaald door de founder, maar wordt je account beheerd door een stagiair. Wij doen niet aan bait-and-switch. Je werkt 1-op-1 met de senior strategist.",
      p2: "Dat betekent actie in plaats van bureaucratie. Geen eindeloze e-mailketens of ticketsystemen, maar een directe WhatsApp-lijn naar de persoon die daadwerkelijk de knoppen bedient.",
      quote: "We sturen niet op bereik of impressies. Als een campagne geen aantoonbare MRR oplevert, draaien we 'm uit.",
      name: "Hans Claes",
      role: "Oprichter & Lead Strategist",
      promises: [
        "Directe communicatielijnen via WhatsApp",
        "Extreem korte iteratiecycli en snelle executie",
        "Brute eerlijkheid over je data en performance"
      ]
    },
    en: {
      badge: "Our Philosophy",
      h2: "Direct access. No account managers.",
      p1: "Sold by the founder, serviced by the intern. That's the standard agency model we refuse to follow. At Carabus Ads, you work 1-on-1 with the senior strategist actually managing your budget.",
      p2: "That means execution over bureaucracy. No endless email threads or ticketing systems, just a direct WhatsApp line to the person pulling the levers.",
      quote: "We don't care about reach or impressions. If a campaign isn't driving measurable MRR, we kill it.",
      name: "Hans Claes",
      role: "Founder & Lead Strategist",
      promises: [
        "Direct communication lines via WhatsApp",
        "Extremely short iteration cycles and fast execution",
        "Brutal honesty about your data and performance"
      ]
    }
  }[lang];

  // For staggered text
  const quoteWords = content.quote.split(" ");
  const quoteContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.3 }
    }
  };
  const quoteWord = {
    hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6 } }
  };

  const isMobile = useIsMobile();

  return (
    <section id="aanpak" className="section-padding bg-[var(--color-agency-bg)] overflow-hidden relative z-10">
      {/* Abstract geometric pulsing background behind the photo area */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 lg:left-3/4 w-[800px] h-[800px] border border-[var(--color-agency-accent)]/10 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" 
      />
      
      <div className="absolute top-1/2 left-1/2 lg:left-3/4 w-[400px] h-[400px] bg-[var(--color-agency-accent)]/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24 w-full relative z-10">
        
        {/* Visual Column */}
        <div className="flex-1 w-full relative order-2 lg:order-1">
          {/* Main Workspace Image with Clip-Path Reveal */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl group border border-white/5">
            <motion.div 
              {...(!isMobile && { initial: { opacity: 0, scale: 0.95 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true, amount: 0.1 } })}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5]"
            >
              <motion.img 
                whileHover={{ scale: 1.05 }} 
                transition={{ duration: 1.5, ease: "easeOut" }}
                src="/hans_foto.jpeg" 
                alt="Hans Claes - Carabus Ads" 
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          </div>


        </div>

        {/* Copy Column */}
        <motion.div 
          {...(!isMobile && {
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true, amount: 0.2 },
            variants: {
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }
          })}
          className="flex-1 w-full lg:max-w-[500px] order-1 lg:order-2"
        >
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } }}
            className="section-badge mb-8"
          >
            {content.badge}
          </motion.div>
          
          <motion.h2 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } }}
            className="font-display text-[36px] md:text-[48px] font-normal tracking-[-0.01em] mb-8 text-[var(--color-text-primary)] leading-[1.1]"
          >
            {content.h2}
          </motion.h2>
          
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } }}
            className="text-[17px] sm:text-[18px] font-light text-[var(--color-text-secondary)] mb-6 leading-[1.7]"
          >
            {content.p1}
          </motion.p>
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } }}
            className="text-[17px] sm:text-[18px] font-light text-[var(--color-text-secondary)] mb-12 leading-[1.7]"
          >
            {content.p2}
          </motion.p>
          
          {/* Promises list */}
          <motion.ul 
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
            className="flex flex-col gap-5 border-t border-white/5 pt-8"
          >
            {content.promises.map((promise, i) => (
              <motion.li 
                key={i} 
                variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}
                className="flex items-center gap-4 text-[15px] sm:text-[16px] text-[var(--color-text-primary)] font-light"
              >
                <div className="size-2 rounded-full bg-[var(--color-agency-accent)] shadow-[0_0_8px_rgba(92,203,186,0.6)]" />
                {promise}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

      </div>
    </section>
  );
}
