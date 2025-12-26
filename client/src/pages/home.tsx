import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/Hero";
import { ArticleGrid } from "@/components/ArticleGrid";
import { ProjectsMap } from "@/components/ProjectsMap";
import { getLocationData } from "@/lib/locations-data";

// Import best client images for hero slides
import client3_img4 from "@assets/images/client-3/Mr,Rohith_Elevation_1 - Photo.jpg";
import client6_img1 from "@assets/images/client-6/Mr.Zahir Elevation OP4_12 - Photo.jpg";
import client7_img1 from "@assets/images/client-7/Mr.Girish Reddy_Elevation Renders_11 - Photo.jpg";
import client9_img12 from "@assets/images/client-9/Mr.G Narender Reddy Landscape Renders_42 - Photo.jpg";

export default function Home() {
  // Restore scroll position when returning from portfolio page
  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem("homeScrollPosition");
    const shouldScrollToTop = sessionStorage.getItem("scrollToTop");
    
    // If logo was clicked, scroll to top
    if (shouldScrollToTop === "true") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      sessionStorage.removeItem("scrollToTop");
      sessionStorage.removeItem("homeScrollPosition");
      return;
    }
    
    if (savedScrollPosition) {
      // Restore scroll position
      const scrollY = parseInt(savedScrollPosition, 10);
      window.scrollTo({ top: scrollY, behavior: "instant" });
      // Clear the saved position after restoring
      sessionStorage.removeItem("homeScrollPosition");
    } else {
      // Handle hash navigation only if no saved scroll position
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 500);
      }
    }
  }, []);

  // Hero slides - Best client images
  const heroSlides = [
    { id: "hero-1", image: client3_img4, title: "Mr. Rohith Elevation" },
    { id: "hero-2", image: client6_img1, title: "Mr. Zahir Elevation" },
    { id: "hero-3", image: client7_img1, title: "Mr. Girish Reddy Elevation" },
    { id: "hero-4", image: client9_img12, title: "Mr.G Narender Reddy Landscape" },
  ];

  // Location-based data
  const gunturData = getLocationData("Guntur");
  const hyderabadData = getLocationData("Hyderabad");
  const siddipetData = getLocationData("Siddipet");
  const suryapetData = getLocationData("Suryapet");
  const nirmalData = getLocationData("Nirmal");
  const irelandData = getLocationData("Ireland");

  // Convert location clients to article format for ArticleGrid component
  const convertToArticles = (locationData: typeof gunturData) => {
    return locationData.clients.map((client) => ({
      id: client.id,
      image: client.image,
      category: locationData.name,
      date: "", // No date needed for locations
      title: client.title,
      link: client.link,
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main>
        <section id="hero">
          <Hero slides={heroSlides} />
        </section>
        
            <ArticleGrid 
              title="Guntur" 
              articles={convertToArticles(gunturData)}
              isFirstSection={true}
            />

            <ArticleGrid 
              title="Hyderabad" 
              articles={convertToArticles(hyderabadData)}
            />

            <ArticleGrid 
              title="Siddipet" 
              articles={convertToArticles(siddipetData)}
            />

            <ArticleGrid 
              title="Suryapet" 
              articles={convertToArticles(suryapetData)}
            />

            <ArticleGrid 
              title="Nirmal" 
              articles={convertToArticles(nirmalData)}
            />

            <ArticleGrid 
              title="Ireland" 
              articles={convertToArticles(irelandData)}
            />

        <ProjectsMap />
      </main>
      
      <Footer />
    </div>
  );
}
