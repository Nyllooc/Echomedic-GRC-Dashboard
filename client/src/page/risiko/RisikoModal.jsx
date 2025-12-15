import React, { useState, useEffect } from "react";
import axios from "axios";
import './Modal.css'

const RisikoModal = ({ isOpen, onClose, onSave, initialRisk = null }) => {
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [owner, setOwner] = useState("");
    const [probability, setProbability] = useState(3);
    const [consequence, setConsequence] = useState(3);
    const [status, setStatus] = useState("Åpen");


    const [isMounted, setIsMounted] = useState(false);
    const [shouldOpen, setShouldOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const score = probability * consequence;
    const isEditing = !!initialRisk;

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
            setTimeout(() => setShouldOpen(true), 10);

            if (initialRisk) {
                setDescription(initialRisk.description || "");
                setCategory(initialRisk.category || "");
                setOwner(initialRisk.owner || "");
                setStatus(initialRisk.status || "Åpen");

                setProbability(initialRisk.probability || 3);
                setConsequence(initialRisk.consequence || 3);
            } else {
                // Reset fields for new risk
                setDescription("");
                setCategory("");
                setOwner("");
                setProbability(3);
                setConsequence(3);
                setStatus("Åpen");
            }

            setIsSubmitting(false);
        } else {
            setShouldOpen(false);
            const timer = setTimeout(() => {
                setIsMounted(false);
            }, 300);

            return () => clearTimeout(timer);
        }
    }, [isOpen, initialRisk]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);

        const riskData = {
            id: isEditing ? initialRisk.id : `R-${Math.floor(Math.random() * 1000)}`,
            description,
            category,
            score,
            probability,
            consequence,
            owner,
            status,
            ownerAvatar: isEditing ? initialRisk.ownerAvatar : null
        };

        try {
            const response = await axios.post('/api/risk', riskData);

            onSave(riskData);
            onClose();

        } catch (error) {
            console.error("Error saving risk:", error);
            alert("Det oppstod en feil ved lagring av risikoen.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isMounted) return null;

    return (
        <>
            <div className="modal-overlay" onClick={onClose}></div>

            <div className={`slide-panel ${shouldOpen ? "open": "close"}`}>
                <div className="panel-header">
                    <div className="panel-header-top">
                        <span className="add-icon"></span>
                        <span className="header-label"></span>
                        <button className="close-btn" onClick={onClose}>✕</button>
                    </div>
                    <h2>{isEditing ? "Rediger risiko" : "Ny risiko"}</h2>
                </div>

                <div className="panel-content">
                    <form id="riskForm" onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label>ID</label>
                            <input
                                type="text"
                                value={isEditing ? initialRisk.id : "Genereres automatisk"}
                                disabled
                                className="input-disabled"
                            />
                        </div>

                        <div className="form-group">
                            <label>Risikobeskrivelse</label>
                            <textarea
                                placeholder="Beskriv risikoscenarioet..."
                                rows="3"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group half">
                                <label>Kategori</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                >
                                    <option value="" disabled>Velg kategori...</option>
                                    <option value="Cloud Security">Cloud Security</option>
                                    <option value="Access Control">Access Control</option>
                                    <option value="Physical">Physical</option>
                                    <option value="Personnel">Personnel</option>
                                    <option value="DevSecOps">DevSecOps</option>
                                </select>
                            </div>
                            <div className="form-group half">
                                <label>Risikoeier</label>
                                <input
                                    type="text"
                                    placeholder="f.eks. John Doe"
                                    value={owner}
                                    onChange={(e) => setOwner(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="assessment-box">
                            <div className="assessment-header">
                                <h3>Risikovurdering</h3>
                                <span className="auto-score">Auto-calculated Score: <strong>{score}</strong></span>
                            </div>

                            <div className="slider-group">
                                <div className="slider-label">
                                    <span>SANNSYNLIGHET (1-5)</span>
                                    <span>{probability} - {getLabel(probability)}</span>
                                </div>
                                <input
                                    type="range" min="1" max="5"
                                    value={probability}
                                    onChange={(e) => setProbability(Number(e.target.value))}
                                />
                            </div>

                            <div className="slider-group">
                                <div className="slider-label">
                                    <span>KONSEKVENS (1-5)</span>
                                    <span>{consequence} - {getLabel(consequence)}</span>
                                </div>
                                <input
                                    type="range" min="1" max="5"
                                    value={consequence}
                                    onChange={(e) => setConsequence(Number(e.target.value))}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Status</label>
                            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="Åpen">Åpen</option>
                                <option value="Pågår">Pågår</option>
                                <option value="Mitigert">Mitigert</option>
                                <option value="Akseptert">Akseptert</option>
                            </select>
                        </div>

                    </form>
                </div>

                <div className="panel-footer">
                    <button
                        type="submit"
                        form="riskForm"
                        className="btn-save"
                        disabled={isSubmitting}
                        style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                    >
                        {isSubmitting ? "Lagrer..." : "Lagre endringer"}
                    </button>
                    <button type="button" onClick={onClose} className="btn-cancel" disabled={isSubmitting}>
                        Avbryt
                    </button>
                </div>
            </div>
        </>
    );
};

const getLabel = (val) => {
    if (val === 1) return "LAV";
    if (val === 2) return "LAV/MIDDELS";
    if (val === 3) return "MIDDELS";
    if (val === 4) return "HØY";
    if (val === 5) return "KRITISK";
    return "";
};

export default RisikoModal;