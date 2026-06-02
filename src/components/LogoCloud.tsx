interface LogoCloudProps {
  lang: 'nl' | 'en';
}

/* Inline SVG icons — official brand marks */
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="size-4">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

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

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="size-4" fill="#000000">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
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
  { name: 'Google Ads', Icon: GoogleIcon },
  { name: 'Meta Ads', Icon: FacebookIcon },
  { name: 'LinkedIn', Icon: LinkedInIcon },
  { name: 'TikTok', Icon: TikTokIcon },
  { name: 'Google Tag Manager', Icon: GTMIcon },
  { name: 'Google Analytics', Icon: GAIcon },
];

export function LogoCloud({ lang }: LogoCloudProps) {
  return (
    <section className="py-6 border-y border-black/[0.04] bg-white/40 scroll-reveal-fade">
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
