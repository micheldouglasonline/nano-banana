
import React from 'react';
import { Tool } from '../types';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  title: string;
  id: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, title, id }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onImageUpload(event.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => e.preventDefault();
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <label
        htmlFor={id}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-xl cursor-pointer bg-gray-800/50 hover:bg-gray-800/80 hover:border-cyan-500 transition-all duration-300"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
            <svg className="w-10 h-10 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">{title}</span> or drag and drop</p>
            <p className="text-xs text-gray-500">PNG, JPG, WEBP</p>
        </div>
        <input id={id} type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} />
      </label>
    </div>
  );
};

interface ImageDisplayProps {
  file: File | null;
  editedImageSrc: string | null;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ file, editedImageSrc }) => {
  if (!file) return null;
  return (
    <div className="w-full h-full p-2 bg-black/30 rounded-lg flex items-center justify-center overflow-hidden">
      <img
        src={editedImageSrc || URL.createObjectURL(file)}
        alt={editedImageSrc ? 'Edited result' : 'Original upload'}
        className="max-w-full max-h-full object-contain rounded-md"
      />
    </div>
  );
};

const LoadingSpinner: React.FC = () => (
    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-10 rounded-xl backdrop-blur-sm">
        <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-orbitron tracking-wider text-cyan-300">Generating Reality...</p>
    </div>
);


interface ImageWorkspaceProps {
  originalImage: File | null;
  setOriginalImage: (file: File) => void;
  secondaryImage: File | null;
  setSecondaryImage: (file: File) => void;
  editedImage: string | null;
  isLoading: boolean;
  activeTool: Tool;
  resetWorkspace: () => void;
}

const ImageWorkspace: React.FC<ImageWorkspaceProps> = (props) => {
  const { originalImage, setOriginalImage, secondaryImage, setSecondaryImage, editedImage, isLoading, activeTool, resetWorkspace } = props;

  return (
    <div className="bg-gray-800/30 rounded-xl flex-1 flex flex-col border border-gray-700 shadow-inner">
      {!originalImage ? (
        <div className="flex-1 flex items-center justify-center">
            <ImageUploader onImageUpload={setOriginalImage} title="Click to upload Original Image" id="uploader-main" />
        </div>
      ) : (
        <div className="p-4 flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 relative">
          {isLoading && <LoadingSpinner />}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
                <h3 className="font-orbitron text-gray-400">Original</h3>
                <button onClick={resetWorkspace} className="text-xs text-red-400 hover:text-red-300 transition-colors">Reset</button>
            </div>
            <ImageDisplay file={originalImage} editedImageSrc={null} />
            {activeTool === Tool.Merge && (
              <div className="flex-1 flex flex-col mt-2">
                <h3 className="font-orbitron text-gray-400 mb-2">Image to Merge</h3>
                {secondaryImage ? <ImageDisplay file={secondaryImage} editedImageSrc={null} /> : <ImageUploader onImageUpload={setSecondaryImage} title="Upload second image" id="uploader-secondary" />}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-orbitron text-cyan-400">Result</h3>
            {editedImage ? (
              <>
                <ImageDisplay file={originalImage} editedImageSrc={editedImage} />
                <a 
                    href={editedImage} 
                    download="edited-image.png"
                    className="mt-2 w-full text-center bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                >
                    Download Image
                </a>
              </>
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-black/30 rounded-lg border-2 border-dashed border-gray-700">
                    <p className="text-gray-500">AI Generated image will appear here</p>
                </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageWorkspace;
