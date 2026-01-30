import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, Briefcase, Users, Lightbulb, Award } from "lucide-react";

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

export default function WorkWithUs() {
  const containerRef = useScrollAnimation();

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const whatsappNumber = "918886919444";
  const emailAddress = "info@vajramarchitects.com"; // Update with actual email

  const handleWhatsAppClick = () => {
    const text = "Hello, I'm interested in joining as an intern. I would like to share my portfolio and discuss opportunities.";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const handleEmailClick = () => {
    const subject = "Internship Application - Portfolio Submission";
    const body = "Dear VAJRAM ARCHITECTS Team,\n\nI am interested in joining your team as an intern. Please find my portfolio attached.\n\nThank you for considering my application.\n\nBest regards,";
    const url = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* CSS for animations */}
      <style>{`
        .scroll-animate.fade-up {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        .scroll-animate.fade-up.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .scroll-animate.fade-left {
          opacity: 0;
          transform: translateX(-50px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        .scroll-animate.fade-left.is-visible {
          opacity: 1;
          transform: translateX(0);
        }
        .scroll-animate.fade-right {
          opacity: 0;
          transform: translateX(50px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        .scroll-animate.fade-right.is-visible {
          opacity: 1;
          transform: translateX(0);
        }
        .scroll-animate.delay-1 { transition-delay: 0.1s; }
        .scroll-animate.delay-2 { transition-delay: 0.2s; }
        .scroll-animate.delay-3 { transition-delay: 0.3s; }
        .scroll-animate.delay-4 { transition-delay: 0.4s; }
        .section-heading {
          position: relative;
          display: block;
          width: fit-content;
        }
        .section-heading::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
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
        <div className="max-w-4xl mx-auto">
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
              Work With Us
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Join our team of passionate architects and designers. We're looking for talented students and interns who want to grow with us.
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-12 sm:space-y-16 md:space-y-20">
            {/* Why Join Us Section */}
            <section className="scroll-animate fade-up">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-normal font-serif tracking-[0.02em] mb-6 sm:mb-8 text-white border-b border-gray-800 pb-4 section-heading">
                Why Join VAJRAM ARCHITECTS?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div className="flex items-start gap-4 scroll-animate fade-left delay-1">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-normal font-serif tracking-[0.02em] mb-2 text-white">Real-World Experience</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Work on actual projects and gain hands-on experience in modern architecture and interior design.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 scroll-animate fade-right delay-1">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-normal font-serif tracking-[0.02em] mb-2 text-white">Mentorship</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Learn from experienced professionals who are passionate about nurturing the next generation of architects.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 scroll-animate fade-left delay-2">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-normal font-serif tracking-[0.02em] mb-2 text-white">Creative Freedom</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Bring your innovative ideas to life and contribute to projects that define luxury living spaces.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 scroll-animate fade-right delay-2">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-normal font-serif tracking-[0.02em] mb-2 text-white">Portfolio Building</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Build an impressive portfolio with diverse projects across multiple locations and design styles.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* What We're Looking For */}
            <section className="scroll-animate fade-up">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-normal font-serif tracking-[0.02em] mb-6 sm:mb-8 text-white border-b border-gray-800 pb-4 section-heading">
                What We're Looking For
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3 scroll-animate fade-left delay-1">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                    <strong className="text-white">Architecture Students</strong> - Currently pursuing or recently graduated in Architecture, Interior Design, or related fields.
                  </p>
                </div>
                <div className="flex items-start gap-3 scroll-animate fade-left delay-2">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                    <strong className="text-white">Passion for Design</strong> - A genuine interest in modern architecture, bespoke interiors, and luxury living spaces.
                  </p>
                </div>
                <div className="flex items-start gap-3 scroll-animate fade-left delay-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                    <strong className="text-white">Willingness to Learn</strong> - Eager to learn, adapt, and grow in a professional environment.
                  </p>
                </div>
                <div className="flex items-start gap-3 scroll-animate fade-left delay-4">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                    <strong className="text-white">Portfolio Ready</strong> - Have work samples, projects, or designs to showcase your skills and creativity.
                  </p>
                </div>
              </div>
            </section>

            {/* How to Apply */}
            <section className="scroll-animate fade-up">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-normal font-serif tracking-[0.02em] mb-6 sm:mb-8 text-white border-b border-gray-800 pb-4 section-heading">
                How to Apply
              </h2>
              <div className="bg-gray-900/50 border border-gray-800 p-6 sm:p-8 md:p-10 rounded-lg space-y-6">
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  Interested in joining our team? We'd love to see your work! Here's how you can get in touch:
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 scroll-animate fade-right delay-1">
                    <div className="flex-shrink-0 w-10 h-10 bg-black border border-gray-700 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-normal font-serif tracking-[0.02em] mb-2 text-white">Prepare Your Portfolio</h3>
                      <p className="text-gray-400 leading-relaxed">
                        Gather your best work - architectural designs, interior layouts, 3D renders, sketches, or any creative projects that showcase your skills.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 scroll-animate fade-right delay-2">
                    <div className="flex-shrink-0 w-10 h-10 bg-black border border-gray-700 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-normal font-serif tracking-[0.02em] mb-2 text-white">Reach Out to Us</h3>
                      <p className="text-gray-400 leading-relaxed mb-4">
                        Contact us via email or WhatsApp. Share your portfolio and let us know why you're interested in joining our team.
                      </p>

                      {/* Contact Buttons */}
                      <div className="flex flex-col sm:flex-row gap-4 mt-6">
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
                  </div>

                  <div className="flex items-start gap-4 scroll-animate fade-right delay-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-black border border-gray-700 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-normal font-serif tracking-[0.02em] mb-2 text-white">Wait for Our Response</h3>
                      <p className="text-gray-400 leading-relaxed">
                        We review all applications carefully. If your portfolio aligns with our vision, we'll get back to you to discuss the next steps.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="border-t border-gray-800 pt-8 sm:pt-12 scroll-animate fade-up">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-normal font-serif tracking-[0.02em] mb-6 sm:mb-8 text-white section-heading">
                Get in Touch
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div className="bg-gray-900/50 border border-gray-800 hover:border-white/50 p-6 sm:p-8 rounded-lg transition-all duration-300 scroll-animate fade-left delay-1">
                  <div className="flex items-center gap-4 mb-4">
                    <Mail className="w-6 h-6 text-white" />
                    <h3 className="text-lg font-normal font-serif tracking-[0.02em] text-white">Email</h3>
                  </div>
                  <a
                    href={`mailto:${emailAddress}`}
                    className="text-gray-400 hover:text-white transition-colors text-base sm:text-lg break-all"
                  >
                    {emailAddress}
                  </a>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 hover:border-white/50 p-6 sm:p-8 rounded-lg transition-all duration-300 scroll-animate fade-right delay-1">
                  <div className="flex items-center gap-4 mb-4">
                    <MessageCircle className="w-6 h-6 text-white" />
                    <h3 className="text-lg font-normal font-serif tracking-[0.02em] text-white">WhatsApp</h3>
                  </div>
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors text-base sm:text-lg"
                  >
                    +91 72869 73788
                  </a>
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

