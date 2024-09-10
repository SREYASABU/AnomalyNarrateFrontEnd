import React from 'react';
import { Link } from 'react-router-dom';
import './../css/LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-page">
      <header className="header">
        <h1>SentinelAI by Abilytics</h1>
      </header>

      <section className="about-section">
        <h2>About</h2>
        <p>
          SentinelAI provides a one-size-fits-all solution for CCTV video anomaly detection. 
          Train your non-normal dataset with our model and we help you detect anything out of the ordinary 
          in live feed or uploaded videos.
        </p>
      </section>

      <section className="steps-section">
        <div className="steps-vertical">
          {/* Step 1 */}
          <div className="step">
            <div className="step-left">
              <div className="step-number">01</div>
              <div className="step-connector"></div>
            </div>
            <div className="step-right">
              <h3>TRAINING</h3>
              <p>Upload your dataset as Zip file and start the training.</p>
              <button className="btn">Train Data</button>
            </div>
          </div>

          {/* Step 2 */}
          <div className="step">
            <div className="step-left">
              <div className="step-number">02</div>
              <div className="step-connector"></div>
            </div>
            <div className="step-right">
              <h3>TEST</h3>
              <p>Upload a known anomaly video to test the model accuracy.</p>
              <Link to="/model-test">
                <button className="btn">Test Data</button>
              </Link>
            </div>
          </div>

          {/* Step 3 */}
          <div className="step">
            <div className="step-left">
              <div className="step-number">03</div>
              <div className="step-connector"></div>
            </div>
            <div className="step-right">
              <h3>INTEGRATE</h3>
              <p>Get in touch with our team to integrate SentinelAI to your surveillance solution.</p>
              <button className="btn">Get in Touch</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
