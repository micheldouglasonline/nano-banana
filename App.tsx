
import React, { useState, useCallback, useEffect } from 'react';
import { Tool } from './types';
import { PREDEFINED_PROMPTS } from './constants';
import { editImage } from './services/geminiService';
import Header from './components/Header';
import ToolBar from './components/ToolBar';
import ImageWorkspace from './components/ImageWorkspace';
import ControlPanel from './components/ControlPanel';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<Tool>(Tool.Retouch);
  const [prompt, setPrompt] = useState<string>(PREDEFINED_PROMPTS[Tool.Retouch]);

  // State for logo generation
  const [companyName, setCompanyName] = useState<string>('Innovate');
  const [logoStyle, setLogoStyle] = useState<string>('modern, minimalist');

  // State for comic style generation
  const [comicStory, setComicStory] = useState<string>('A superhero landing dramatically in a rainy city street at night.');

  // State for mockup generation
  const [mockupType, setMockupType] = useState<string>('laptop screen');
  const [mockupContext, setMockupContext] = useState<string>('on a clean, wooden desk');

  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [secondaryImage, setSecondaryImage] = useState<File | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [generatedText, setGeneratedText] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Effect to update prompt for logo tool
  useEffect(() => {
    if (activeTool === Tool.Logo) {
      if (companyName.trim() && logoStyle.trim()) {
        setPrompt(`Create a ${logoStyle} logo for a company called "${companyName}" and place it on this image as a watermark.`);
      } else {
        // Clear prompt if inputs are empty to avoid sending a broken prompt and to disable the generate button
        setPrompt('');
      }
    }
  }, [companyName, logoStyle, activeTool]);

  // Effect to update prompt for Comic Style tool
  useEffect(() => {
    if (activeTool === Tool.ComicStyle) {
      if (comicStory.trim()) {
        setPrompt(`Transform this image into a retro Marvel and DC comic style panel, incorporating the following story: "${comicStory}". Use bold lines, dramatic shadows, and halftone dot patterns for coloring. The overall mood should be gritty and heroic.`);
      } else {
        setPrompt('');
      }
    }
  }, [comicStory, activeTool]);
  
  // Effect to update prompt for Mockup tool
  useEffect(() => {
    if (activeTool === Tool.Mockup) {
      if (mockupType.trim() && mockupContext.trim()) {
        setPrompt(`Place this image onto a ${mockupType} ${mockupContext}.`);
      } else {
        setPrompt('');
      }
    }
  }, [mockupType, mockupContext, activeTool]);


  const handleToolSelect = useCallback((tool: Tool) => {
    setActiveTool(tool);
    setPrompt(PREDEFINED_PROMPTS[tool] || '');
    if (tool === Tool.Logo) {
      setCompanyName('Innovate');
      setLogoStyle('modern, minimalist');
    } else if (tool === Tool.ComicStyle) {
      setComicStory('A superhero landing dramatically in a rainy city street at night.');
    } else if (tool === Tool.Mockup) {
      setMockupType('laptop screen');
      setMockupContext('on a clean, wooden desk');
    }
    // Reset secondary image if not in merge mode
    if (tool !== Tool.Merge) {
      setSecondaryImage(null);
    }
    // Clear previous results when switching tools
    setEditedImage(null);
    setGeneratedText('');
  }, []);

  const handleGeneration = useCallback(async () => {
    if (!originalImage) {
      setError('Please upload an original image first.');
      return;
    }
    if (activeTool === Tool.Merge && !secondaryImage) {
      setError('Please upload a secondary image for merging.');
      return;
    }
     if (!prompt.trim()) {
      setError('Prompt cannot be empty. Please describe your edit or fill in the details.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEditedImage(null);
    setGeneratedText('');

    try {
      const result = await editImage(prompt, originalImage, activeTool === Tool.Merge ? secondaryImage : undefined);
      if (result.image) {
        setEditedImage(`data:image/png;base64,${result.image}`);
      }
      setGeneratedText(result.text || 'No text was generated.');
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, secondaryImage, activeTool, prompt]);
  
  const resetWorkspace = () => {
    setOriginalImage(null);
    setSecondaryImage(null);
    setEditedImage(null);
    setGeneratedText('');
    setError(null);
    setIsLoading(false);
    handleToolSelect(Tool.Retouch);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col">
      <Header />
      <div className="flex flex-1 flex-col lg:flex-row overflow-hidden">
        <ToolBar activeTool={activeTool} onSelectTool={handleToolSelect} />
        <main className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 gap-6 overflow-y-auto">
          <ImageWorkspace
            originalImage={originalImage}
            setOriginalImage={setOriginalImage}
            secondaryImage={secondaryImage}
            setSecondaryImage={setSecondaryImage}
            editedImage={editedImage}
            isLoading={isLoading}
            activeTool={activeTool}
            resetWorkspace={resetWorkspace}
          />
          {originalImage && (
            <ControlPanel
              activeTool={activeTool}
              prompt={prompt}
              setPrompt={setPrompt}
              handleGeneration={handleGeneration}
              isLoading={isLoading}
              error={error}
              generatedText={generatedText}
              companyName={companyName}
              setCompanyName={setCompanyName}
              logoStyle={logoStyle}
              setLogoStyle={setLogoStyle}
              comicStory={comicStory}
              setComicStory={setComicStory}
              mockupType={mockupType}
              setMockupType={setMockupType}
              mockupContext={mockupContext}
              setMockupContext={setMockupContext}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
