import React, { useState } from 'react';
import { MessageSquareText, ChevronDown, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import founderImg from '../assets/images/founder_portrait_1780056093258.png';

interface ChatWidgetProps {
  lang: 'nl' | 'en';
}

export function ChatWidget({ lang }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ naam: '', telefoon: '', vraag: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const content = {
    nl: {
      role: "Strategist",
      intro: "Heb je een vraag over je advertenties of funnel? Laat je gegevens achter en ik stuur je een persoonlijk antwoord.",
      placeholderName: "Je naam",
      placeholderPhone: "Telefoonnummer (WhatsApp)",
      placeholderQuestion: "Wat is je vraag?",
      submitBtn: "Verstuur",
      successMsg: "Bedankt! Hans neemt zo snel mogelijk contact met je op.",
      ariaClose: "Sluit chat",
      ariaOpen: "Stel een vraag"
    },
    en: {
      role: "Strategist",
      intro: "Got a question about your ads or funnel? Leave your details and I'll send you a personal response.",
      placeholderName: "Your name",
      placeholderPhone: "Phone number (WhatsApp)",
      placeholderQuestion: "What's your question?",
      submitBtn: "Send",
      successMsg: "Thanks! Hans will get back to you as soon as possible.",
      ariaClose: "Close chat",
      ariaOpen: "Ask a question"
    }
  }[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.naam || !formData.telefoon) return;
    setIsSubmitted(true);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-16 right-0 w-[340px] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col border border-black/[0.06]"
          >
            {/* Header */}
            <div 
              className="bg-[var(--color-text-primary)] p-4 flex items-center justify-between text-white cursor-pointer" 
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 bg-[var(--color-agency-accent)]/20">
                  <img 
                    src={founderImg} 
                    alt="Hans Claes"
                    className="w-full h-full object-cover object-[center_20%]"
                  />
                </div>
                <div>
                  <h3 className="font-outfit font-semibold text-[14px] leading-tight">Hans Claes</h3>
                  <p className="text-[10px] text-white/50 font-medium">{content.role}</p>
                </div>
              </div>
              <button 
                className="p-1 hover:bg-white/10 rounded-md transition-colors cursor-pointer"
                aria-label={content.ariaClose}
              >
                <ChevronDown size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 flex flex-col gap-4">
              
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-3.5"
                  >
                    <p className="text-[13px] text-[var(--color-text-secondary)] font-light leading-relaxed">
                      {content.intro}
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                      <input 
                        type="text" 
                        required
                        value={formData.naam}
                        onChange={(e) => setFormData({...formData, naam: e.target.value})}
                        placeholder={content.placeholderName}
                        className="w-full outline-none border border-black/[0.08] rounded-lg px-3.5 py-2.5 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] text-[13px] bg-[var(--color-agency-bg)]/50 focus:border-[var(--color-agency-accent)]/40 transition-colors"
                      />

                      <input 
                        type="tel" 
                        required
                        value={formData.telefoon}
                        onChange={(e) => setFormData({...formData, telefoon: e.target.value})}
                        placeholder={content.placeholderPhone}
                        className="w-full outline-none border border-black/[0.08] rounded-lg px-3.5 py-2.5 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] text-[13px] bg-[var(--color-agency-bg)]/50 focus:border-[var(--color-agency-accent)]/40 transition-colors"
                      />

                      <textarea 
                        value={formData.vraag}
                        onChange={(e) => setFormData({...formData, vraag: e.target.value})}
                        placeholder={content.placeholderQuestion}
                        rows={2}
                        className="w-full outline-none border border-black/[0.08] rounded-lg px-3.5 py-2.5 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] text-[13px] resize-none bg-[var(--color-agency-bg)]/50 focus:border-[var(--color-agency-accent)]/40 transition-colors"
                      />

                      <button 
                        type="submit"
                        className="bg-[var(--color-text-primary)] hover:bg-[var(--color-agency-accent)] text-white font-semibold text-[13px] py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        {content.submitBtn}
                        <Send size={13} />
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-6 text-center"
                  >
                    <div className="size-10 rounded-lg bg-[var(--color-agency-accent)]/10 flex items-center justify-center text-[var(--color-agency-accent)] mx-auto mb-4 text-lg">
                      ✓
                    </div>
                    <p className="text-[14px] text-[var(--color-text-secondary)] font-light leading-relaxed">
                      {content.successMsg}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            setIsSubmitted(false);
            setFormData({ naam: '', telefoon: '', vraag: '' });
          }
        }}
        className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 z-50 relative cursor-pointer ${
          isOpen 
            ? 'bg-white text-[var(--color-text-primary)] border border-black/[0.06]' 
            : 'bg-[var(--color-text-primary)] text-white hover:bg-[var(--color-agency-accent)]'
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
              transition={{ duration: 0.12 }}
            >
              <ChevronDown size={22} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.12 }}
            >
              <MessageSquareText size={20} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
