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
  const fallbackLocations = fallbackLocationKeys.map((locationKey) => {
    const locationData = getLocationData(
      locationKey.charAt(0).toUpperCase() + locationKey.slice(1)
    );
    return {
      id: locationKey,
      name: locationData.name,
      stateOrCountry: locationData.stateOrCountry,
    };
  });
  const locations = locationsQuery.data?.length
    ? locationsQuery.data
    : fallbackLocations;

  const projects = projectsQuery.data?.length ? projectsQuery.data : [];

  const locationsWithCounts = useMemo(() => {
    return locations
      .map((location) => {
        const coords = getLocationCoordinates(location.id);
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
    if (!mapRef.current) return;

    try {
      // Calculate center point (average of all locations)
      if (locationsWithCounts.length === 0) return;

      const avgLat = locationsWithCounts.reduce((sum, loc) => sum + loc.lat, 0) / locationsWithCounts.length;
      const avgLng = locationsWithCounts.reduce((sum, loc) => sum + loc.lng, 0) / locationsWithCounts.length;

      // Initialize map
      // Disable scrollWheelZoom so page scrolling works, but keep all other interactions
      const map = L.map(mapRef.current, {
        center: [avgLat, avgLng],
        zoom: 5,
        zoomControl: true,
        scrollWheelZoom: false, // Disable scroll-to-zoom to allow page scrolling
        doubleClickZoom: true, // Allow double-click to zoom
        boxZoom: true, // Allow box zoom (shift+drag)
        keyboard: true, // Allow keyboard navigation
        dragging: true, // Allow panning by dragging
        touchZoom: true, // Allow pinch-to-zoom on touch devices
      });

      // Add OpenStreetMap tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '', // Remove attribution watermark
        maxZoom: 19,
      }).addTo(map);
      
      // Hide attribution control
      map.attributionControl.setPrefix('');
      map.attributionControl.remove();

      // Add markers for each location
      const markers: L.Marker[] = [];
      locationsWithCounts.forEach((location) => {
        const marker = L.marker([location.lat, location.lng]).addTo(map);

        // Create popup content
        const popupContent = `
          <div style="padding: 8px; min-width: 150px;">
            <h3 style="margin: 0 0 8px 0; font-weight: bold; font-size: 16px; color: #000;">
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

      mapInstanceRef.current = map;
      markersRef.current = markers;

      // Fit map to show all markers
      if (markers.length > 0) {
        const group = new L.FeatureGroup(markers);
        map.fitBounds(group.getBounds().pad(0.1));
      }

      // Invalidate size after a short delay to ensure map renders properly
      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 100);
    } catch (error) {
      console.error("Error initializing map:", error);
    }

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      markersRef.current = [];
    };
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
        className={`text-2xl sm:text-3xl md:text-4xl font-bold font-serif mb-6 sm:mb-8 text-white transition-all duration-[2000ms] ease-out ${
          isVisible 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 -translate-x-12'
        }`}
      >
        Our Projects Locations
      </h2>
      <div 
        className={`w-full h-[300px] sm:h-[350px] md:h-[400px] rounded-lg overflow-hidden border border-gray-800 transition-all duration-[2000ms] ease-out ${
          isVisible 
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
        className={`text-gray-400 text-sm mt-4 text-center transition-all duration-[2000ms] ease-out ${
          isVisible 
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

