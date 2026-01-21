import crypto from "crypto";
import { buildCatalogFromCloudinary } from "../services/cloudinaryCatalog.js";
import { v2 as cloudinary } from "cloudinary";
import { config } from "../config/env.js";
import { slugify } from "../utils/slugify.js";

const normalizeProject = (project) => ({
  ...project,
  images: project.images || [],
});

export const listProjects = async (req, res, next) => {
  try {
    const { location } = req.query;
    const catalog = await buildCatalogFromCloudinary();
    const projects = location
      ? catalog.projects.filter((project) => project.locationId === location)
      : catalog.projects;
    res.json(projects.map(normalizeProject));
  } catch (error) {
    next(error);
  }
};

export const getProject = async (req, res, next) => {
  try {
    const catalog = await buildCatalogFromCloudinary();
    const project = catalog.projects.find(
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
    const { name, locationId } = req.body;
    if (!name || !locationId) {
      return res
        .status(400)
        .json({ message: "Project name and locationId are required" });
    }
    const project = {
      id: `${locationId}__${slugify(name)}`,
      name,
      locationId,
      coverImageUrl: "",
      images: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    res.status(201).json(normalizeProject(project));
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const {
      name,
      locationId,
      locationName,
      stateOrCountry,
      coverImageUrl,
    } = req.body;

    const tag = `project_${req.params.projectId}`;
    const resources = await cloudinary.api.resources_by_tag(tag, {
      max_results: 500,
      context: true,
    });
    const updates = (resources.resources || []).map((resource) =>
      cloudinary.api.update(resource.public_id, {
        context: {
          projectId: req.params.projectId,
          projectName: name,
          locationId,
          locationName,
          stateOrCountry,
          label: resource.context?.custom?.label || "Exterior",
        },
      })
    );
    await Promise.all(updates);

    res.json(
      normalizeProject({
        id: req.params.projectId,
        name,
        locationId,
        coverImageUrl: coverImageUrl || "",
        images: [],
        updatedAt: new Date().toISOString(),
      })
    );
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const [locationId, projectSlug] = req.params.projectId.split("__");
    const foldersToDelete = [
      `${locationId}/${projectSlug}`,
      config.cloudinary.folder
        ? `${config.cloudinary.folder}/${locationId}/${projectSlug}`
        : null,
    ].filter(Boolean);
    const prefixes = [
      `${locationId}/${projectSlug}`,
      config.cloudinary.folder
        ? `${config.cloudinary.folder}/${locationId}/${projectSlug}`
        : null,
    ].filter(Boolean);
    for (const prefix of prefixes) {
      await cloudinary.api.delete_resources_by_prefix(prefix, {
        resource_type: "image",
        type: "upload",
      });
    }
    for (const folder of foldersToDelete) {
      try {
        await cloudinary.api.delete_folder(folder);
      } catch (error) {
        // Ignore if folder is already gone or not empty due to external files.
      }
    }
    const locationFolders = [
      locationId,
      config.cloudinary.folder ? `${config.cloudinary.folder}/${locationId}` : null,
    ].filter(Boolean);
    for (const folder of locationFolders) {
      try {
        const response = await cloudinary.api.resources({
          type: "upload",
          resource_type: "image",
          prefix: `${folder}/`,
          max_results: 1,
        });
        if (!response.resources || response.resources.length === 0) {
          await cloudinary.api.delete_folder(folder);
        }
      } catch (error) {
        // Ignore if folder is already gone or not empty due to external files.
      }
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
