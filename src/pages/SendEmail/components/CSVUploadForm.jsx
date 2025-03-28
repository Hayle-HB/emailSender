import React from "react";
import { HiOutlineUpload } from "react-icons/hi";

const CSVUploadForm = ({ onUpload, dragActive, setDragActive, darkMode }) => (
  <div
    className={`border-2 border-dashed rounded-2xl p-8
      ${
        dragActive
          ? "border-indigo-500"
          : darkMode
          ? "border-gray-700"
          : "border-gray-300"
      }`}
    onDragOver={(e) => {
      e.preventDefault();
      setDragActive(true);
    }}
    onDragLeave={() => setDragActive(false)}
    onDrop={(e) => {
      e.preventDefault();
      setDragActive(false);
      const file = e.dataTransfer.files[0];
      if (file) onUpload({ target: { files: [file] } });
    }}
  >
    <div className="text-center">
      <HiOutlineUpload
        className={`w-12 h-12 mx-auto mb-4
        ${darkMode ? "text-gray-400" : "text-gray-600"}`}
      />
      <p
        className={`text-lg mb-2 ${
          darkMode ? "text-gray-300" : "text-gray-700"
        }`}
      >
        Drag and drop your CSV file here, or
      </p>
      <input
        type="file"
        accept=".csv"
        className="hidden"
        id="csvInput"
        onChange={onUpload}
      />
      <label
        htmlFor="csvInput"
        className="inline-block px-4 py-2 bg-indigo-500 text-white
          rounded-lg cursor-pointer hover:bg-indigo-600 transition-colors"
      >
        Browse Files
      </label>
    </div>
  </div>
);

export default CSVUploadForm;
