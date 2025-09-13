
import React from 'react';

const DnaIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M4.25 4.75a.75.75 0 000 1.5h1.531c.294 0 .583.123.783.344l1.32 1.485A5.25 5.25 0 0110.5 10.5h3a5.25 5.25 0 012.635-2.421l1.32-1.485c.2-.221.489-.344.784-.344H19.75a.75.75 0 000-1.5h-1.531c-.294 0-.583.123-.783.344l-1.32 1.485A5.25 5.25 0 0113.5 7.5h-3a5.25 5.25 0 01-2.635 2.421L6.544 8.434A.75.75 0 005.78 8.75H4.25a.75.75 0 00-.75.75v11a.75.75 0 001.5 0V10.25h1.531c.294 0 .583-.123.783-.344l1.32-1.485A5.25 5.25 0 0110.5 6h3a5.25 5.25 0 012.635 2.421l1.32 1.485c.2.221.489.344.784.344H19.75a.75.75 0 000 1.5h-1.531c-.294 0-.583-.123-.783-.344l-1.32-1.485A5.25 5.25 0 0113.5 10.5h-3a5.25 5.25 0 01-2.635-2.421l-1.32-1.485a.75.75 0 00-.764-.344H4.25a.75.75 0 00-.75-.75V4.75z" clipRule="evenodd" />
    </svg>
);

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/50 backdrop-blur-sm border-b border-cyan-500/20 shadow-lg shadow-cyan-500/10 p-4 flex items-center justify-center relative z-20">
      <div className="flex items-center gap-3">
        <DnaIcon className="w-8 h-8 text-cyan-400" />
        <h1 className="text-xl md:text-2xl font-bold font-orbitron tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
          Michel Douglas Online
        </h1>
      </div>
    </header>
  );
};

export default Header;
