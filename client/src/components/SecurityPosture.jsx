import React from 'react';

const SecurityPosture = () => (
    <div className="security-posture-section">
        <h2 className="security-posture-title">Oversikt over sikkerhetstilstand</h2>
        <div className="security-posture-container">
            <div className="posture-card device-monitoring">
                <h3 className="card-title">RisikoRegister</h3>
                <div className="status-list">
                    <div className="status-item">
                        <span className="status-icon compliant">✅</span>
                        <span className="status-text">Samsvarer</span>
                        <span className="status-count">21</span>
                    </div>
                    <div className="status-item">
                        <span className="status-icon attention">⚠️</span>
                        <span className="status-text">Krever handling</span>
                        <span className="status-count">0</span>
                    </div>
                    <div className="status-item">
                        <span className="status-icon dormant">💤</span>
                        <span className="status-text">Inaktiv</span>
                        <span className="status-count">2</span>
                    </div>
                </div>
            </div>
            <div className="posture-card security-policies">
                <h3 className="card-title">Onboarding</h3>
                <div className="status-list">
                    <div className="status-item">
                        <span className="status-icon attention">🚨</span>
                        <span className="status-text">Ufullstendige retningslinjer</span>
                        <span className="status-count red-text">3</span>
                    </div>
                    <div className="status-item">
                        <span className="status-icon compliant">✔️</span>
                        <span className="status-text">Ferdig signerte retningslinjer</span>
                        <span className="status-count green-text">11</span>
                    </div>
                    <div className="status-item">
                        <span className="status-icon draft">📝</span>
                        <span className="status-text">Utkast</span>
                        <span className="status-count gray-text">1</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default SecurityPosture;