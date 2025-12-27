import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            // Reset animation when footer is out of view
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <footer ref={footerRef} className="bg-black text-white pt-10 sm:pt-12 md:pt-16 pb-6 sm:pb-8">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Top Section with Subscribe */}
        <div className="border border-gray-700 p-6 sm:p-8 md:p-12 text-center bg-black text-white mb-10 sm:mb-12 md:mb-16 max-w-4xl mx-auto">
          <h3 className={`text-xl sm:text-2xl md:text-3xl font-serif mb-3 sm:mb-4 text-white transition-all duration-[1200ms] ease-out ${
            isVisible 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 -translate-x-6 sm:-translate-x-8'
          }`}
          style={{ transitionDelay: '0.1s' }}>
            Subscribe
          </h3>
          <p className={`text-xs sm:text-sm text-gray-400 mb-6 sm:mb-8 font-sans px-2 transition-all duration-[1200ms] ease-out ${
            isVisible 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 -translate-x-6 sm:-translate-x-8'
          }`}
          style={{ transitionDelay: '0.2s' }}>
            Get our latest article and updates delivered straight to your inbox.
          </p>
          <div className="max-w-md mx-auto space-y-3 sm:space-y-4">
            <Input 
              type="email" 
              placeholder="EMAIL" 
              className={`rounded-none border-white bg-black text-white h-10 sm:h-12 text-xs placeholder:text-gray-500 font-sans tracking-wide transition-all duration-[1200ms] ease-out ${
                isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-6 sm:-translate-x-8'
              }`}
              style={{ transitionDelay: '0.3s' }}
            />
            <Button className={`w-full rounded-none bg-white hover:bg-gray-200 text-black h-10 sm:h-12 text-xs tracking-[0.1em] font-bold transition-all duration-[1200ms] ease-out ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-6 sm:-translate-x-8'
            }`}
            style={{ transitionDelay: '0.4s' }}>
              SUBSCRIBE
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-10 sm:mb-12 md:mb-16 border-t border-gray-800 pt-8 sm:pt-10 md:pt-12">
          {/* Brand Column */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
             <div className={`flex flex-col items-start mb-4 sm:mb-6 transition-all duration-[1200ms] ease-out ${
               isVisible 
                 ? 'opacity-100 translate-x-0' 
                 : 'opacity-0 -translate-x-6 sm:-translate-x-8'
             }`}
             style={{ transitionDelay: '0.1s' }}>
                <img 
                  src="/logo.png" 
                  alt="VAJRAM ARCHITECTS" 
                  className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto object-contain mb-3"
                />
                
            </div>
          </div>

          {/* Links Columns */}
          <div className="col-span-1 space-y-3 sm:space-y-4">
            <h4 className={`text-xs sm:text-sm uppercase tracking-widest text-gray-400 mb-3 sm:mb-4 border-b border-gray-800 pb-2 transition-all duration-[1200ms] ease-out ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-6 sm:-translate-x-8'
            }`}
            style={{ transitionDelay: '0.2s' }}>
              Sections
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-sans text-gray-300">
              <li className={`transition-all duration-[1200ms] ease-out ${
                isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-6 sm:-translate-x-8'
              }`}
              style={{ transitionDelay: '0.3s' }}>
                <Link href="/#guntur" className="hover:text-white underline decoration-transparent hover:decoration-white transition-all">
                  Guntur
                </Link>
              </li>
              <li className={`transition-all duration-[1200ms] ease-out ${
                isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-6 sm:-translate-x-8'
              }`}
              style={{ transitionDelay: '0.35s' }}>
                <Link href="/#hyderabad" className="hover:text-white underline decoration-transparent hover:decoration-white transition-all">
                  Hyderabad
                </Link>
              </li>
              <li className={`transition-all duration-[1200ms] ease-out ${
                isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-6 sm:-translate-x-8'
              }`}
              style={{ transitionDelay: '0.4s' }}>
                <Link href="/#siddipet" className="hover:text-white underline decoration-transparent hover:decoration-white transition-all">
                  Siddipet
                </Link>
              </li>
              <li className={`transition-all duration-[1200ms] ease-out ${
                isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-6 sm:-translate-x-8'
              }`}
              style={{ transitionDelay: '0.45s' }}>
                <Link href="/#suryapet" className="hover:text-white underline decoration-transparent hover:decoration-white transition-all">
                  Suryapet
                </Link>
              </li>
              <li className={`transition-all duration-[1200ms] ease-out ${
                isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-6 sm:-translate-x-8'
              }`}
              style={{ transitionDelay: '0.5s' }}>
                <Link href="/#nirmal" className="hover:text-white underline decoration-transparent hover:decoration-white transition-all">
                  Nirmal
                </Link>
              </li>
              <li className={`transition-all duration-[1200ms] ease-out ${
                isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-6 sm:-translate-x-8'
              }`}
              style={{ transitionDelay: '0.55s' }}>
                <Link href="/#ireland" className="hover:text-white underline decoration-transparent hover:decoration-white transition-all">
                  Ireland
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1 space-y-3 sm:space-y-4">
            <h4 className={`text-xs sm:text-sm uppercase tracking-widest text-gray-400 mb-3 sm:mb-4 border-b border-gray-700 pb-2 transition-all duration-[1200ms] ease-out ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-6 sm:-translate-x-8'
            }`}
            style={{ transitionDelay: '0.25s' }}>
              Company
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-sans text-gray-300">
              <li className={`transition-all duration-[1200ms] ease-out ${
                isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-6 sm:-translate-x-8'
              }`}
              style={{ transitionDelay: '0.3s' }}>
                <Link href="/contact" className="hover:text-white underline decoration-transparent hover:decoration-white transition-all">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1 space-y-3 sm:space-y-4">
            <h4 className={`text-xs sm:text-sm uppercase tracking-widest text-gray-400 mb-3 sm:mb-4 border-b border-gray-700 pb-2 transition-all duration-[1200ms] ease-out ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-6 sm:-translate-x-8'
            }`}
            style={{ transitionDelay: '0.3s' }}>
              Legal
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-sans text-gray-300">
              <li className={`transition-all duration-[1200ms] ease-out ${
                isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-6 sm:-translate-x-8'
              }`}
              style={{ transitionDelay: '0.35s' }}>
                <Link href="/terms" className="hover:text-white underline decoration-transparent hover:decoration-white transition-all">Terms and Conditions</Link>
              </li>
              <li className={`transition-all duration-[1200ms] ease-out ${
                isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-6 sm:-translate-x-8'
              }`}
              style={{ transitionDelay: '0.4s' }}>
                <Link href="/privacy" className="hover:text-white underline decoration-transparent hover:decoration-white transition-all">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 sm:pt-8 border-t border-gray-800 text-[10px] sm:text-xs text-gray-500 font-sans gap-4">
          <div className={`flex gap-3 sm:gap-4 transition-all duration-[1200ms] ease-out ${
            isVisible 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 -translate-x-6 sm:-translate-x-8'
          }`}
          style={{ transitionDelay: '0.4s' }}>
            <Facebook className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
            <Twitter className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
            <Linkedin className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
            <Instagram className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
          </div>
          
          <div className={`text-center md:text-right transition-all duration-[1200ms] ease-out ${
            isVisible 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 -translate-x-6 sm:-translate-x-8'
          }`}
          style={{ transitionDelay: '0.45s' }}>
            © All rights reserved. VAJRAM ARCHITECTS
          </div>
        </div>
      </div>
    </footer>
  );
}
