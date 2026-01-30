import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MessageCircle, Mail } from "lucide-react";

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

export default function Contact() {
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

      <main ref={containerRef} className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="max-w-3xl mx-auto">
          {/* Back to Home Link */}
          <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8 sm:mb-12">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>

          {/* Main Contact Section */}
          <div className="text-center">
            {/* Heading */}
            <div className="scroll-animate fade-up">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal font-serif tracking-[0.02em] mb-4 sm:mb-6 text-white section-heading">
                Contact Us
              </h1>
            </div>

            {/* Simple Description */}
            <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-12 md:mb-16 max-w-2xl mx-auto leading-relaxed scroll-animate fade-up delay-1">
              Interested in our projects? Get in touch with us easily through WhatsApp or Email.
            </p>

            {/* Contact Buttons - Large and Easy to Click */}
            <div className="space-y-4 sm:space-y-6 max-w-xl mx-auto">
              {/* WhatsApp Button */}
              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold py-4 sm:py-5 md:py-6 px-6 sm:px-8 rounded-lg text-lg sm:text-xl md:text-2xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 sm:gap-4 scroll-animate fade-left delay-1"
              >
                <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" strokeWidth={2.5} />
                <span>Chat on WhatsApp</span>
              </button>

              {/* Email Button */}
              <button
                onClick={handleEmailClick}
                className="w-full bg-white hover:bg-gray-100 text-black font-bold py-4 sm:py-5 md:py-6 px-6 sm:px-8 rounded-lg text-lg sm:text-xl md:text-2xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 sm:gap-4 border-2 border-white scroll-animate fade-right delay-1"
              >
                <Mail className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" strokeWidth={2.5} />
                <span>Send Email</span>
              </button>
            </div>

            {/* Contact Information Display */}
            <div className="mt-12 sm:mt-16 md:mt-20 pt-12 sm:pt-16 border-t border-gray-800 scroll-animate fade-up">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-2xl mx-auto">
                {/* WhatsApp Info */}
                <div className="bg-gray-900/50 border border-gray-800 hover:border-white/50 p-6 sm:p-8 rounded-lg transition-all duration-300 scroll-animate fade-left delay-1">
                  <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-[#25D366]" />
                    <h3 className="text-lg sm:text-xl font-normal font-serif tracking-[0.02em] text-white">WhatsApp</h3>
                  </div>
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors text-base sm:text-lg block"
                  >
                    +91 88869 19444
                  </a>
                </div>

                {/* Email Info */}
                <div className="bg-gray-900/50 border border-gray-800 hover:border-white/50 p-6 sm:p-8 rounded-lg transition-all duration-300 scroll-animate fade-right delay-2">
                  <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <Mail className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    <h3 className="text-lg sm:text-xl font-normal font-serif tracking-[0.02em] text-white">Email</h3>
                  </div>
                  <a
                    href={`mailto:${emailAddress}`}
                    className="text-gray-300 hover:text-white transition-colors text-base sm:text-lg break-all"
                  >
                    {emailAddress}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
