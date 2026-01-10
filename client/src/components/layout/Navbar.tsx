import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Search, Menu, X } from "lucide-react";
import { searchWebsite, type SearchResult } from "@/lib/search-data";
import { getLocationData } from "@/lib/locations-data";
import { getClientImages } from "@/lib/clients-data";

const locations = [
  { name: "Guntur", id: "guntur" },
  { name: "Hyderabad", id: "hyderabad" },
  { name: "Siddipet", id: "siddipet" },
  { name: "Suryapet", id: "suryapet" },
  { name: "Nirmal", id: "nirmal" },
  { name: "Ireland", id: "ireland" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isProjectsHovered, setIsProjectsHovered] = useState(false);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const [location] = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const projectsDropdownRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    setIsProjectsHovered(false);
    if (location === "/") {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  // Get project images for a location (first 3 images)
  const getLocationProjectImages = (locationId: string): string[] => {
    const locationData = getLocationData(locationId);
    if (locationData.clients.length > 0) {
      const clientId = locationData.clients[0].id;
      const images = getClientImages(clientId);
      return images.slice(0, 3).map(img => img.url); // Return first 3 image URLs
    }
    return [];
  };

  const handleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim()) {
      const results = searchWebsite(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchResultClick = (link: string) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
    window.location.href = link;
  };

  // Close search on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
        setSearchQuery("");
        setSearchResults([]);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isSearchOpen]);

  // Handle scroll to change navbar background
  // Navbar should be transparent on home page initially, then black after scroll
  useEffect(() => {
    const isHomePage = location === "/";
    
    // Initialize: transparent on home page, black on other pages
    const checkInitialScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      if (isHomePage) {
        // On home page: transparent at top, black after scroll
        setIsScrolled(scrollY > 50);
      } else {
        // On other pages: always black
        setIsScrolled(true);
      }
    };

    const handleScroll = () => {
      if (!isHomePage) {
        setIsScrolled(true);
        return;
      }
      
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollY > 50);
    };

    // Check initial state after a small delay to ensure DOM is ready
    const timeoutId = setTimeout(checkInitialScroll, 50);

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);

  return (
    <>
      <header 
        ref={headerRef}
        id="main-navbar"
        className="w-full sticky top-0 z-50 border-b transition-all duration-300 ease-in-out"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          backgroundColor: isHovered || isScrolled ? "rgb(0, 0, 0)" : (location === "/" ? "transparent" : "rgb(0, 0, 0)"),
          borderBottomColor: isHovered || isScrolled ? "rgb(31, 41, 55)" : (location === "/" ? "transparent" : "rgb(31, 41, 55)"),
          transition: "background-color 0.3s ease-in-out, border-color 0.3s ease-in-out"
        }}
      >
        <div className="container mx-auto px-3 sm:px-4 pt-1.5 sm:pt-2 pb-0 sm:pb-0 md:py-4 flex justify-between items-center min-h-[65px] sm:min-h-[75px] md:h-16">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            
            {/* ========== MOBILE LOGO ========== */}
            <Link 
              href="/" 
              onClick={(e) => {
                if (location === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  sessionStorage.removeItem("homeScrollPosition");
                } else {
                  sessionStorage.setItem("scrollToTop", "true");
                }
              }}
              className="flex items-center group md:hidden"
            >
              <img 
                src="https://res.cloudinary.com/da9ppibpk/image/upload/v1768016099/logo_rwoit1.png" 
                alt="VAJRAM ARCHITECTS" 
                className="h-[84px] sm:h-[100px] w-auto object-contain transition-opacity duration-300 group-hover:opacity-80"
              />
            </Link>

            {/* ========== DESKTOP LOGO ========== */}
            <Link 
              href="/" 
              onClick={(e) => {
                if (location === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  sessionStorage.removeItem("homeScrollPosition");
                } else {
                  sessionStorage.setItem("scrollToTop", "true");
                }
              }}
              className="hidden md:flex items-center group"
            >
              <img 
                src="https://res.cloudinary.com/da9ppibpk/image/upload/v1768016099/logo_rwoit1.png" 
                alt="VAJRAM ARCHITECTS" 
                className="h-20 lg:h-24 xl:h-28 w-auto object-contain transition-opacity duration-300 group-hover:opacity-80 md:mt-2 lg:mt-2.5 xl:mt-3"
              />
            </Link>

            {/* ========== DESKTOP NAVIGATION ========== */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              <div
                className="relative"
                onMouseEnter={() => {
                  setIsProjectsHovered(true);
                  if (locations.length > 0 && !hoveredLocation) {
                    setHoveredLocation(locations[0].id);
                  }
                }}
                onMouseLeave={() => {
                  setTimeout(() => {
                    if (
                      !projectsDropdownRef.current?.matches(':hover') &&
                      !document.querySelector('[data-projects-button]')?.matches(':hover')
                    ) {
                      setIsProjectsHovered(false);
                    }
                  }, 200);
                }}
              >
                <button
                  data-projects-button
                  onClick={() => scrollToSection(locations[0]?.id || "hero")}
                  className="text-white hover:text-gray-300 transition-colors text-sm lg:text-base font-medium uppercase tracking-wide cursor-pointer"
                >
                  Projects
                </button>
                
                {/* Projects Dropdown */}
                {isProjectsHovered && (
                  <div
                    ref={projectsDropdownRef}
                    className="fixed left-0 bg-black border-t border-gray-800 z-50"
                    style={{ 
                      width: "100vw", 
                      height: "60vh",
                      top: "64px", // Height of navbar (h-16 = 64px)
                      marginLeft: 0,
                      marginRight: 0
                    }}
                    onMouseEnter={() => {
                      setIsProjectsHovered(true);
                    }}
                    onMouseLeave={() => {
                      setTimeout(() => {
                        if (
                          !projectsDropdownRef.current?.matches(':hover') &&
                          !document.querySelector('[data-projects-button]')?.matches(':hover')
                        ) {
                          setIsProjectsHovered(false);
                        }
                      }, 200);
                    }}
                  >
                    <div className="flex h-full w-full">
                      {/* Left Side - Locations List */}
                      <div className="w-64 bg-gray-900 border-r border-gray-800 p-6 overflow-y-auto locations-scrollbar">
                        <h3 className="text-white text-xs uppercase tracking-widest mb-6 font-sans">
                          Locations
                        </h3>
                        <ul className="space-y-1">
                          {locations.map((loc) => (
                            <li key={loc.id}>
                              <button
                                onClick={() => scrollToSection(loc.id)}
                                onMouseEnter={() => setHoveredLocation(loc.id)}
                                className={`w-full text-left text-white hover:text-gray-300 text-base font-medium py-3 px-2 transition-colors hover:bg-gray-800 rounded-md cursor-pointer ${
                                  hoveredLocation === loc.id ? "bg-gray-800" : ""
                                }`}
                              >
                                {loc.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right Side - Project Images */}
                      <div className="flex-1 p-6 overflow-y-auto">
                        {hoveredLocation && (
                          <div>
                            <h3 className="text-white text-xs uppercase tracking-widest mb-6 font-sans">
                              {locations.find(l => l.id === hoveredLocation)?.name || ""} Projects
                            </h3>
                            <div className="grid grid-cols-3 gap-4">
                              {getLocationProjectImages(hoveredLocation).map((image, index) => {
                                const locationData = getLocationData(hoveredLocation);
                                const clientId = locationData.clients[0]?.id || "";
                                return (
                                  <Link
                                    key={index}
                                    href={`/client/${clientId}`}
                                    onClick={() => {
                                      if (typeof window !== "undefined") {
                                        sessionStorage.setItem("homeScrollPosition", window.scrollY.toString());
                                      }
                                      setIsProjectsHovered(false);
                                    }}
                                    className="group relative aspect-[4/3] overflow-hidden bg-gray-800 hover:opacity-90 transition-opacity cursor-pointer"
                                    style={{ borderRadius: '0.75rem' }}
                                  >
                                    <img
                                      src={image}
                                      alt={`${locations.find(l => l.id === hoveredLocation)?.name} Project ${index + 1}`}
                                      className="w-full h-full object-cover"
                                      style={{ borderRadius: '0.75rem' }}
                                    />
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <Link
                href="/work-with-us"
                className="text-white hover:text-gray-300 transition-colors text-sm lg:text-base font-medium uppercase tracking-wide cursor-pointer"
              >
                Work With Us
              </Link>
              <Link
                href="/about"
                className="text-white hover:text-gray-300 transition-colors text-sm lg:text-base font-medium uppercase tracking-wide cursor-pointer"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-white hover:text-gray-300 transition-colors text-sm lg:text-base font-medium uppercase tracking-wide cursor-pointer"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* ========== SHARED RIGHT ACTIONS (Search & WhatsApp) ========== */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
            <button 
              onClick={handleSearch}
              className="text-white hover:text-gray-300 transition-colors p-2 sm:p-2.5 md:p-1.5 cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-6 h-6 sm:w-7 sm:h-7 md:w-6 md:h-6 stroke-[1.5]" />
            </button>
            <a
              href="https://wa.me/917286973788"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors p-2 sm:p-2.5 md:p-1.5 cursor-pointer"
              aria-label="WhatsApp"
            >
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-6 md:h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </a>
            
            {/* ========== MOBILE MENU BUTTON ========== */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white hover:text-gray-300 transition-colors p-2 sm:p-2.5"
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.5]" />
              ) : (
                <Menu className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.5]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ========== MOBILE NAVIGATION MENU ========== */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-95 z-40 md:hidden"
          style={{ top: '65px' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsMenuOpen(false);
            }
          }}
        >
          <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 h-full overflow-y-auto">
            <nav className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
              <div>
                <button
                  onClick={() => {
                    scrollToSection("hero");
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-white hover:text-gray-300 text-xl sm:text-2xl md:text-3xl font-bold font-serif py-2 sm:py-3 transition-colors border-b border-gray-800 hover:border-gray-700"
                >
                  Home
                </button>
              </div>
              
              <div>
                <button
                  onClick={() => {
                    scrollToSection(locations[0]?.id || "hero");
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-white hover:text-gray-300 text-xl sm:text-2xl md:text-3xl font-bold font-serif py-2 sm:py-3 transition-colors border-b border-gray-800 hover:border-gray-700"
                >
                  Projects
                </button>
              </div>

              <div>
                <Link
                  href="/work-with-us"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-left text-white hover:text-gray-300 text-xl sm:text-2xl md:text-3xl font-bold font-serif py-2 sm:py-3 transition-colors border-b border-gray-800 hover:border-gray-700"
                >
                  Work With Us
                </Link>
              </div>

              <div>
                <Link
                  href="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-left text-white hover:text-gray-300 text-xl sm:text-2xl md:text-3xl font-bold font-serif py-2 sm:py-3 transition-colors border-b border-gray-800 hover:border-gray-700"
                >
                  About
                </Link>
              </div>

              <div>
                <Link
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-left text-white hover:text-gray-300 text-xl sm:text-2xl md:text-3xl font-bold font-serif py-2 sm:py-3 transition-colors border-b border-gray-800 hover:border-gray-700"
                >
                  Contact
                </Link>
              </div>
              
              <div className="border-t border-gray-800 pt-4 sm:pt-6">
                <h3 className="text-gray-400 text-xs sm:text-sm uppercase tracking-widest mb-4 sm:mb-6 font-sans">Locations</h3>
                <ul className="space-y-1">
                  {locations.map((loc) => (
                    <li key={loc.id}>
                      <button
                        onClick={() => {
                          scrollToSection(loc.id);
                          setIsMenuOpen(false);
                        }}
                        className="w-full text-left text-white hover:text-gray-300 text-base sm:text-lg md:text-xl font-medium py-2 sm:py-3 px-2 transition-colors hover:bg-gray-900 rounded-md"
                      >
                        {loc.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* ========== SEARCH OVERLAY (Shared) ========== */}
      {isSearchOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-95 z-40 top-16"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsSearchOpen(false);
              setSearchQuery("");
              setSearchResults([]);
            }
          }}
        >
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search locations, clients, projects..."
                  className="w-full bg-gray-900 border border-gray-700 text-white px-12 py-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 text-lg"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSearchResults([]);
                      searchInputRef.current?.focus();
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Search Results */}
              {searchQuery && (
                <div className="mt-4 bg-gray-900 border border-gray-700 rounded-md max-h-[400px] overflow-y-auto">
                  {searchResults.length > 0 ? (
                    <ul className="divide-y divide-gray-800">
                      {searchResults.map((result) => (
                        <li key={result.id}>
                          <button
                            onClick={() => handleSearchResultClick(result.link)}
                            className="w-full text-left px-4 py-3 hover:bg-gray-800 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-white font-medium">{result.title}</p>
                                <p className="text-gray-400 text-sm mt-1">
                                  {result.type === "location" ? "Location" : "Client Project"}
                                </p>
                              </div>
                              <Search className="w-4 h-4 text-gray-500" />
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-4 py-8 text-center">
                      <p className="text-gray-400">No results found for "{searchQuery}"</p>
                      <p className="text-gray-500 text-sm mt-2">Try searching for locations or client names</p>
                    </div>
                  )}
                </div>
              )}

              {!searchQuery && (
                <div className="mt-8 text-center">
                  <p className="text-gray-400">Search for locations, clients, or projects</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
