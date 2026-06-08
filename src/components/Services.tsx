import React, { useRef } from 'react';
import { Target, Share2, Layers } from 'lucide-react';
import { motion } from 'motion/react';

interface ServicesProps {
  lang: 'nl' | 'en';
}

export function Services({ lang }: ServicesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const cards = containerRef.current.getElementsByClassName('bento-card');
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i] as HTMLElement;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    }
  };

  const translations = {
    nl: {
      badge: "Onze Expertise",
      title: "De Groei-Infrastructuur",
      subtitle: "We ontwerpen het volledige acquisitie-traject: van de allereerste indruk tot aan de gesloten deal.",
      items: [
        {
          title: "Meta & Social Ads",
          desc: "Slimme campagnes die de juiste mensen bereiken, nog vóórdat je concurrentie doorheeft dat ze op zoek zijn.",
          icon: Target,
          bullets: [
            "Zeer gerichte doelgroepbepaling",
            "Snel testen van verschillende advertenties",
            "Winstgevende vervolgcampagnes (retargeting)",
            "Structureel nieuwe aanvragen werven"
          ]
        },
        {
          title: "Funnels & Landingspagina's",
          desc: "We bouwen landingspagina's die meer bezoekers omzetten in leads, klanten en omzet.",
          icon: Layers,
          bullets: [
            "Pagina's volledig gericht op actie",
            "Continu meten en testen wat écht werkt",
            "Directe koppeling met je klantensysteem",
            "100% waterdichte en eerlijke metingen"
          ]
        },
        {
          title: "Strategie & Advies",
          desc: "Voor bedrijven die willen groeien. We analyseren je advertenties, ontdekken wat beter kan en maken een duidelijk plan om meer klanten en omzet te realiseren.",
          icon: Share2,
          bullets: [
            "Diepgaande analyse van je accounts",
            "Heldere voorspellingen van kosten en winst",
            "Ontwerp van het ideale verkooptraject",
            "Persoonlijk en eerlijk strategisch overleg"
          ]
        }
      ]
    },
    en: {
      badge: "Our Expertise",
      title: "The Growth Infrastructure",
      subtitle: "We engineer the entire customer journey: from first impression to closed deal.",
      items: [
        {
          title: "Meta & Social Ads",
          desc: "Data-driven campaigns that capture demand before your competitors even know it exists.",
          icon: Target,
          bullets: [
            "High-intent audience targeting",
            "Rapid creative testing & iteration",
            "Profitable retargeting flows",
            "Lead generation at scale"
          ]
        },
        {
          title: "Funnels & Landing Pages",
          desc: "High-converting architecture that turns your expensive traffic into qualified pipeline.",
          icon: Layers,
          bullets: [
            "Dedicated conversion pages",
            "Data-driven A/B testing",
            "Seamless CRM integrations",
            "Server-side tracking (GTM)"
          ]
        },
        {
          title: "Strategy & Advisory",
          desc: "For businesses ready to scale. We audit your accounts, find the leaks, and build a robust roadmap.",
          icon: Share2,
          bullets: [
            "Deep-dive account audits",
            "CPA & ROAS forecasting",
            "Funnel architecture",
            "Executive strategy calls"
          ]
        }
      ]
    }
  }[lang];

  const headerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemFadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", bounce: 0.2, duration: 0.8 }
    },
  };

  const bentoClasses = [
    "lg:col-span-2 lg:row-span-2",
    "lg:col-span-1",
    "lg:col-span-1"
  ];

  return (
    <section id="diensten" className="section-padding w-full bg-[var(--color-agency-bg)] relative z-10 overflow-clip">
      <div className="absolute top-1/2 right-0 w-[800px] h-[800px] bg-[var(--color-agency-accent)]/5 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none translate-x-1/3" />
      
      <div className="max-w-[1200px] mx-auto relative z-10">
        
        <motion.div 
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-[600px] mb-16"
        >
          <motion.div variants={itemFadeUp} className="section-badge">
            {translations.badge}
          </motion.div>
          
          <motion.h2 variants={itemFadeUp} className="font-display text-[36px] md:text-[48px] font-normal tracking-[-0.01em] mb-6 text-[var(--color-text-primary)] leading-[1.1]">
            {translations.title}
          </motion.h2>
          <motion.p variants={itemFadeUp} className="text-[17px] md:text-[19px] font-light text-[var(--color-text-secondary)] leading-[1.7]">
            {translations.subtitle}
          </motion.p>
        </motion.div>

        <motion.div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
        >
          {translations.items.map((service, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className={`bento-card dark-panel rounded-2xl p-8 sm:p-10 flex flex-col relative overflow-clip group ${bentoClasses[i]}`}
            >
              {i === 0 && (
                <>
                  <div 
                    className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none transition-transform duration-1000 group-hover:scale-105 blur-[3px]"
                    style={{ backgroundImage: 'url(/metaachtergrond.jpeg)' }}
                  />
                  <div className="absolute inset-0 z-0 bg-[#0b1a29]/60 pointer-events-none mix-blend-multiply" />
                  <div className="absolute inset-0 z-0 bg-[var(--color-agency-bg)]/40 pointer-events-none" />
                </>
              )}
              <div 
                className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(92,203,186,0.08), transparent 40%)` }}
              />
              
              <div className={`flex-1 relative z-10 ${i === 0 ? 'pb-12' : 'pb-8'}`}>
                <div className={i === 0 ? 'sticky top-32 p-6 sm:p-8 rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border border-white/40 shadow-xl bg-[#c7d9e2] relative overflow-hidden' : ''}>
                  <div className={`flex gap-5 mb-5 relative z-10 ${i === 0 ? 'flex-col md:flex-row md:items-center' : 'flex-col items-start'}`}>
                    <div 
                      className="size-14 rounded-2xl flex items-center justify-center bg-white/50 text-[#0b1a29] shrink-0 border border-white/40 group-hover:bg-white/80 transition-colors duration-500"
                    >
                      <service.icon className="size-6" />
                    </div>

                    <div>
                      <h3 className={`font-outfit font-semibold tracking-tight text-[var(--color-text-primary)] leading-tight ${i === 0 ? 'text-[26px]' : 'text-[22px]'}`}>{service.title}</h3>
                    </div>
                  </div>

                  <p className={`font-light text-[var(--color-text-secondary)] leading-[1.7] ${i === 0 ? 'text-[16px] max-w-lg' : 'text-[15px]'}`}>
                    {service.desc}
                  </p>
                </div>
              </div>
              
              <ul className={`grid gap-4 mt-auto border-t border-white/[0.05] pt-6 relative z-10 ${i === 0 ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                {service.bullets.map((bullet, idx) => (
                  <li key={idx} className={`flex items-center gap-3 text-[14px] transition-colors duration-300 ${i === 0 ? 'text-white/90 group-hover:text-white font-medium tracking-wide' : 'text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)]'}`}>
                    <div className={`size-1.5 rounded-full transition-colors duration-300 ${i === 0 ? 'bg-[var(--color-agency-accent)] shadow-[0_0_8px_rgba(92,203,186,0.6)]' : 'bg-[#0b1a29]/50 group-hover:bg-[#0b1a29]'}`} />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
