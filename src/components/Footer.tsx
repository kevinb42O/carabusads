import { BrandLogo } from './BrandLogo';
import { ExternalLink } from 'lucide-react';

interface FooterProps {
  lang: 'nl' | 'en';
  setActivePage?: (page: 'home' | 'privacy' | 'terms') => void;
}

export function Footer({ lang, setActivePage }: FooterProps) {
  const content = {
    nl: {
      description: "Performance marketing bureau gespecialiseerd in Social Ads en conversie-funnels.",
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
      description: "Performance marketing agency specializing in Social Ads and conversion funnels.",
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
    <footer className="bg-[#0b1a29] text-white pt-20 pb-10 px-6 sm:px-10 relative z-10 overflow-hidden">
      {/* Ambient glowing background effects */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[var(--color-agency-accent)]/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[#f59e0b]/5 rounded-full blur-[150px] translate-y-1/3 translate-x-1/3 pointer-events-none" />
      
      {/* Top subtle border gradient */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="max-w-[1100px] mx-auto w-full relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/[0.06]">
          
          {/* Branding */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <a href="#" className="group inline-block" onClick={(e) => { e.preventDefault(); setActivePage?.('home'); }}>
              <BrandLogo variant="light" size="md" />
            </a>
            <p className="text-[14px] text-white/50 font-light leading-relaxed max-w-[300px]">
              {content.description}
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <h4 className="font-outfit font-semibold text-[13px] uppercase tracking-wider text-white/40">{content.navigationHeader}</h4>
            <div className="flex flex-col gap-3 text-[14px] text-white/60 font-light">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="hover:text-[#f59e0b] hover:translate-x-1 transition-all duration-300 w-fit">{link.name}</a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            <h4 className="font-outfit font-semibold text-[13px] uppercase tracking-wider text-white/40">{content.expertiseHeader}</h4>
            <div className="flex flex-col gap-3 text-[14px] text-white/60 font-light">
              {services.map((s) => (
                <span key={s} className="hover:text-white transition-colors cursor-default">{s}</span>
              ))}
            </div>
          </div>

          {/* Contact Hours */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            <h4 className="font-outfit font-semibold text-[13px] uppercase tracking-wider text-white/40">{content.hoursHeader}</h4>
            <div className="flex flex-col gap-2 text-[14px] text-white/60 font-light">
              <a href={`mailto:info@carabusads.${lang === 'nl' ? 'be' : 'com'}`} className="hover:text-[#f59e0b] transition-colors mb-2 w-fit">
                info@carabusads.{lang === 'nl' ? 'be' : 'com'}
              </a>
              <div className="flex items-center gap-2">
                <span className="text-white/40">{content.hoursWeek}</span>
                <span className="font-medium text-white/80">{content.hoursTime}</span>
              </div>
              <div className="mt-1 flex items-center gap-2 text-[12px] text-[var(--color-agency-accent)] bg-[var(--color-agency-accent)]/10 px-2.5 py-1 rounded-full w-fit border border-[var(--color-agency-accent)]/20">
                <div className="size-1.5 rounded-full bg-[var(--color-agency-accent)] animate-pulse" />
                {content.hoursSub}
              </div>
            </div>
          </div>

        </div>

        {/* Company Info Bar */}
        <div className="py-8 border-b border-white/[0.06]">
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl py-5 px-6 sm:px-10 flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] text-white/40 font-light">
            <div className="flex items-center gap-2">
              <span className="font-medium text-white/70">I-Transform SLU</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-white/10"></div>
            <div>AD100 Canillo, Andorra</div>
            <div className="hidden md:block w-px h-4 bg-white/10"></div>
            <div className="flex items-center gap-2">
              <span className="text-white/30 uppercase text-[11px] font-semibold tracking-wider">VAT</span>
              <span className="font-mono text-white/60 bg-white/5 px-2 py-0.5 rounded">L-720368-C</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pt-8 text-[13px] text-white/35 font-light">
          <p className="order-2 lg:order-1">© {new Date().getFullYear()} CarabusADS. {content.allRights}</p>
          
          <div className="order-3 flex gap-8">
            <button onClick={() => setActivePage?.('privacy')} className="hover:text-[#f59e0b] transition-colors cursor-pointer">{content.privacy}</button>
            <button onClick={() => setActivePage?.('terms')} className="hover:text-[#f59e0b] transition-colors cursor-pointer">{content.terms}</button>
          </div>
        </div>

      </div>
    </footer>
  );
}
