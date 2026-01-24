import { getDisplayOrder, saveLocationOrder, saveProjectOrder } from '../services/orderService.js';

export const getOrder = async (req, res, next) => {
    try {
        const order = await getDisplayOrder();
        res.set('Cache-Control', 'no-store');
        res.json(order);
    } catch (error) {
        next(error);
    }
};

export const updateLocationOrder = async (req, res, next) => {
    try {
        const { locations } = req.body;
        if (!Array.isArray(locations)) {
            return res.status(400).json({ message: "Locations must be an array of IDs" });
        }
        const updated = await saveLocationOrder(locations);
        res.json({ locations: updated });
    } catch (error) {
        next(error);
    }
};

export const updateProjectOrder = async (req, res, next) => {
    try {
        const { locationId, projects } = req.body;
        if (!locationId || !Array.isArray(projects)) {
            return res.status(400).json({ message: "Invalid request" });
        }
        const updated = await saveProjectOrder(locationId, projects);
        res.json({ projects: updated });
    } catch (error) {
        next(error);
    }
};
