/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Cpu, 
  Network, 
  Database, 
  Microscope, 
  Smartphone, 
  Globe, 
  ArrowRight, 
  Mail, 
  MapPin, 
  ChevronRight,
  Layers,
  Users,
  Lightbulb,
  Rocket,
  Code,
  Shield,
  Brain
} from "lucide-react";
import { useState, useEffect, useRef, type ReactNode } from "react";
import { useIntersectionObserver } from "./hooks/useIntersectionObserver";
import Lenis from "lenis";
// ChatBot removed - using Solid LLM instead
import { ContactForm } from "./components/ContactForm";
import CaseStudies from "./components/CaseStudies";
import { NewsletterSignup } from "./components/NewsletterSignup";
import { ParticleBackground } from "./components/ParticleBackground";
import { HermesTerminal } from "./components/HermesTerminal";
import { SystemStatus } from "./components/SystemStatus";
import { VisitorCounter } from "./components/VisitorCounter";
import { AIChatWidget } from "./components/AIChatWidget";
import { BackToTop } from "./components/BackToTop";

const SectionTitle = ({ children, subtitle }: { children: ReactNode, subtitle?: string }) => (
  <div className="mb-12">
    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-charcoal mb-4">
      {children}
    </h2>
    {subtitle && (
      <p className="text-slate-700 max-w-2xl">
        {subtitle}
      </p>
    )}
  </div>
);

const Card = ({ title, description, icon: Icon, highlight = false, href, onClick }: { title: string, description: string, icon: any, highlight?: boolean, href?: string, onClick?: () => void }) => (
  <div 
    
    className={`glass-card p-8 flex flex-col h-full ${highlight ? 'border-charcoal/10 bg-charcoal/5' : ''}`}
  >
    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${highlight ? 'bg-charcoal text-white' : 'bg-charcoal/5 text-slate-600'}`}>
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-semibold text-charcoal mb-3">{title}</h3>
    <p className="text-slate-700 leading-relaxed flex-grow">{description}</p>
    {onClick ? (
      <button 
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
        className="mt-6 flex items-center text-charcoal text-sm font-medium group cursor-pointer opacity-70 hover:opacity-100 transition-opacity w-fit"
      >
        Learn more <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
      </button>
    ) : href ? (
      <a href={href} className="mt-6 flex items-center text-charcoal text-sm font-medium group cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
        Learn more <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
      </a>
    ) : (
      <div className="mt-6 flex items-center text-charcoal text-sm font-medium group cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
        Learn more <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
      </div>
    )}
  </div>
);

const FlipCard = ({ name, icon: Icon, description }: { name: string, icon: any, description: string, key?: any }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="perspective-1000 h-56 sm:h-64 w-full group"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className="relative w-full h-full preserve-3d transition-all duration-500"
        
        
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden glass-card p-6 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-lg bg-charcoal/5 flex items-center justify-center mb-4 text-charcoal group-hover:bg-charcoal group-hover:text-white transition-colors duration-300">
            <Icon size={24} />
          </div>
          <span className="text-sm font-bold text-charcoal">{name}</span>
          <div className="mt-4 text-[10px] uppercase tracking-widest text-slate-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
            Hover to flip
          </div>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 backface-hidden p-6 flex flex-col items-center justify-center text-center bg-charcoal text-white rotate-y-180 rounded-xl"
        >
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3 text-white/60">{name}</h4>
          <p className="text-sm leading-relaxed text-white font-medium">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDetail, setActiveDetail] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true' || 
             (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    // Apply dark mode class
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('darkMode', isDarkMode.toString());
    }
  }, [isDarkMode]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + D = Toggle dark mode
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        setIsDarkMode(!isDarkMode);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDarkMode]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      // Calculate scroll progress
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      lenis.destroy();
    };
  }, []);

  const detailContent: Record<string, { title: string, icon: any, content: string, points: string[] }> = {
    systems: {
      title: "Core Systems Architecture",
      icon: Layers,
      content: "Our systems are built on a foundation of resilience, scalability, and efficiency. We focus on creating integrated environments where software and hardware work in perfect harmony to solve complex African challenges.",
      points: [
        "Distributed Cloud Infrastructure",
        "Edge Computing Optimization",
        "Automated System Recovery",
        "Hardware-Software Co-design"
      ]
    },
    community: {
      title: "Developer & Builder Community",
      icon: Users,
      content: "Innovation doesn't happen in a vacuum. We are building a vibrant ecosystem of developers, engineers, and creators who are passionate about building the future of African technology. Connect with us at info@solidsolutions.africa to learn more about our initiatives and how you can get involved.",
      points: [
        "Open Source Collaboration: Contributing to and maintaining critical infrastructure projects.",
        "Technical Mentorship Programs: Guiding the next generation of African engineers.",
        "Builder Workshops & Hackathons: Hands-on learning and rapid prototyping events.",
        "Cross-border Knowledge Sharing: Connecting tech hubs across the continent."
      ]
    },
    research: {
      title: "Advanced Technology Research",
      icon: Microscope,
      content: "Our research initiatives push the boundaries of what's possible. From AI-driven insights to sustainable hardware manufacturing, we use data to drive long-term technological progress.",
      points: [
        "Applied AI & Machine Learning",
        "Sustainable Materials Science",
        "Digital Economy Impact Studies",
        "Next-Gen Hardware Prototyping"
      ]
    },
    ai_hub: {
      title: "AI Research & Development Hub",
      icon: Cpu,
      content: "The AI Hub is our dedicated center for exploring the practical applications of artificial intelligence in the African context. We are moving beyond theoretical models to build AI that understands local languages, optimizes agricultural yields, and powers the next generation of African fintech.",
      points: [
        "Hyper-local NLP: Developing language models for diverse African dialects.",
        "Agri-Tech Intelligence: Computer vision for real-time crop disease detection.",
        "Fintech Optimization: Predictive models for inclusive financial services.",
        "Edge-AI Deployment: Running complex models on low-power hardware."
      ]
    },
    hardware: {
      title: "Hardware Innovation & Assembly",
      icon: Smartphone,
      content: "We are building the foundation for a robust hardware ecosystem in Africa. Our mission is to transition from consumers to creators, designing and assembling high-performance devices that are optimized for local conditions—from heat resilience to energy efficiency.",
      points: [
        "Next-Gen Assembly: Establishing high-precision local assembly lines.",
        "Embedded Systems: Custom PCB design for industrial IoT applications.",
        "Sustainable Design: Using modular components to extend device lifecycles.",
        "Silicon Collaboration: Researching specialized chips for edge computing."
      ]
    },
    infrastructure: {
      title: "Scalable Digital Infrastructure",
      icon: Database,
      content: "Digital infrastructure is the backbone of the modern economy. We develop the systems, networks, and platforms that enable seamless connectivity and data management across the continent, ensuring that African businesses can compete on a global scale.",
      points: [
        "Distributed Cloud: Building resilient, localized data center networks.",
        "Low-Latency Mesh: Innovative connectivity solutions for remote areas.",
        "Secure Data Vaults: Advanced encryption and sovereign data management.",
        "API Ecosystems: Standardized protocols for cross-platform integration."
      ]
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-charcoal/10">
      {/* Scroll Progress Bar - NEW UPGRADE */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div 
          className="h-full bg-charcoal transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      
        {activeDetail ? (
          <div 
            key="detail"
            
            
            
            className="min-h-screen pt-32 pb-24 px-6 max-w-5xl mx-auto"
          >
            <button 
              onClick={() => {
                const sectionId = ['systems', 'community', 'research'].includes(activeDetail) ? 'vision' : 'pillars';
                setActiveDetail(null);
                setTimeout(() => {
                  const element = document.getElementById(sectionId);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100);
              }}
              className="mb-12 flex items-center gap-2 text-charcoal/60 hover:text-charcoal transition-colors group"
            >
              <ArrowRight className="rotate-180" size={20} />
              <span className="font-bold uppercase tracking-widest text-xs">Back to Overview</span>
            </button>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="w-20 h-20 rounded-2xl bg-charcoal text-white flex items-center justify-center shadow-2xl mb-8">
                  {(() => {
                    const Icon = detailContent[activeDetail].icon;
                    return <Icon size={40} />;
                  })()}
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                  {detailContent[activeDetail].title}
                </h2>
                <p className="text-xl text-slate-700 leading-relaxed mb-8">
                  {detailContent[activeDetail].content}
                </p>
              </div>
              <div className="glass-card p-10 border-charcoal/10">
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-8 text-slate-400">Key Focus Areas</h3>
                <div className="space-y-6">
                  {detailContent[activeDetail].points.map((point, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-charcoal"></div>
                      <span className="text-lg font-medium text-charcoal">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div 
            key="home"
            
            
            
          >
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-bg-main/80 backdrop-blur-lg border-bottom border-black/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-charcoal rounded flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
            </div>
            <span className="text-xl font-bold tracking-tighter text-charcoal">SOLID SOLUTIONS</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
            <a href="#about" className="hover:text-charcoal transition-colors">About</a>
            <a href="#mission" className="hover:text-charcoal transition-colors">Mission</a>
            <a href="#pillars" className="hover:text-charcoal transition-colors">Technology</a>
            <a href="#roadmap" className="hover:text-charcoal transition-colors">Roadmap</a>
            <a href="/solid-llm/" className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all flex items-center gap-2">
              <Brain size={16} />
              AI Tool
            </a>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full hover:bg-charcoal/10 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden grid-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-main/50 to-bg-main pointer-events-none"></div>
        
        {/* Particle Background */}
        <ParticleBackground className="opacity-40" />
        
        {/* Abstract Visuals */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-charcoal/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-charcoal/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="max-w-4xl">
            <div 
              
              
              
            >
              <span className="inline-block px-3 py-1 bg-charcoal/5 text-charcoal text-[10px] font-bold tracking-[0.2em] uppercase rounded border border-charcoal/10 mb-8 backdrop-blur-sm">
                Africa's Next Generation
              </span>
              
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-charcoal mb-6 leading-[0.85] uppercase">
                <span className="block mb-2">Building</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-charcoal to-slate-400 mb-2">Africa's</span>
                <span className="block">Future.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 mb-12 leading-relaxed max-w-2xl">
                An emerging initiative focused on artificial intelligence, digital infrastructure, and future hardware manufacturing. Building practical systems that support Africa’s evolving digital economy.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <a href="#mission" className="px-8 py-4 bg-charcoal text-white font-bold uppercase tracking-wider text-sm rounded hover:bg-slate-800 transition-all flex items-center justify-center gap-3 group">
                  Explore Our Vision <ArrowRight size={18} className="transition-transform group-hover:translate-x-2" />
                </a>
                <a href="#contact" className="px-8 py-4 bg-charcoal/5 text-charcoal font-bold uppercase tracking-wider text-sm rounded border border-charcoal/10 hover:bg-charcoal/10 transition-all flex items-center justify-center">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-bg-dark opacity-0 animate-fade-in-up stagger-1 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <SectionTitle>A Technology Initiative for Africa’s Digital Future</SectionTitle>
            <p className="text-lg text-slate-700 mb-6 leading-relaxed">
              Solid Solutions is focused on strengthening Africa’s role in the global technology ecosystem through research collaboration, infrastructure development, and long-term hardware innovation.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              Our goal is to support a new generation of builders creating technologies designed for real-world environments.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-24 grid-pattern opacity-0 animate-fade-in-up stagger-2">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle="Strengthening Africa’s technological capability through research, collaboration, and the development of scalable digital systems.">
            Our Mission
          </SectionTitle>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 glass-card h-full">
              <h3 className="text-charcoal font-extrabold uppercase tracking-widest text-sm mb-4">The Challenge</h3>
              <p className="text-slate-700 leading-relaxed">
                Africa’s digital economy is growing rapidly, yet much of the underlying technology infrastructure and hardware manufacturing remains external.
              </p>
            </div>
            <div className="p-8 glass-card h-full">
              <h3 className="text-charcoal font-extrabold uppercase tracking-widest text-sm mb-4">The Opportunity</h3>
              <p className="text-slate-700 leading-relaxed">
                A growing developer community and expanding connectivity create the foundation for new technological innovation.
              </p>
            </div>
            <div className="p-8 glass-card border-charcoal/10 h-full">
              <h3 className="text-charcoal font-extrabold uppercase tracking-widest text-sm mb-4">Our Focus</h3>
              <p className="text-slate-700 leading-relaxed">
                Supporting research, collaboration, and infrastructure that enable African developers and engineers to build globally competitive technologies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Technology Pillars */}
      <section id="pillars" className="py-24 bg-bg-dark opacity-0 animate-fade-in-up stagger-3">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle>Core Technology Pillars</SectionTitle>
          <div className="grid md:grid-cols-3 gap-8">
            <Card 
              title="AI Hub" 
              description="Research and developer collaboration focused on practical artificial intelligence applications." 
              icon={Cpu}
              highlight
              onClick={() => {
                setActiveDetail('ai_hub');
                window.scrollTo(0, 0);
              }}
            />
            <Card 
              title="Hardware Innovation" 
              description="Exploring future smartphone assembly and embedded systems development to strengthen Africa’s hardware ecosystem." 
              icon={Smartphone}
              highlight
              onClick={() => {
                setActiveDetail('hardware');
                window.scrollTo(0, 0);
              }}
            />
            <Card 
              title="Digital Infrastructure" 
              description="Developing partnerships and systems that support scalable digital platforms." 
              icon={Database}
              highlight
              onClick={() => {
                setActiveDetail('infrastructure');
                window.scrollTo(0, 0);
              }}
            />
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <NewsletterSignup />
      
      {/* Hermes Terminal - Interactive AI Demo */}
      <HermesTerminal />
      
      {/* System Status Dashboard */}
      <SystemStatus />
      
      {/* Research & Innovation */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle="Solid Solutions explores technologies that support scalable digital systems.">
            Research and Innovation
          </SectionTitle>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { 
                name: "Artificial Intelligence", 
                icon: Brain,
                description: "Researching neural networks and machine learning models to solve complex local and global challenges."
              },
              { 
                name: "Embedded Systems", 
                icon: Cpu,
                description: "Designing specialized computing systems for dedicated functions within larger mechanical or electrical systems."
              },
              { 
                name: "Edge Computing", 
                icon: Network,
                description: "Optimizing data processing at the network edge to reduce latency and improve real-time performance."
              },
              { 
                name: "Digital Infrastructure", 
                icon: Database,
                description: "Building the foundational systems and networks that power scalable digital platforms and services."
              },
              { 
                name: "Robotics and Automation", 
                icon: Rocket,
                description: "Developing intelligent machines and automated processes to enhance efficiency in various industries."
              },
              { 
                name: "Cybersecurity", 
                icon: Shield,
                description: "Implementing advanced security protocols and systems to protect critical data and digital assets."
              }
            ].map((item, i) => (
              <FlipCard 
                key={i} 
                name={item.name} 
                icon={item.icon} 
                description={item.description} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Technology Architecture */}
      <section className="py-24 bg-bg-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle="Our vertical technology stack ensures seamless integration from silicon to software.">
            Technology Architecture
          </SectionTitle>
          
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Visual Stack - Interactive */}
            <div className="lg:col-span-7 perspective-1000">
              <div className="flex flex-col gap-4 relative">
                {[
                  { id: 'apps', label: "Applications", color: "bg-charcoal text-white", desc: "High-performance digital platforms and specialized AI interfaces designed for enterprise-grade scalability.", icon: Code },
                  { id: 'intel', label: "Intelligence Layer", color: "bg-charcoal/85 text-white", desc: "Neural processing units and machine learning models that provide automated decision-making and predictive analytics.", icon: Lightbulb },
                  { id: 'infra', label: "Infrastructure", color: "bg-charcoal/15 text-charcoal", desc: "Distributed cloud networks and low-latency connectivity protocols optimized for real-world environments.", icon: Network },
                  { id: 'hw', label: "Hardware", color: "bg-charcoal/5 text-charcoal", desc: "Custom-designed embedded systems and hardware assembly focused on edge-device efficiency.", icon: Smartphone }
                ].map((layer, i) => (
                  <div
                    key={layer.id}
                    
                    className={`group relative p-8 ${layer.color} border border-charcoal/10 rounded-2xl shadow-xl cursor-default overflow-hidden`}
                  >
                    <div className="flex justify-between items-center relative z-10">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${i < 2 ? 'bg-white/10' : 'bg-charcoal/5'}`}>
                          <layer.icon size={20} />
                        </div>
                        <h4 className="text-lg font-bold tracking-tight">{layer.label}</h4>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono uppercase tracking-widest">
                        Layer 0{4-i}
                      </div>
                    </div>
                    <p className={`mt-4 text-sm max-w-xl leading-relaxed ${i < 2 ? 'text-white/70' : 'text-slate-600'}`}>
                      {layer.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Context/Detail Side */}
            <div className="lg:col-span-5 space-y-8">
              <div className="glass-card p-8 border-charcoal/10">
                <h3 className="text-charcoal font-bold text-xl mb-4">Vertical Integration</h3>
                <p className="text-slate-700 leading-relaxed mb-6">
                  Our architecture is built as a cohesive ecosystem. Each layer is engineered to communicate directly with the adjacent tiers, eliminating the latency and security risks of fragmented systems.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "Latency", value: "< 50ms" },
                    { label: "Uptime", value: "99.9%" },
                    { label: "Security", value: "End-to-End" },
                    { label: "Scale", value: "Elastic" }
                  ].map((stat, i) => (
                    <div key={i} className="p-4 bg-charcoal/5 rounded-xl border border-charcoal/5">
                      <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">{stat.label}</div>
                      <div className="text-charcoal font-bold">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-8 bg-charcoal rounded-2xl text-white relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center">
                      <Layers size={20} />
                    </div>
                    <h4 className="font-bold">System Resilience</h4>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Designed for high-availability, our architecture features automated failover and distributed redundancy at every layer of the stack.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Ecosystem */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass-card p-12 md:p-20 bg-gradient-to-br from-charcoal/5 to-transparent border-charcoal/10">
            <div className="max-w-3xl">
              <SectionTitle subtitle="Solid Solutions welcomes collaboration from developers, engineers, researchers, and innovators.">
                Developer Ecosystem
              </SectionTitle>
              <div className="grid sm:grid-cols-3 gap-8 mb-12">
                <div>
                  <h4 className="text-charcoal font-bold mb-2">Collaboration</h4>
                  <p className="text-slate-700 text-sm">Work on experimental AI and infrastructure projects.</p>
                </div>
                <div>
                  <h4 className="text-charcoal font-bold mb-2">Research</h4>
                  <p className="text-slate-700 text-sm">Contribute to emerging technical initiatives.</p>
                </div>
                <div>
                  <h4 className="text-charcoal font-bold mb-2">Innovation</h4>
                  <p className="text-slate-700 text-sm">Participate in early-stage technology development.</p>
                </div>
              </div>
              <button className="px-8 py-4 bg-charcoal text-white font-semibold rounded-lg hover:bg-slate-800 transition-all">
                Join the Developer Network
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Technology Gallery - NEW UPGRADE */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle="Visualizing the future of African technology infrastructure.">
            Technology in Action
          </SectionTitle>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item, i) => (
              <div key={i} className="aspect-square glass-card flex items-center justify-center hover:border-charcoal/20 transition-all group cursor-pointer">
                <div className="text-center">
                  <Code size={32} className="text-charcoal/30 group-hover:text-charcoal/60 transition-colors mx-auto mb-2" />
                  <span className="text-xs font-bold uppercase tracking-widest text-charcoal/30 group-hover:text-charcoal/60 transition-colors">
                    Project {item}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team - NEW UPGRADE */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle="The minds building Africa's next generation technology infrastructure.">
            Our Team
          </SectionTitle>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Leadership Team", role: "Founders & Strategy", icon: Users },
              { name: "Engineering", role: "AI & Infrastructure", icon: Code },
              { name: "Research", role: "Innovation & Development", icon: Microscope }
            ].map((member, i) => (
              <div key={i} className="glass-card p-8 text-center hover:border-charcoal/20 transition-all">
                <div className="w-20 h-20 mx-auto mb-6 bg-charcoal/5 rounded-full flex items-center justify-center">
                  <member.icon size={32} className="text-charcoal" />
                </div>
                <h4 className="text-lg font-bold text-charcoal mb-2">{member.name}</h4>
                <p className="text-sm text-slate-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials - NEW UPGRADE */}
      <section className="py-24 bg-bg-dark">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle="What collaborators and partners say about our technology initiative.">
            Testimonials
          </SectionTitle>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { quote: "Solid Solutions is paving the way for Africa's tech future with practical, scalable solutions.", author: "Tech Partner", role: "Innovation Lead" },
              { quote: "Their approach to AI infrastructure is exactly what the continent needs right now.", author: "Research Collaborator", role: "University Professor" },
              { quote: "Working with Solid Solutions has opened new possibilities for our developer community.", author: "Community Builder", role: "Hub Director" }
            ].map((testimonial, i) => (
              <div key={i} className="glass-card p-8 border-charcoal/10">
                <div className="mb-4 text-charcoal/30 text-4xl">"</div>
                <p className="text-slate-700 leading-relaxed mb-6 italic">{testimonial.quote}</p>
                <div className="border-t border-charcoal/10 pt-4">
                  <div className="font-bold text-charcoal">{testimonial.author}</div>
                  <div className="text-sm text-slate-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Partners & Collaborators - NEW UPGRADE */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle="Organizations and institutions advancing Africa's technology ecosystem together.">
            Partners & Collaborators
          </SectionTitle>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60 hover:opacity-100 transition-opacity">
            {["TechHub Africa", "Innovate Now", "AfriLabs", "GSMA Africa"].map((partner, i) => (
              <div key={i} className="p-8 glass-card text-center hover:border-charcoal/20 transition-all">
                <div className="w-16 h-16 mx-auto mb-4 bg-charcoal/5 rounded-xl flex items-center justify-center">
                  <Network size={24} className="text-charcoal/40" />
                </div>
                <span className="text-sm font-bold text-charcoal/40">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ - NEW UPGRADE */}
      <section className="py-24 bg-bg-dark">
        <div className="max-w-4xl mx-auto px-6">
          <SectionTitle subtitle="Common questions about our technology initiative and how you can get involved.">
            Frequently Asked Questions
          </SectionTitle>
          
          <div className="space-y-4">
            {[
              {
                q: "What is Solid Solutions?",
                a: "Solid Solutions is an emerging technology initiative focused on artificial intelligence, digital infrastructure, and hardware innovation for Africa's evolving digital economy."
              },
              {
                q: "How can I collaborate with you?",
                a: "We welcome developers, researchers, and institutions to join our ecosystem. Contact us at info@solidsolutions.africa to explore collaboration opportunities."
              },
              {
                q: "What technologies do you focus on?",
                a: "Our core focus areas include AI/ML, embedded systems, edge computing, digital infrastructure, and future hardware manufacturing optimized for African environments."
              },
              {
                q: "Do you offer internships or mentorship?",
                a: "Yes! We're building a developer ecosystem with technical mentorship programs, builder workshops, and hands-on learning opportunities. Reach out to learn more."
              }
            ].map((faq, i) => (
              <details key={i} className="glass-card p-6 group cursor-pointer">
                <summary className="flex justify-between items-center font-bold text-charcoal list-none">
                  {faq.q}
                  <ChevronRight size={20} className="transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      
      <CaseStudies />
      
      {/* Impact Statistics - NEW UPGRADE */}
      <section className="py-24 bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle="Our growing impact across Africa's technology landscape.">
            Impact Statistics
          </SectionTitle>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Active Projects", value: "12+", icon: Code },
              { label: "Countries Reached", value: "8", icon: Globe },
              { label: "Developers", value: "150+", icon: Users },
              { label: "Uptime SLA", value: "99.9%", icon: Shield }
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
                <div className="w-12 h-12 mx-auto mb-4 bg-white/10 rounded-xl flex items-center justify-center">
                  <stat.icon size={24} />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-white/60 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Development Roadmap */}
      <section id="roadmap" className="py-24 bg-bg-dark">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle>Development Roadmap</SectionTitle>
          <div className="relative pt-12">
            <div className="absolute top-[4.5rem] left-0 w-full h-px bg-charcoal/10 hidden md:block"></div>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { phase: "Phase 1", title: "Research and Planning", status: "Current", active: true, icon: Microscope },
                { phase: "Phase 2", title: "Developer Collaboration", status: "Upcoming", active: false, icon: Users },
                { phase: "Phase 3", title: "Technology Development", status: "Future", active: false, icon: Code },
                { phase: "Phase 4", title: "Hardware Initiative", status: "Long-term", active: false, icon: Smartphone }
              ].map((item, i) => (
                <div key={i} className="relative">
                  <div className={`w-10 h-10 rounded-lg mb-6 flex items-center justify-center relative z-10 ${item.active ? 'bg-charcoal text-white glow-accent' : 'bg-slate-200 text-slate-400 border border-slate-300'}`}>
                    <item.icon size={18} />
                    {item.active && <div className="absolute inset-0 rounded-lg animate-ping bg-charcoal/20"></div>}
                  </div>
                  <h4 className={`font-bold mb-1 ${item.active ? 'text-charcoal' : 'text-slate-400'}`}>{item.phase}</h4>
                  <h5 className="text-charcoal font-semibold mb-2">{item.title}</h5>
                  <p className="text-slate-400 text-sm">{item.status}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-24 grid-pattern relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <SectionTitle>Building Africa’s Technology Future</SectionTitle>
            <p className="text-xl text-slate-700 leading-relaxed mb-12">
              Africa’s next wave of innovation will come from builders developing systems designed for real-world environments. Solid Solutions aims to contribute to this future through research, collaboration, and long-term technological development.
            </p>
            <div className="relative py-8 flex flex-col items-center">
              {/* Flowchart Container */}
              <div className="relative flex flex-col items-center w-full max-w-xl">
                
                {/* Root Node: Systems */}
                <div 
                  
                  onClick={() => {
                    setActiveDetail('systems');
                    window.scrollTo(0, 0);
                  }}
                  className="relative z-10 mb-12 group cursor-pointer"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-xl bg-charcoal text-white flex items-center justify-center shadow-xl mb-4 transition-transform group-hover:scale-105">
                      <Layers size={32} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-charcoal bg-bg-main px-3 py-1 border border-charcoal/10 rounded-full">Systems</span>
                  </div>
                  
                  {/* Vertical Stem */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-8 bg-charcoal/10"></div>
                </div>

                {/* Horizontal Branch */}
                <div className="absolute top-[125px] left-1/4 right-1/4 h-px bg-charcoal/10"></div>
                
                {/* Children Nodes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 md:gap-32 w-full">
                  {/* Community Node */}
                  <div 
                    
                    onClick={() => {
                      setActiveDetail('community');
                      window.scrollTo(0, 0);
                    }}
                    className="flex flex-col items-center relative group cursor-pointer"
                  >
                    {/* Vertical Connector */}
                    <div className="absolute -top-8 left-1/2 w-px h-8 bg-charcoal/10"></div>
                    
                    <div className="w-14 h-14 glass-card flex items-center justify-center text-charcoal mb-3 group-hover:border-charcoal/20">
                      <Users size={24} />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-charcoal">Community</span>
                  </div>
                  
                  {/* Research Node */}
                  <div 
                    
                    onClick={() => {
                      setActiveDetail('research');
                      window.scrollTo(0, 0);
                    }}
                    className="flex flex-col items-center relative group cursor-pointer"
                  >
                    {/* Vertical Connector */}
                    <div className="absolute -top-8 left-1/2 w-px h-8 bg-charcoal/10"></div>
                    
                    <div className="w-14 h-14 glass-card flex items-center justify-center text-charcoal mb-3 group-hover:border-charcoal/20">
                      <Microscope size={24} />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-charcoal">Research</span>
                  </div>
                </div>

                {/* Decorative Flow Indicators */}
                <div className="absolute top-[125px] left-1/4 w-1.5 h-1.5 rounded-full bg-charcoal/10 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute top-[125px] right-1/4 w-1.5 h-1.5 rounded-full bg-charcoal/10 translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - NEW UPGRADE */}
      <section className="py-24 bg-charcoal text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal to-charcoal/80"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Build Africa's Future?</h2>
          <p className="text-xl text-white/70 mb-10 leading-relaxed">
            Join Solid Solutions in shaping the next generation of technology infrastructure. 
            Whether you're a developer, researcher, or institution - there's a place for you in our ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="px-8 py-4 bg-white text-charcoal font-bold rounded-lg hover:bg-white/90 transition-all">
              Get Involved Today
            </a>
            <a href="/solid-llm/" className="px-8 py-4 border-2 border-white/30 text-white font-bold rounded-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              <Brain size={20} />
              Try Solid LLM
            </a>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-24 bg-bg-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <SectionTitle subtitle="Solid Solutions welcomes collaboration with developers, engineers, researchers, institutions, and investors interested in advancing Africa’s technology ecosystem.">
                Collaborate With Us
              </SectionTitle>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-charcoal/5 flex items-center justify-center text-charcoal flex-shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-charcoal font-semibold mb-1">Email</h4>
                    <p className="text-slate-700">info@solidsolutions.africa</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-charcoal/5 flex items-center justify-center text-charcoal flex-shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-charcoal font-semibold mb-1">Location</h4>
                    <p className="text-slate-700">Africa (Headquarters Pending)</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="glass-card p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-charcoal/5 bg-bg-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-charcoal rounded flex items-center justify-center">
                  <div className="w-3 h-3 border-2 border-white rounded-sm"></div>
                </div>
                <span className="text-lg font-bold tracking-tighter text-charcoal uppercase">SOLID SOLUTIONS</span>
              </div>
              <p className="text-slate-700 max-w-sm">
                Developing practical technology for Africa’s digital future. An emerging initiative focused on AI, infrastructure, and hardware.
              </p>
            </div>
            <div>
              <h4 className="text-charcoal font-bold mb-6">Explore</h4>
              <ul className="space-y-4 text-sm text-slate-700">
                <li><a href="#about" className="hover:text-charcoal transition-colors">About</a></li>
                <li><a href="#mission" className="hover:text-charcoal transition-colors">Mission</a></li>
                <li><a href="#pillars" className="hover:text-charcoal transition-colors">Research</a></li>
                <li><a href="#roadmap" className="hover:text-charcoal transition-colors">Roadmap</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-charcoal font-bold mb-6">Legal</h4>
              <ul className="space-y-4 text-sm text-slate-700">
                <li><a href="/privacy-policy.html" className="hover:text-charcoal transition-colors">Privacy Policy</a></li>
                <li><a href="/terms-of-service.html" className="hover:text-charcoal transition-colors">Terms of Service</a></li>
                <li><a href="#contact" className="hover:text-charcoal transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-charcoal/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-700 text-sm">
              © {new Date().getFullYear()} Solid Solutions. All rights reserved.
            </p>
            <div className="flex gap-6 text-slate-400">
              <Globe size={20} className="hover:text-charcoal cursor-pointer transition-colors" />
              <Code size={20} className="hover:text-charcoal cursor-pointer transition-colors" />
              <Network size={20} className="hover:text-charcoal cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </footer>
        </div>
      )}
    </div>
  );
}

