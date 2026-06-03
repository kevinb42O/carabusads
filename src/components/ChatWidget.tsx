import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import founderImg from '../assets/images/founder_portrait_1780056093258.png';

interface ChatWidgetProps {
  lang: 'nl' | 'en';
}

export function ChatWidget({ lang }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ naam: '', telefoon: '', vraag: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // The Hero section is 400vh tall. We show the widget after scrolling past ~350vh.
    if (typeof window !== 'undefined') {
      if (latest > window.innerHeight * 3.5) {
        setIsPastHero(true);
      } else {
        setIsPastHero(false);
        // Also auto-close if they scroll back up to the hero
        if (isOpen) setIsOpen(false);
        if (showTooltip) setShowTooltip(false);
      }
    }
  });

  // Show a little "Hey there!" tooltip after a few seconds if not opened, but ONLY if past hero
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPastHero && !isOpen) {
      timer = setTimeout(() => {
        setShowTooltip(true);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isOpen, isPastHero]);

  const content = {
    nl: {
      role: "Oprichter & Strateeg",
      tooltip: "Vragen? Stuur me een berichtje 👋",
      chatBubble: "Hoi! Ik ben Hans. Laat even je gegevens achter, dan stuur ik je via WhatsApp een persoonlijk antwoord op je vraag.",
      placeholderName: "Je naam",
      placeholderPhone: "Telefoonnummer",
      placeholderQuestion: "Typ je vraag hier...",
      submitBtn: "Start gesprek",
      successMsg: "Bedankt! Ik heb je bericht ontvangen en app je zo snel mogelijk terug.",
      ariaClose: "Sluit venster",
      ariaOpen: "Open chat"
    },
    en: {
      role: "Founder & Strategist",
      tooltip: "Questions? Send me a message 👋",
      chatBubble: "Hi! I'm Hans. Leave your details below and I'll send you a personal response via WhatsApp.",
      placeholderName: "Your name",
      placeholderPhone: "Phone number",
      placeholderQuestion: "Type your question here...",
      submitBtn: "Start conversation",
      successMsg: "Thanks! I've received your message and will WhatsApp you as soon as possible.",
      ariaClose: "Close window",
      ariaOpen: "Open chat"
    }
  }[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.naam || !formData.telefoon) return;
    
    const phoneNumber = "32472249346";
    let message = "";
    if (lang === 'nl') {
      message = `Hallo Hans, mijn naam is ${formData.naam}. Mijn nummer is ${formData.telefoon}.`;
      if (formData.vraag) message += `\n\nMijn vraag:\n${formData.vraag}`;
    } else {
      message = `Hi Hans, my name is ${formData.naam}. My number is ${formData.telefoon}.`;
      if (formData.vraag) message += `\n\nMy question:\n${formData.vraag}`;
    }
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    setIsSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isPastHero && (
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed bottom-6 right-6 z-50 font-sans flex flex-col items-end"
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(10px)" }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                className="absolute bottom-20 right-0 w-[380px] bg-[var(--color-agency-bg)] rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col border border-white/10"
              >
                {/* Header (Premium Intercom-style) */}
                <div className="bg-gradient-to-br from-[var(--color-agency-surface)] to-[#111a1a] p-6 relative overflow-hidden border-b border-white/5">
                  {/* Decorative shapes */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--color-agency-accent)]/20 rounded-full blur-3xl -translate-y-10 translate-x-10 pointer-events-none" />
                  
                  <div className="flex items-start justify-between relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/10 shadow-lg bg-[var(--color-agency-accent)]/20">
                          <img 
                            src={founderImg} 
                            alt="Hans Claes"
                            className="w-full h-full object-cover object-[center_20%]"
                          />
                        </div>
                        {/* Online indicator */}
                        <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-[var(--color-agency-surface)] rounded-full" />
                      </div>
                      <div>
                        <h3 className="font-outfit font-semibold text-white text-[17px] leading-tight tracking-wide">Hans Claes</h3>
                        <p className="text-[12px] text-[var(--color-agency-accent)] font-light mt-0.5">{content.role}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsOpen(false)}
                      className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                {/* Body */}
                <div className="bg-[var(--color-agency-surface)] flex-1 max-h-[60vh] overflow-y-auto custom-scrollbar">
                  <AnimatePresence mode="wait">
                    {!isSubmitted ? (
                      <motion.div
                        key="chat"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-5 flex flex-col gap-5"
                      >
                        {/* Chat Bubble from Hans */}
                        <div className="flex gap-3 max-w-[92%]">
                          <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 mt-1 shadow-sm border border-white/10">
                            <img src={founderImg} alt="Hans Claes" className="w-full h-full object-cover object-[center_20%]" />
                          </div>
                          <div className="bg-[var(--color-agency-bg)] p-4 rounded-2xl rounded-tl-sm shadow-sm border border-white/5 text-[14px] text-[var(--color-text-secondary)] font-light leading-relaxed">
                            {content.chatBubble}
                          </div>
                        </div>

                        {/* The Form */}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-1 bg-[var(--color-agency-bg)] p-5 rounded-2xl shadow-sm border border-white/5">
                          
                          <div className="relative">
                            <input 
                              type="text" 
                              required
                              value={formData.naam}
                              onChange={(e) => setFormData({...formData, naam: e.target.value})}
                              placeholder={content.placeholderName}
                              className="w-full outline-none border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 text-[14px] bg-white/5 focus:bg-white/10 focus:border-[var(--color-agency-accent)]/50 focus:ring-4 focus:ring-[var(--color-agency-accent)]/10 transition-all font-light"
                            />
                          </div>

                          <div className="relative">
                            <input 
                              type="tel" 
                              required
                              value={formData.telefoon}
                              onChange={(e) => setFormData({...formData, telefoon: e.target.value})}
                              placeholder={content.placeholderPhone}
                              className="w-full outline-none border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 text-[14px] bg-white/5 focus:bg-white/10 focus:border-[var(--color-agency-accent)]/50 focus:ring-4 focus:ring-[var(--color-agency-accent)]/10 transition-all font-light"
                            />
                          </div>

                          <div className="relative">
                            <textarea 
                              value={formData.vraag}
                              onChange={(e) => setFormData({...formData, vraag: e.target.value})}
                              placeholder={content.placeholderQuestion}
                              rows={2}
                              className="w-full outline-none border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 text-[14px] resize-none bg-white/5 focus:bg-white/10 focus:border-[var(--color-agency-accent)]/50 focus:ring-4 focus:ring-[var(--color-agency-accent)]/10 transition-all font-light custom-scrollbar"
                            />
                          </div>

                          <button 
                            type="submit"
                            className="mt-2 bg-white hover:bg-[var(--color-agency-accent)] text-[var(--color-agency-bg)] hover:text-white font-medium text-[14px] py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-[0_4px_14px_0_rgba(0,0,0,0.3)] hover:-translate-y-0.5 active:translate-y-0"
                          >
                            {content.submitBtn}
                            <ArrowRight size={16} />
                          </button>
                        </form>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-10 flex flex-col items-center justify-center text-center h-[320px]"
                      >
                        <div className="size-16 rounded-full bg-[var(--color-agency-accent)]/10 flex items-center justify-center text-[var(--color-agency-accent)] mb-5 shadow-sm border border-[var(--color-agency-accent)]/20">
                          <Send size={24} className="ml-1" />
                        </div>
                        <h4 className="font-outfit font-semibold text-[20px] text-white mb-2">
                          {lang === 'nl' ? 'Onderweg!' : 'Sent!'}
                        </h4>
                        <p className="text-[14px] text-[var(--color-text-secondary)] font-light leading-relaxed">
                          {content.successMsg}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Footer */}
                <div className="bg-[var(--color-agency-bg)] border-t border-white/5 py-3 text-center">
                  <span className="text-[10px] text-[var(--color-text-muted)] font-medium uppercase tracking-wider">Powered by CarabusADS</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Action Button & Tooltip */}
          <div className="relative flex items-center justify-end">
            {/* Tooltip */}
            <AnimatePresence>
              {showTooltip && !isOpen && (
                <motion.div 
                  initial={{ opacity: 0, x: 20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 10, scale: 0.9 }}
                  transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
                  className="absolute right-20 mr-1 bg-[var(--color-agency-surface)] px-4 py-3 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] border border-white/10 text-[13px] font-medium text-white whitespace-nowrap cursor-pointer origin-right"
                  onClick={() => {
                    setIsOpen(true);
                    setShowTooltip(false);
                  }}
                >
                  {content.tooltip}
                  {/* Little triangle pointing right */}
                  <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-[var(--color-agency-surface)] border-r border-t border-white/10 rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => {
                setIsOpen(!isOpen);
                setShowTooltip(false);
                if (!isOpen) {
                  setIsSubmitted(false);
                  setFormData({ naam: '', telefoon: '', vraag: '' });
                }
              }}
              className={`w-[64px] h-[64px] rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 z-50 relative cursor-pointer ${
                isOpen 
                  ? 'bg-[var(--color-agency-surface)] text-white border border-white/20' 
                  : 'bg-white text-[var(--color-agency-bg)] hover:bg-[var(--color-agency-accent)] hover:text-white'
              }`}
              aria-label={isOpen ? content.ariaClose : content.ariaOpen}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X size={28} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.15 }}
                  >
                    <MessageSquare size={28} className="mt-0.5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
