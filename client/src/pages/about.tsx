import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Award,
  Building2,
  Lightbulb,
  Target,
  Users,
  Palette,
  MapPin,
  Mail,
  MessageCircle
} from "lucide-react";

// Custom hook for scroll animations
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const elements = ref.current?.querySelectorAll(".scroll-animate");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return ref;
}

export default function About() {
  const containerRef = useScrollAnimation();

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const whatsappNumber = "918886919444";
  const emailAddress = "info@vajramarchitects.com";

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber}`;
    window.open(url, "_blank");
  };

  const handleEmailClick = () => {
    const url = `mailto:${emailAddress}`;
    window.location.href = url;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* CSS for animations */}
      <style>{`
        /* Fade in from bottom */
        .scroll-animate.fade-up {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        .scroll-animate.fade-up.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Fade in from left */
        .scroll-animate.fade-left {
          opacity: 0;
          transform: translateX(-50px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        .scroll-animate.fade-left.is-visible {
          opacity: 1;
          transform: translateX(0);
        }

        /* Fade in from right */
        .scroll-animate.fade-right {
          opacity: 0;
          transform: translateX(50px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        .scroll-animate.fade-right.is-visible {
          opacity: 1;
          transform: translateX(0);
        }

        /* Staggered delays for cards */
        .scroll-animate.delay-1 { transition-delay: 0.1s; }
        .scroll-animate.delay-2 { transition-delay: 0.2s; }
        .scroll-animate.delay-3 { transition-delay: 0.3s; }
        .scroll-animate.delay-4 { transition-delay: 0.4s; }
        .scroll-animate.delay-5 { transition-delay: 0.5s; }
        .scroll-animate.delay-6 { transition-delay: 0.6s; }

        /* Section heading hover underline */
        .section-heading {
          position: relative;
          display: block;
          width: fit-content;
          margin-left: auto;
          margin-right: auto;
         
        }
        .section-heading::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 3px;
          background-color: white;
          transition: width 0.3s ease-out;
        }
        .section-heading:hover::after {
          width: 80px;
        }
      `}</style>

      <main ref={containerRef} className="container mx-auto px-4 sm:px-6 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Back to Home Link */}
          <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8 sm:mb-12">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>

          {/* Hero Section */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20 scroll-animate fade-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal font-serif tracking-[0.02em] mb-4 sm:mb-6 text-white">
              About VAJRAM ARCHITECTS
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Crafting spaces that define luxury, where modern architecture meets bespoke interiors to create premium living experiences.
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-12 sm:space-y-16 md:space-y-20">
            {/* Founder Section */}
            <section className="border-t border-gray-800 pt-16 sm:pt-24">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                {/* Founder Image & Info - Left Side */}
                <div className="lg:col-span-5 flex flex-col scroll-animate fade-left">
                  <div className="relative w-full h-[22rem] sm:h-[26rem] lg:h-[28rem] lg:mt-24 bg-gray-900/50 rounded-2xl overflow-hidden border border-gray-800 shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
                    <img
                      src="/vajram-founder.jpeg"
                      alt="Vajrala Baji - Founder of Vajram Architects"
                      className="w-full h-full object-cover object-bottom"
                    />
                  </div>
                  <div className="mt-8 text-center lg:text-left">
                    <h3 className="text-3xl font-serif text-white tracking-wide mb-2">Vajrala Baji Reddy</h3>
                    <div className="w-12 h-0.5 bg-gray-700 mx-auto lg:mx-0 mb-3"></div>
                    <p className="text-gray-400 text-sm uppercase tracking-[0.2em]">
                      Founder - Vajram Architects
                    </p>
                  </div>
                </div>

                {/* Founder Content - Right Side */}
                <div className="lg:col-span-7 space-y-8 scroll-animate fade-right lg:pt-4">
                  <div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-serif tracking-[0.02em] text-white overflow-hidden">
                      <span className="block section-heading pb-2">Our Founder</span>
                    </h2>
                  </div>

                  <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                    <p>
                      At the heart of VAJRAM ARCHITECTS is a vision to transform living spaces into extraordinary experiences. Our founder brings years of expertise in modern architecture and interior design, combining innovative thinking with meticulous attention to detail.
                    </p>
                    <p>
                      With a passion for creating bespoke interiors and premium living spaces, we've built a reputation for excellence across multiple locations, from Guntur and Hyderabad to international projects in Ireland.
                    </p>
                    <p>
                      Every project we undertake reflects our commitment to designing spaces that not only meet but exceed our clients' expectations, blending functionality with luxury and timeless elegance.
                    </p>
                    <p>
                      We believe in building lasting relationships with our clients, grounded in trust, transparency, and a shared commitment to excellence.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Our Story Section */}
            <section className="border-t border-gray-800 pt-12 sm:pt-16 scroll-animate fade-up">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-normal font-serif tracking-[0.02em] mb-6 sm:mb-8 text-white text-center section-heading">
                  Our Story
                </h2>
                <div className="space-y-6">
                  <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                    VAJRAM ARCHITECTS was founded with a simple yet powerful mission: to design spaces that define luxury and reflect the unique lifestyle of each client. We believe that architecture and interior design are not just about creating beautiful spaces, but about crafting environments that inspire, comfort, and elevate everyday living.
                  </p>
                  <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                    Over the years, we've expanded our reach across multiple locations, working with clients who share our vision of premium living. From residential projects in Guntur and Hyderabad to commercial spaces in Siddipet, Suryapet, and Nirmal, and extending our expertise internationally to Ireland, we've built a diverse portfolio that showcases our versatility and commitment to excellence.
                  </p>
                  <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                    Our approach combines modern architectural principles with bespoke interior solutions, ensuring that every project is unique, functional, and aesthetically stunning. We work closely with our clients throughout the entire process, from initial concept to final execution, ensuring that their vision becomes reality.
                  </p>
                </div>
              </div>
            </section>

            {/* Our Values Section */}
            <section className="border-t border-gray-800 pt-12 sm:pt-16">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-normal font-serif tracking-[0.02em] mb-8 sm:mb-12 text-white text-center scroll-animate fade-up section-heading">
                Our Values
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                <div className="bg-gray-900/50 border border-gray-800 hover:border-white/50 p-6 sm:p-8 rounded-lg scroll-animate fade-left delay-1 transition-all duration-300 cursor-pointer">
                  <div className="w-12 h-12 bg-black border border-gray-700 rounded-lg flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-normal font-serif tracking-[0.02em] mb-3 text-white">Excellence</h3>
                  <p className="text-gray-400 leading-relaxed">
                    We strive for perfection in every detail, ensuring that our work meets the highest standards of quality and craftsmanship.
                  </p>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 hover:border-white/50 p-6 sm:p-8 rounded-lg scroll-animate fade-up delay-2 transition-all duration-300 cursor-pointer">
                  <div className="w-12 h-12 bg-black border border-gray-700 rounded-lg flex items-center justify-center mb-4">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-normal font-serif tracking-[0.02em] mb-3 text-white">Innovation</h3>
                  <p className="text-gray-400 leading-relaxed">
                    We embrace modern design trends and innovative solutions to create spaces that are both contemporary and timeless.
                  </p>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 hover:border-white/50 p-6 sm:p-8 rounded-lg scroll-animate fade-right delay-3 transition-all duration-300 cursor-pointer">
                  <div className="w-12 h-12 bg-black border border-gray-700 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-normal font-serif tracking-[0.02em] mb-3 text-white">Client-Centric</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Your vision is our priority. We work closely with you to understand your needs and bring your dreams to life.
                  </p>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 hover:border-white/50 p-6 sm:p-8 rounded-lg scroll-animate fade-left delay-4 transition-all duration-300 cursor-pointer">
                  <div className="w-12 h-12 bg-black border border-gray-700 rounded-lg flex items-center justify-center mb-4">
                    <Palette className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-normal font-serif tracking-[0.02em] mb-3 text-white">Bespoke Design</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Every project is unique, tailored to reflect your personal style and lifestyle preferences.
                  </p>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 hover:border-white/50 p-6 sm:p-8 rounded-lg scroll-animate fade-up delay-5 transition-all duration-300 cursor-pointer">
                  <div className="w-12 h-12 bg-black border border-gray-700 rounded-lg flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-normal font-serif tracking-[0.02em] mb-3 text-white">Quality</h3>
                  <p className="text-gray-400 leading-relaxed">
                    We use only the finest materials and work with trusted partners to ensure lasting quality and durability.
                  </p>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 hover:border-white/50 p-6 sm:p-8 rounded-lg scroll-animate fade-right delay-6 transition-all duration-300 cursor-pointer">
                  <div className="w-12 h-12 bg-black border border-gray-700 rounded-lg flex items-center justify-center mb-4">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-normal font-serif tracking-[0.02em] mb-3 text-white">Integrity</h3>
                  <p className="text-gray-400 leading-relaxed">
                    We conduct our business with honesty, transparency, and respect, building lasting relationships with our clients.
                  </p>
                </div>
              </div>
            </section>

            {/* What We Do Section */}
            <section className="border-t border-gray-800 pt-12 sm:pt-16">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-normal font-serif tracking-[0.02em] mb-8 sm:mb-12 text-white text-center scroll-animate fade-up section-heading">
                What We Do
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
                <div className="flex items-start gap-4 scroll-animate fade-left delay-1">
                  <div className="flex-shrink-0 w-2 h-2 bg-white rounded-full mt-2"></div>
                  <div>
                    <h3 className="text-lg font-normal font-serif tracking-[0.02em] mb-2 text-white">Residential Architecture</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Designing custom homes and residential spaces that reflect your lifestyle and preferences, from concept to completion.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 scroll-animate fade-right delay-1">
                  <div className="flex-shrink-0 w-2 h-2 bg-white rounded-full mt-2"></div>
                  <div>
                    <h3 className="text-lg font-normal font-serif tracking-[0.02em] mb-2 text-white">Interior Design</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Creating bespoke interiors that combine functionality with luxury, tailored to your unique taste and requirements.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 scroll-animate fade-left delay-2">
                  <div className="flex-shrink-0 w-2 h-2 bg-white rounded-full mt-2"></div>
                  <div>
                    <h3 className="text-lg font-normal font-serif tracking-[0.02em] mb-2 text-white">Commercial Spaces</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Designing professional environments that enhance productivity and create lasting impressions for your business.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 scroll-animate fade-right delay-2">
                  <div className="flex-shrink-0 w-2 h-2 bg-white rounded-full mt-2"></div>
                  <div>
                    <h3 className="text-lg font-normal font-serif tracking-[0.02em] mb-2 text-white">Landscape Design</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Transforming outdoor spaces into beautiful, functional landscapes that complement your architectural vision.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 scroll-animate fade-left delay-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-white rounded-full mt-2"></div>
                  <div>
                    <h3 className="text-lg font-normal font-serif tracking-[0.02em] mb-2 text-white">3D Visualization</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Providing detailed 3D renders and visualizations to help you visualize your project before construction begins.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 scroll-animate fade-right delay-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-white rounded-full mt-2"></div>
                  <div>
                    <h3 className="text-lg font-normal font-serif tracking-[0.02em] mb-2 text-white">Project Management</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Overseeing every aspect of your project from planning to execution, ensuring timely delivery and quality results.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Our Reach Section */}
            <section className="border-t border-gray-800 pt-12 sm:pt-16">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-normal font-serif tracking-[0.02em] mb-8 sm:mb-12 text-white text-center scroll-animate fade-up section-heading">
                Our Reach
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 max-w-5xl mx-auto">
                {[
                  { name: "Guntur", id: "guntur", delay: "delay-1" },
                  { name: "Hyderabad", id: "hyderabad", delay: "delay-2" },
                  { name: "Siddipet", id: "siddipet", delay: "delay-3" },
                  { name: "Suryapet", id: "suryapet", delay: "delay-4" },
                  { name: "Nirmal", id: "nirmal", delay: "delay-5" },
                  { name: "Ireland", id: "ireland", delay: "delay-6" }
                ].map((location) => (
                  <Link
                    key={location.id}
                    href={`/#${location.id}`}
                    className={`bg-gray-900/50 border border-gray-800 p-4 sm:p-6 rounded-lg text-center hover:border-white/50 transition-colors cursor-pointer group scroll-animate fade-up ${location.delay}`}
                  >
                    <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-white mx-auto mb-2 sm:mb-3 transition-transform group-hover:scale-110" />
                    <p className="text-white font-medium text-sm sm:text-base group-hover:text-gray-200 transition-colors">{location.name}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* Contact CTA Section */}
            <section className="border-t border-gray-800 pt-12 sm:pt-16 scroll-animate fade-up">
              <div className="bg-gray-900/50 border border-gray-800 p-8 sm:p-12 md:p-16 rounded-lg text-center">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-normal font-serif tracking-[0.02em] mb-4 sm:mb-6 text-white section-heading">
                  Let's Build Something Extraordinary Together
                </h2>
                <p className="text-gray-400 text-base sm:text-lg mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
                  Ready to transform your space? Get in touch with us to discuss your project and discover how we can bring your vision to life.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={handleEmailClick}
                    variant="outline"
                    className="rounded-none border-white text-white hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2 h-12 px-6 sm:px-8"
                  >
                    <Mail className="w-5 h-5" />
                    <span className="text-sm font-bold tracking-wide">Send Email</span>
                  </Button>

                  <Button
                    onClick={handleWhatsAppClick}
                    className="rounded-none bg-[#25D366] hover:bg-[#20BA5A] text-white transition-colors flex items-center justify-center gap-2 h-12 px-6 sm:px-8"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm font-bold tracking-wide">WhatsApp Us</span>
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

