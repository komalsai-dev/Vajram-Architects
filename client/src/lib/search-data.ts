import type { Location, Project } from "./types";

export interface SearchResult {
  id: string;
  title: string;
  type: "location" | "client";
  link: string;
}

export function searchWebsite(
  query: string,
  locations: Location[],
  projects: Project[],
): SearchResult[] {
  const searchTerm = query.toLowerCase().trim();
  
  if (!searchTerm) {
    return [];
  }

  const results: SearchResult[] = [];

  // Search locations
  locations.forEach((location) => {
    if (location.name.toLowerCase().includes(searchTerm)) {
      results.push({
        id: `location-${location.id}`,
        title: location.name,
        type: "location",
        link: `/#${location.id}`,
      });
    }
  });

  // Search clients
  projects.forEach((project) => {
    if (project.name.toLowerCase().includes(searchTerm)) {
      results.push({
        id: `client-${project.id}`,
        title: project.name,
        type: "client",
        link: `/client/${project.id}`,
      });
    }
  });

  return results;
}

