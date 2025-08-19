

import React, { useState, useRef } from "react";

const AvatarUpload = ({ onFileSelect }) => {
  const [fileName, setFileName] = useState("");
  const inputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  return (
    <div style={{ marginTop: 8 }}>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <button
        type="button"
        onClick={() => inputRef.current && inputRef.current.click()}
        style={{

          padding: "8px 16px",
          background: "#BB8588",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",

        }}
      >
        Choose File
      </button>
      <span style={{ marginLeft: 10 }}>{fileName || "No file chosen"}</span>
  {/* Image preview removed */}
    </div>
  );
};

export default AvatarUpload;
