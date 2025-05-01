// import React, { useState } from "react";
// import { FaCloudUploadAlt } from "react-icons/fa";
// import "./Upload.css";

// const Upload = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState("");
//   const [uploading, setUploading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       setPreviewUrl(URL.createObjectURL(file));
//       setSuccessMessage(""); // Reset message on new file selection
//     }
//   };

//   const handleUpload = () => {
//     if (!selectedFile) {
//       alert("Please select a file to upload!");
//       return;
//     }

//     setUploading(true);
//     setTimeout(() => {
//       setUploading(false);
//       setSuccessMessage(`File "${selectedFile.name}" uploaded successfully!`);
//       setSelectedFile(null);
//       setPreviewUrl("");
//     }, 2000); // Simulating upload delay
//   };

//   return (
//     <div className="upload-container">
//       <div className="upload-frame">
//         <h3>📤 Upload Your Datasheet</h3>
//         <p>Upload any type of file (CSV, PDF, JPG, PNG, DOCX, etc.) for secure storage and analysis.</p>
        
//         <div className="upload-box">
//           <input type="file" id="fileInput" onChange={handleFileChange} />
//           <label htmlFor="fileInput" className="file-label">
//             <FaCloudUploadAlt className="upload-icon" /> Choose a File
//           </label>
//         </div>

//         {selectedFile && <p className="file-name">📄 {selectedFile.name}</p>}

//         <button className="upload-btn" onClick={handleUpload} disabled={!selectedFile || uploading}>
//           {uploading ? "Uploading..." : "Upload File"}
//         </button>

//         {successMessage && <p className="success-message">{successMessage}</p>}

//         <h3>📌 Preview</h3>
//         {previewUrl ? (
//           <div className="preview">
//             <img src={previewUrl} alt="Preview" className="preview-image" />
//           </div>
//         ) : (
//           <p className="no-preview">No preview available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Upload;
// frontend/src/components/Upload.js
// frontend/src/components/Upload.js
import React, { useState } from "react";
import axios from "axios";
import { FaCloudUploadAlt, FaTimes, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Upload.css";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (file) => {
    if (!file) return;

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleInputChange = (event) => {
    handleFileChange(event.target.files[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setErrorMessage("Please select a file to upload!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("You must be logged in to upload files!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setUploading(true);
      setUploadProgress(0);
      const response = await axios.post(
        "http://localhost:5000/api/protected/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      setSuccessMessage(response.data.message);
      setSelectedFile(null);
      setPreviewUrl("");
      setUploadProgress(0);
      setTimeout(() => navigate("/files"), 2000);
    } catch (error) {
      console.error("Upload error:", error);
      const errorMsg = error.response?.data?.error || error.message;
      setErrorMessage(`Failed to upload file: ${errorMsg}`);
    } finally {
      setUploading(false);
    }
  };

  const getFileIcon = (filename) => {
    const extension = filename?.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "pdf":
        return <img src="/icons/pdf-icon.png" alt="PDF" className="preview-icon" />;
      case "csv":
        return <img src="/icons/csv-icon.png" alt="CSV" className="preview-icon" />;
      case "jpg":
      case "jpeg":
      case "png":
        return <img src={previewUrl} alt="Preview" className="preview-image" />;
      default:
        return <img src="/icons/file-icon.png" alt="File" className="preview-icon" />;
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-frame animate-fade-in">
        <button
          className="back-btn"
          onClick={() => navigate("/files")}
          title="Back to Files"
        >
          <FaArrowLeft /> Back
        </button>
        <h3>📤 Upload Your Datasheet</h3>
        <p>Upload CSV, PDF, JPG, PNG, or other files for secure storage and analysis.</p>

        <div
          className={`upload-box ${isDragging ? "dragging" : ""}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            type="file"
            id="fileInput"
            onChange={handleInputChange}
            accept=".csv,.pdf,.png,.jpg,.jpeg"
            disabled={uploading}
          />
          <label htmlFor="fileInput" className="file-label">
            <FaCloudUploadAlt className="upload-icon" />
            {isDragging ? "Drop File Here" : "Choose or Drag a File"}
          </label>
        </div>

        {selectedFile && (
          <div className="file-info">
            <p className="file-name">📄 {selectedFile.name}</p>
            <button className="clear-btn" onClick={handleClearFile}>
              <FaTimes /> Clear
            </button>
          </div>
        )}

        <button
          className="upload-btn"
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
        >
          {uploading ? `Uploading (${uploadProgress}%)` : "Upload File"}
        </button>

        {uploading && (
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}

        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <h3>📌 Preview</h3>
        {previewUrl ? (
          <div className="preview animate-pulse">
            {getFileIcon(selectedFile?.name)}
          </div>
        ) : (
          <p className="no-preview">No preview available.</p>
        )}
      </div>
    </div>
  );
};

export default Upload;