import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  lang: 'nl' | 'en';
  setLang: (l: 'nl' | 'en') => void;
}

export function Header({ lang, setLang }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = lang === 'nl' ? [
    { name: 'Probleem', href: '#pijnpunt' },
    { name: 'Diensten', href: '#diensten' },
    { name: 'Werkwijze', href: '#werkwijze' },
    { name: 'Over ons', href: '#aanpak' },
  ] : [
    { name: 'Problem', href: '#pijnpunt' },
    { name: 'Services', href: '#diensten' },
    { name: 'Method', href: '#werkwijze' },
    { name: 'About', href: '#aanpak' },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-400 px-6 sm:px-10 flex items-center justify-between ${
          isScrolled 
            ? 'bg-[var(--color-agency-bg)]/90 backdrop-blur-md border-b border-black/[0.05] py-3 shadow-[0_1px_3px_rgba(0,0,0,0.03)]' 
            : 'bg-transparent border-b border-transparent py-5'
        }`}
      >
        {/* Logo */}
        <a href="#" className="group">
          <BrandLogo variant={isScrolled ? 'dark' : 'light'} size="md" />
        </a>
        
        {/* Navigation - Desktop */}
        <nav className={`hidden lg:flex items-center gap-8 text-[13px] font-medium transition-colors duration-300 ${
          isScrolled ? 'text-[var(--color-text-secondary)]' : 'text-white/80'
        }`}>
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`transition-colors duration-200 ${
                isScrolled ? 'hover:text-[var(--color-text-primary)]' : 'hover:text-white'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-4">
          {/* Language toggle */}
          <div className={`flex items-center border rounded-md overflow-hidden text-[11px] font-semibold transition-colors duration-300 ${
            isScrolled ? 'border-black/[0.08] text-[var(--color-text-secondary)]' : 'border-white/20 text-white/90'
          }`}>
            <button 
              onClick={() => setLang('nl')} 
              className={`px-2.5 py-1 transition-all cursor-pointer ${
                lang === 'nl' 
                  ? (isScrolled ? 'bg-[var(--color-text-primary)] text-white' : 'bg-white text-[var(--color-text-primary)]') 
                  : (isScrolled ? 'bg-white hover:bg-gray-50' : 'bg-transparent hover:bg-white/10')
              }`}
            >
              NL
            </button>
            <button 
              onClick={() => setLang('en')} 
              className={`px-2.5 py-1 transition-all cursor-pointer ${
                lang === 'en' 
                  ? (isScrolled ? 'bg-[var(--color-text-primary)] text-white' : 'bg-white text-[var(--color-text-primary)]') 
                  : (isScrolled ? 'bg-white hover:bg-gray-50' : 'bg-transparent hover:bg-white/10')
              }`}
            >
              EN
            </button>
          </div>

          <a 
            href="#boeken" 
            className={`hidden sm:inline-flex items-center gap-1.5 px-5 py-2 rounded-lg text-[13px] font-semibold transition-all duration-300 ${
              isScrolled 
                ? 'bg-[var(--color-text-primary)] hover:bg-[var(--color-agency-accent)] text-white' 
                : 'bg-white/10 hover:bg-white text-white hover:text-[var(--color-text-primary)] border border-white/20 backdrop-blur-sm'
            }`}
          >
            {lang === 'nl' ? 'Contact' : 'Get in touch'}
          </a>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-1.5 transition-colors ${
              isScrolled 
                ? 'text-[var(--color-text-primary)] hover:text-[var(--color-agency-accent)]' 
                : 'text-white hover:text-white/80'
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-[300px] bg-[var(--color-agency-bg)] p-8 flex flex-col justify-between shadow-2xl border-l border-black/[0.05]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-10 mt-14">
                <BrandLogo variant="color" size="md" />
                
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link, index) => (
                    <motion.a 
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.06 }}
                      key={link.name} 
                      href={link.href} 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-[var(--color-text-primary)] hover:text-[var(--color-agency-accent)] transition-colors py-3 border-b border-black/[0.04] text-[15px] font-medium flex items-center justify-between"
                    >
                      {link.name}
                      <ArrowRight className="size-3.5 text-[var(--color-text-muted)]" />
                    </motion.a>
                  ))}
                </nav>
              </div>

              <div className="flex flex-col gap-3">
                <a 
                  href="#boeken" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full bg-[var(--color-text-primary)] text-white text-center py-3.5 rounded-lg text-[13px] font-semibold transition-all"
                >
                  {lang === 'nl' ? 'Plan een kennismaking' : 'Book an intro call'}
                </a>
                <p className="text-center text-[11px] text-[var(--color-text-muted)]">
                  {lang === 'nl' ? 'Rechtstreeks met de specialist' : 'Directly with the specialist'}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
