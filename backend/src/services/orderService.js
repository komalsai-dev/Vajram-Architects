import { v2 as cloudinary } from "cloudinary";
import { config } from "../config/env.js";

// Initialize Cloudinary
cloudinary.config({
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret,
});

// The public_id for our config asset in Cloudinary
const CONFIG_PUBLIC_ID = "vajram_config/display_order";

// Default order structure
const DEFAULT_ORDER = { locations: [], projects: {} };

// 1x1 transparent PNG as Base64
const PLACEHOLDER_IMAGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

/**
 * Get the display order from Cloudinary metadata.
 * Falls back to default if no config asset exists.
 */
export const getDisplayOrder = async () => {
    try {
        const resource = await cloudinary.api.resource(CONFIG_PUBLIC_ID, {
            resource_type: "image",
            context: true,
        });

        const contextRaw = resource?.context?.custom?.order_data;
        if (contextRaw) {
            return JSON.parse(contextRaw);
        }
        return { ...DEFAULT_ORDER };
    } catch (error) {
        // If asset doesn't exist, return default
        if (error?.http_code === 404 || error?.error?.http_code === 404) {
            return { ...DEFAULT_ORDER };
        }
        console.error("Error fetching display order from Cloudinary:", error);
        return { ...DEFAULT_ORDER };
    }
};

/**
 * Save order data to Cloudinary by uploading/overwriting the config asset.
 */
const saveOrderToCloudinary = async (orderData) => {
    try {
        // Always upload with overwrite - this works whether asset exists or not
        const result = await cloudinary.uploader.upload(PLACEHOLDER_IMAGE, {
            public_id: CONFIG_PUBLIC_ID,
            resource_type: "image",
            overwrite: true,
            context: `order_data=${JSON.stringify(orderData)}`,
        });
        return result;
    } catch (error) {
        console.error("Error saving display order to Cloudinary:", error);
        throw error;
    }
};

/**
 * Save the location order to Cloudinary metadata.
 */
export const saveLocationOrder = async (locationIds) => {
    const current = await getDisplayOrder();
    current.locations = locationIds;
    await saveOrderToCloudinary(current);
    return current.locations;
};

/**
 * Save the project order for a specific location.
 */
export const saveProjectOrder = async (locationId, projectIds) => {
    const current = await getDisplayOrder();
    if (!current.projects) {
        current.projects = {};
    }
    current.projects[locationId] = projectIds;
    await saveOrderToCloudinary(current);
    return current.projects[locationId];
};
