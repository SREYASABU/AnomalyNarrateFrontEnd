import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './../css/ModelTrain.css';

function ModelTrain() {
  const [dragActive, setDragActive] = useState(false);
  const navigate = useNavigate();

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop event
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    console.log(files);  // handle the files as needed
  };

  // Handle manual file selection
  const handleFileSelection = (e) => {
    const files = e.target.files;
    console.log(files);  // handle the files as needed
  };

  // Handle start train button click
  const handleStartTrain = () => {
    navigate('/progress'); // Navigate to the /progress route
  };

  return (
    <div className="app-container">
      {/* Top container */}
      <div className="top-container">
        <h1>Sentinel AI By Abilytics</h1>
      </div>

      {/* Wrapping container for the Upload Data box */}
      <div className="upload-container">
        <h2 className="upload-heading">Upload Data</h2>
        <div
          className={`upload-box ${dragActive ? 'drag-active' : ''}`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <p>Drag & Drop your files here</p>
          <p>or</p>
          <label htmlFor="file-upload" className="browse-files-btn">
            Browse Files
          </label>
          <input
            id="file-upload"
            type="file"
            multiple
            onChange={handleFileSelection}
            style={{ display: 'none' }}
          />
        </div>

        {/* Start Train button outside the upload-box */}
        <button className="start-test-btn" onClick={handleStartTrain}>
          Start Train
        </button>
      </div>

      {/* Bottom container */}
      <div className="bottom-container"></div>
    </div>
  );
}

export default ModelTrain;
