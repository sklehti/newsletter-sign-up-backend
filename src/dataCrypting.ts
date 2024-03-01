//Checking the crypto module
import * as crypto from "crypto";
const algorithm = "aes-256-cbc"; //Using AES encryption
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

//Encrypting text
export function encrypt(text: string) {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return encrypted;
}

// Decrypting text
export function decrypt(text: string) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  let decrypted = decipher.update(text, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
