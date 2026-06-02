import { Search, Target, Share2, Layers, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ServicesProps {
  lang: 'nl' | 'en';
}

export function Services({ lang }: ServicesProps) {
  const translations = {
    nl: {
      badge: "Diensten",
      title: "Wat we voor je doen",
      subtitle: "Van de eerste advertentieklik tot de uiteindelijke verkoop. Wij beheren het volledige traject.",
      cta: "Meer weten",
      items: [
        {
          title: "Google Ads",
          desc: "Search, Shopping en Display campagnes die vindbare bedrijven bouwen. Wij zorgen dat je bovenaan staat wanneer je klant actief zoekt naar jouw product of dienst.",
          icon: Search,
          bullets: [
            "Search & Shopping campagnes",
            "Zoekwoordonderzoek & biedstrategie",
            "Conversietracking & attributie",
            "Wekelijks account management"
          ]
        },
        {
          title: "Meta & Social Ads",
          desc: "Campagnes op Facebook, Instagram, LinkedIn en TikTok die je merk zichtbaar maken bij de juiste doelgroep — ook als ze nog niet actief zoeken.",
          icon: Target,
          bullets: [
            "Doelgroeponderzoek & targeting",
            "Creative testing & iteratie",
            "Retargeting flows",
            "Lead generation formulieren"
          ]
        },
        {
          title: "Funnels & Landingspagina's",
          desc: "Een goede advertentie verdient een goede bestemming. Wij bouwen de pagina's en flows die van bezoekers daadwerkelijk klanten maken.",
          icon: Layers,
          bullets: [
            "Converterende landingspagina's",
            "A/B testing van paginavarianten",
            "CRM & e-mail integraties",
            "Server-side tracking (GTM)"
          ]
        },
        {
          title: "Strategie & Advies",
          desc: "Geen idee waar je moet beginnen? We analyseren je huidige setup en geven je een helder plan met concrete stappen en prioriteiten.",
          icon: Share2,
          bullets: [
            "Account audit & analyse",
            "Mediaplan & budgetverdeling",
            "Funnel architectuur",
            "Maandelijks strategiegesprek"
          ]
        }
      ]
    },
    en: {
      badge: "Services",
      title: "What we do",
      subtitle: "From the first ad click to the final sale. We manage the entire journey.",
      cta: "Learn more",
      items: [
        {
          title: "Google Ads",
          desc: "Search, Shopping and Display campaigns that put you in front of customers actively searching for your product or service.",
          icon: Search,
          bullets: [
            "Search & Shopping campaigns",
            "Keyword research & bid strategy",
            "Conversion tracking & attribution",
            "Weekly account management"
          ]
        },
        {
          title: "Meta & Social Ads",
          desc: "Campaigns on Facebook, Instagram, LinkedIn and TikTok that put your brand in front of the right audience — even before they're actively searching.",
          icon: Target,
          bullets: [
            "Audience research & targeting",
            "Creative testing & iteration",
            "Retargeting flows",
            "Lead generation forms"
          ]
        },
        {
          title: "Funnels & Landing Pages",
          desc: "A great ad deserves a great destination. We build the pages and flows that actually convert visitors into customers.",
          icon: Layers,
          bullets: [
            "High-converting landing pages",
            "A/B testing of page variants",
            "CRM & email integrations",
            "Server-side tracking (GTM)"
          ]
        },
        {
          title: "Strategy & Advisory",
          desc: "Not sure where to start? We analyze your current setup and give you a clear plan with concrete steps and priorities.",
          icon: Share2,
          bullets: [
            "Account audit & analysis",
            "Media plan & budget allocation",
            "Funnel architecture",
            "Monthly strategy sessions"
          ]
        }
      ]
    }
  }[lang];

  // Animation variants
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

  return (
    <section id="diensten" className="section-padding w-full bg-[var(--color-agency-bg)] relative z-10 overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-[var(--color-agency-accent)]/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none translate-x-1/3" />
      
      <div className="max-w-[1100px] mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div 
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-[540px] mb-16"
        >
          <motion.div variants={itemFadeUp} className="section-badge">
            {translations.badge}
          </motion.div>
          
          <motion.h2 variants={itemFadeUp} className="font-display text-[32px] md:text-[42px] font-normal tracking-[-0.01em] mb-4 text-[var(--color-text-primary)] leading-[1.15]">
            {translations.title}
          </motion.h2>
          <motion.p variants={itemFadeUp} className="text-[16px] sm:text-[17px] font-light text-[var(--color-text-secondary)] leading-[1.7]">
            {translations.subtitle}
          </motion.p>
        </motion.div>

        {/* Services Grid — 2x2 for visual variety */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 gap-6 w-full"
        >
          {translations.items.map((service, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="card-elevated rounded-xl p-7 sm:p-8 group flex flex-col relative overflow-hidden bg-white hover:border-[var(--color-agency-accent)]/20 transition-colors duration-300"
            >
              {/* Subtle hover gradient inside card */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-agency-accent)]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex items-start gap-4 mb-5 relative z-10">
                {/* Icon */}
                <motion.div 
                  className="size-12 rounded-xl flex items-center justify-center bg-[var(--color-agency-accent-light)] text-[var(--color-agency-accent)] shrink-0 shadow-sm border border-[var(--color-agency-accent)]/10 group-hover:bg-[var(--color-agency-accent)] group-hover:text-white transition-colors duration-500"
                  whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  <service.icon className="size-5" />
                </motion.div>

                {/* Title */}
                <div className="pt-2">
                  <h3 className="font-outfit font-semibold text-[20px] text-[var(--color-text-primary)] leading-tight">{service.title}</h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-[14px] sm:text-[15px] font-light text-[var(--color-text-secondary)] leading-[1.7] mb-6 relative z-10">{service.desc}</p>
              
              {/* Bullets */}
              <ul className="flex flex-col gap-3 mt-auto border-t border-black/[0.04] pt-5 relative z-10">
                {service.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-[13px] text-[var(--color-text-secondary)]">
                    <div className="size-1.5 rounded-full bg-[var(--color-agency-accent)]/40 group-hover:bg-[var(--color-agency-accent)] transition-colors duration-300" />
                    <span className="group-hover:text-[var(--color-text-primary)] transition-colors duration-300">{bullet}</span>
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
