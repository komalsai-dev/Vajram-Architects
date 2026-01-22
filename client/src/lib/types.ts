export interface Location {
  id: string;
  name: string;
  stateOrCountry?: string;
  latitude?: number;
  longitude?: number;
}

export interface ProjectImage {
  id: string;
  url: string;
  label: "Interior" | "Exterior";
  publicId?: string;
  createdAt?: string;
}

export interface Project {
  id: string;
  name: string;
  locationId: string;
  clientNumber?: string | null;
  coverImageUrl?: string;
  images?: ProjectImage[];
  createdAt?: string;
  updatedAt?: string;
}
