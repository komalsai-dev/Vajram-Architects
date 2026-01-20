import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/Hero";
import { ArticleGrid } from "@/components/ArticleGrid";
import { ProjectsMap } from "@/components/ProjectsMap";
import { getLocationData } from "@/lib/locations-data";
import { apiUrl } from "@/lib/api";
import type { Location, Project } from "@/lib/types";

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
    { id: "hero-1", image: "https://res.cloudinary.com/da9ppibpk/image/upload/v1768014769/Mr_Rohith_Elevation_1_-_Photo_kb1ute.jpg", title: "Mr. Rohith Elevation" },
    { id: "hero-2", image: "https://res.cloudinary.com/da9ppibpk/image/upload/v1768014941/Mr.Zahir_Elevation_OP4_12_-_Photo_hxmlnn.jpg", title: "Mr. Zahir Elevation" },
    { id: "hero-3", image: "https://res.cloudinary.com/da9ppibpk/image/upload/v1768014988/Mr.Girish_Reddy_Elevation_Renders_11_-_Photo_zkr7iv.jpg", title: "Mr. Girish Reddy Elevation" },
    { id: "hero-4", image: "https://res.cloudinary.com/da9ppibpk/image/upload/v1768015019/Mr.G_Narender_Reddy_Landscape_Renders_42_-_Photo_ncdgbz.jpg", title: "Mr.G Narender Reddy Landscape" },
  ];

  const locationsQuery = useQuery<Location[]>({
    queryKey: [apiUrl("/api/locations")],
  });
  const projectsQuery = useQuery<Project[]>({
    queryKey: [apiUrl("/api/projects")],
  });

  const apiLocations = locationsQuery.data || [];
  const apiProjects = projectsQuery.data || [];

  const fallbackLocations = [
    getLocationData("Guntur"),
    getLocationData("Hyderabad"),
    getLocationData("Siddipet"),
    getLocationData("Suryapet"),
    getLocationData("Nirmal"),
    getLocationData("Ireland"),
  ].map((location) => ({
    id: location.name.toLowerCase(),
    name: location.name,
    stateOrCountry: location.stateOrCountry,
    clients: location.clients.slice(0, 1),
  }));

  const locationDataList = (() => {
    const locationMap = new Map<string, typeof fallbackLocations[number]>();
    fallbackLocations.forEach((location) => {
      locationMap.set(location.id, { ...location });
    });

    apiLocations.forEach((location) => {
      const existing = locationMap.get(location.id);
      if (existing) {
        existing.name = location.name || existing.name;
        existing.stateOrCountry =
          location.stateOrCountry || existing.stateOrCountry;
      } else {
        locationMap.set(location.id, {
          id: location.id,
          name: location.name,
          stateOrCountry: location.stateOrCountry || "",
          clients: [],
        });
      }
    });

    const apiClientsByLocation = new Map<string, typeof fallbackLocations[number]["clients"]>();
    apiProjects.forEach((project) => {
      const existing = apiClientsByLocation.get(project.locationId) || [];
      existing.push({
        id: project.id,
        image: project.coverImageUrl || project.images?.[0]?.url || "",
        title: project.name,
        link: `/client/${project.id}`,
      });
      apiClientsByLocation.set(project.locationId, existing);
    });

    return Array.from(locationMap.values()).map((location) => ({
      ...location,
      clients: [
        ...(location.clients || []),
        ...(apiClientsByLocation.get(location.id) || []),
      ],
    }));
  })();

  // Convert location clients to article format for ArticleGrid component
  const convertToArticles = (locationData: typeof fallbackLocations[number]) => {
    const categoryText = locationData.stateOrCountry 
      ? `${locationData.name} (${locationData.stateOrCountry})`
      : locationData.name;
    
    return locationData.clients.map((client) => ({
      id: client.id,
      image: client.image,
      category: categoryText,
      date: "", // No date needed for locations
      title: client.title,
      link: client.link,
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main>
        <section id="hero" className="m-0 p-0">
          <Hero slides={heroSlides} />
        </section>
        
            {locationDataList.map((locationData, index) => (
            <ArticleGrid 
                key={locationData.name}
                title={locationData.name}
                stateOrCountry={locationData.stateOrCountry}
                articles={convertToArticles(locationData)}
                isFirstSection={index === 0}
            />
            ))}

        <ProjectsMap />
      </main>
      
      <Footer />
    </div>
  );
}
