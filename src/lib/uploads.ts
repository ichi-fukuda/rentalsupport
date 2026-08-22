import { mkdir, writeFile } from "fs/promises";
import path from "path";

const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

const EXT_FROM_TYPE: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/heic": ".heic",
  "image/gif": ".gif",
};

/**
 * Saves an uploaded image File to public/uploads/{hostId}/{sessionId}/ and
 * returns its public path (e.g. "/uploads/abc/def/169....jpg"). Returns null
 * if the value isn't a valid, non-empty image file.
 */
export async function saveUploadedImage(
  file: FormDataEntryValue | null,
  hostId: string,
  sessionId: string,
): Promise<string | null> {
  if (!(file instanceof File) || file.size === 0) return null;
  const ext = EXT_FROM_TYPE[file.type];
  if (!ext) {
    throw new Error("対応していないファイル形式です（JPEG/PNG/WebP/HEIC/GIFのみ）。");
  }
  if (file.size > MAX_SIZE_BYTES) {
    throw new Error("ファイルサイズは10MB以下にしてください。");
  }

  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads", hostId, sessionId);
  await mkdir(dir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, filename), buffer);

  return `/uploads/${hostId}/${sessionId}/${filename}`;
}
