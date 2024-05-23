import React, { useState, useRef } from "react";
import { Inbox } from "lucide-react";
import { cva } from "class-variance-authority";

export interface FileUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: "full" | "half";
  transparent?: boolean;
  onFileChange?: (files: File[]) => void;
  acceptedFiles?: string;
}

const uploadArea = cva(
  [
    "p-6",
    "border-2",
    "border-dashed",
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "relative",
  ],
  {
    variants: {
      width: {
        full: "w-full",
        half: "w-1/2",
      },
      transparent: {
        true: "bg-transparent",
        false: "bg-white",
      },
      progress: {
        none: "bg-white",
        loading: "bg-gray-100 border-blue-500",
        dragOver: "bg-gray-300",
      },
    },
    defaultVariants: {
      width: "full",
      transparent: false,
      progress: "none",
    },
  }
);

const FileUpload: React.FC<FileUploadProps> = ({
  width = "full",
  transparent = false,
  onFileChange,
  className,
  acceptedFiles = ".xlsx,.xls,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/pdf",
  ...props
}) => {
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isValidFileType = (file: File) => {
    return acceptedFiles
      .split(",")
      .some((type) => file.type === type || file.name.endsWith(type));
  };

  const handleFiles = (newFiles: FileList) => {
    const fileList = Array.from(newFiles).filter(isValidFileType);
    setFiles((prevFiles) => [...prevFiles, ...fileList]);
    fileList.forEach((file) => {
      const reader = new FileReader();
      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentLoaded = Math.round((event.loaded / event.total) * 100);
          setProgress(percentLoaded);
        }
      };
      reader.onloadstart = () => setProgress(0);
      reader.onloadend = () => setTimeout(() => setProgress(0), 500);
      reader.onerror = () => {
        alert("Failed to read file");
        setProgress(0);
      };
      reader.readAsDataURL(file);
    });
    if (onFileChange) {
      onFileChange(fileList);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div
      {...props}
      className={`${uploadArea({
        width,
        transparent,
        progress: isDragOver ? "dragOver" : progress > 0 ? "loading" : "none",
      })} ${className}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Inbox className="w-12 h-12 text-primary m-3" />
      <p className="text-center text-gray-500">
        Drag and Drop files here or click to select
      </p>
      <button
        onClick={() => fileInputRef.current?.click()}
        className="bg-primary text-white font-bold px-10 rounded my-3 py-2"
      >
        Select Files
      </button>
      <input
        ref={fileInputRef}
        type="file"
        className="sr-only"
        onChange={handleChange}
        multiple
        accept={acceptedFiles}
      />
      {progress > 0 && (
        <div className="absolute w-full px-4 bottom-0 left-0">
          <div className="bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-blue-600 h-1.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
      {files.length > 0 && (
        <ul className="list-disc flex w-full justify-center items-center">
          {files.map((file, index) => (
            <li
              key={index}
              className="flex items-center w-1/6 shadow-sm p-2 border rounded-lg border-slate-300 mx-1"
            >
              <span className="text-sm text-gray-600 truncate">
                {file.name}
              </span>
              <button
                onClick={() => handleRemoveFile(index)}
                className="text-red-500 hover:text-red-700"
              >
                X
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { FileUpload };
