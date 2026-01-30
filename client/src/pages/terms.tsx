import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  FileText,
  Shield,
  Scale,
  CreditCard,
  Users,
  Image,
  Globe,
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

export default function Terms() {
  const containerRef = useScrollAnimation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        .scroll-animate.delay-5 { transition-delay: 0.5s; }
        .scroll-animate.delay-6 { transition-delay: 0.6s; }
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
        <div className="max-w-5xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8 sm:mb-12"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Home
          </Link>

          <div className="text-center mb-12 sm:mb-16 md:mb-20 scroll-animate fade-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal font-serif tracking-[0.02em] mb-4 sm:mb-6 text-white">
              Terms and Conditions
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              These terms outline how VAJRAM ARCHITECTS works with clients across
              residential, commercial, and interior projects. By engaging our
              services or using this website, you agree to these terms.
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mt-4">
              Last updated: January 22, 2026
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {[
              {
                icon: FileText,
                title: "Project Scope",
                text:
                  "Each engagement is defined by a written scope, timeline, and deliverables tailored to your space.",
                delay: "delay-1",
                direction: "fade-left"
              },
              {
                icon: CreditCard,
                title: "Payments",
                text:
                  "Fees, milestones, and payment schedules are shared before work begins and confirmed in writing.",
                delay: "delay-2",
                direction: "fade-up"
              },
              {
                icon: Image,
                title: "Design Rights",
                text:
                  "All drawings, renders, and concepts remain our intellectual property until full payment is complete.",
                delay: "delay-3",
                direction: "fade-right"
              },
              {
                icon: Users,
                title: "Client Role",
                text:
                  "Timely approvals, site access, and accurate inputs keep schedules aligned and outcomes precise.",
                delay: "delay-4",
                direction: "fade-left"
              },
              {
                icon: Shield,
                title: "Quality Standards",
                text:
                  "We collaborate with trusted vendors to maintain premium finishes and durable materials.",
                delay: "delay-5",
                direction: "fade-up"
              },
              {
                icon: Globe,
                title: "Professional Conduct",
                text:
                  "We operate with transparency, respect, and a commitment to long-term relationships.",
                delay: "delay-6",
                direction: "fade-right"
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`bg-gray-900/50 border border-gray-800 hover:border-white/50 p-6 sm:p-8 rounded-lg transition-all duration-300 scroll-animate ${item.direction} ${item.delay}`}
              >
                <div className="w-12 h-12 bg-black border border-gray-700 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-lg font-normal font-serif tracking-[0.02em] mb-3 text-white">
                  {item.title}
                </h2>
                <p className="text-gray-400 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="space-y-12 sm:space-y-16">
            <section className="border-t border-gray-800 pt-10 sm:pt-12 scroll-animate fade-up">
              <h2 className="text-xl sm:text-2xl font-normal font-serif tracking-[0.02em] mb-4 text-white section-heading">
                Services and Engagement
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                VAJRAM ARCHITECTS provides architectural design, interior design,
                landscape planning, 3D visualization, and project coordination.
                Any additional services are confirmed in writing before
                execution.
              </p>
              <div className="space-y-4">
                {[
                  "Scope, timelines, and deliverables are documented for every project.",
                  "Conceptual designs are provided before detailed drawings and material selections.",
                  "On-site supervision and vendor coordination depend on the agreed scope.",
                ].map((item, index) => (
                  <div key={item} className={`flex items-start gap-3 scroll-animate fade-left delay-${index + 1}`}>
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                    <p className="text-gray-300 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="border-t border-gray-800 pt-10 sm:pt-12 scroll-animate fade-up">
              <h2 className="text-xl sm:text-2xl font-normal font-serif tracking-[0.02em] mb-4 text-white section-heading">
                Client Responsibilities
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Successful outcomes rely on shared collaboration and timely
                decision-making.
              </p>
              <div className="space-y-4">
                {[
                  "Provide accurate site details, dimensions, and constraints.",
                  "Approve concepts, materials, and layouts within agreed timelines.",
                  "Ensure safe access to project sites during scheduled visits.",
                ].map((item, index) => (
                  <div key={item} className={`flex items-start gap-3 scroll-animate fade-left delay-${index + 1}`}>
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                    <p className="text-gray-300 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="border-t border-gray-800 pt-10 sm:pt-12 scroll-animate fade-up">
              <h2 className="text-xl sm:text-2xl font-normal font-serif tracking-[0.02em] mb-4 text-white section-heading">
                Payments and Changes
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                All commercial terms are shared at the proposal stage and may
                vary by project type, size, and scope.
              </p>
              <div className="space-y-4">
                {[
                  "Design work begins after advance payment as defined in the proposal.",
                  "Revisions beyond the agreed scope may be billed separately.",
                  "Delays in approvals or payments can impact project timelines.",
                ].map((item, index) => (
                  <div key={item} className={`flex items-start gap-3 scroll-animate fade-left delay-${index + 1}`}>
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                    <p className="text-gray-300 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="border-t border-gray-800 pt-10 sm:pt-12 scroll-animate fade-up">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="w-6 h-6 text-white" />
                <h2 className="text-xl sm:text-2xl font-normal font-serif tracking-[0.02em] text-white section-heading">
                  Intellectual Property and Portfolio Use
                </h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                All concepts, drawings, renders, and documents are the
                intellectual property of VAJRAM ARCHITECTS until the project is
                paid in full. We may showcase completed work in our portfolio
                and marketing with respect for client privacy.
              </p>
              <div className="space-y-4">
                {[
                  "Designs may not be reused or reproduced without written permission.",
                  "We may photograph completed projects for portfolio use.",
                  "We honor requests to omit sensitive details from public showcases.",
                ].map((item, index) => (
                  <div key={item} className={`flex items-start gap-3 scroll-animate fade-left delay-${index + 1}`}>
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                    <p className="text-gray-300 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="border-t border-gray-800 pt-10 sm:pt-12 scroll-animate fade-up">
              <h2 className="text-xl sm:text-2xl font-normal font-serif tracking-[0.02em] mb-4 text-white section-heading">
                Liability and Third Parties
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                We coordinate with third-party vendors, contractors, and
                suppliers to deliver high-quality results, but their services
                are subject to their own terms and warranties.
              </p>
              <div className="space-y-4">
                {[
                  "We are not responsible for delays caused by external vendors or site conditions.",
                  "We recommend approved partners but final vendor selection is the client's choice.",
                  "All workmanship warranties are provided by the executing vendor or contractor.",
                ].map((item, index) => (
                  <div key={item} className={`flex items-start gap-3 scroll-animate fade-left delay-${index + 1}`}>
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                    <p className="text-gray-300 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="border-t border-gray-800 pt-10 sm:pt-12 scroll-animate fade-up">
              <h2 className="text-xl sm:text-2xl font-normal font-serif tracking-[0.02em] mb-4 text-white section-heading">
                Contact
              </h2>
              <p className="text-gray-300 leading-relaxed">
                For questions about these terms, please reach out to us at{" "}
                <a
                  href="mailto:info@vajramarchitects.com"
                  className="text-white hover:text-gray-200 underline underline-offset-4"
                >
                  info@vajramarchitects.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
