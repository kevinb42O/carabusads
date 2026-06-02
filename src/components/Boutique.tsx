import { motion } from 'motion/react';
import founderImg from '../assets/images/founder_portrait_1780056093258.png';
import workspaceImg from '../assets/images/agency_workspace_clean.png';

interface BoutiqueProps {
  lang: 'nl' | 'en';
}

export function Boutique({ lang }: BoutiqueProps) {
  const content = {
    nl: {
      badge: "Over ons",
      h2: "Eén aanspreekpunt. Geen tussenschakels.",
      p1: "Bij de meeste bureaus word je binnengehaald door een accountmanager en draagt hij je over aan een junior of stagiair. Bij Carabus Ads werk je rechtstreeks met de specialist die je campagnes beheert.",
      p2: "Dat betekent: korte lijnen, snelle beslissingen, en iemand die je account écht kent. Geen ticketsystemen, geen wachttijden van drie werkdagen.",
      quote: "Campagnes moeten meetbare groei opleveren, geen vanity metrics. Dat is de enige KPI die telt.",
      name: "Hans Claes",
      role: "Oprichter & Strategist",
      promises: [
        "Direct contact via WhatsApp, telefoon of mail",
        "Dagelijks actief accountbeheer",
        "Transparante rapportage op netto resultaat"
      ]
    },
    en: {
      badge: "About us",
      h2: "One point of contact. No middlemen.",
      p1: "At most agencies, you're brought in by an account manager and then handed off to a junior or intern. At Carabus Ads, you work directly with the specialist managing your campaigns.",
      p2: "That means: short communication lines, fast decisions, and someone who truly knows your account. No ticketing systems, no three-day waiting periods.",
      quote: "Campaigns should drive measurable growth, not vanity metrics. That's the only KPI that matters.",
      name: "Hans Claes",
      role: "Founder & Strategist",
      promises: [
        "Direct contact via WhatsApp, phone or email",
        "Daily active account management",
        "Transparent reporting on net results"
      ]
    }
  }[lang];

  return (
    <section id="aanpak" className="section-padding bg-white overflow-hidden relative border-y border-black/[0.04]">
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-[var(--color-agency-accent)]/[0.02] rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />

      <div className="max-w-[1100px] mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-20 w-full relative z-10">
        
        {/* Copy Column */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
          className="flex-1 w-full lg:max-w-[480px]"
        >
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } }}
            className="section-badge"
          >
            {content.badge}
          </motion.div>
          
          <motion.h2 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } }}
            className="font-display text-[32px] md:text-[42px] font-normal tracking-[-0.01em] mb-6 text-[var(--color-text-primary)] leading-[1.15]"
          >
            {content.h2}
          </motion.h2>
          
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } }}
            className="text-[16px] sm:text-[17px] font-light text-[var(--color-text-secondary)] mb-4 leading-[1.75]"
          >
            {content.p1}
          </motion.p>
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } }}
            className="text-[16px] sm:text-[17px] font-light text-[var(--color-text-secondary)] mb-10 leading-[1.75]"
          >
            {content.p2}
          </motion.p>
          
          {/* Promises list */}
          <motion.ul 
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
            className="flex flex-col gap-4 border-t border-black/[0.05] pt-8"
          >
            {content.promises.map((promise, i) => (
              <motion.li 
                key={i} 
                variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}
                className="flex items-center gap-4 text-[14px] sm:text-[15px] text-[var(--color-text-primary)] font-medium"
              >
                <div className="size-2 rounded-full bg-[var(--color-agency-accent)]/80" />
                {promise}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Visual Column */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 w-full relative"
        >
          {/* Main Workspace Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] group">
            <motion.div 
              whileHover={{ scale: 1.03 }} 
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5]"
            >
              <img 
                src={workspaceImg} 
                alt="Carabus Ads Workspace" 
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
            
            {/* Soft inner shadow for depth */}
            <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl pointer-events-none" />
          </div>

          {/* Overlapping Quote Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.4, duration: 0.8, type: "spring", bounce: 0.15 }}
            className="absolute -bottom-8 -left-4 sm:-left-12 sm:bottom-12 w-[calc(100%-2rem)] sm:w-[380px] bg-white rounded-2xl p-6 sm:p-8 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] ring-1 ring-black/[0.04]"
          >
            <blockquote className="mb-6 relative">
              <span className="absolute -top-3 -left-2 text-[40px] text-[var(--color-agency-accent)]/10 font-display leading-none">"</span>
              <p className="font-outfit text-[16px] sm:text-[18px] text-[var(--color-text-primary)] font-medium leading-[1.5] relative z-10 italic">
                {content.quote}
              </p>
            </blockquote>
            
            <div className="flex items-center gap-4">
              <div className="size-11 rounded-full overflow-hidden shrink-0 border border-black/5 ring-2 ring-[var(--color-agency-bg)]">
                <img 
                  src={founderImg} 
                  alt={content.name}
                  className="w-full h-full object-cover object-[center_20%]"
                />
              </div>
              <div>
                <div className="font-outfit font-bold text-[14px] text-[var(--color-text-primary)]">{content.name}</div>
                <div className="text-[12px] text-[var(--color-text-muted)] font-medium">{content.role}</div>
              </div>
            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}
