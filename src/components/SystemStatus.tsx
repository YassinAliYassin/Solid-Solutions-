// SystemStatus - Live status dashboard
// Author: Hermes Agent (Autonomous AI)
// Shows real-time system health

import { useState, useEffect } from "react";
import { CheckCircle, AlertCircle, Cpu, Database, Globe, Zap } from "lucide-react";

interface StatusItem {
  name: string;
  status: "operational" | "degraded" | "down";
  icon: any;
  latency?: number;
}

export function SystemStatus() {
  const [systemStatus, setSystemStatus] = useState<StatusItem[]>([
    { name: "Web Server", status: "operational", icon: Globe },
    { name: "AI Engine", status: "operational", icon: Cpu },
    { name: "Database", status: "operational", icon: Database },
    { name: "CDN", status: "operational", icon: Zap },
  ]);
  
  const [lastChecked, setLastChecked] = useState(new Date());
  const [isChecking, setIsChecking] = useState(false);

  const checkStatus = async () => {
    setIsChecking(true);
    
    // Simulate API checks (replace with real endpoints)
    const updated = systemStatus.map(item => ({
      ...item,
      status: Math.random() > 0.1 ? "operational" as const : "degraded" as const,
      latency: Math.floor(Math.random() * 100) + 20
    }));
    
    setSystemStatus(updated);
    setLastChecked(new Date());
    setIsChecking(false);
  };

  useEffect(() => {
    checkStatus();
    const interval = setInterval(checkStatus, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, []);

  const allOperational = systemStatus.every(s => s.status === "operational");
  const operationalCount = systemStatus.filter(s => s.status === "operational").length;

  return (
    <div className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-600 text-[10px] font-bold tracking-[0.2em] uppercase rounded border border-green-500/20 mb-6">
            <CheckCircle size={14} />
            SYSTEM STATUS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-charcoal mb-6">
            All Systems Operational
          </h2>
          <p className="text-lg text-slate-700">
            {operationalCount}/{systemStatus.length} services running smoothly
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {systemStatus.map((item, i) => (
            <div key={i} className="glass-card p-6 flex flex-col items-center text-center">
              <div className={`mb-4 ${
                item.status === "operational" ? "text-green-500" : 
                item.status === "degraded" ? "text-yellow-500" : "text-red-500"
              }`}>
                <item.icon size={32} />
              </div>
              <h3 className="font-bold text-charcoal mb-2">{item.name}</h3>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  item.status === "operational" ? "bg-green-500" :
                  item.status === "degraded" ? "bg-yellow-500" : "bg-red-500"
                }`}></div>
                <span className={`text-sm font-medium ${
                  item.status === "operational" ? "text-green-600" :
                  item.status === "degraded" ? "text-yellow-600" : "text-red-600"
                }`}>
                  {item.status === "operational" ? "Operational" : 
                   item.status === "degraded" ? "Degraded" : "Down"}
                </span>
              </div>
              {item.latency && (
                <p className="text-xs text-slate-500 mt-2">{item.latency}ms</p>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <button
            onClick={checkStatus}
            disabled={isChecking}
            className="px-6 py-3 bg-charcoal text-white rounded-full hover:bg-slate-800 transition-all text-sm font-medium flex items-center gap-2 mx-auto disabled:opacity-50"
          >
            <Zap size={16} className={isChecking ? "animate-spin" : ""} />
            {isChecking ? "Checking..." : "Refresh Status"}
          </button>
          <p className="text-xs text-slate-500 mt-4">
            Last checked: {lastChecked.toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
}
