import { useState, useEffect, useRef } from "react";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Link, useLocation } from "wouter";

import { useQuery } from "@tanstack/react-query";
import { getAllLocations } from "@/lib/locations-data";
import { apiUrl } from "@/lib/api";
import type { Location } from "@/lib/types";

export function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const [location] = useLocation();

  const locationsQuery = useQuery<Location[]>({
    queryKey: [apiUrl("/api/locations")],
  });

  // Hardcoded to Guntur as it is the first project section
  const projectHref = "/#guntur";

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
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

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      const targetId = href.split("#")[1];
      if (location === "/") {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          // Fallback: try scrolling to a slightly different ID or log warning if needed
          // But for now, just updating the URL hash manually if element not found immediately isn't ideal without refresh
          window.history.pushState(null, "", href);
        }
      }
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: projectHref },
    { name: "About", href: "/about" },
    { name: "Work With Us", href: "/work-with-us" },
    { name: "Contact", href: "/contact" },
    { name: "Terms", href: "/terms" },
    { name: "Privacy", href: "/privacy" },
  ];

  return (
    <footer
      ref={footerRef}
      className="bg-[#e5e5e5] text-[#1c1c1c] py-10 sm:py-14 border-t border-gray-200 rounded-t-[3rem]"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-6">

          {/* Logo - Centered Top */}
          <div className={`flex-shrink-0 transition-all duration-700 ease-out delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Link href="/">
              <img
                src="/android-chrome-512x512.png"
                alt="Vajram Architects"
                className="h-20 w-20 object-contain opacity-90 hover:opacity-100 transition-opacity hover:scale-105 transform duration-300"
              />
            </Link>
          </div>

          {/* 1. Navigation Links */}
          <nav className={`flex flex-wrap justify-center gap-x-8 gap-y-3 transition-all duration-700 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="text-sm sm:text-base font-medium text-gray-600 hover:text-black transition-colors relative group cursor-pointer"
              >
                {link.name}
                <span className="absolute inset-x-0 bottom-0 h-px bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
              </Link>
            ))}
          </nav>

          {/* 2. Social Icons */}
          <div className={`flex items-center gap-8 text-gray-400 transition-all duration-700 ease-out delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors hover:scale-125 transform duration-300">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors hover:scale-125 transform duration-300">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors hover:scale-125 transform duration-300">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors hover:scale-125 transform duration-300">
              <Instagram className="w-5 h-5" />
            </a>
          </div>

          <div className={`text-center pt-2 border-t border-gray-100 w-full max-w-xs sm:max-w-md md:max-w-2xl transition-all duration-700 ease-out delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-xs text-gray-400 font-sans tracking-widest uppercase mb-2">
              © 2025 Vajram Architects
            </p>
            <p className="text-[11px] text-gray-500 font-sans tracking-wide font-medium">
              Developed By <a href="https://scalvion.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-800 transition-colors duration-300 cursor-pointer">Scalvion Digital Solutions</a>
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}