import { v2 as cloudinary } from "cloudinary";
import { config } from "../config/env.js";
import { slugify } from "../utils/slugify.js";

const EXCLUDED_FOLDERS = [
  "logo",
  "home page",
  "homepage",
  "home_page",
  "home-page",
  "projects",
  "samples",
  "vajram_config",
];

const titleCase = (value) =>
  value
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");

const listResourcesByPrefix = async (prefix) => {
  const results = [];
  let nextCursor;
  do {
    const response = await cloudinary.api.resources({
      type: "upload",
      resource_type: "image",
      prefix,
      max_results: 500,
      next_cursor: nextCursor,
      context: true,
      tags: true,
    });
    results.push(...(response.resources || []));
    nextCursor = response.next_cursor;
  } while (nextCursor);
  return results;
};

const normalizeLocationId = (value) => slugify(value || "");

export const buildCatalogFromCloudinary = async () => {
  if (
    !config.cloudinary.cloudName ||
    !config.cloudinary.apiKey ||
    !config.cloudinary.apiSecret
  ) {
    return { locations: [], projects: [] };
  }

  const baseFolder = config.cloudinary.folder
    ? `${config.cloudinary.folder}/`
    : "";
  const resources = await listResourcesByPrefix("");

  const projectMap = new Map();
  const locationMap = new Map();

  resources.forEach((resource) => {
    let publicId = resource.public_id;
    if (baseFolder && publicId.startsWith(baseFolder)) {
      publicId = publicId.slice(baseFolder.length);
    }
    const parts = publicId.split("/");
    if (parts.length < 2) {
      return;
    }
    const [locationFolder, projectFolder] = parts;
    if (!locationFolder || !projectFolder) {
      return;
    }
    if (EXCLUDED_FOLDERS.includes(locationFolder.toLowerCase())) {
      return;
    }

    const locationId = normalizeLocationId(locationFolder);
    const projectSlug = normalizeLocationId(projectFolder);
    const projectId = `${locationId}__${projectSlug}`;
    const locationName = titleCase(locationFolder);

    const latitude = Number(resource.context?.custom?.latitude);
    const longitude = Number(resource.context?.custom?.longitude);
    if (!locationMap.has(locationId)) {
      locationMap.set(locationId, {
        id: locationId,
        name: locationName,
        stateOrCountry: resource.context?.custom?.stateOrCountry || "",
        latitude: Number.isFinite(latitude) ? latitude : undefined,
        longitude: Number.isFinite(longitude) ? longitude : undefined,
      });
    } else {
      const existingLocation = locationMap.get(locationId);
      if (
        existingLocation &&
        (!existingLocation.latitude || !existingLocation.longitude) &&
        Number.isFinite(latitude) &&
        Number.isFinite(longitude)
      ) {
        existingLocation.latitude = latitude;
        existingLocation.longitude = longitude;
      }
    }

    const existing =
      projectMap.get(projectId) || {
        id: projectId,
        name: titleCase(projectFolder),
        locationId,
        coverImageUrl: "",
        images: [],
        createdAt: resource.created_at,
        updatedAt: resource.created_at,
      };

    const image = {
      id: resource.public_id,
      url: resource.secure_url,
      publicId: resource.public_id,
      label: resource.context?.custom?.label || "Exterior",
      createdAt: resource.created_at,
    };
    existing.images.push(image);
    if (!existing.coverImageUrl) {
      existing.coverImageUrl = image.url;
    }
    existing.updatedAt =
      resource.created_at > existing.updatedAt
        ? resource.created_at
        : existing.updatedAt;

    projectMap.set(projectId, existing);
  });

  return {
    locations: Array.from(locationMap.values()),
    projects: Array.from(projectMap.values()),
  };
};
