import { getClientName, getAllClientIds } from "./clients-data";
import { getAllLocations } from "./locations-data";

export interface SearchResult {
  id: string;
  title: string;
  type: "location" | "client";
  link: string;
}

export function searchWebsite(query: string): SearchResult[] {
  const searchTerm = query.toLowerCase().trim();
  
  if (!searchTerm) {
    return [];
  }

  const results: SearchResult[] = [];

  // Search locations
  const locations = getAllLocations();
  locations.forEach((locationId) => {
    const locationName = locationId.charAt(0).toUpperCase() + locationId.slice(1);
    if (locationName.toLowerCase().includes(searchTerm)) {
      results.push({
        id: `location-${locationId}`,
        title: locationName,
        type: "location",
        link: `/#${locationId}`,
      });
    }
  });

  // Search clients
  const clientIds = getAllClientIds();
  clientIds.forEach((clientId) => {
    const clientName = getClientName(clientId);
    if (clientName.toLowerCase().includes(searchTerm)) {
      results.push({
        id: `client-${clientId}`,
        title: clientName,
        type: "client",
        link: `/client/${clientId}`,
      });
    }
  });

  return results;
}

