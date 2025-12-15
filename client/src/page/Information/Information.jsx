import React from "react";
import './information.css';
import tutorial from '../../data/information.json'

const Information = () => {

    const guides = tutorial


    return (
        <div className="main-content">
            {/* Header Section */}
            <div className="dashboard-header">
                <div className="header-text">
                    <h1 className="dashboard-title">Brukermanual & Veiledning</h1>
                    <p className="header-subtitle">Lær hvordan du bruker Compliance-plattformen effektivt.</p>
                </div>
            </div>

            <div className="info-banner">
                <div className="info-banner-content">
                    <h2>Velkommen til din nye sikkerhetsportal</h2>
                    <p>
                        Dette verktøyet hjelper din bedrift med å opprettholde ISO-sertifisering og
                        holde oversikt over internkontroll. Nedenfor finner du en guide til de viktigste funksjonene.
                    </p>
                </div>

            </div>

            <div className="guide-grid">
                {guides.map((guide) => (
                    <div key={guide.id} className="card guide-card">
                        <div className="guide-header">
                            <div className="guide-icon-circle">{guide.icon}</div>
                            <h3>{guide.title}</h3>
                        </div>
                        <p className="guide-description">{guide.description}</p>
                        <div className="guide-steps">
                            {guide.steps.map((step, index) => (
                                <div key={index} className="step-item">
                                    <span className="step-number">{index + 1}</span>
                                    <span className="step-text">{step}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="faq-section card">
                <h3>Trenger du mer hjelp?</h3>
                <div className="faq-content">
                    <div className="faq-item">
                        <h4>📧 Kontakt Support</h4>
                        <p>Send en e-post til support@echomedic.no for tekniske spørsmål.</p>
                    </div>
                    <div className="faq-item">
                        <h4>📄 Dokumentasjon</h4>
                        <p>Last ned full PDF-dokumentasjon for revisorer her.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Information;