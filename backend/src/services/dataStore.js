import { promises as fs } from "fs";
import path from "path";
import { config } from "../config/env.js";

const resolveDataPath = () => {
  const basePath = process.cwd();
  return path.resolve(basePath, config.dataFile);
};

const ensureDataFile = async () => {
  const dataPath = resolveDataPath();
  await fs.mkdir(path.dirname(dataPath), { recursive: true });
  try {
    await fs.access(dataPath);
  } catch (error) {
    const initialData = { locations: [], projects: [] };
    await fs.writeFile(dataPath, JSON.stringify(initialData, null, 2), "utf8");
  }
  return dataPath;
};

export const readStore = async () => {
  const dataPath = await ensureDataFile();
  const raw = await fs.readFile(dataPath, "utf8");
  return JSON.parse(raw);
};

export const writeStore = async (data) => {
  const dataPath = await ensureDataFile();
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2), "utf8");
};
