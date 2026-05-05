import { useState } from "react";
import { Mail, ArrowRight, Check } from "lucide-react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");
    
    // Simulate API call (replace with actual newsletter service)
    try {
      // TODO: Replace with actual API endpoint
      // Example: await fetch('/api/newsletter', { method: 'POST', body: JSON.stringify({ email }) })
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus("success");
      setMessage("Successfully subscribed! Welcome to Solid Solutions updates.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="py-24 bg-bg-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg-main/50 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-charcoal/5 text-charcoal text-[10px] font-bold tracking-[0.2em] uppercase rounded border border-charcoal/10 mb-8">
            <Mail size={14} />
            STAY UPDATED
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-charcoal mb-6">
            Get the Latest Updates
          </h2>
          
          <p className="text-lg text-slate-700 mb-12 leading-relaxed">
            Subscribe to our newsletter for insights on AI, digital infrastructure, and Africa's tech evolution. 
            No spam, just valuable content.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-white border border-charcoal/10 rounded-full text-charcoal placeholder:text-slate-400 focus:outline-none focus:border-charcoal/30 transition-colors"
              disabled={status === "loading" || status === "success"}
            />
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="px-8 py-4 bg-charcoal text-white font-bold uppercase tracking-wider text-sm rounded-full hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {status === "loading" ? (
                "Subscribing..."
              ) : status === "success" ? (
                <>
                  <Check size={16} />
                  Subscribed!
                </>
              ) : (
                <>
                  Subscribe
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
          
          {message && (
            <p className={`mt-6 text-sm ${status === "error" ? "text-red-600" : "text-green-600"}`}>
              {message}
            </p>
          )}
          
          <p className="mt-6 text-xs text-slate-500">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
}
