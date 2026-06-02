export const Logos = {
  Meta: () => (
    <div className="flex items-center gap-2 transition-all duration-300 hover:scale-105">
      <svg viewBox="0 0 16 16" className="h-6 object-contain" width="auto" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="8" fill="#1877F2" />
        <path d="M9.25 16V10.375h2.218l.354-2.326H9.25V6.539c0-.637.31-1.258 1.303-1.258h1.009V3.301s-.915-.157-1.791-.157c-1.827 0-3.022 1.114-3.022 3.131V8.05H4.72v2.326h2.03V16h2.5z" fill="#FFFFFF" />
      </svg>
      <span className="font-sans font-bold tracking-tight text-[15px] text-[var(--color-text-primary)]">Facebook</span>
    </div>
  ),
  Instagram: () => (
    <div className="flex items-center gap-2 transition-all duration-300 hover:scale-105">
      <svg viewBox="0 0 24 24" className="h-6 object-contain" width="auto">
        <defs>
          <linearGradient id="igGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FED976" />
            <stop offset="25%" stopColor="#F56040" />
            <stop offset="50%" stopColor="#C13584" />
            <stop offset="100%" stopColor="#833AB4" />
          </linearGradient>
        </defs>
        <path fill="url(#igGrad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
      <span className="font-sans font-bold tracking-tight text-[15px] text-[var(--color-text-primary)]">Instagram</span>
    </div>
  ),
  LinkedIn: () => (
    <div className="flex items-center gap-2 transition-all duration-300 hover:scale-105">
      <svg viewBox="0 0 24 24" className="h-6 object-contain" fill="#0A66C2" width="auto">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
      <span className="font-sans font-bold tracking-tight text-[15px] text-[var(--color-text-primary)]">LinkedIn</span>
    </div>
  ),
  TikTok: () => (
    <div className="flex items-center gap-2 transition-all duration-300 hover:scale-105">
      <svg viewBox="0 0 16 16" className="h-6 object-contain text-black" fill="currentColor" width="auto" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
      </svg>
      <span className="font-sans font-bold tracking-tighter text-[15px] text-[var(--color-text-primary)]">TikTok Ads</span>
    </div>
  )
};
