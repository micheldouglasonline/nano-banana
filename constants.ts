
import { Tool } from './types';

export const MODEL_NAME = 'gemini-2.5-flash-image-preview';

export const PREDEFINED_PROMPTS: Record<Tool, string> = {
  [Tool.Retouch]: 'Retouch this image. Remove blemishes and improve lighting subtly. Make it look professional.',
  [Tool.AddElement]: 'Add a small, friendly robot waving in the bottom right corner of this image.',
  [Tool.Restore]: 'Restore this old photo. Fix scratches, tears, and colorize it with realistic colors.',
  [Tool.ComicStyle]: 'Transform this image into a retro Marvel and DC comic style panel, incorporating the following story: "A superhero landing dramatically in a rainy city street at night.". Use bold lines, dramatic shadows, and halftone dot patterns for coloring. The overall mood should be gritty and heroic.',
  [Tool.VintageComic]: 'Transform this image into a vintage comic book panel. Emulate the distinct art style of classic Marvel and DC comics from the 1950s-1980s. Use Ben-Day dots for coloring, thick black inks for outlines, and a slightly aged, pulpy paper texture. The scene should feel like a snapshot from a classic superhero story.',
  [Tool.Logo]: 'Create a modern, minimalist logo for a tech startup called "Innovate" and place it on this image as a watermark.',
  [Tool.Mockup]: 'Place this image onto a laptop screen on a clean, wooden desk.',
  [Tool.Merge]: 'Seamlessly merge these two images. Blend the main subject from the first image into the background of the second image.',
};
