import { useEffect, useMemo, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useQuery } from "@tanstack/react-query";
import { getAllLocations, getLocationData } from "@/lib/locations-data";
import { getLocationCoordinates } from "@/lib/locations-coordinates";
import { getClientIdsByLocation } from "@/lib/clients-data";
import { apiUrl } from "@/lib/api";
import type { Location, Project } from "@/lib/types";

// Fix for default marker icon in React/Vite - using CDN for reliability
const DefaultIcon = L.icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface ProjectsMapProps {
  className?: string;
}

export function ProjectsMap({ className = "" }: ProjectsMapProps) {
  const locationsQuery = useQuery<Location[]>({
    queryKey: [apiUrl("/api/locations")],
  });
  const projectsQuery = useQuery<Project[]>({
    queryKey: [apiUrl("/api/projects")],
  });

  const fallbackLocationKeys = getAllLocations();
  const fallbackLocations: Location[] = fallbackLocationKeys.map((locationKey) => {
    const locationData = getLocationData(
      locationKey.charAt(0).toUpperCase() + locationKey.slice(1)
    );
    return {
      id: locationKey,
      name: locationData.name,
      stateOrCountry: locationData.stateOrCountry,
    };
  });
  const locations = useMemo(() => {
    const apiLocations = locationsQuery.data || [];
    const merged = new Map<string, Location>();
    fallbackLocations.forEach((location) => {
      merged.set(location.id, { ...location });
    });
    apiLocations.forEach((location) => {
      const existing = merged.get(location.id);
      if (existing) {
        merged.set(location.id, {
          ...existing,
          name: location.name || existing.name,
          stateOrCountry:
            location.stateOrCountry || existing.stateOrCountry || "",
          latitude: location.latitude ?? existing.latitude,
          longitude: location.longitude ?? existing.longitude,
        });
      } else {
        merged.set(location.id, location);
      }
    });
    return Array.from(merged.values());
  }, [fallbackLocations, locationsQuery.data]);

  const fallbackProjects = useMemo(() => {
    return fallbackLocationKeys.flatMap((locationKey) => {
      const locationData = getLocationData(
        locationKey.charAt(0).toUpperCase() + locationKey.slice(1)
      );
      const firstClient = locationData.clients[0];
      if (!firstClient) {
        return [];
      }
      return [
        {
          id: firstClient.id,
          name: firstClient.title,
          locationId: locationKey,
        },
      ];
    });
  }, [fallbackLocationKeys]);

  const projects = useMemo(() => {
    const apiProjects = projectsQuery.data || [];
    return [...fallbackProjects, ...apiProjects];
  }, [fallbackProjects, projectsQuery.data]);

  const locationsWithCounts = useMemo(() => {
    return locations
      .map((location) => {
        const coords =
          location.latitude !== undefined && location.longitude !== undefined
            ? {
              name: location.name,
              lat: location.latitude,
              lng: location.longitude,
              clientCount: 0,
            }
            : getLocationCoordinates(location.id);
        if (!coords) {
          return null;
        }
        const clientCount = projects.length
          ? projects.filter((project) => project.locationId === location.id)
            .length
          : getClientIdsByLocation(location.id).length;
        return {
          ...coords,
          name: location.name,
          clientCount,
          key: location.id,
        };
      })
      .filter((loc) => loc !== null) as Array<{
        name: string;
        lat: number;
        lng: number;
        clientCount: number;
        key: string;
      }>;
  }, [locations, projects]);

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) {
      return;
    }

    try {
      // Initialize map once
      const map = L.map(mapRef.current, {
        center: [20.5937, 78.9629],
        zoom: 5,
        zoomControl: true,
        scrollWheelZoom: false,
        doubleClickZoom: true,
        boxZoom: true,
        keyboard: true,
        dragging: true,
        touchZoom: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "",
        maxZoom: 19,
      }).addTo(map);

      map.attributionControl.setPrefix("");
      map.attributionControl.remove();

      mapInstanceRef.current = map;
    } catch (error) {
      console.error("Error initializing map:", error);
    }

    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.off();
          mapInstanceRef.current.remove();
        } catch (error) {
          console.warn("Map cleanup error:", error);
        }
        mapInstanceRef.current = null;
      }
      markersRef.current = [];
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !mapRef.current || !mapRef.current.isConnected) {
      return;
    }
    if (!map._container || locationsWithCounts.length === 0) {
      return;
    }

    // Clear existing markers
    markersRef.current.forEach((marker) => {
      if (map.hasLayer(marker)) {
        map.removeLayer(marker);
      }
    });
    markersRef.current = [];

    const markers: L.Marker[] = [];
    locationsWithCounts.forEach((location) => {
      const marker = L.marker([location.lat, location.lng]).addTo(map);
      const popupContent = `
          <div style="padding: 8px; min-width: 150px;">
            <h3 style="margin: 0 0 8px 0; font-weight: normal; font-size: 16px; color: #000; font-family: 'Playfair Display', Georgia, 'Times New Roman', serif; letter-spacing: 0.02em;">
              ${location.name}
            </h3>
            <p style="margin: 0; color: #666; font-size: 14px;">
              ${location.clientCount} ${location.clientCount === 1 ? "Project" : "Projects"}
            </p>
          </div>
        `;
      marker.bindPopup(popupContent);
      markers.push(marker);
    });

    markersRef.current = markers;

    if (markers.length > 0) {
      const group = new L.FeatureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.1));
    }

    setTimeout(() => {
      if (mapInstanceRef.current && mapInstanceRef.current._container) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 100);
  }, [locationsWithCounts]);

  // Invalidate map size when it becomes visible (for animation)
  useEffect(() => {
    if (isVisible && mapInstanceRef.current) {
      // Delay to ensure animation has started
      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 300);
    }
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      id="projects-map"
      className={`container mx-auto px-3 sm:px-4 mb-12 sm:mb-16 md:mb-20 scroll-mt-20 ${className}`}
    >
      <h2
        className={`text-2xl sm:text-3xl md:text-4xl font-normal font-serif tracking-[0.02em] mb-6 sm:mb-8 text-white transition-all duration-[2000ms] ease-out ${isVisible
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 -translate-x-12'
          }`}
      >
        Our Projects Locations
      </h2>
      <div
        className={`w-full h-[300px] sm:h-[350px] md:h-[400px] rounded-lg overflow-hidden border border-gray-800 transition-all duration-[2000ms] ease-out ${isVisible
            ? 'opacity-100 translate-y-0 translate-x-0'
            : 'opacity-0 translate-y-12 translate-x-8'
          }`}
        style={{
          minHeight: "300px",
          transitionDelay: '0.2s'
        }}
      >
        <div
          ref={mapRef}
          className="w-full h-full"
        />
      </div>
      <style>{`
        .leaflet-control-attribution {
          display: none !important;
        }
      `}</style>
      <p
        className={`text-gray-400 text-sm mt-4 text-center transition-all duration-[2000ms] ease-out ${isVisible
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 -translate-x-12'
          }`}
        style={{ transitionDelay: '0.4s' }}
      >
        Click on the markers to see project locations and counts. Use the zoom controls, double-click, or drag to interact with the map.
      </p>
    </section>
  );
}

