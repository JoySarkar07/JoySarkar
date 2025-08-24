import { useState, useRef } from 'react';
import { uploadFileInServer } from '../services/apiServices';

const FileUpload = ({setMessage}) => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (selectedFile) => {
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    // Get the first file only since we only allow single file upload
    const droppedFile = e.dataTransfer.files[0];
    handleFileChange(droppedFile);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    setFile(null);
  };

  const uploadFile = async ()=>{
    if(!file) return;
    try{
        const response = await uploadFileInServer(file);
        setFile(null);
        setMessage(response.message);
    }catch(e){
        setMessage(e.message);
    }finally{
        setTimeout(() => {
            setMessage("");
        }, 2000);
    }
  }

  return (
    <div className="max-w-md mx-auto p-4">
      {/* Upload Container */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ease-in-out max-h-[30vh] overflow-hidden
          ${isDragging 
            ? 'border-indigo-500 bg-indigo-50 scale-[1.02] shadow-lg' 
            : 'border-gray-300 hover:border-gray-400 bg-white'
          }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        {/* Hidden file input - single file only */}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={(e) => handleFileChange(e.target.files[0])}
          accept="image/*,.pdf,.doc,.docx"
        />

        {file ? (
          // File preview when a file is selected
          <div className="flex flex-col items-center justify-center h-full">
            <div className="bg-green-100 rounded-full p-3 mb-3">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-lg font-medium text-gray-900 truncate max-w-xs">{file.name}</p>
            <p className="text-sm text-gray-500 mt-1">
              {(file.size / 1024).toFixed(1)} KB
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
              className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-md text-sm font-medium hover:bg-red-200 transition-colors"
            >
              Remove File
            </button>
          </div>
        ) : (
          // Upload prompt when no file is selected
          <div className="flex flex-col items-center justify-center h-full">
            <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors
              ${isDragging ? 'bg-indigo-100' : 'bg-gray-100'}`}>
              <svg className={`w-8 h-8 transition-colors ${isDragging ? 'text-indigo-600' : 'text-gray-400'}`} 
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-1">
                {isDragging ? 'Drop your file here' : 'Drag & drop your file'}
              </p>
              <p className="text-sm text-gray-500">
                or <span className="text-indigo-600 hover:text-indigo-700 cursor-pointer font-medium">browse files</span>
              </p>
            </div>
            
            <p className="text-xs text-gray-500 mt-4">
              Supports: PDF Only
            </p>
          </div>
        )}
      </div>

      {/* Upload button (only shows when file is selected) */}
      {file && (
        <div className="mt-4 flex justify-center">
          <button 
          onClick={uploadFile}
          className="px-6 py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition-colors shadow-md">
            Upload File
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;