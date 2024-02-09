import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import crypto from "crypto"

export function sha256(bytes?: crypto.BinaryLike) {
  const buffer = bytes || crypto.randomBytes(32);

  return crypto.createHash("sha256").update(buffer).digest("hex");
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
