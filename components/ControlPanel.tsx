
import React from 'react';
import { Tool } from '../types';

interface ControlPanelProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  handleGeneration: () => void;
  isLoading: boolean;
  error: string | null;
  generatedText: string;
  activeTool: Tool;
  companyName: string;
  setCompanyName: (name: string) => void;
  logoStyle: string;
  setLogoStyle: (style: string) => void;
  comicStory: string;
  setComicStory: (story: string) => void;
  mockupType: string;
  setMockupType: (type: string) => void;
  mockupContext: string;
  setMockupContext: (context: string) => void;
}

const GenerateIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v1.286a.75.75 0 00.75.75h2.25a.75.75 0 00.75-.75V5.25a.75.75 0 00-.75-.75 8.25 8.25 0 016.75 8.25.75.75 0 00.75.75h1.286a.75.75 0 00.707-.5 9.735 9.735 0 00.555-3.25 9.707 9.707 0 00-1.533-5.25zM4.94 18.75c-.324.033-.65.063-.98.089v1.286a.75.75 0 00.707.5 9.735 9.735 0 003.25.555 9.707 9.707 0 005.25-1.533.75.75 0 00-.5-.707H11.25a.75.75 0 00-.75.75v1.286a.75.75 0 00.75.75 8.25 8.25 0 01-8.25-6.75.75.75 0 00-.75-.75H1.204a.75.75 0 00-.5.707c.026.33.056.656.089.98zM18.75 4.94a.75.75 0 00-.707-.5 9.735 9.735 0 00-3.25-.555 9.707 9.707 0 00-5.25 1.533.75.75 0 00.5.707H12.75a.75.75 0 00.75-.75V5.25a.75.75 0 00-.75-.75 8.25 8.25 0 016.75 8.25.75.75 0 00.75.75h1.286a.75.75 0 00.707-.5c.205-1.108.324-2.25.324-3.411a9.748 9.748 0 00-.911-4.22z" />
    </svg>
);


const ControlPanel: React.FC<ControlPanelProps> = ({ 
    prompt, 
    setPrompt, 
    handleGeneration, 
    isLoading, 
    error, 
    generatedText,
    activeTool,
    companyName,
    setCompanyName,
    logoStyle,
    setLogoStyle,
    comicStory,
    setComicStory,
    mockupType,
    setMockupType,
    mockupContext,
    setMockupContext
}) => {
  return (
    <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700 shadow-inner flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4 items-start">
        {activeTool === Tool.Logo ? (
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-300 mb-2">Company Name</label>
                    <input
                        id="companyName"
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g., Innovate"
                        className="w-full bg-gray-900/50 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200"
                        disabled={isLoading}
                        aria-label="Company Name"
                    />
                </div>
                <div>
                    <label htmlFor="logoStyle" className="block text-sm font-medium text-gray-300 mb-2">Logo Style</label>
                    <input
                        id="logoStyle"
                        type="text"
                        value={logoStyle}
                        onChange={(e) => setLogoStyle(e.target.value)}
                        placeholder="e.g., modern, minimalist"
                        className="w-full bg-gray-900/50 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200"
                        disabled={isLoading}
                        aria-label="Logo Style"
                    />
                </div>
            </div>
        ) : activeTool === Tool.ComicStyle ? (
            <div className="flex-1">
                <label htmlFor="comicStory" className="block text-sm font-medium text-gray-300 mb-2">Story / Scene Description</label>
                <textarea
                    id="comicStory"
                    value={comicStory}
                    onChange={(e) => setComicStory(e.target.value)}
                    placeholder="Describe the comic book scene..."
                    rows={4}
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 resize-none"
                    disabled={isLoading}
                    aria-label="Story or Scene Description for Comic Style"
                />
            </div>
        ) : activeTool === Tool.Mockup ? (
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="mockupType" className="block text-sm font-medium text-gray-300 mb-2">Mockup Type</label>
                    <div className="relative">
                        <select
                            id="mockupType"
                            value={mockupType}
                            onChange={(e) => setMockupType(e.target.value)}
                            className="w-full bg-gray-900/50 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 appearance-none pr-8"
                            disabled={isLoading}
                            aria-label="Mockup Type"
                        >
                            <option value="laptop screen">Laptop</option>
                            <option value="smartphone screen">Smartphone</option>
                            <option value="t-shirt">T-Shirt</option>
                            <option value="mug">Mug</option>
                            <option value="billboard">Billboard</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>
                <div>
                    <label htmlFor="mockupContext" className="block text-sm font-medium text-gray-300 mb-2">Context / Environment</label>
                    <input
                        id="mockupContext"
                        type="text"
                        value={mockupContext}
                        onChange={(e) => setMockupContext(e.target.value)}
                        placeholder="e.g., on a clean, wooden desk"
                        className="w-full bg-gray-900/50 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200"
                        disabled={isLoading}
                        aria-label="Mockup Context"
                    />
                </div>
            </div>
        ) : (
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the edit you want to make..."
                rows={4}
                className="flex-1 bg-gray-900/50 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 resize-none"
                disabled={isLoading}
                aria-label="Prompt for image generation"
            />
        )}
        <button
          onClick={handleGeneration}
          disabled={isLoading || !prompt.trim()}
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 md:mt-9"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Generating...</span>
            </>
          ) : (
            <>
                <GenerateIcon />
                <span>Generate</span>
            </>
          )}
        </button>
      </div>
      {error && <div role="alert" className="bg-red-900/50 border border-red-500 text-red-300 p-3 rounded-lg text-sm">{error}</div>}
      {generatedText && <div role="status" className="bg-gray-900/50 border border-gray-600 text-gray-300 p-3 rounded-lg text-sm"><p className="font-semibold text-cyan-400 mb-1">AI Response:</p>{generatedText}</div>}
    </div>
  );
};

export default ControlPanel;
