import crypto from "crypto";
import { readStore, writeStore } from "../services/dataStore.js";
import { uploadBuffer, deleteImage } from "../services/cloudinaryService.js";

const normalizeLabel = (label) => {
  const normalized = String(label || "").toLowerCase();
  if (normalized === "interior") {
    return "Interior";
  }
  return "Exterior";
};

export const addProjectImages = async (req, res, next) => {
  try {
    const store = await readStore();
    const project = store.projects.find(
      (item) => item.id === req.params.projectId
    );
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images provided" });
    }

    let labels = [];
    if (req.body.labels) {
      if (Array.isArray(req.body.labels)) {
        labels = req.body.labels;
      } else {
        try {
          labels = JSON.parse(req.body.labels);
        } catch (error) {
          labels = String(req.body.labels).split(",");
        }
      }
    }

    const uploadedImages = [];
    for (let index = 0; index < req.files.length; index += 1) {
      const file = req.files[index];
      const result = await uploadBuffer(file.buffer, undefined);
      const image = {
        id: crypto.randomUUID(),
        url: result.secure_url,
        publicId: result.public_id,
        label: normalizeLabel(labels[index]),
        createdAt: new Date().toISOString(),
      };
      uploadedImages.push(image);
    }

    project.images = [...(project.images || []), ...uploadedImages];
    if (!project.coverImageUrl && project.images.length > 0) {
      project.coverImageUrl = project.images[0].url;
    }
    project.updatedAt = new Date().toISOString();
    await writeStore(store);
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

export const updateProjectImage = async (req, res, next) => {
  try {
    const store = await readStore();
    const project = store.projects.find(
      (item) => item.id === req.params.projectId
    );
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    const image = (project.images || []).find(
      (item) => item.id === req.params.imageId
    );
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }
    if (req.body.label !== undefined) {
      image.label = normalizeLabel(req.body.label);
    }
    project.updatedAt = new Date().toISOString();
    await writeStore(store);
    res.json(project);
  } catch (error) {
    next(error);
  }
};

export const deleteProjectImage = async (req, res, next) => {
  try {
    const store = await readStore();
    const project = store.projects.find(
      (item) => item.id === req.params.projectId
    );
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    const imageIndex = (project.images || []).findIndex(
      (item) => item.id === req.params.imageId
    );
    if (imageIndex === -1) {
      return res.status(404).json({ message: "Image not found" });
    }
    const [removed] = project.images.splice(imageIndex, 1);
    if (req.query.deleteCloudinary === "true") {
      await deleteImage(removed.publicId);
    }
    if (project.coverImageUrl === removed.url) {
      project.coverImageUrl = project.images[0]?.url || "";
    }
    project.updatedAt = new Date().toISOString();
    await writeStore(store);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
