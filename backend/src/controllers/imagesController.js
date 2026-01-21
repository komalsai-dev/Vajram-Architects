import crypto from "crypto";
import { uploadBuffer, deleteImage } from "../services/cloudinaryService.js";
import { slugify } from "../utils/slugify.js";
import { v2 as cloudinary } from "cloudinary";

const normalizeLabel = (label) => {
  const normalized = String(label || "").toLowerCase();
  if (normalized === "interior") {
    return "Interior";
  }
  return "Exterior";
};

export const addProjectImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images provided" });
    }

    const { projectName, locationId, locationName, stateOrCountry } = req.body;
    if (!projectName || !locationId) {
      return res
        .status(400)
        .json({ message: "projectName and locationId are required" });
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
    const projectFolder = `${locationId}/${slugify(projectName)}`;
    const projectTag = `project_${req.params.projectId}`;
    const locationTag = `location_${locationId}`;
    for (let index = 0; index < req.files.length; index += 1) {
      const file = req.files[index];
      const result = await uploadBuffer(file.buffer, {
        folder: projectFolder,
        use_filename: true,
        unique_filename: true,
        tags: ["vajram_project", projectTag, locationTag],
        context: {
          projectId: req.params.projectId,
          projectName,
          locationId,
          locationName,
          stateOrCountry,
          label: normalizeLabel(labels[index]),
        },
      });
      const image = {
        id: crypto.randomUUID(),
        url: result.secure_url,
        publicId: result.public_id,
        label: normalizeLabel(labels[index]),
        createdAt: new Date().toISOString(),
      };
      uploadedImages.push(image);
    }

    res.status(201).json({
      id: req.params.projectId,
      name: projectName,
      locationId,
      coverImageUrl: uploadedImages[0]?.url || "",
      images: uploadedImages,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProjectImage = async (req, res, next) => {
  try {
    if (!req.body.label) {
      return res.status(400).json({ message: "Label is required" });
    }
    const resource = await cloudinary.api.resource(req.params.imageId, {
      context: true,
    });
    const existing = resource.context?.custom || {};
    await cloudinary.api.update(req.params.imageId, {
      context: {
        ...existing,
        label: normalizeLabel(req.body.label),
      },
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const deleteProjectImage = async (req, res, next) => {
  try {
    if (req.query.deleteCloudinary === "true") {
      await deleteImage(req.params.imageId);
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
