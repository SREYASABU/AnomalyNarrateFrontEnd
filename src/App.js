// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage'; // Import the LandingPage component
import ModelTestNo from './components/ModelTestNo'; // Import the ModelTest component
import Progress from './components/Progress';
import ModelTrainLanding from './components/ModelTrain';
import ModelTestLanding from './components/ModelTestLanding';
import ModelTestDetect from './components/ModelTestDetect';



function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Route for the Model Test page */}
        <Route path="/modeltestno" element={<ModelTestNo />} />

        <Route path="/progress" element={<Progress />} />

        <Route path="/modeltrainlanding" element={<ModelTrainLanding />} />

        <Route path="/modeltestlanding" element={<ModelTestLanding />} />

        <Route path="/modeltestdetect" element={<ModelTestDetect />} />


      </Routes>
    </Router>
  );
}

export default App;
