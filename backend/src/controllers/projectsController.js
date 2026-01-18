import crypto from "crypto";
import { readStore, writeStore } from "../services/dataStore.js";
import { deleteImage } from "../services/cloudinaryService.js";

const normalizeProject = (project) => ({
  ...project,
  images: project.images || [],
});

export const listProjects = async (req, res, next) => {
  try {
    const { location } = req.query;
    const store = await readStore();
    const projects = location
      ? store.projects.filter((project) => project.locationId === location)
      : store.projects;
    res.json(projects.map(normalizeProject));
  } catch (error) {
    next(error);
  }
};

export const getProject = async (req, res, next) => {
  try {
    const store = await readStore();
    const project = store.projects.find(
      (item) => item.id === req.params.projectId
    );
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(normalizeProject(project));
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const { name, locationId, clientNumber } = req.body;
    if (!name || !locationId) {
      return res
        .status(400)
        .json({ message: "Project name and locationId are required" });
    }
    const store = await readStore();
    const locationExists = store.locations.some(
      (location) => location.id === locationId
    );
    if (!locationExists) {
      return res.status(400).json({ message: "Location does not exist" });
    }
    const project = {
      id: crypto.randomUUID(),
      name,
      locationId,
      clientNumber: clientNumber || null,
      coverImageUrl: "",
      images: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    store.projects.push(project);
    await writeStore(store);
    res.status(201).json(normalizeProject(project));
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const store = await readStore();
    const project = store.projects.find(
      (item) => item.id === req.params.projectId
    );
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    const { name, locationId, clientNumber, coverImageUrl } = req.body;
    if (locationId) {
      const locationExists = store.locations.some(
        (location) => location.id === locationId
      );
      if (!locationExists) {
        return res.status(400).json({ message: "Location does not exist" });
      }
      project.locationId = locationId;
    }
    if (name) {
      project.name = name;
    }
    if (clientNumber !== undefined) {
      project.clientNumber = clientNumber;
    }
    if (coverImageUrl !== undefined) {
      project.coverImageUrl = coverImageUrl;
    }
    project.updatedAt = new Date().toISOString();
    await writeStore(store);
    res.json(normalizeProject(project));
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const store = await readStore();
    const projectIndex = store.projects.findIndex(
      (item) => item.id === req.params.projectId
    );
    if (projectIndex === -1) {
      return res.status(404).json({ message: "Project not found" });
    }
    const [project] = store.projects.splice(projectIndex, 1);
    const images = project?.images || [];
    if (images.length > 0) {
      await Promise.all(images.map((image) => deleteImage(image.publicId)));
    }
    await writeStore(store);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
