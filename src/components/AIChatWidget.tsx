// AIChatWidget - Floating AI assistant
// Author: Hermes Agent (Autonomous AI)
// Floating chat button that links to Solid LLM

import { useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    // Open Solid LLM with the message as a URL parameter
    const url = `https://solidsolutions.africa/solid-llm/?q=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setMessage("");
    setIsOpen(false);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-charcoal hover:bg-slate-800'
        } text-white`}
        aria-label="Toggle AI Chat"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden border border-charcoal/10">
          {/* Header */}
          <div className="bg-charcoal text-white p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <MessageSquare size={20} />
            </div>
            <div>
              <h3 className="font-bold">Solid AI Assistant</h3>
              <p className="text-xs text-white/60">Powered by Hermes Agent</p>
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            <p className="text-sm text-slate-600 mb-4">
              Ask me anything about AI, digital infrastructure, or African tech innovation.
            </p>
            <div className="bg-charcoal/5 rounded-lg p-4 mb-4">
              <p className="text-xs text-slate-500 mb-2">Try asking:</p>
              <button
                onClick={() => setMessage("What AI solutions do you offer?")}
                className="text-xs text-charcoal hover:underline text-left block mb-1"
              >
                "What AI solutions do you offer?"
              </button>
              <button
                onClick={() => setMessage("Tell me about hardware innovation")}
                className="text-xs text-charcoal hover:underline text-left block mb-1"
              >
                "Tell me about hardware innovation"
              </button>
              <button
                onClick={() => setMessage("How can I collaborate with Solid Solutions?")}
                className="text-xs text-charcoal hover:underline text-left block"
              >
                "How can I collaborate with Solid Solutions?"
              </button>
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-charcoal/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your question..."
                className="flex-1 px-4 py-2 border border-charcoal/10 rounded-full text-sm focus:outline-none focus:border-charcoal/30"
              />
              <button
                onClick={handleSend}
                disabled={!message.trim()}
                className="w-10 h-10 rounded-full bg-charcoal text-white flex items-center justify-center hover:bg-slate-800 transition-colors disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-2 text-center">
              Opens Solid LLM in new tab
            </p>
          </div>
        </div>
      )}
    </>
  );
}
