import React, { useState } from "react";

const AvatarUpload = ({ onFileSelect }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onFileSelect(file);
    }
  };

  return (
    <div style={{ marginTop: 8 }}>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && (
        <div style={{ marginTop: 8 }}>
          <img src={preview} alt="Avatar Preview" style={{ width: 80, height: 80, borderRadius: "50%" }} />
        </div>
      )}
    </div>
  );
};

export default AvatarUpload;
