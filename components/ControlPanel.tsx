
import React from 'react';

interface ControlPanelProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  handleGeneration: () => void;
  isLoading: boolean;
  error: string | null;
  generatedText: string;
}

const GenerateIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v1.286a.75.75 0 00.75.75h2.25a.75.75 0 00.75-.75V5.25a.75.75 0 00-.75-.75 8.25 8.25 0 016.75 8.25.75.75 0 00.75.75h1.286a.75.75 0 00.707-.5 9.735 9.735 0 00.555-3.25 9.707 9.707 0 00-1.533-5.25zM4.94 18.75c-.324.033-.65.063-.98.089v1.286a.75.75 0 00.707.5 9.735 9.735 0 003.25.555 9.707 9.707 0 005.25-1.533.75.75 0 00-.5-.707H11.25a.75.75 0 00-.75.75v1.286a.75.75 0 00.75.75 8.25 8.25 0 01-8.25-6.75.75.75 0 00-.75-.75H1.204a.75.75 0 00-.5.707c.026.33.056.656.089.98zM18.75 4.94a.75.75 0 00-.707-.5 9.735 9.735 0 00-3.25-.555 9.707 9.707 0 00-5.25 1.533.75.75 0 00.5.707H12.75a.75.75 0 00.75-.75V5.25a.75.75 0 00-.75-.75 8.25 8.25 0 016.75 8.25.75.75 0 00.75.75h1.286a.75.75 0 00.707-.5c.205-1.108.324-2.25.324-3.411a9.748 9.748 0 00-.911-4.22z" />
    </svg>
);


const ControlPanel: React.FC<ControlPanelProps> = ({ prompt, setPrompt, handleGeneration, isLoading, error, generatedText }) => {
  return (
    <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700 shadow-inner flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the edit you want to make..."
          rows={3}
          className="flex-1 bg-gray-900/50 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 resize-none"
          disabled={isLoading}
        />
        <button
          onClick={handleGeneration}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
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
      {error && <div className="bg-red-900/50 border border-red-500 text-red-300 p-3 rounded-lg text-sm">{error}</div>}
      {generatedText && <div className="bg-gray-900/50 border border-gray-600 text-gray-300 p-3 rounded-lg text-sm"><p className="font-semibold text-cyan-400 mb-1">AI Response:</p>{generatedText}</div>}
    </div>
  );
};

export default ControlPanel;
