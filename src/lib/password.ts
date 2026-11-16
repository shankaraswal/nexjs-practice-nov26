import "server-only";

import { randomBytes, scrypt } from "node:crypto";

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const derivedKey = await new Promise<Buffer>((resolve, reject) => {
    scrypt(password, salt, 64, (error, key) => {
      if (error) {
        reject(error);
      } else {
        resolve(key);
      }
    });
  });

  return `scrypt$${salt.toString("hex")}$${derivedKey.toString("hex")}`;
}
