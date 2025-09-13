
import React, { useState, useCallback } from 'react';
import { Tool } from './types';
import { PREDEFINED_PROMPTS, MODEL_NAME } from './constants';
import { editImage } from './services/geminiService';
import Header from './components/Header';
import ToolBar from './components/ToolBar';
import ImageWorkspace from './components/ImageWorkspace';
import ControlPanel from './components/ControlPanel';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<Tool>(Tool.Retouch);
  const [prompt, setPrompt] = useState<string>(PREDEFINED_PROMPTS[Tool.Retouch]);

  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [secondaryImage, setSecondaryImage] = useState<File | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [generatedText, setGeneratedText] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleToolSelect = useCallback((tool: Tool) => {
    setActiveTool(tool);
    setPrompt(PREDEFINED_PROMPTS[tool] || '');
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
              prompt={prompt}
              setPrompt={setPrompt}
              handleGeneration={handleGeneration}
              isLoading={isLoading}
              error={error}
              generatedText={generatedText}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
