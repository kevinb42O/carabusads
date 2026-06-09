import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CTAProps {
  lang: 'nl' | 'en';
}

export function CTA({ lang }: CTAProps) {
  const [formData, setFormData] = useState({
    naam: '',
    email: '',
    telefoon: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const translations = {
    nl: {
      badge: "Strategiegesprek",
      h2: "Klaar om winstgevend te schalen?",
      p: "Boek een adviesgesprek van 30 minuten. We leggen je huidige funnel onder de loep en spotten direct de bottlenecks die je nu MRR kosten — zonder hard-selling BS.",
      bullets: [
        "Diepgaande scan van je huidige ad-architectuur",
        "Identificatie van de grootste knelpunten in je funnel",
        "1-op-1 strategisch advies met de founder"
      ],
      formTitle: "Plan een kennismaking",
      formSubtitle: "We reageren binnen 4 uur.",
      labelName: "Naam",
      placeholderName: "Je volledige naam",
      labelEmail: "Work e-mail",
      placeholderEmail: "naam@bedrijf.be",
      labelPhone: "Telefoonnummer",
      placeholderPhone: "+32 470 12 34 56",
      submitBtn: "Plan mijn gesprek",
      security: "Je data wordt 100% vertrouwelijk behandeld.",
      successTitle: "Aanvraag ontvangen",
      successDesc: (naam: string) => (
        <>
          Bedankt {naam && <strong className="font-semibold text-[#0b1a29]">{naam}</strong>}. We plannen binnen <strong className="font-semibold text-[#0b1a29]">4 kantooruren</strong> de audit in.
        </>
      ),
    },
    en: {
      badge: "Growth Audit",
      h2: "Ready to scale your revenue?",
      p: "Book a 30-minute Discovery Call. We'll examine your current funnel and immediately spot the bottlenecks costing you MRR today — no hard-selling BS attached.",
      bullets: [
        "Deep-dive scan of your current ad-architecture",
        "Identification of the biggest leaks in your funnel",
        "1-on-1 strategic sparring with the founder"
      ],
      formTitle: "Request your audit",
      formSubtitle: "We'll be in touch within 4 hours.",
      labelName: "Name",
      placeholderName: "Your full name",
      labelEmail: "Work email",
      placeholderEmail: "name@company.com",
      labelPhone: "Phone number",
      placeholderPhone: "+32 470 12 34 56",
      submitBtn: "Claim my Audit",
      security: "Your data is treated with 100% confidentiality.",
      successTitle: "Request received",
      successDesc: (naam: string) => (
        <>
          Thanks {naam && <strong className="font-semibold text-[#0b1a29]">{naam}</strong>}. We'll reach out within <strong className="font-semibold text-[#0b1a29]">4 business hours</strong> to schedule your audit.
        </>
      ),
    }
  }[lang];

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <section 
      id="boeken" 
      className="section-padding relative bg-[var(--color-agency-bg)] z-20"
    >
      {/* Premium Glowing Top Border Separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-agency-accent)]/30 to-transparent" />
      
      {/* Subtle top edge glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-[800px] h-[300px] bg-[var(--color-agency-accent)]/5 blur-[100px] pointer-events-none z-0" />

      {/* Animated ambient glow */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[var(--color-agency-accent)]/[0.06] rounded-full blur-[140px] pointer-events-none z-0" 
      />

      <div className="max-w-[1100px] mx-auto relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left: Copy */}
          <motion.div 
            {...(!isMobile && {
              initial: "hidden",
              whileInView: "visible",
              viewport: { once: true, margin: "-100px" },
              variants: {
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15 }
                }
              }
            })}
            className="text-[var(--color-text-primary)]"
          >
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { type: "spring" } }
              }}
              className="section-badge"
            >
              {translations.badge}
            </motion.div>

            <motion.h2 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { type: "spring" } }
              }}
              className="font-display text-[32px] md:text-[42px] font-normal tracking-[-0.01em] mb-6 text-[var(--color-text-primary)] leading-[1.15]"
            >
              {translations.h2}
            </motion.h2>
            
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { type: "spring" } }
              }}
              className="text-[16px] sm:text-[17px] font-light text-[var(--color-text-secondary)] max-w-[480px] mb-10 leading-[1.75]"
            >
              {translations.p}
            </motion.p>

            {/* Checklist */}
            <motion.div 
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
              }}
              className="flex flex-col gap-4"
            >
              {translations.bullets.map((bullet, i) => (
                <motion.div 
                  key={i} 
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="size-4 text-[#0b1a29] shrink-0" />
                  <span className="text-[15px] text-[var(--color-text-secondary)] font-light">{bullet}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Form (Starts overlapping, springs down to balanced position) */}
          <motion.div 
            {...(!isMobile && { initial: { opacity: 0, y: -250 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-100px" } })}
            transition={{ duration: 1.4, type: "spring", bounce: 0.5, delay: 0.1 }}
            className="w-full relative group z-30"
          >
            {/* Form Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-agency-accent)]/20 to-[var(--color-agency-accent)]/0 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 pointer-events-none" />
            
            <div className="bg-white/70 backdrop-blur-2xl border border-white/50 rounded-xl p-7 sm:p-9 shadow-xl relative z-10 transition-colors duration-500">
              
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <h3 className="font-outfit font-semibold text-[20px] text-[var(--color-text-primary)] mb-1">{translations.formTitle}</h3>
                    <p className="text-[13px] text-[var(--color-text-secondary)] mb-7">{translations.formSubtitle}</p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12px] font-medium text-[var(--color-text-primary)]">{translations.labelName}</label>
                        <input 
                          type="text" 
                          required
                          value={formData.naam}
                          onChange={(e) => setFormData({...formData, naam: e.target.value})}
                          placeholder={translations.placeholderName}
                          className="bg-white/50 border border-white/60 rounded-lg px-4 py-3 text-[#0b1a29] placeholder-[#0b1a29]/40 outline-none text-[15px] focus:border-[#0b1a29]/40 focus:bg-white/80 transition-colors font-light"
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[12px] font-medium text-[var(--color-text-primary)]">{translations.labelEmail}</label>
                          <input 
                            type="email" 
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            placeholder={translations.placeholderEmail}
                            className="bg-white/50 border border-white/60 rounded-lg px-4 py-3 text-[#0b1a29] placeholder-[#0b1a29]/40 outline-none text-[15px] focus:border-[#0b1a29]/40 focus:bg-white/80 transition-colors font-light"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[12px] font-medium text-[var(--color-text-primary)]">{translations.labelPhone}</label>
                          <input 
                            type="tel" 
                            required
                            value={formData.telefoon}
                            onChange={(e) => setFormData({...formData, telefoon: e.target.value})}
                            placeholder={translations.placeholderPhone}
                            className="bg-white/50 border border-white/60 rounded-lg px-4 py-3 text-[#0b1a29] placeholder-[#0b1a29]/40 outline-none text-[15px] focus:border-[#0b1a29]/40 focus:bg-white/80 transition-colors font-light"
                          />
                        </div>
                      </div>

                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit" 
                        className="bg-[#f59e0b] hover:bg-[#d97706] text-[#0b1a29] font-bold text-[14px] py-3.5 rounded-lg flex items-center justify-center gap-2 mt-2 shadow-[0_4px_14px_rgba(245,158,11,0.3)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.5)] transition-[background-color,box-shadow,transform] duration-300 cursor-pointer border border-transparent"
                      >
                        {translations.submitBtn}
                        <ArrowRight className="size-4" />
                      </motion.button>

                      <div className="flex items-center justify-center gap-2 text-[var(--color-text-muted)] text-[11px] mt-2">
                        <Shield className="size-3" />
                        <span>{translations.security}</span>
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="text-center py-10 flex flex-col items-center justify-center text-white"
                  >
                    <motion.div 
                      initial={{ rotate: -90, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ type: 'spring', damping: 15, delay: 0.1 }}
                      className="size-16 rounded-2xl bg-[var(--color-agency-accent)]/20 border border-[var(--color-agency-accent)]/30 flex items-center justify-center text-[var(--color-agency-accent)] mb-6"
                    >
                      <CheckCircle2 className="size-8" />
                    </motion.div>
                    
                    <h3 className="font-outfit font-semibold text-2xl mb-3 text-[var(--color-text-primary)]">{translations.successTitle}</h3>
                    
                    <p className="text-[15px] font-light text-[var(--color-text-secondary)] leading-relaxed max-w-[360px]">
                      {translations.successDesc(formData.naam)}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
