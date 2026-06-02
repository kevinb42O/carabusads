import { Search, PenTool, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

interface MethodologyProps {
  lang: 'nl' | 'en';
}

export function Methodology({ lang }: MethodologyProps) {
  const translations = {
    nl: {
      badge: "Werkwijze",
      title: "Van intake tot resultaat in 3 stappen",
      subtitle: "Geen verrassingen, geen vaag proces. Je weet precies wat er gebeurt en wanneer.",
      steps: [
        {
          num: "01",
          timeline: "Week 1–2",
          title: "Audit & Strategie",
          desc: "We analyseren je huidige advertentie-accounts, website en funnel. Je ontvangt een helder rapport met wat werkt, wat niet werkt, en een concreet actieplan.",
          deliverables: [
            "Account audit rapport",
            "Mediaplan met budgetverdeling",
            "Funnel & tracking analyse"
          ],
          icon: Search
        },
        {
          num: "02",
          timeline: "Week 2–4",
          title: "Setup & Bouw",
          desc: "We bouwen de campagnestructuur, landingspagina's en tracking in. Je krijgt alles te zien vóór lancering — niets gaat live zonder jouw akkoord.",
          deliverables: [
            "Campagnestructuur & advertenties",
            "Landingspagina('s) op maat",
            "Server-side tracking installatie"
          ],
          icon: PenTool
        },
        {
          num: "03",
          timeline: "Doorlopend",
          title: "Beheer & Optimalisatie",
          desc: "De campagnes gaan live. Wij monitoren dagelijks, optimaliseren wekelijks en rapporteren maandelijks. Je weet altijd waar je aan toe bent.",
          deliverables: [
            "Dagelijks account management",
            "Wekelijkse optimalisatie-cyclus",
            "Maandelijkse rapportage & call"
          ],
          icon: TrendingUp
        }
      ]
    },
    en: {
      badge: "Method",
      title: "From intake to results in 3 steps",
      subtitle: "No surprises, no vague process. You know exactly what happens and when.",
      steps: [
        {
          num: "01",
          timeline: "Week 1–2",
          title: "Audit & Strategy",
          desc: "We analyze your current ad accounts, website and funnel. You receive a clear report on what works, what doesn't, and a concrete action plan.",
          deliverables: [
            "Account audit report",
            "Media plan with budget allocation",
            "Funnel & tracking analysis"
          ],
          icon: Search
        },
        {
          num: "02",
          timeline: "Week 2–4",
          title: "Setup & Build",
          desc: "We build the campaign structure, landing pages and tracking. You see everything before launch — nothing goes live without your sign-off.",
          deliverables: [
            "Campaign structure & creatives",
            "Custom landing page(s)",
            "Server-side tracking setup"
          ],
          icon: PenTool
        },
        {
          num: "03",
          timeline: "Ongoing",
          title: "Management & Optimization",
          desc: "Campaigns go live. We monitor daily, optimize weekly, and report monthly. You always know where you stand.",
          deliverables: [
            "Daily account management",
            "Weekly optimization cycles",
            "Monthly reporting & strategy call"
          ],
          icon: TrendingUp
        }
      ]
    }
  }[lang];

  return (
    <section id="werkwijze" className="section-padding w-full bg-white relative z-10 border-y border-black/[0.04] overflow-hidden">
      
      <div className="max-w-[1100px] mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-[540px] mb-16"
        >
          <div className="section-badge">
            {translations.badge}
          </div>
          
          <h2 className="font-display text-[32px] md:text-[42px] font-normal tracking-[-0.01em] mb-4 text-[var(--color-text-primary)] leading-[1.15]">
            {translations.title}
          </h2>
          <p className="text-[16px] sm:text-[17px] font-light text-[var(--color-text-secondary)] leading-[1.7]">
            {translations.subtitle}
          </p>
        </motion.div>

        {/* Steps — Vertical Timeline */}
        <div className="flex flex-col gap-0 relative">
          {/* Animated Vertical line */}
          <motion.div 
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="hidden md:block absolute left-[31px] top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-agency-accent)]/10 via-[var(--color-agency-accent)]/50 to-transparent origin-top" 
          />

          {translations.steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="flex gap-6 md:gap-10 relative pb-12 last:pb-0 group"
            >
              {/* Number & Line Connector */}
              <div className="shrink-0 flex flex-col items-center">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="size-16 rounded-xl bg-white border border-black/[0.06] shadow-sm flex items-center justify-center relative z-10 group-hover:border-[var(--color-agency-accent)]/30 group-hover:shadow-md transition-colors duration-300"
                >
                  <span className="font-outfit font-bold text-[var(--color-agency-accent)] text-[15px]">{step.num}</span>
                </motion.div>
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="font-outfit font-semibold text-[20px] text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-agency-accent)]">{step.title}</h3>
                  <span className="text-[11px] font-semibold text-[var(--color-agency-accent)] bg-[var(--color-agency-accent-light)] px-2.5 py-0.5 rounded-md">
                    {step.timeline}
                  </span>
                </div>
                
                <p className="text-[15px] font-light text-[var(--color-text-secondary)] leading-[1.7] mb-5 max-w-[540px]">{step.desc}</p>
                
                {/* Deliverables */}
                <div className="flex flex-wrap gap-2">
                  {step.deliverables.map((d, idx) => (
                    <motion.span 
                      key={idx} 
                      whileHover={{ scale: 1.05, backgroundColor: "var(--color-agency-accent-light)" }}
                      className="text-[12px] text-[var(--color-text-secondary)] bg-[var(--color-agency-bg)] px-3 py-1.5 rounded-md border border-black/[0.04] transition-colors cursor-default"
                    >
                      {d}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
