import { getClientImages, getClientName, getClientIdsByLocation } from "./clients-data";

export interface LocationClient {
  id: string;
  image: string;
  title: string;
  link: string;
}

export interface LocationData {
  name: string;
  stateOrCountry: string;
  clients: LocationClient[];
}

// Mapping of locations to their states/countries
const locationStateMap: Record<string, string> = {
  guntur: "Andhra Pradesh",
  hyderabad: "Telangana",
  siddipet: "Telangana",
  suryapet: "Telangana",
  nirmal: "Telangana",
  ireland: "Ireland",
};

/**
 * Get location data with all clients for that location
 * @param locationName - Location name (e.g., "Guntur", "Hyderabad")
 */
export function getLocationData(locationName: string): LocationData {
  const locationKey = locationName.toLowerCase();
  const clientIds = getClientIdsByLocation(locationKey);
  const stateOrCountry = locationStateMap[locationKey] || "";
  
  const clients: LocationClient[] = clientIds.map((clientId) => {
    const images = getClientImages(clientId);
    const name = getClientName(clientId);
    
    return {
      id: clientId,
      image: images[0]?.url || "", // Use first image as preview
      title: name,
      link: `/client/${clientId}`,
    };
  });

  return {
    name: locationName,
    stateOrCountry,
    clients,
  };
}

/**
 * Get all available locations
 */
export function getAllLocations(): string[] {
  return ["guntur", "hyderabad", "siddipet", "suryapet", "nirmal", "ireland"];
}
