interface LogoCloudProps {
  lang: 'nl' | 'en';
}

/* Inline SVG icons — official brand marks */

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="size-4">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="size-4" fill="#0A66C2">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);



const GTMIcon = () => (
  <svg viewBox="0 0 24 24" className="size-4" fill="none">
    <path d="M12.003 0L3 5.998v12.004L12.003 24 21 18.002V5.998L12.003 0z" fill="#8AB4F8"/>
    <path d="M12.003 0L3 5.998 12.003 12 21 5.998 12.003 0z" fill="#4285F4"/>
    <path d="M3 18.002L12.003 24V12L3 5.998v12.004z" fill="#8AB4F8"/>
    <path d="M12.003 12L21 18.002V5.998L12.003 12z" fill="#669DF6"/>
  </svg>
);

const GAIcon = () => (
  <svg viewBox="0 0 24 24" className="size-4" fill="none">
    <path d="M22 16.7V3.3C22 2.6 21.4 2 20.7 2h-1.4C18.6 2 18 2.6 18 3.3v13.4c0 .7.6 1.3 1.3 1.3h1.4c.7 0 1.3-.6 1.3-1.3z" fill="#F9AB00"/>
    <path d="M14 16.7V8.3c0-.7-.6-1.3-1.3-1.3h-1.4C10.6 7 10 7.6 10 8.3v8.4c0 .7.6 1.3 1.3 1.3h1.4c.7 0 1.3-.6 1.3-1.3z" fill="#E37400"/>
    <circle cx="4" cy="17" r="2" fill="#E37400"/>
  </svg>
);

const platforms = [
  { name: 'Meta Ads', Icon: FacebookIcon },
  { name: 'LinkedIn', Icon: LinkedInIcon },
  { name: 'Google Tag Manager', Icon: GTMIcon },
  { name: 'Google Analytics', Icon: GAIcon },
];

export function LogoCloud({ lang }: LogoCloudProps) {
  return (
    <section className="py-6 border-y border-white/5 bg-[var(--color-agency-bg)] relative z-10 scroll-reveal-fade">
      <div className="max-w-[1100px] mx-auto px-6 flex flex-col sm:flex-row items-center gap-6 sm:gap-10 justify-center">
        <p className="text-[12px] font-medium text-[var(--color-text-muted)] shrink-0 whitespace-nowrap">
          {lang === 'nl' ? 'Gecertificeerd in' : 'Certified in'}
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3">
          {platforms.map((p) => (
            <div key={p.name} className="flex items-center gap-1.5 text-[13px] text-[var(--color-text-secondary)] font-medium">
              <p.Icon />
              <span>{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
