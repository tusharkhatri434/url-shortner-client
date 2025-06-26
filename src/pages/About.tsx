
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Target, Users, Rocket, Github, Twitter, Linkedin } from "lucide-react";

const About = () => {
  const timeline = [
    {
      year: "2024",
      title: "Platform Launch",
      description: "NeoLink officially launches with advanced analytics and enterprise features."
    },
    {
      year: "2023",
      title: "Beta Testing",
      description: "Extensive beta testing with over 1,000 users to perfect the user experience."
    },
    {
      year: "2023",
      title: "Development Begins",
      description: "Started building the next-generation URL shortening platform."
    },
    {
      year: "2022",
      title: "Concept & Vision",
      description: "Identified the need for a modern, analytics-driven URL shortening service."
    }
  ];

  const team = [
    {
      name: "Alex Chen",
      role: "Founder & CEO",
      avatar: "AC",
      description: "Full-stack developer with 8+ years of experience in web technologies."
    },
    {
      name: "Sarah Johnson",
      role: "Head of Design",
      avatar: "SJ",
      description: "UX/UI designer passionate about creating intuitive user experiences."
    },
    {
      name: "Marcus Rodriguez",
      role: "Lead Engineer",
      avatar: "MR",
      description: "Backend architect specializing in scalable cloud infrastructure."
    },
    {
      name: "Emily Davis",
      role: "Product Manager",
      avatar: "ED",
      description: "Product strategist focused on user-centric feature development."
    }
  ];

  const values = [
    {
      icon: Zap,
      title: "Performance First",
      description: "Lightning-fast URL shortening with global CDN distribution for optimal speed."
    },
    {
      icon: Target,
      title: "Precision Analytics",
      description: "Detailed insights that help you understand your audience and optimize your strategy."
    },
    {
      icon: Users,
      title: "User-Centric Design",
      description: "Intuitive interface designed with user experience as our top priority."
    },
    {
      icon: Rocket,
      title: "Innovation Drive",
      description: "Constantly pushing boundaries with cutting-edge features and technologies."
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            About NeoLink
          </h1>
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-gray-300 leading-relaxed">
            <p>
              NeoLink is a next-generation URL shortening platform that combines cutting-edge technology 
              with beautiful design to deliver the most advanced link management experience available today.
            </p>
            <p>
              Founded in 2022 by a team of passionate developers and designers, we recognized the need for 
              a modern URL shortener that goes beyond basic link compression. Our platform provides 
              comprehensive analytics, customization options, and enterprise-grade reliability.
            </p>
            <p>
              With over 10 million links created and users in 180+ countries, NeoLink has become the 
              trusted choice for individuals, startups, and Fortune 500 companies who demand the best 
              in link management technology.
            </p>
          </div>
        </div>

        {/* Mission & Values */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-300">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="card-neon group hover:scale-105 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:neon-glow transition-all duration-300">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-300">
              The roadmap of our evolution
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-purple-600"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className="relative flex items-start space-x-6">
                  {/* Timeline dot */}
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center neon-glow">
                    <span className="text-white font-bold">{item.year}</span>
                  </div>
                  
                  {/* Content */}
                  <Card className="card-neon flex-1">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-300">
              The brilliant minds behind NeoLink
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="card-neon group hover:scale-105 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold group-hover:neon-glow transition-all duration-300">
                    {member.avatar}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-cyan-400 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {member.description}
                  </p>
                  
                  {/* Social Links */}
                  <div className="flex justify-center space-x-3 mt-4">
                    <button className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-500 transition-colors">
                      <Github className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-500 transition-colors">
                      <Twitter className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-500 transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section>
          <Card className="card-neon">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold gradient-text mb-4">
                Ready to Connect?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Have questions, feedback, or want to learn more about NeoLink? 
                We'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-neon px-8 py-3">
                  Contact Us
                </button>
                <button className="border border-gray-600 text-gray-300 hover:border-cyan-500 hover:text-cyan-400 px-8 py-3 rounded-lg transition-all duration-200">
                  Join Our Community
                </button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default About;
