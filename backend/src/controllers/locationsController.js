import { buildCatalogFromCloudinary } from "../services/cloudinaryCatalog.js";

const normalizeLocation = (location) => ({
  id: location.id,
  name: location.name,
  stateOrCountry: location.stateOrCountry || "",
});

export const listLocations = async (req, res, next) => {
  try {
    const catalog = await buildCatalogFromCloudinary();
    res.json(catalog.locations.map(normalizeLocation));
  } catch (error) {
    next(error);
  }
};

export const getLocation = async (req, res, next) => {
  try {
    const catalog = await buildCatalogFromCloudinary();
    const location = catalog.locations.find(
      (item) => item.id === req.params.locationId
    );
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    const projects = catalog.projects.filter(
      (project) => project.locationId === location.id
    );
    res.json({
      ...normalizeLocation(location),
      projects,
    });
  } catch (error) {
    next(error);
  }
};

export const listLocationProjects = async (req, res, next) => {
  try {
    const catalog = await buildCatalogFromCloudinary();
    const projects = catalog.projects.filter(
      (project) => project.locationId === req.params.locationId
    );
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

export const createLocation = async (req, res, next) => {
  try {
    const { name, stateOrCountry, id } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Location name is required" });
    }
    const locationId = id || name.toLowerCase().replace(/\s+/g, "-");
    res.status(201).json(
      normalizeLocation({
        id: locationId,
        name,
        stateOrCountry: stateOrCountry || "",
      })
    );
  } catch (error) {
    next(error);
  }
};

export const updateLocation = async (req, res, next) => {
  try {
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const deleteLocation = async (req, res, next) => {
  try {
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
