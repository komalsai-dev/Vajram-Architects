// Google Maps embed URLs for each location - using search-based embed
export const locationMaps: Record<string, string> = {
  "Guntur": "https://maps.google.com/maps?q=Guntur,+Andhra+Pradesh&t=&z=13&ie=UTF8&iwloc=&output=embed",
  "Hyderabad": "https://maps.google.com/maps?q=Hyderabad,+Telangana&t=&z=13&ie=UTF8&iwloc=&output=embed",
  "Siddipet": "https://maps.google.com/maps?q=Siddipet,+Telangana&t=&z=13&ie=UTF8&iwloc=&output=embed",
  "Suryapet": "https://maps.google.com/maps?q=Suryapet,+Telangana&t=&z=13&ie=UTF8&iwloc=&output=embed",
  "Nirmal": "https://maps.google.com/maps?q=Nirmal,+Telangana&t=&z=13&ie=UTF8&iwloc=&output=embed",
  "Ireland": "https://maps.google.com/maps?q=Dublin,+Ireland&t=&z=13&ie=UTF8&iwloc=&output=embed",
};

export function getLocationMap(locationName: string): string {
  return locationMaps[locationName] || locationMaps["Guntur"];
}

