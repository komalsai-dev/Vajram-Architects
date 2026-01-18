import { readStore, writeStore } from "../services/dataStore.js";
import { slugify } from "../utils/slugify.js";

const normalizeLocation = (location) => ({
  id: location.id,
  name: location.name,
  stateOrCountry: location.stateOrCountry || "",
});

export const listLocations = async (req, res, next) => {
  try {
    const store = await readStore();
    res.json(store.locations.map(normalizeLocation));
  } catch (error) {
    next(error);
  }
};

export const getLocation = async (req, res, next) => {
  try {
    const store = await readStore();
    const location = store.locations.find(
      (item) => item.id === req.params.locationId
    );
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    const projects = store.projects.filter(
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
    const store = await readStore();
    const projects = store.projects.filter(
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
    const locationId = id ? slugify(id) : slugify(name);
    const store = await readStore();
    if (store.locations.some((item) => item.id === locationId)) {
      return res.status(409).json({ message: "Location already exists" });
    }
    const newLocation = {
      id: locationId,
      name,
      stateOrCountry: stateOrCountry || "",
    };
    store.locations.push(newLocation);
    await writeStore(store);
    res.status(201).json(normalizeLocation(newLocation));
  } catch (error) {
    next(error);
  }
};

export const updateLocation = async (req, res, next) => {
  try {
    const { name, stateOrCountry } = req.body;
    const store = await readStore();
    const location = store.locations.find(
      (item) => item.id === req.params.locationId
    );
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    if (name) {
      location.name = name;
    }
    if (stateOrCountry !== undefined) {
      location.stateOrCountry = stateOrCountry;
    }
    await writeStore(store);
    res.json(normalizeLocation(location));
  } catch (error) {
    next(error);
  }
};

export const deleteLocation = async (req, res, next) => {
  try {
    const store = await readStore();
    const locationIndex = store.locations.findIndex(
      (item) => item.id === req.params.locationId
    );
    if (locationIndex === -1) {
      return res.status(404).json({ message: "Location not found" });
    }
    store.locations.splice(locationIndex, 1);
    store.projects = store.projects.filter(
      (project) => project.locationId !== req.params.locationId
    );
    await writeStore(store);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
