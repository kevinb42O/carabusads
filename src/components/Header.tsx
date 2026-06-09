import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  lang: 'nl' | 'en';
  setLang: (l: 'nl' | 'en') => void;
  setActivePage?: (page: 'home' | 'privacy' | 'terms') => void;
}

export function Header({ lang, setLang, setActivePage }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > window.innerHeight * 2.5);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = lang === 'nl' ? [
    { name: 'De Bottleneck', href: '#pijnpunt' },
    { name: 'Expertise', href: '#diensten' },
    { name: 'Blauwdruk', href: '#werkwijze' },
    { name: 'Filosofie', href: '#aanpak' },
  ] : [
    { name: 'The Bottleneck', href: '#pijnpunt' },
    { name: 'Expertise', href: '#diensten' },
    { name: 'Blueprint', href: '#werkwijze' },
    { name: 'Philosophy', href: '#aanpak' },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-400 px-6 sm:px-10 flex items-center justify-between ${
          isScrolled 
            ? 'bg-[var(--color-agency-bg)]/95 border-b border-black/[0.05] py-3 shadow-[0_1px_3px_rgba(0,0,0,0.03)]' 
            : 'bg-transparent border-b border-transparent py-5'
        }`}
      >
        {/* Logo */}
        <a href="#" className="group" onClick={(e) => { e.preventDefault(); setActivePage?.('home'); }}>
          <BrandLogo variant="light" size="md" />
        </a>
        
        {/* Navigation - Desktop */}
        <nav className={`hidden lg:flex items-center gap-8 text-[13px] font-medium transition-colors duration-300 ${
          isScrolled ? 'text-[var(--color-text-secondary)]' : 'text-[#0b1a29]/80'
        }`}>
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setActivePage?.('home')}
              className={`relative py-1 transition-colors duration-300 ${
                isScrolled ? 'hover:text-white' : 'hover:text-[#0b1a29]'
              } after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-[#f59e0b] after:scale-x-0 after:origin-bottom-right hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-4">
          {/* Language toggle */}
          <div className={`flex items-center border rounded-md overflow-hidden text-[11px] font-semibold transition-colors duration-300 ${
            isScrolled ? 'border-black/10 text-[var(--color-text-secondary)]' : 'border-[#0b1a29]/20 text-[#0b1a29]/90'
          }`}>
            <button 
              onClick={() => setLang('nl')} 
              className={`px-2.5 py-1 transition-all cursor-pointer ${
                lang === 'nl' 
                  ? 'bg-[#0b1a29] text-white' 
                  : 'bg-transparent hover:bg-[#0b1a29]/10 text-[#0b1a29]/70'
              }`}
            >
              NL
            </button>
            <button 
              onClick={() => setLang('en')} 
              className={`px-2.5 py-1 transition-all cursor-pointer ${
                lang === 'en' 
                  ? 'bg-[#0b1a29] text-white' 
                  : 'bg-transparent hover:bg-[#0b1a29]/10 text-[#0b1a29]/70'
              }`}
            >
              EN
            </button>
          </div>

          <a 
            href="#boeken" 
            onClick={() => setActivePage?.('home')}
            className={`hidden sm:inline-flex items-center gap-1.5 px-5 py-2 rounded-lg text-[13px] font-bold transition-all duration-300 bg-[#f59e0b] hover:bg-[#d97706] text-[#0b1a29] shadow-[0_4px_14px_rgba(245,158,11,0.3)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.5)]`}
          >
            {lang === 'nl' ? 'Plan een kennismaking' : 'Schedule a call'}
          </a>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-1.5 transition-colors ${
              isScrolled 
                ? 'text-[var(--color-text-primary)] hover:text-[var(--color-agency-accent)]' 
                : 'text-[#0b1a29] hover:text-[#0b1a29]/80'
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
            className="fixed inset-0 z-40 bg-black/20 lg:hidden"
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
                <div onClick={() => { setActivePage?.('home'); setIsMobileMenuOpen(false); }} className="cursor-pointer">
                  <BrandLogo variant="color" size="md" />
                </div>
                
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link, index) => (
                    <motion.a 
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.06 }}
                      key={link.name} 
                      href={link.href} 
                      onClick={() => { setIsMobileMenuOpen(false); setActivePage?.('home'); }}
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
                  onClick={() => { setIsMobileMenuOpen(false); setActivePage?.('home'); }}
                  className="w-full bg-[var(--color-agency-accent)] text-[var(--color-agency-bg)] text-center py-3.5 rounded-lg text-[14px] font-bold transition-all hover:bg-[var(--color-agency-accent-hover)]"
                >
                  {lang === 'nl' ? 'Plan mijn gesprek' : 'Schedule a call'}
                </a>
                <p className="text-center text-[11px] text-[var(--color-text-muted)]">
                  {lang === 'nl' ? '1-op-1 met de founder' : '1-on-1 with the founder'}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
