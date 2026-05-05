import React from 'react';
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

export function ContactForm() {
  const [state, handleSubmit] = useForm('xzdoprej');

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {state.succeeded ? (
          <div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-2xl border border-green-500/20 shadow-lg text-center"
          >
            <div className="flex justify-center mb-4 text-green-500">
              <CheckCircle size={64} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold text-charcoal mb-2">Message Delivered</h3>
            <p className="text-slate-600">We've received your inquiry and will be in touch shortly at info@solidsolutions.africa.</p>
          </div>
        ) : (
          <form 
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit} 
            className="bg-white p-6 rounded-2xl border border-charcoal/10 shadow-sm space-y-4"
          >
            <h3 className="text-xl font-bold text-charcoal mb-4">Contact Our Team</h3>
            
            {state.errors && state.errors.length > 0 && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm flex items-center gap-2 mb-4">
                <AlertCircle size={16} />
                <ValidationError errors={state.errors} />
              </div>
            )}

            <input 
              type="email" 
              name="email" 
              placeholder="Your Email Address" 
              required 
              inputMode="email"
              className="w-full bg-slate-50 border border-charcoal/10 rounded-xl px-4 py-3 focus:outline-none focus:border-charcoal/30 transition-colors" 
            />
            <ValidationError field="email" prefix="Email" errors={state.errors} className="text-red-500 text-xs" />

            <textarea 
              name="message" 
              placeholder="How can we help?" 
              required 
              className="w-full bg-slate-50 border border-charcoal/10 rounded-xl px-4 py-3 h-32 focus:outline-none focus:border-charcoal/30 transition-colors" 
            />
            <ValidationError field="message" prefix="Message" errors={state.errors} className="text-red-500 text-xs" />
            
            <button 
              type="submit" 
              disabled={state.submitting}
              className="w-full bg-charcoal text-white rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-slate-800 disabled:opacity-50 transition-all font-semibold touch-manipulation"
            >
              {state.submitting ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <><Send size={18} /> Send Message</>
              )}
            </button>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
}
