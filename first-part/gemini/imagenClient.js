import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function generateImage(prompt) {
  const model = genAI.getGenerativeModel({
    model: "imagen-4.0-generate-001",
  });

  const result = await model.generateContent(prompt);

  const base64Image =
    result.response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

  if (!base64Image) {
    throw new Error("Image generation failed");
  }

  return base64Image;
}
