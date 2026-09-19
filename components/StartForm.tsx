'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { START } from '@/lib/content/start';
import { localizedPath, type SiteLocale } from '@/lib/i18n';

export default function StartForm({ locale = 'en' }: { locale?: SiteLocale }) {
  const t = START[locale].form;
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', source: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, formType: 'start-page' }),
      });
      if (res.ok) {
        setStatus('sent');
        setFormData({ name: '', email: '', phone: '', source: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="bg-darker-grey rounded-2xl p-8 sm:p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-5">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#F94239" strokeWidth="2.5"><polyline points="8,17 14,23 24,10" /></svg>
        </div>
        <h2 className="text-secondary text-2xl font-medium mb-2">{t.sentTitle}</h2>
        <p className="text-grey text-sm max-w-xs mx-auto">{t.sentSub}</p>
        <a href={localizedPath(locale, '/')} className="inline-block mt-6 text-sm text-secondary/80 hover:text-secondary transition-colors underline underline-offset-4">{t.backHome}</a>
      </motion.div>
    );
  }

  return (
    <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }} onSubmit={handleSubmit} className="bg-darker-grey rounded-2xl p-6 sm:p-8 lg:p-10 space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm text-grey mb-2">{t.name} <span className="text-accent">*</span></label>
        <input id="name" type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-primary border border-grey/20 rounded-lg px-4 py-3 text-secondary text-sm placeholder:text-grey/50 focus:outline-none focus:border-accent transition-colors" placeholder={t.namePh} />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm text-grey mb-2">{t.email} <span className="text-accent">*</span></label>
        <input id="email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-primary border border-grey/20 rounded-lg px-4 py-3 text-secondary text-sm placeholder:text-grey/50 focus:outline-none focus:border-accent transition-colors" placeholder={t.emailPh} />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm text-grey mb-2">{t.phone} <span className="text-accent">*</span></label>
        <input id="phone" type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-primary border border-grey/20 rounded-lg px-4 py-3 text-secondary text-sm placeholder:text-grey/50 focus:outline-none focus:border-accent transition-colors" placeholder={t.phonePh} />
      </div>
      <div>
        <label htmlFor="source" className="block text-sm text-grey mb-2">{t.source} <span className="text-accent">*</span></label>
        <div className="relative">
          <select id="source" required value={formData.source} onChange={(e) => setFormData({ ...formData, source: e.target.value })} className={`w-full appearance-none bg-primary border border-grey/20 rounded-lg px-4 py-3 pr-10 text-sm focus:outline-none focus:border-accent transition-colors ${formData.source ? 'text-secondary' : 'text-grey/50'}`}>
            <option value="" disabled>{t.sourceSelect}</option>
            {t.sourceOptions.map((option) => (
              <option key={option} value={option} className="text-secondary bg-primary">{option}</option>
            ))}
          </select>
          <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-grey" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3,5 7,9 11,5" /></svg>
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm text-grey mb-2">{t.message} <span className="text-grey/50">{t.optional}</span></label>
        <textarea id="message" rows={3} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full bg-primary border border-grey/20 rounded-lg px-4 py-3 text-secondary text-sm placeholder:text-grey/50 focus:outline-none focus:border-accent transition-colors resize-none" placeholder={t.messagePh} />
      </div>
      <button type="submit" disabled={status === 'sending'} className="w-full bg-accent hover:bg-darker-orange text-secondary font-medium py-3.5 rounded-lg transition-colors duration-200 disabled:opacity-50">
        {status === 'sending' ? t.sending : t.submit}
      </button>
      {status === 'error' && <p className="text-accent text-sm text-center">{t.error}</p>}
      <p className="text-grey/60 text-xs text-center leading-relaxed">{t.privacyNote}</p>
    </motion.form>
  );
}
