import { useEffect } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  ShieldCheck,
  Mail,
  Phone,
  Database,
  Image,
  Lock,
  Share2,
} from "lucide-react";

export default function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
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

          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal font-serif tracking-[0.02em] mb-4 sm:mb-6 text-white">
              Privacy Policy
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Your trust is central to how we work. This policy explains how
              VAJRAM ARCHITECTS collects, uses, and protects your information.
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mt-4">
              Last updated: January 22, 2026
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {[
              {
                icon: ShieldCheck,
                title: "Respectful Use",
                text:
                  "We collect only the information needed to understand your project and serve you well.",
              },
              {
                icon: Lock,
                title: "Secure Handling",
                text:
                  "We protect your data with access controls and only share it with trusted partners.",
              },
              {
                icon: Share2,
                title: "No Unwanted Sharing",
                text:
                  "We never sell your personal data and share only when required for project delivery.",
              },
              {
                icon: Image,
                title: "Project Media",
                text:
                  "Photos and renders are used for portfolio purposes only with appropriate consent.",
              },
              {
                icon: Database,
                title: "Limited Retention",
                text:
                  "We keep project records for reference and support, then archive them securely.",
              },
              {
                icon: Mail,
                title: "Direct Contact",
                text:
                  "If you have questions about privacy, we respond quickly and transparently.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-black/70 border border-gray-800 p-6 sm:p-8 rounded-lg"
              >
                <div className="w-12 h-12 bg-black border border-gray-700 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-normal font-serif tracking-[0.02em] mb-3 text-white">
                  {item.title}
                </h2>
                <p className="text-gray-400 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="space-y-12 sm:space-y-16">
            <section className="border-t border-gray-800 pt-10 sm:pt-12">
              <h2 className="text-2xl sm:text-3xl font-normal font-serif tracking-[0.02em] mb-4 text-white">
                Information We Collect
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                We collect information you choose to share with us so we can
                understand your requirements and craft a tailored design
                solution.
              </p>
              <div className="space-y-4">
                {[
                  "Contact details such as name, phone number, email, and location.",
                  "Project information including site address, measurements, budgets, and timelines.",
                  "Design references, inspiration images, or files you provide.",
                  "Communication records from email, WhatsApp, or consultation meetings.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                    <p className="text-gray-300 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="border-t border-gray-800 pt-10 sm:pt-12">
              <h2 className="text-2xl sm:text-3xl font-normal font-serif tracking-[0.02em] mb-4 text-white">
                How We Use Your Information
              </h2>
              <div className="space-y-4">
                {[
                  "To respond to inquiries and schedule consultations.",
                  "To prepare concepts, proposals, and design presentations.",
                  "To coordinate vendors, contractors, and site visits when requested.",
                  "To improve our services and maintain project history for support.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                    <p className="text-gray-300 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="border-t border-gray-800 pt-10 sm:pt-12">
              <h2 className="text-2xl sm:text-3xl font-normal font-serif tracking-[0.02em] mb-4 text-white">
                Sharing and Disclosure
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                We may share limited information with vendors or consultants
                directly involved in your project. We do not sell or rent your
                data to third parties.
              </p>
              <div className="space-y-4">
                {[
                  "Vendors receive only the information needed to deliver their scope of work.",
                  "Project photos are shared publicly only with appropriate consent.",
                  "Legal or regulatory requests are handled with care and transparency.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                    <p className="text-gray-300 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="border-t border-gray-800 pt-10 sm:pt-12">
              <h2 className="text-2xl sm:text-3xl font-normal font-serif tracking-[0.02em] mb-4 text-white">
                Data Security
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                We take reasonable steps to protect your information, including
                limiting access and using secure storage practices.
              </p>
              <div className="space-y-4">
                {[
                  "Access to sensitive data is restricted to authorized team members.",
                  "Project files are stored securely and backed up for continuity.",
                  "We regularly review our processes to maintain data integrity.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                    <p className="text-gray-300 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="border-t border-gray-800 pt-10 sm:pt-12">
              <h2 className="text-2xl sm:text-3xl font-normal font-serif tracking-[0.02em] mb-4 text-white">
                Contact
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                If you want to access, update, or remove your information, reach
                out to us directly.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div className="bg-black/70 border border-gray-800 p-6 sm:p-8 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Mail className="w-5 h-5 text-white" />
                    <h3 className="text-lg font-normal font-serif tracking-[0.02em] text-white">
                      Email
                    </h3>
                  </div>
                  <a
                    href="mailto:info@vajramarchitects.com"
                    className="text-gray-300 hover:text-white transition-colors break-all"
                  >
                    info@vajramarchitects.com
                  </a>
                </div>
                <div className="bg-black/70 border border-gray-800 p-6 sm:p-8 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Phone className="w-5 h-5 text-white" />
                    <h3 className="text-lg font-normal font-serif tracking-[0.02em] text-white">
                      WhatsApp
                    </h3>
                  </div>
                  <a
                    href="https://wa.me/917286973788"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
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
