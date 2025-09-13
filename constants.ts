
import { Tool } from './types';

export const MODEL_NAME = 'gemini-2.5-flash-image-preview';

export const PREDEFINED_PROMPTS: Record<Tool, string> = {
  [Tool.Retouch]: 'Retouch this image. Remove blemishes and improve lighting subtly. Make it look professional.',
  [Tool.AddElement]: 'Add a small, friendly robot waving in the bottom right corner of this image.',
  [Tool.Restore]: 'Restore this old photo. Fix scratches, tears, and colorize it with realistic colors.',
  [Tool.ComicStyle]: 'Transform this image into a vibrant, American-style comic book panel. Add bold lines and halftone dots.',
  [Tool.Logo]: 'Create a modern, minimalist logo for a tech startup called "Innovate" and place it on this image as a watermark.',
  [Tool.Mockup]: 'Place this image onto the screen of a modern laptop that is sitting on a clean, wooden desk.',
  [Tool.Merge]: 'Seamlessly merge these two images. Blend the main subject from the first image into the background of the second image.',
};
