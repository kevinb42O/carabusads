import { BrandLogo } from './BrandLogo';

interface FooterProps {
  lang: 'nl' | 'en';
}

export function Footer({ lang }: FooterProps) {
  const content = {
    nl: {
      description: "Performance marketing bureau gespecialiseerd in Social Ads en conversie-funnels. Gevestigd in België.",
      navigationHeader: "Navigatie",
      expertiseHeader: "Diensten",
      hoursHeader: "Contact",
      hoursWeek: "Ma t/m Vr",
      hoursTime: "09:00 – 18:00",
      hoursSub: "Gemiddelde responstijd: 4 uur",
      allRights: "Alle rechten voorbehouden.",
      privacy: "Privacy",
      terms: "Voorwaarden",
    },
    en: {
      description: "Performance marketing agency specializing in Social Ads and conversion funnels. Based in Belgium.",
      navigationHeader: "Navigation",
      expertiseHeader: "Services",
      hoursHeader: "Contact",
      hoursWeek: "Mon to Fri",
      hoursTime: "09:00 – 18:00",
      hoursSub: "Average response time: 4 hours",
      allRights: "All rights reserved.",
      privacy: "Privacy",
      terms: "Terms",
    }
  }[lang];

  const navLinks = lang === 'nl' ? [
    { name: 'Probleem', href: '#pijnpunt' },
    { name: 'Diensten', href: '#diensten' },
    { name: 'Werkwijze', href: '#werkwijze' },
    { name: 'Over ons', href: '#aanpak' },
    { name: 'Contact', href: '#boeken' },
  ] : [
    { name: 'Problem', href: '#pijnpunt' },
    { name: 'Services', href: '#diensten' },
    { name: 'Method', href: '#werkwijze' },
    { name: 'About', href: '#aanpak' },
    { name: 'Contact', href: '#boeken' },
  ];

  const services = lang === 'nl' ? [
    'Meta (Facebook & IG) Ads',
    'LinkedIn Campagnes',
    'Landingspagina\'s & Funnels',
    'Server-Side Tracking',
  ] : [
    'Meta (Facebook & IG) Ads',
    'LinkedIn Campaigns',
    'Landing Pages & Funnels',
    'Server-Side Tracking',
  ];

  return (
    <footer className="bg-[var(--color-text-primary)] text-white pt-16 pb-10 px-6 sm:px-10 border-t border-white/[0.04]">
      <div className="max-w-[1100px] mx-auto w-full">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/[0.06]">
          
          {/* Branding */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <a href="#" className="group">
              <BrandLogo variant="light" size="md" />
            </a>
            <p className="text-[13px] text-white/50 font-light leading-relaxed max-w-[300px]">
              {content.description}
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="font-outfit font-semibold text-[12px] uppercase tracking-wider text-white/40">{content.navigationHeader}</h4>
            <div className="flex flex-col gap-2.5 text-[13px] text-white/65 font-light">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="hover:text-white transition-colors">{link.name}</a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="font-outfit font-semibold text-[12px] uppercase tracking-wider text-white/40">{content.expertiseHeader}</h4>
            <div className="flex flex-col gap-2.5 text-[13px] text-white/65 font-light">
              {services.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>

          {/* Contact Hours */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="font-outfit font-semibold text-[12px] uppercase tracking-wider text-white/40">{content.hoursHeader}</h4>
            <div className="flex flex-col gap-2 text-[13px] text-white/65 font-light">
              <a href={`mailto:info@carabusads.${lang === 'nl' ? 'be' : 'com'}`} className="hover:text-white transition-colors mb-2">
                info@carabusads.{lang === 'nl' ? 'be' : 'com'}
              </a>
              <div>{content.hoursWeek}</div>
              <div className="font-medium text-white/80">{content.hoursTime}</div>
              <div className="mt-2 text-[12px] text-white/40">{content.hoursSub}</div>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-[12px] text-white/35 font-light">
          <p>© {new Date().getFullYear()} CarabusADS. {content.allRights}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/60 transition-colors">{content.privacy}</a>
            <a href="#" className="hover:text-white/60 transition-colors">{content.terms}</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
