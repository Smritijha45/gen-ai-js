import fs from "fs";
import path from "path";

export function saveBase64Image(base64Data) {
  const buffer = Buffer.from(base64Data, "base64");

  const dir = path.join(process.cwd(), "public/generated");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const fileName = `gen-${Date.now()}.png`;
  const filePath = path.join(dir, fileName);

  fs.writeFileSync(filePath, buffer);
  return `/generated/${fileName}`;
}
