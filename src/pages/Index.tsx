
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, BarChart3, Globe } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate short URLs in milliseconds with our optimized engine."
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime guarantee."
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Deep insights into your link performance and audience behavior."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Worldwide CDN ensures fast access from anywhere on Earth."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-cyan-900/20 to-purple-900/20"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="mb-8 animate-float">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text">Simplify URLs.</span>
              <br />
              <span className="gradient-text">Amplify Insights.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your long URLs into powerful, trackable links. Get detailed analytics, 
              customize your links, and boost your digital presence with our next-gen URL shortener.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to="/manage">
              <Button className="btn-neon text-lg px-8 py-4 group">
                Shorten a URL Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/analytics">
              <Button 
                variant="outline" 
                className="border-gray-600 text-gray-300 hover:border-cyan-500 hover:text-cyan-400 text-lg px-8 py-4"
              >
                View Analytics
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {[
              { number: "10M+", label: "Links Created" },
              { number: "500K+", label: "Active Users" },
              { number: "99.9%", label: "Uptime" },
              { number: "180+", label: "Countries" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Why Choose NeoLink?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the future of URL shortening with our cutting-edge platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="card-neon group hover:scale-105 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:neon-glow transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center card-neon">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of users who trust NeoLink for their URL shortening needs.
          </p>
          <Link to="/signup">
            <Button className="btn-neon text-lg px-8 py-4">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
