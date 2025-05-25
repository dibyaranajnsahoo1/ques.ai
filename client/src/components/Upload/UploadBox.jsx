

import React, { useState, useRef } from "react";
import cloudIcon from "../../assets/cloud_upload.png";

const UploadBox = () => {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState(null);

  const inputRef = useRef(null);

  // When files are dropped or selected
  const handleFiles = (files) => {
    if (files.length > 0) {
      // You can process the file here or upload it
      setFileName(files[0].name);
      // For now, just log the file
      console.log("File selected:", files[0]);
    }
  };

  // Drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Drop event
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  // File input change
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  // Trigger input click
  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <div
      className={`w-full border-[2px] rounded-lg shadow-lg h-auto ${
        dragActive ? "border-primary bg-gray-100" : "border-gray"
      }`}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleChange}
        accept=".mp4,.mov,.mp3,.wav,.pdf,.docx,.txt"
      />
      <div className="flex justify-center items-center md:my-5 my-2">
        <img src={cloudIcon} alt="Upload Icon" className="w-18 object-fill" />
      </div>

      <div className="text-center">
        <p className="font-roboto text-black text-md md:text-lg">
          Select a file or drag and drop here (Podcast Media or Transcription Text)
        </p>
        <p className="text-gray-500 text-xs md:text-sm">
          MP4, MOV, MP3, WAV, PDF, DOCX or TXT file
        </p>
        <button
          onClick={onButtonClick}
          className="border-primary border rounded-3xl py-[7px] px-4 mb-8 font-roboto font-semibold text-md text-primary my-4"
        >
          Select File
        </button>
        {fileName && (
          <p className="text-green-600 font-semibold">Selected File: {fileName}</p>
        )}
      </div>
    </div>
  );
};

export default UploadBox;
