import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { GoogleGenAI, Chat, GenerateContentResponse } from '@google/genai';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  isStreaming?: boolean;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'model', text: 'Hello! Welcome to Solid Solutions. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Store the Chat instance
  const chatRef = useRef<Chat | null>(null);

  // Initialize Chat
  useEffect(() => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey) {
        const ai = new GoogleGenAI({ apiKey });
        chatRef.current = ai.chats.create({
          model: 'gemini-3.1-flash-lite-preview',
          config: {
            systemInstruction: "You are a helpful, concise virtual assistant for Solid Solutions. Solid Solutions is an emerging initiative focused on artificial intelligence, digital infrastructure, and future hardware manufacturing in Africa."
          }
        });
      }
    } catch (error) {
      console.error("Failed to initialize Gemini AI:", error);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message to state
    const userMsgId = Date.now().toString();
    setMessages(prev => [...prev, { id: userMsgId, role: 'user', text: userMessage }]);
    setIsTyping(true);

    if (!chatRef.current) {
       setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: 'Chat unavailable right now.' }]);
       setIsTyping(false);
       return;
    }

    try {
      const modelMsgId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { id: modelMsgId, role: 'model', text: '', isStreaming: true }]);

      const streamResponse = await chatRef.current.sendMessageStream({ message: userMessage });
      
      let fullResponse = '';
      for await (const chunk of streamResponse) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
          fullResponse += c.text;
          setMessages(prev => 
            prev.map(msg => 
              msg.id === modelMsgId 
                ? { ...msg, text: fullResponse } 
                : msg
            )
          );
        }
      }
      
      // Mark as done streaming
      setMessages(prev => 
        prev.map(msg => 
          msg.id === modelMsgId 
            ? { ...msg, isStreaming: false } 
            : msg
        )
      );

    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: 'Sorry, I encountered an error. Please try again later.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 h-[500px] mb-4 flex flex-col overflow-hidden border border-charcoal/10"
            >
              {/* Header */}
              <div className="bg-charcoal text-white p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Bot size={20} />
                  <h3 className="font-semibold">AI Assistant</h3>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white/20 p-1 rounded transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        msg.role === 'user' 
                          ? 'bg-charcoal text-white rounded-br-none' 
                          : 'bg-white border border-charcoal/10 text-charcoal rounded-bl-none shadow-sm'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                      {msg.isStreaming && (
                        <span className="inline-block w-1.5 h-4 ml-1 bg-charcoal/50 animate-pulse align-middle"></span>
                      )}
                    </div>
                  </div>
                ))}
                
                {isTyping && !messages.find(m => m.isStreaming) && (
                  <div className="flex justify-start">
                    <div className="bg-white/60 border border-charcoal/10 rounded-2xl rounded-bl-none px-4 py-3 flex gap-1 shadow-sm">
                      <div className="w-1.5 h-1.5 bg-charcoal/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-1.5 h-1.5 bg-charcoal/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-1.5 h-1.5 bg-charcoal/40 rounded-full animate-bounce"></div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-3 border-t border-charcoal/10 bg-white">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about Solid Solutions..."
                    className="flex-1 bg-slate-50 border border-charcoal/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-charcoal/30 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="bg-charcoal text-white p-2 rounded-xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center min-w-[40px]"
                  >
                    <Send size={18} />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="bg-charcoal text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center hover:bg-slate-800 transition-colors"
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </motion.button>
      </div>
    </>
  );
}
