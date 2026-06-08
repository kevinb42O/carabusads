import { useRef } from 'react';
import { Search, PenTool, TrendingUp } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';

interface MethodologyProps {
  lang: 'nl' | 'en';
}

export function Methodology({ lang }: MethodologyProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  
  // For desktop horizontal scroll
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });
  // Use a function for useTransform because Framer Motion cannot interpolate between complex calc() strings in an array
  const x = useTransform(scrollYProgress, (v) => `calc(${v * 100}vw - ${v * 100}%)`);

  const translations = {
    nl: {
      badge: "Onze Blauwdruk",
      title: "Het protocol voor schaalbare groei",
      subtitle: "Geen giswerk of vage processen. Een strak kader dat zorgt voor winstgevende acquisitie.",
      steps: [
        {
          num: "01",
          timeline: "Fase 1",
          title: "Analyse & Strategie",
          desc: "We leggen je huidige advertenties en website onder het vergrootglas. We sporen de knelpunten op en leveren een helder stappenplan om direct het rendement te verbeteren.",
          deliverables: [
            "Diepgaande analyse",
            "Data en metingen in kaart",
            "Duidelijk groeiplan"
          ],
          icon: Search
        },
        {
          num: "02",
          timeline: "Fase 2",
          title: "De Fundering",
          desc: "We bouwen een waterdichte basis. Van overtuigende landingspagina's tot betrouwbare metingen en uiterst gerichte campagnes. Alles klaar voor omzetgroei.",
          deliverables: [
            "Nieuwe actiepagina's",
            "Waterdichte metingen",
            "Nieuwe advertentiestructuur"
          ],
          icon: PenTool
        },
        {
          num: "03",
          timeline: "Fase 3",
          title: "Schalen & Optimaliseren",
          desc: "We draaien de kraan open. Met doorlopende optimalisaties en dagelijks beheer sturen we keihard op de kosten per klant en de daadwerkelijke winst.",
          deliverables: [
            "Dagelijks beheer",
            "Doorlopende optimalisaties",
            "Wekelijkse heldere rapportage"
          ],
          icon: TrendingUp
        }
      ]
    },
    en: {
      badge: "The Blueprint",
      title: "Our framework for scalable growth",
      subtitle: "No guesswork or vague promises. A rigid framework designed for predictable and profitable client acquisition.",
      steps: [
        {
          num: "01",
          timeline: "Phase 1",
          title: "Growth Audit & Strategy",
          desc: "We dissect your current accounts, tracking, and funnels. We identify the bottlenecks and deliver a data-driven action plan to immediately improve ROI.",
          deliverables: [
            "Deep-dive account audit",
            "Data & attribution analysis",
            "Scalability roadmap"
          ],
          icon: Search
        },
        {
          num: "02",
          timeline: "Phase 2",
          title: "Infrastructure & Build",
          desc: "We build a bulletproof foundation. From high-converting landing pages to server-side GTM tracking and hyper-targeted Meta/Google campaigns. Built to scale.",
          deliverables: [
            "High-converting funnel setup",
            "Server-side tracking (GTM)",
            "New campaign architecture"
          ],
          icon: PenTool
        },
        {
          num: "03",
          timeline: "Phase 3",
          title: "Scale & Optimize",
          desc: "We open the valve. Through relentless A/B testing, daily management, and weekly iterations, we steer purely on Cost Per Acquisition (CPA) and Return on Ad Spend (ROAS).",
          deliverables: [
            "Daily performance management",
            "Creative & funnel iterations",
            "Weekly live reporting"
          ],
          icon: TrendingUp
        }
      ]
    }
  }[lang];

  return (
    <section id="werkwijze" className="w-full bg-[var(--color-agency-bg)] relative z-10">
      
      {/* Mobile Layout (Standard vertical) */}
      <div className="md:hidden section-padding flex flex-col gap-12">
        <div className="mb-8">
          <div className="section-badge mb-6">{translations.badge}</div>
          <h2 className="font-display text-[32px] font-normal tracking-[-0.01em] mb-4 text-[var(--color-text-primary)] leading-[1.15]">
            {translations.title}
          </h2>
          <p className="text-[16px] font-light text-[var(--color-text-secondary)] leading-[1.7]">
            {translations.subtitle}
          </p>
        </div>

        <div className="flex flex-col gap-16">
          {translations.steps.map((step, i) => (
            <div key={i} className="relative">
              {/* Massive background number */}
              <div className="absolute -top-10 -left-4 text-[120px] font-display font-bold text-black/5 pointer-events-none z-0">
                {step.num}
              </div>
              
              <div className="relative z-10 dark-panel p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="size-10 rounded-xl bg-[var(--color-agency-accent)]/10 text-[var(--color-agency-accent)] flex items-center justify-center shrink-0">
                    <step.icon className="size-5" />
                  </div>
                  <h3 className="font-outfit font-semibold text-[20px] text-[var(--color-text-primary)]">{step.title}</h3>
                </div>
                <p className="text-[15px] font-light text-[var(--color-text-secondary)] leading-[1.7] mb-6">
                  {step.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {step.deliverables.map((d, idx) => (
                    <span key={idx} className="text-[12px] text-[var(--color-text-secondary)] bg-white/50 border border-white/40 px-3 py-1.5 rounded-md">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Layout (Horizontal Scroll) */}
      <div ref={targetRef} className="hidden md:block h-[300vh] relative">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden bg-[var(--color-agency-bg)]">
          
          {/* Static Header pinned to left with solid background to hide cards sliding behind it */}
          <div className="absolute top-0 left-0 w-[45vw] lg:w-[40vw] h-full flex flex-col justify-center pl-10 lg:pl-[10vw] pr-12 z-20 bg-[var(--color-agency-bg)] shadow-[30px_0_50px_var(--color-agency-bg)] border-r border-white/5">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-badge mb-6"
            >
              {translations.badge}
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-[42px] lg:text-[48px] font-normal tracking-[-0.01em] mb-4 text-[var(--color-text-primary)] leading-[1.1]"
            >
              {translations.title}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[17px] font-light text-[var(--color-text-secondary)] leading-[1.7]"
            >
              {translations.subtitle}
            </motion.p>
          </div>

          {/* Scrolling Content */}
          <motion.div style={{ x }} className="flex w-max h-full items-center pl-[50vw] lg:pl-[45vw] pr-[10vw] gap-10 lg:gap-16">
            {translations.steps.map((step, i) => (
              <div key={i} className="w-[85vw] max-w-[450px] shrink-0 h-[500px] flex items-center justify-center relative">
                
                {/* Kinetic Typography Number */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[280px] lg:text-[380px] font-display font-bold text-transparent" style={{ WebkitTextStroke: '2px rgba(0,0,0,0.05)' }}>
                  {step.num}
                </div>

                <motion.div 
                  whileHover={{ y: -10 }}
                  className="w-full dark-panel rounded-3xl p-8 lg:p-10 relative z-10 shadow-2xl border border-white/10 group hover:border-[var(--color-agency-accent)]/30 transition-all duration-500 bg-[var(--color-agency-surface)]/90 backdrop-blur-md"
                >
                  <div className="absolute top-0 right-0 p-8 text-black/5 text-[80px] font-display leading-none pointer-events-none transition-colors duration-500 group-hover:text-[var(--color-agency-accent)]/10">
                    {step.num}
                  </div>
                  
                  <div className="flex items-center gap-4 mb-8 relative z-10">
                    <div className="size-14 rounded-2xl bg-white/50 border border-white/40 text-[var(--color-agency-accent)] flex items-center justify-center shrink-0 group-hover:bg-[var(--color-agency-accent)] group-hover:text-white transition-colors duration-500">
                      <step.icon className="size-6" />
                    </div>
                    <div>
                      <span className="text-[12px] font-semibold tracking-wider text-[var(--color-agency-accent)] uppercase block mb-1">
                        {step.timeline}
                      </span>
                      <h3 className="font-outfit font-semibold text-[22px] lg:text-[24px] text-[var(--color-text-primary)]">{step.title}</h3>
                    </div>
                  </div>
                  
                  <p className="text-[15px] lg:text-[16px] font-light text-[var(--color-text-secondary)] leading-[1.8] mb-8 relative z-10">
                    {step.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {step.deliverables.map((d, idx) => (
                      <span key={idx} className="text-[12px] lg:text-[13px] text-[var(--color-text-secondary)] bg-white/50 border border-white/40 px-4 py-2 rounded-lg backdrop-blur-sm">
                        {d}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
