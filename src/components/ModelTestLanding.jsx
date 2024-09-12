import React, { useState, useEffect } from 'react';
import './../css/ModelTestLanding.css';
import { useNavigate } from 'react-router-dom';

function App() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const [uploadResponse, setUploadResponse] = useState(null); // Store POST response
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

  // Handle drop event (restricting to video files only)
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('video/')); // Only accept video files
    if (files.length > 0) {
      setSelectedFiles(files);  // Store selected files
    } else {
      setUploadMessage('Please upload a valid video file');
    }
  };

  // Handle manual file selection (restricting to video files only)
  const handleFileSelection = (e) => {
    const files = Array.from(e.target.files).filter(file => file.type.startsWith('video/')); // Only accept video files
    if (files.length > 0) {
      setSelectedFiles(files);  // Store selected files
    } else {
      setUploadMessage('Please upload a valid video file');
    }
  };

  const handleStartTest = () => {
    if (selectedFiles && selectedFiles.length > 0) {
      Array.from(selectedFiles).forEach((file) => uploadFile(file));
    } else {
      setUploadMessage('Please select a video file first');
    }
  };

  // Upload file to the backend server
  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      // First fetch: Upload video
      const response = await fetch('http://127.0.0.1:5000', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setUploadMessage(result.message || 'Video uploaded successfully');
        setUploadResponse(result); // Store the response of the POST request
      } else {
        setUploadMessage('Error uploading video');
      }
    } catch (error) {
      setUploadMessage('Error uploading video: ' + error.message);
    }
  };

  // useEffect to perform GET request when the POST response changes
  useEffect(() => {
    if (!uploadResponse) return; // Do nothing if there's no POST response

    const pollServerForResult = async () => {
      try {
        const narrationResponse = await new Promise((resolve, reject) => {
          // Function to poll the server
          const poll = async () => {
            try {
              const res = await fetch('http://127.0.0.1:5001/result', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              });

              if (res.ok) {
                resolve(res); // Resolve when the result is available
              } else {
                setTimeout(poll, 3000); // Poll again after 3 seconds if no result
              }
            } catch (err) {
              reject(err); // Handle fetch errors
            }
          };
          poll(); // Start polling
        });

        // Once the narration response is received
        if (narrationResponse.ok) {
          const narrationResult = await narrationResponse.json();
          console.log(narrationResult);
          // Redirect to ModelTestDetect page with narration and video path
          navigate('/modeltestdetect', {
            state: {
              narration: narrationResult.narration,
              videoClipPath: narrationResult.video_clip_path,
            },
          });
        } else {
          setUploadMessage('Error generating narration');
        }
      } catch (error) {
        setUploadMessage('Error fetching narration: ' + error.message);
      }
    };

    // Start polling the server for result
    pollServerForResult();
  }, [uploadResponse, navigate]); // Trigger effect when 'uploadResponse' changes

  return (
    <div className="app-container">
      {/* Top container */}
      <div className="top-container">
        <h1>Sentinel AI By Abilytics</h1>
      </div>

      {/* Wrapping container for the Upload Data box */}
      <div className="upload-container">
        <h2 className="upload-heading">Upload Video</h2>
        <div
          className={`upload-box ${dragActive ? 'drag-active' : ''}`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <p>Drag & Drop your videos here</p>
          <p>or</p>
          <label htmlFor="file-upload" className="browse-files-btn">
            Browse Files
          </label>
          <input
            id="file-upload"
            type="file"
            accept="video/*"  // Accept only video files
            multiple
            onChange={handleFileSelection}
            style={{ display: 'none' }}
          />
        </div>

        {/* Start Test button outside the upload-box */}
        <button className="start-test-btn" onClick={handleStartTest}>
          Start Test
        </button>

        {/* Message Display */}
        {uploadMessage && <p className="upload-message">{uploadMessage}</p>}
      </div>

      {/* Bottom container */}
      <div className="bottom-container"></div>
    </div>
  );
}

export default App;
