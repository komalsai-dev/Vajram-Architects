// Location coordinates (latitude, longitude) for map markers
export interface LocationCoordinates {
  name: string;
  lat: number;
  lng: number;
  clientCount: number;
}

// Get coordinates for all project locations
// Coordinates are approximate city centers
export const locationCoordinates: Record<string, LocationCoordinates> = {
  guntur: {
    name: "Guntur",
    lat: 16.3067,
    lng: 80.4365,
    clientCount: 0, // Will be calculated dynamically
  },
  hyderabad: {
    name: "Hyderabad",
    lat: 17.3850,
    lng: 78.4867,
    clientCount: 0,
  },
  siddipet: {
    name: "Siddipet",
    lat: 18.1048,
    lng: 78.8518,
    clientCount: 0,
  },
  suryapet: {
    name: "Suryapet",
    lat: 17.1406,
    lng: 79.6204,
    clientCount: 0,
  },
  nirmal: {
    name: "Nirmal",
    lat: 19.0969,
    lng: 78.3447,
    clientCount: 0,
  },
  ireland: {
    name: "Ireland",
    lat: 53.3498,
    lng: -6.2603, // Dublin coordinates
    clientCount: 0,
  },
};

/**
 * Get coordinates for a specific location
 */
export function getLocationCoordinates(locationKey: string): LocationCoordinates | null {
  return locationCoordinates[locationKey.toLowerCase()] || null;
}

/**
 * Get all location coordinates
 */
export function getAllLocationCoordinates(): LocationCoordinates[] {
  return Object.values(locationCoordinates);
}

