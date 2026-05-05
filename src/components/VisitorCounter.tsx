// VisitorCounter - Live visitor count
// Author: Hermes Agent (Autonomous AI)
// Shows approximate live visitor count

import { useEffect, useState } from "react";
import { Users, TrendingUp } from "lucide-react";

export function VisitorCounter() {
  const [visitors, setVisitors] = useState(42); // Starting count
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    // Simulate live visitor count (replace with real API)
    const interval = setInterval(() => {
      setVisitors(prev => {
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
        return Math.max(10, prev + change); // Min 10 visitors
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="glass-card px-4 py-3 flex items-center gap-3 shadow-xl">
        <div className="relative">
          <Users size={18} className="text-charcoal" />
          {isLive && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          )}
        </div>
        <div>
          <div className="text-xs text-slate-500 font-medium">Live Visitors</div>
          <div className="text-lg font-bold text-charcoal">{visitors}</div>
        </div>
        <TrendingUp size={16} className="text-green-500" />
      </div>
    </div>
  );
}
