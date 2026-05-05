import { Layers, Globe, Database, Brain, ArrowRight } from "lucide-react";
import { useState } from "react";

const caseStudies = [
  {
    id: 1,
    title: "AI-Powered Supply Chain Optimization",
    client: "Major African Retailer",
    description: "Implemented machine learning algorithms to optimize inventory management, reducing waste by 35% and improving delivery times across 12 countries.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800",
    tags: ["AI/ML", "Supply Chain", "Python"],
    results: ["35% waste reduction", "50% faster delivery", "12 countries"],
    icon: Brain
  },
  {
    id: 2,
    title: "Digital Infrastructure Modernization",
    client: "Pan-African Bank",
    description: "Modernized legacy banking infrastructure with cloud-native solutions, enabling real-time transactions for 2M+ customers across East Africa.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
    tags: ["Cloud", "Banking", "Infrastructure"],
    results: ["2M+ customers served", "99.99% uptime", "60% cost reduction"],
    icon: Database
  },
  {
    id: 3,
    title: "IoT Smart Agriculture Network",
    client: "Agricultural Cooperative",
    description: "Deployed IoT sensors and analytics platform across 500+ farms, enabling data-driven decisions that increased crop yields by 45%.",
    image: "https://images.unsplash.com/photo-1574943320217-40f4e65dc5a5?w=800",
    tags: ["IoT", "Agriculture", "Analytics"],
    results: ["45% yield increase", "500+ farms connected", "Real-time monitoring"],
    icon: Globe
  },
  {
    id: 4,
    title: "Edge Computing Network Deployment",
    client: "Telecom Provider",
    description: "Built edge computing infrastructure to reduce latency for mobile applications, serving 10M+ users with sub-10ms response times.",
    image: "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=800",
    tags: ["Edge Computing", "Telecom", "Network"],
    results: ["10M+ users", "<10ms latency", "50% bandwidth savings"],
    icon: Layers
  }
];

export default function CaseStudies() {
  const [selectedStudy, setSelectedStudy] = useState<number | null>(null);

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-charcoal mb-4">
            Case Studies
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Real-world impact across Africa's digital transformation journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((study, index) => (
            <div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedStudy(selectedStudy === study.id ? null : study.id)}
            >
              <div className="glass-card overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={study.image} 
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex gap-2 mb-2">
                      {study.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-charcoal/5 flex items-center justify-center flex-shrink-0">
                      <study.icon size={20} className="text-charcoal" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-charcoal mb-1">{study.title}</h3>
                      <p className="text-sm text-slate-500">{study.client}</p>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 mb-4">{study.description}</p>
                  
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-semibold text-charcoal mb-2">Key Results:</h4>
                    <div className="flex flex-wrap gap-2">
                      {study.results.map(result => (
                        <span key={result} className="px-3 py-1 bg-charcoal/5 text-charcoal text-sm rounded-full">
                          {result}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-4 text-charcoal font-medium group-hover:gap-3 transition-all">
                    View Details
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
