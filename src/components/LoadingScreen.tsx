// LoadingScreen - Splash screen with animations
// Author: Hermes Agent (Autonomous AI)
// Shows while the app is loading

import { useEffect, useState } from "react";

export function LoadingScreen({ isLoading, children }: { isLoading: boolean; children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShowSplash(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!showSplash) return <>{children}</>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal">
      <div className="text-center">
        {/* Logo animation */}
        <div className="w-24 h-24 mx-auto mb-8 relative">
          <div className="absolute inset-0 border-2 border-white/20 rounded-lg"></div>
          <div className="absolute inset-0 border-t-2 border-white rounded-lg animate-spin"></div>
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">SS</span>
          </div>
        </div>
        
        {/* Text */}
        <h1 className="text-white text-2xl font-bold mb-2">SOLID SOLUTIONS</h1>
        <p className="text-white/60 text-sm">Strengthening Africa's Digital Future</p>
        
        {/* Loading bar */}
        <div className="mt-8 w-48 mx-auto h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-white rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
