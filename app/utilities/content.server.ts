import { readFile, access } from "node:fs/promises";
import path from "node:path";

export async function isContentAvailable(): Promise<boolean> {
  try {
    await access("content");
    return true;
  } catch {
    return false;
  }
}

export async function getContent(
  category: string,
  name: string,
): Promise<string | null> {
  // allow only letters, numbers, dashes, and underscores to form a slug
  if (!/^[a-zA-Z0-9_-]+$/.test(name)) {
    throw new Error("Invalid slug");
  }

  const base = path.resolve("content", category);

  // Path construction can be done safely as long as we don't skip
  // the next step.
  const filePath = path.resolve(base, name, `${name}.md`);

  // We must ensure the file path is within BASE_DIR to prevent path traversal
  if (!filePath.startsWith(base)) {
    throw new Error("Invalid path traversal detected");
  }

  // We are safe now
  return (await readFile(filePath, "utf-8")).toString();
}
