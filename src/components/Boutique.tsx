import founderImg from '../assets/images/founder_portrait_1780056093258.png';

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
      quote: "Ik rapporteer niet op klikken. Ik rapporteer op wat er onderaan de streep overblijft.",
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
      quote: "I don't report on clicks. I report on what's left at the bottom line.",
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
    <section id="aanpak" className="section-padding bg-[var(--color-agency-bg)] overflow-hidden relative border-b border-black/[0.04]">
      <div className="max-w-[1100px] mx-auto flex flex-col lg:flex-row items-start gap-14 lg:gap-20 w-full relative z-10">
        
        {/* Copy Column */}
        <div className="flex-1 w-full scroll-reveal">
          <div className="section-badge">
            {content.badge}
          </div>
          
          <h2 className="font-display text-[32px] md:text-[42px] font-normal tracking-[-0.01em] mb-6 text-[var(--color-text-primary)] leading-[1.15]">
            {content.h2}
          </h2>
          
          <p className="text-[16px] sm:text-[17px] font-light text-[var(--color-text-secondary)] mb-4 leading-[1.75]">
            {content.p1}
          </p>
          <p className="text-[16px] sm:text-[17px] font-light text-[var(--color-text-secondary)] mb-10 leading-[1.75]">
            {content.p2}
          </p>
          
          {/* Promises as simple list */}
          <ul className="flex flex-col gap-3 border-t border-black/[0.05] pt-8">
            {content.promises.map((promise, i) => (
              <li key={i} className="flex items-center gap-3 text-[14px] sm:text-[15px] text-[var(--color-text-primary)] font-medium">
                <div className="size-1.5 rounded-full bg-[var(--color-agency-accent)]" />
                {promise}
              </li>
            ))}
          </ul>
        </div>

        {/* Quote + Photo Column */}
        <div className="flex-1 w-full scroll-reveal max-w-[440px]">
          {/* Quote Card */}
          <div className="dark-panel rounded-xl p-7 sm:p-9 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-agency-accent)]/[0.06] rounded-full blur-[40px] pointer-events-none" />
            
            {/* Quote */}
            <blockquote className="relative z-10 mb-8">
              <p className="font-display italic text-[20px] sm:text-[22px] text-white leading-[1.5] font-normal">
                "{content.quote}"
              </p>
            </blockquote>
            
            {/* Author */}
            <div className="flex items-center gap-4 relative z-10 border-t border-white/10 pt-6">
              <div className="size-12 rounded-lg overflow-hidden shrink-0">
                <img 
                  src={founderImg} 
                  alt={content.name}
                  className="w-full h-full object-cover object-[center_20%]"
                />
              </div>
              <div>
                <div className="font-outfit font-semibold text-[15px] text-white">{content.name}</div>
                <div className="text-[12px] text-[var(--color-agency-accent)] font-medium">{content.role}</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
