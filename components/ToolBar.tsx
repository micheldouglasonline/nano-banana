import React from 'react';
import { Tool } from '../types';

interface ToolBarProps {
  activeTool: Tool;
  onSelectTool: (tool: Tool) => void;
}

const ToolIcon: React.FC<{ tool: Tool }> = ({ tool }) => {
  // FIX: Remove explicit type annotation to avoid "Cannot find namespace 'JSX'" error.
  // The type is correctly inferred by TypeScript.
  const iconMap: Record<Tool, JSX.Element> = {
    [Tool.Retouch]: <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.998 15.998 0 011.622-3.385m5.043.025a15.998 15.998 0 001.622-3.385m3.388 1.62a15.998 15.998 0 00-1.62-3.385m-5.043-.025a15.998 15.998 0 01-3.388-1.621m7.704 2.245a4.5 4.5 0 00-8.4-2.245 2.25 2.25 0 01-2.4-2.245 4.5 4.5 0 002.245-8.4 2.25 2.25 0 012.245-2.4 4.5 4.5 0 008.4 2.245 2.25 2.25 0 012.4 2.245 4.5 4.5 0 00-2.245 8.4z" />,
    [Tool.AddElement]: <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />,
    [Tool.Restore]: <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-11.667 0l-3.181 3.183" />,
    [Tool.ComicStyle]: <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.17 48.17 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />,
    [Tool.Logo]: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    [Tool.Mockup]: <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-1.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />,
    [Tool.Merge]: <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />,
  };
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">{iconMap[tool]}</svg>;
};

const ToolBar: React.FC<ToolBarProps> = ({ activeTool, onSelectTool }) => {
  const tools = Object.values(Tool);

  return (
    <aside className="bg-gray-900/30 border-r border-cyan-500/20 p-2 lg:p-4 flex lg:flex-col items-center lg:items-start gap-2 overflow-x-auto lg:overflow-x-visible">
      <h2 className="hidden lg:block text-sm font-bold text-cyan-400 uppercase tracking-wider mb-4 font-orbitron">Tools</h2>
      <div className="flex lg:flex-col gap-2">
        {tools.map((tool) => (
          <button
            key={tool}
            onClick={() => onSelectTool(tool)}
            className={`flex items-center gap-3 w-full p-3 rounded-lg text-sm transition-all duration-200 ease-in-out group ${
              activeTool === tool
                ? 'bg-cyan-500/20 text-cyan-300 shadow-md shadow-cyan-500/10'
                : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
            }`}
            title={tool}
          >
            <ToolIcon tool={tool} />
            <span className="hidden lg:inline whitespace-nowrap">{tool}</span>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default ToolBar;