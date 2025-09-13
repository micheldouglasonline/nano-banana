
import { GoogleGenAI, Modality, Part } from "@google/genai";
import { MODEL_NAME } from '../constants';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const fileToGenerativePart = async (file: File): Promise<Part> => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  const data = await base64EncodedDataPromise;
  return {
    inlineData: {
      data,
      mimeType: file.type,
    },
  };
};

export const editImage = async (prompt: string, image1: File, image2?: File) => {
  try {
    const imageParts = [await fileToGenerativePart(image1)];
    if (image2) {
      imageParts.push(await fileToGenerativePart(image2));
    }
    
    const textPart = { text: prompt };
    const allParts: Part[] = [...imageParts, textPart];
    
    const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: {
            parts: allParts,
        },
        config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
    });

    let resultText: string | null = null;
    let resultImage: string | null = null;

    if (response.candidates && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
            if (part.text) {
                resultText = (resultText || '') + part.text;
            } else if (part.inlineData) {
                resultImage = part.inlineData.data;
            }
        }
    }

    if (!resultImage) {
        throw new Error("API did not return an image. It might have refused the request. Response: " + (resultText || "No text response."));
    }

    return { text: resultText, image: resultImage };

  } catch (error) {
    console.error("Error editing image with Gemini:", error);
    throw new Error("Failed to generate image. Please check the console for more details.");
  }
};
