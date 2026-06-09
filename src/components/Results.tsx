import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useTransform, useInView } from 'motion/react';
import { useIsMobile } from '../hooks/useIsMobile';

interface ResultsProps {
  lang: 'nl' | 'en';
}

function Odometer({ target, prefix = "", suffix = "", decimals = 0, start = 0 }: { target: number, prefix?: string, suffix?: string, decimals?: number, start?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const springValue = useSpring(start, { bounce: 0, duration: 2500 });
  
  useEffect(() => {
    if (isInView) {
      springValue.set(target);
    }
  }, [isInView, target, springValue]);

  const display = useTransform(springValue, (current) => {
    return prefix + current.toFixed(decimals) + suffix;
  });

  return <motion.span ref={ref}>{display}</motion.span>;
}

export function Results({ lang }: ResultsProps) {
  const content = {
    nl: {
      badge: "Track Record",
      h2: "Het rendement van een doordachte aanpak",
      subtitle: "Wat er gebeurt wanneer je slimme advertenties combineert met een website die daadwerkelijk verkoopt.",
      cases: [
        {
          odometer: <Odometer target={8.7} decimals={1} suffix="x" />,
          label: "ROAS",
          desc: "Meer omzet uit hetzelfde advertentiebudget.",
          context: "B2B Software · Google Ads"
        },
        {
          odometer: <Odometer start={142} target={38} prefix="€" />,
          label: "per klant",
          desc: "Kosten per nieuwe klant verlaagd van €142 naar €38.",
          context: "E-commerce · Meta Ads"
        },
        {
          odometer: <Odometer target={210} prefix="+" suffix="%" />,
          label: "aanvragen",
          desc: "Meer kwalitatieve leads zonder extra advertentiekosten.",
          context: "Dienstverlener · Google + Meta"
        }
      ],
      note: "* Resultaten zijn afhankelijk van het budget en de uitgangssituatie. Data is gebaseerd op echte klantcases."
    },
    en: {
      badge: "Track Record",
      h2: "The ROI of engineered growth",
      subtitle: "What happens when you combine data-driven media buying with high-converting infrastructure.",
      cases: [
        {
          odometer: <Odometer target={8.7} decimals={1} suffix="x" />,
          label: "ROAS (was 4.2x)",
          desc: "Profitability doubled by migrating from basic setups to a rigid campaign architecture and server-side tracking.",
          context: "B2B SaaS · Google Ads"
        },
        {
          odometer: <Odometer start={142} target={38} prefix="€" />,
          label: "CPA (was €142)",
          desc: "Cost Per Acquisition slashed by redirecting dead-end traffic into specialized funnel flows.",
          context: "E-commerce · Meta Ads"
        },
        {
          odometer: <Odometer target={210} prefix="+" suffix="%" />,
          label: "Conversion rate",
          desc: "Qualified pipeline tripled from the exact same ad budget through relentless data-driven A/B testing.",
          context: "Service provider · Google + Meta"
        }
      ],
      note: "* Performance depends on ad spend and starting point. Data based on audited client engagements."
    }
  }[lang];

  const isMobile = useIsMobile();

  return (
    <section className="section-padding bg-[var(--color-agency-bg)] w-full relative z-10 overflow-hidden">
      {/* Decorative gradient for premium feel */}
      <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-[var(--color-agency-accent)]/10 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-[1200px] mx-auto relative z-10">
        
        {/* Header */}
        <motion.div 
          {...(!isMobile && { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-100px" } })}
          transition={{ duration: 0.6 }}
          className="max-w-[640px] mb-20"
        >
          <div className="section-badge mb-8">
            {content.badge}
          </div>
          
          <h2 className="font-display text-[36px] md:text-[48px] font-normal tracking-[-0.01em] mb-6 text-[var(--color-text-primary)] leading-[1.1]">
            {content.h2}
          </h2>
          <p className="text-[17px] md:text-[19px] font-light text-[var(--color-text-secondary)] leading-[1.7]">
            {content.subtitle}
          </p>
        </motion.div>

        {/* Data Wall */}
        <motion.div 
          {...(!isMobile && {
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true, margin: "-100px" },
            variants: {
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15
                }
              }
            }
          })}
          className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-12"
        >
          {content.cases.map((c, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="bg-white/70 backdrop-blur-2xl border border-white/50 rounded-2xl p-8 lg:p-10 flex flex-col relative overflow-hidden group shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:bg-white/90"
            >
              {/* Subtle hover line graph animation effect */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--color-agency-accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-8 group-hover:translate-y-0 pointer-events-none" />
              
              {/* Big metric with odometer */}
              <div className="mb-8 relative z-10">
                <div className="font-display font-bold text-[64px] sm:text-[80px] lg:text-[96px] text-[var(--color-text-primary)] leading-none tracking-tight mb-4 transition-colors duration-500 group-hover:text-[#6093ac]">
                  {c.odometer}
                </div>
                <div className="text-[13px] font-semibold text-[var(--color-agency-accent)] uppercase tracking-widest">{c.label}</div>
              </div>
              
              {/* Description */}
              <p className="text-[16px] font-light text-[var(--color-text-secondary)] leading-[1.7] mb-8 flex-1 relative z-10">{c.desc}</p>
              
              {/* Context tag */}
              <span className="text-[12px] font-medium text-[var(--color-text-secondary)] bg-white/50 border border-white/40 px-4 py-2 rounded-lg self-start relative z-10 backdrop-blur-sm group-hover:border-white/80 transition-colors duration-300">
                {c.context}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Disclaimer */}
        <motion.p 
          {...(!isMobile && { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true } })}
          transition={{ delay: 0.8 }}
          className="text-[13px] text-[var(--color-text-muted)] font-light"
        >
          {content.note}
        </motion.p>
      </div>
    </section>
  );
}
