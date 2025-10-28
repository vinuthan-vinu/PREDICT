
import React from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface FileUploadProps {
  fileName: string | null;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ fileName, onFileChange }) => (
  <div className="space-y-4">
    <h3 className="text-xl font-semibold text-teal-600">1. Upload Data</h3>
    <div className="relative border-2 border-dashed border-slate-400 rounded-lg p-6 text-center hover:border-teal-500 transition-colors duration-300">
      <div className="flex flex-col items-center justify-center space-y-2 text-slate-500">
        <UploadIcon className="w-10 h-10" />
        <p className="text-sm">
          <span className="font-semibold text-teal-600">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs">CSV file with comma-separated items</p>
      </div>
      <input
        type="file"
        accept=".csv,text/csv"
        onChange={onFileChange}
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        aria-label="Upload CSV file"
      />
    </div>
    {fileName && (
      <div className="bg-sky-200/50 p-3 rounded-md text-sm text-center text-slate-700 truncate">
        <span className="font-medium">File:</span> {fileName}
      </div>
    )}
  </div>
);
