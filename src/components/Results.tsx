import { motion } from 'motion/react';

interface ResultsProps {
  lang: 'nl' | 'en';
}

export function Results({ lang }: ResultsProps) {
  const content = {
    nl: {
      badge: "Resultaten",
      h2: "Wat onze aanpak oplevert",
      subtitle: "Concrete voorbeelden van wat er mogelijk is met een gestructureerde campagne-aanpak en goed gebouwde funnels.",
      cases: [
        {
          metric: "4.2x → 8.7x",
          label: "ROAS",
          desc: "Return on ad spend verbeterd door gestructureerde campagne-architectuur en server-side tracking.",
          context: "B2B SaaS · Google Ads"
        },
        {
          metric: "€142 → €38",
          label: "Kosten per lead",
          desc: "Cost per lead met 73% verlaagd door gerichte landingspagina's en funnel-optimalisatie.",
          context: "E-commerce · Meta Ads"
        },
        {
          metric: "+210%",
          label: "Conversieratio",
          desc: "Meer conversies uit hetzelfde verkeer dankzij A/B testing en verbeterde pagina-structuur.",
          context: "Dienstverlener · Google + Meta"
        }
      ],
      note: "* Resultaten variëren per branche en uitgangssituatie. Deze voorbeelden zijn gebaseerd op werkelijke klanttrajecten."
    },
    en: {
      badge: "Results",
      h2: "What our approach delivers",
      subtitle: "Concrete examples of what's possible with a structured campaign approach and well-built funnels.",
      cases: [
        {
          metric: "4.2x → 8.7x",
          label: "ROAS",
          desc: "Return on ad spend improved through structured campaign architecture and server-side tracking.",
          context: "B2B SaaS · Google Ads"
        },
        {
          metric: "€142 → €38",
          label: "Cost per lead",
          desc: "Cost per lead reduced by 73% through targeted landing pages and funnel optimization.",
          context: "E-commerce · Meta Ads"
        },
        {
          metric: "+210%",
          label: "Conversion rate",
          desc: "More conversions from the same traffic through A/B testing and improved page structure.",
          context: "Service provider · Google + Meta"
        }
      ],
      note: "* Results vary by industry and starting point. These examples are based on actual client engagements."
    }
  }[lang];

  return (
    <section className="section-padding bg-white w-full border-y border-black/[0.04] relative z-10 overflow-hidden">
      {/* Decorative gradient for premium feel */}
      <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-[var(--color-agency-accent)]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-[1100px] mx-auto relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-[540px] mb-14"
        >
          <div className="section-badge">
            {content.badge}
          </div>
          
          <h2 className="font-display text-[32px] md:text-[42px] font-normal tracking-[-0.01em] mb-4 text-[var(--color-text-primary)] leading-[1.15]">
            {content.h2}
          </h2>
          <p className="text-[16px] sm:text-[17px] font-light text-[var(--color-text-secondary)] leading-[1.7]">
            {content.subtitle}
          </p>
        </motion.div>

        {/* Results Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
          className="grid md:grid-cols-3 gap-6 mb-8"
        >
          {content.cases.map((c, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { type: "spring", bounce: 0.2, duration: 0.8 }
                }
              }}
              whileHover={{ y: -5 }}
              className="card-elevated rounded-xl p-8 flex flex-col relative overflow-hidden group bg-white border border-black/[0.04]"
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-agency-accent)]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Big metric */}
              <div className="mb-6 relative z-10">
                <motion.span 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (i * 0.1), type: "spring", bounce: 0.5 }}
                  className="font-outfit font-bold text-[32px] sm:text-[38px] text-[var(--color-agency-accent)] leading-none block"
                >
                  {c.metric}
                </motion.span>
                <div className="text-[12px] font-semibold text-[var(--color-text-primary)] mt-2 uppercase tracking-wider">{c.label}</div>
              </div>
              
              {/* Description */}
              <p className="text-[14px] font-light text-[var(--color-text-secondary)] leading-[1.65] mb-6 flex-1 relative z-10">{c.desc}</p>
              
              {/* Context tag */}
              <span className="text-[11px] font-medium text-[var(--color-text-muted)] bg-[var(--color-agency-bg)] px-3 py-1.5 rounded-md self-start border border-black/[0.03] relative z-10">
                {c.context}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Disclaimer */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-[12px] text-[var(--color-text-muted)] font-light"
        >
          {content.note}
        </motion.p>
      </div>
    </section>
  );
}
