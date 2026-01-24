import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/Hero";
import { ArticleGrid } from "@/components/ArticleGrid";
import { ProjectsMap } from "@/components/ProjectsMap";
import { Button } from "@/components/ui/button";
import { getLocationData } from "@/lib/locations-data";
import { apiUrl } from "@/lib/api";
import type { Location, Project } from "@/lib/types";

export default function Home() {
  const [visibleLocationsCount, setVisibleLocationsCount] = useState(4);
  // Handle scroll position when navigating to Home
  useEffect(() => {
    // Always scroll to top first
    window.scrollTo({ top: 0, behavior: "instant" });

    const savedScrollPosition = sessionStorage.getItem("homeScrollPosition");

    if (savedScrollPosition) {
      // Only restore scroll position if returning from portfolio/client page
      const scrollY = parseInt(savedScrollPosition, 10);
      window.scrollTo({ top: scrollY, behavior: "instant" });
      sessionStorage.removeItem("homeScrollPosition");
    } else if (window.location.hash) {
      // Handle hash navigation
      const hash = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }

    // Clean up scroll flags
    sessionStorage.removeItem("scrollToTop");
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

  const orderQuery = useQuery<{ locations: string[], projects: Record<string, string[]> }>({
    queryKey: [apiUrl("/api/locations/order")],
  });

  const locationDataList = useMemo(() => {
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

    // Get order from API or default to fallback order
    const orderList = orderQuery.data?.locations || [];

    if (orderList.length > 0) {
      const orderMap = new Map(orderList.map((id, index) => [id, index]));
      const sorted = Array.from(locationMap.values()).sort((a, b) => {
        const indexA = orderMap.has(a.id) ? orderMap.get(a.id)! : 9999;
        const indexB = orderMap.has(b.id) ? orderMap.get(b.id)! : 9999;
        if (indexA === indexB) return 0;
        return indexA - indexB;
      });

      return sorted.map((location) => ({
        ...location,
        clients: [
          ...(location.clients || []),
          ...(apiClientsByLocation.get(location.id) || []),
        ],
      }));
    }

    // Default: use API order (if sorted) then fallback
    const orderedList: typeof fallbackLocations[number][] = [];
    const processedIds = new Set<string>();

    // First add locations from API in their order
    apiLocations.forEach((location) => {
      const data = locationMap.get(location.id);
      if (data) {
        orderedList.push(data);
        processedIds.add(location.id);
      }
    });

    // Then add any fallback locations that weren't in API
    fallbackLocations.forEach((location) => {
      if (!processedIds.has(location.id)) {
        orderedList.push(locationMap.get(location.id)!);
      }
    });

    return orderedList.map((location) => ({
      ...location,
      clients: [
        ...(location.clients || []),
        ...(apiClientsByLocation.get(location.id) || []),
      ],
    }));
  }, [apiLocations, apiProjects, orderQuery.data]);

  const visibleLocations = locationDataList.slice(0, visibleLocationsCount);
  const hasMoreLocations = visibleLocationsCount < locationDataList.length;
  const canShowLess = locationDataList.length > 4 && visibleLocationsCount > 4;

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

        {visibleLocations.map((locationData, index) => (
          <ArticleGrid
            key={locationData.name}
            title={locationData.name}
            stateOrCountry={locationData.stateOrCountry}
            articles={convertToArticles(locationData)}
            isFirstSection={index === 0}
          />
        ))}

        {(hasMoreLocations || canShowLess) && (
          <div className="container mx-auto px-3 sm:px-4 flex justify-center mt-8 sm:mt-10 md:mt-12">
            {hasMoreLocations ? (
              <Button
                onClick={() =>
                  setVisibleLocationsCount((count) =>
                    Math.min(count + 3, locationDataList.length)
                  )
                }
                variant="outline"
                className="rounded-none border-white text-white text-[9px] sm:text-[10px] font-bold tracking-[0.2em] px-6 sm:px-8 h-9 sm:h-10 hover:bg-white hover:text-black transition-colors uppercase cursor-pointer"
              >
                View More Projects
              </Button>
            ) : (
              <Button
                onClick={() => setVisibleLocationsCount(4)}
                variant="outline"
                className="rounded-none border-white text-white text-[9px] sm:text-[10px] font-bold tracking-[0.2em] px-6 sm:px-8 h-9 sm:h-10 hover:bg-white hover:text-black transition-colors uppercase cursor-pointer"
              >
                Show Less
              </Button>
            )}
          </div>
        )}

        <ProjectsMap />
      </main>

      <Footer />
    </div>
  );
}
