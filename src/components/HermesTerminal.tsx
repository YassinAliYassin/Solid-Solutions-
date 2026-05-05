// Hermes Terminal - Interactive AI Showcase
// Author: Hermes Agent (Autonomous AI)
// Simulates an AI terminal interface

import { useState, useEffect, useRef } from "react";
import { Terminal, Cpu, ChevronRight } from "lucide-react";

interface TerminalLine {
  type: "command" | "output" | "system";
  text: string;
  delay?: number;
}

const TERMINAL_SEQUENCES: TerminalLine[] = [
  { type: "system", text: "Hermes Agent v2.0.0 - Autonomous AI System", delay: 100 },
  { type: "system", text: "Initializing Solid Solutions intelligence matrix...", delay: 500 },
  { type: "command", text: "analyze --african-tech-ecosystem", delay: 300 },
  { type: "output", text: "Scanning digital infrastructure opportunities...", delay: 200 },
  { type: "output", text: "✓ Found 1,247 potential innovation nodes", delay: 100 },
  { type: "output", text: "✓ Identified 89 high-impact AI deployment zones", delay: 100 },
  { type: "command", text: "optimize --hardware-roadmap", delay: 400 },
  { type: "output", text: "Generating next-generation assembly protocols...", delay: 200 },
  { type: "output", text: "✓ Roadmap optimized for African manufacturing scale", delay: 100 },
  { type: "system", text: "System ready. Awaiting input...", delay: 300 },
];

export function HermesTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let index = 0;
    setIsTyping(true);
    
    const addLine = () => {
      if (index < TERMINAL_SEQUENCES.length) {
        const line = TERMINAL_SEQUENCES[index];
        setTimeout(() => {
          setLines(prev => [...prev, line]);
          index++;
          addLine();
        }, line.delay || 100);
      } else {
        setIsTyping(false);
      }
    };
    
    addLine();
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInput.trim()) return;
    
    const newLine: TerminalLine = { type: "command", text: currentInput };
    setLines(prev => [...prev, newLine]);
    setCurrentInput("");
    
    // Simulate response
    setTimeout(() => {
      let response: TerminalLine;
      if (currentInput.toLowerCase().includes("help")) {
        response = { type: "output", text: "Available commands: analyze, optimize, deploy, status, clear" };
      } else if (currentInput.toLowerCase().includes("status")) {
        response = { type: "output", text: "All systems operational. Solid Solutions AI modules active." };
      } else if (currentInput.toLowerCase().includes("clear")) {
        setLines([]);
        return;
      } else {
        response = { type: "output", text: `Processing: ${currentInput}... [Simulated response]` };
      }
      setLines(prev => [...prev, response]);
    }, 500);
  };

  return (
    <div className="py-24 bg-bg-dark relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-charcoal/5 text-charcoal text-[10px] font-bold tracking-[0.2em] uppercase rounded border border-charcoal/10 mb-6">
            <Terminal size={14} />
            INTERACTIVE DEMO
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-charcoal mb-6">
            Hermes Terminal
          </h2>
          <p className="text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto">
            Experience autonomous AI in action. This simulated terminal showcases 
            how Hermes Agent processes and deploys intelligent solutions.
          </p>
        </div>
        
        <div className="bg-charcoal rounded-2xl overflow-hidden shadow-2xl">
          {/* Terminal Header */}
          <div className="bg-charcoal/90 px-6 py-4 flex items-center gap-3 border-b border-white/10">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <Cpu size={14} />
              <span>hermes@solid-solutions:~</span>
            </div>
          </div>
          
          {/* Terminal Body */}
          <div 
            ref={terminalRef}
            className="p-6 h-96 overflow-y-auto font-mono text-sm"
          >
            {lines.map((line, i) => (
              <div key={i} className="mb-2">
                {line.type === "command" && (
                  <div className="flex items-center gap-2 text-green-400">
                    <ChevronRight size={14} />
                    <span>$ {line.text}</span>
                  </div>
                )}
                {line.type === "output" && (
                  <div className="text-blue-300 ml-6">{line.text}</div>
                )}
                {line.type === "system" && (
                  <div className="text-yellow-300">{line.text}</div>
                )}
              </div>
            ))}
            {!isTyping && (
              <form onSubmit={handleCommand} className="flex items-center gap-2 text-green-400">
                <ChevronRight size={14} />
                <span>$ </span>
                <input
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-green-400 placeholder:text-green-400/50"
                  placeholder="Type a command... (try 'help')"
                  autoFocus
                />
              </form>
            )}
          </div>
        </div>
        
        <p className="text-center text-sm text-slate-500 mt-6">
          This is a simulated interface demonstrating AI capabilities. 
          Real deployments use Hermes Agent for autonomous operations.
        </p>
      </div>
    </div>
  );
}
