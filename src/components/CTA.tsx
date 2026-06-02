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
      badge: "Kennismaken",
      h2: "Benieuwd wat wij voor je kunnen betekenen?",
      p: "Plan een vrijblijvend gesprek van 30 minuten. We analyseren je huidige setup en geven je direct 3 concrete verbeterpunten — ongeacht of we gaan samenwerken.",
      bullets: [
        "Gratis analyse van je huidige campagnes",
        "Persoonlijk gesprek met de specialist",
        "Concreet advies dat je direct kunt toepassen"
      ],
      formTitle: "Laat je gegevens achter",
      formSubtitle: "We nemen binnen 4 uur contact op.",
      labelName: "Naam",
      placeholderName: "Je volledige naam",
      labelEmail: "E-mailadres",
      placeholderEmail: "naam@bedrijf.be",
      labelPhone: "Telefoonnummer",
      placeholderPhone: "+32 470 12 34 56",
      submitBtn: "Verstuur",
      security: "Je gegevens worden vertrouwelijk behandeld.",
      successTitle: "Ontvangen!",
      successDesc: (naam: string) => (
        <>
          Bedankt {naam && <strong className="font-semibold text-[var(--color-agency-accent)]">{naam}</strong>}. Hans neemt binnen <strong className="font-semibold text-white">4 kantooruren</strong> contact met je op.
        </>
      ),
    },
    en: {
      badge: "Get in touch",
      h2: "Curious what we could do for you?",
      p: "Schedule a free 30-minute call. We'll analyze your current setup and give you 3 concrete improvements — regardless of whether we end up working together.",
      bullets: [
        "Free analysis of your current campaigns",
        "Personal call with the specialist",
        "Actionable advice you can apply immediately"
      ],
      formTitle: "Leave your details",
      formSubtitle: "We'll get back to you within 4 hours.",
      labelName: "Name",
      placeholderName: "Your full name",
      labelEmail: "Email address",
      placeholderEmail: "name@company.com",
      labelPhone: "Phone number",
      placeholderPhone: "+32 470 12 34 56",
      submitBtn: "Send",
      security: "Your data is treated confidentially.",
      successTitle: "Received!",
      successDesc: (naam: string) => (
        <>
          Thanks {naam && <strong className="font-semibold text-[var(--color-agency-accent)]">{naam}</strong>}. Hans will reach out within <strong className="font-semibold text-white">4 business hours</strong>.
        </>
      ),
    }
  }[lang];

  return (
    <section id="boeken" className="section-padding relative bg-[var(--color-text-primary)] overflow-hidden">
      {/* Animated ambient glow */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[var(--color-agency-accent)]/[0.08] rounded-full blur-[120px] pointer-events-none" 
      />

      <div className="max-w-[1100px] mx-auto relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left: Copy */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 }
              }
            }}
            className="text-white"
          >
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { type: "spring" } }
              }}
              className="section-badge !border-white/10 !bg-white/[0.06] !text-[var(--color-agency-accent)]"
            >
              {translations.badge}
            </motion.div>

            <motion.h2 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { type: "spring" } }
              }}
              className="font-display text-[32px] md:text-[42px] font-normal tracking-[-0.01em] mb-6 text-white leading-[1.15]"
            >
              {translations.h2}
            </motion.h2>
            
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { type: "spring" } }
              }}
              className="text-[16px] sm:text-[17px] font-light text-white/75 max-w-[480px] mb-10 leading-[1.75]"
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
                  <CheckCircle2 className="size-4 text-[var(--color-agency-accent)] shrink-0" />
                  <span className="text-[15px] text-white/85 font-light">{bullet}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Form */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
            className="w-full relative group"
          >
            {/* Form Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-agency-accent)]/20 to-[var(--color-agency-accent)]/0 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 pointer-events-none" />
            
            <div className="bg-[#1f3333] border border-white/[0.08] rounded-xl p-7 sm:p-9 shadow-2xl relative z-10 transition-colors duration-500 hover:border-white/[0.15]">
              
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <h3 className="font-outfit font-semibold text-[20px] text-white mb-1">{translations.formTitle}</h3>
                    <p className="text-[13px] text-white/50 mb-7">{translations.formSubtitle}</p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12px] font-medium text-white/60">{translations.labelName}</label>
                        <input 
                          type="text" 
                          required
                          value={formData.naam}
                          onChange={(e) => setFormData({...formData, naam: e.target.value})}
                          placeholder={translations.placeholderName}
                          className="bg-black/20 border border-white/[0.08] rounded-lg px-4 py-3 text-white placeholder-white/25 outline-none text-[15px] focus:border-[var(--color-agency-accent)]/70 focus:bg-black/30 transition-colors font-light"
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[12px] font-medium text-white/60">{translations.labelEmail}</label>
                          <input 
                            type="email" 
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            placeholder={translations.placeholderEmail}
                            className="bg-black/20 border border-white/[0.08] rounded-lg px-4 py-3 text-white placeholder-white/25 outline-none text-[15px] focus:border-[var(--color-agency-accent)]/70 focus:bg-black/30 transition-colors font-light"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[12px] font-medium text-white/60">{translations.labelPhone}</label>
                          <input 
                            type="tel" 
                            required
                            value={formData.telefoon}
                            onChange={(e) => setFormData({...formData, telefoon: e.target.value})}
                            placeholder={translations.placeholderPhone}
                            className="bg-black/20 border border-white/[0.08] rounded-lg px-4 py-3 text-white placeholder-white/25 outline-none text-[15px] focus:border-[var(--color-agency-accent)]/70 focus:bg-black/30 transition-colors font-light"
                          />
                        </div>
                      </div>

                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit" 
                        className="bg-[var(--color-agency-accent)] hover:bg-[var(--color-agency-accent-hover)] text-white font-semibold text-[14px] py-3.5 rounded-lg flex items-center justify-center gap-2 mt-2 shadow-[0_4px_14px_0_rgba(45,125,111,0.39)] hover:shadow-[0_6px_20px_rgba(45,125,111,0.23)] transition-[background-color,box-shadow] duration-300 cursor-pointer border border-transparent"
                      >
                        {translations.submitBtn}
                        <ArrowRight className="size-4" />
                      </motion.button>

                      <div className="flex items-center justify-center gap-2 text-white/40 text-[11px] mt-2">
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
                    
                    <h3 className="font-outfit font-semibold text-2xl mb-3 text-white">{translations.successTitle}</h3>
                    
                    <p className="text-[15px] font-light text-white/75 leading-relaxed max-w-[360px]">
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
