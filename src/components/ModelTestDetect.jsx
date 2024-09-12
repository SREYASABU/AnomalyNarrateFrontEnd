import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './../css/ModelTestDetect.css';

function ModelTestDetect() {
  const [videoSrc, setVideoSrc] = useState('');
  const [narration, setNarration] = useState('');
  const location = useLocation();

  useEffect(() => {
    // Try to get data from location state first
    const { narration: stateNarration, videoClipPath } = location.state || {};
    console.log(narration);
    if (stateNarration && videoClipPath) {
      setNarration(stateNarration);
      setVideoSrc(videoClipPath);
    } else {
      // If not available in state, fetch from the API
      fetchData();
    }
  }, [location]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5001/'); // Adjust endpoint as needed
      if (response.ok) {
        const data = await response.json();
        setVideoSrc(data.video_clip_path);
        setNarration(data.narration);
      } else {
        console.error('Failed to fetch video and narration');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>SentinelAI by Abilytics</h1>
      </header>

      <div className="content">
        <h2 className="model-test">MODEL TEST</h2>

        <div className="card">
          <h3 className="card-title">Anomaly Detected</h3>

          <div className="video-box">
            {videoSrc && (
              <video width="100%" height="200" controls>
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>

          <p className="narration">{narration}</p>
        </div>
      </div>
    </div>
  );
}

export default ModelTestDetect;