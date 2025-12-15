import React, { useEffect, useState } from "react";
import axios from "axios";
import RisikoModal from "./RisikoModal.jsx";
import './risiko.css'

const RisikoRegister = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [risks, setRisks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRisk, setEditingRisk] = useState(null);

    useEffect(() => {
        const fetchRisks = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get("/api/risk");
                setRisks(Array.isArray(response.data) ? response.data : []);
                setError(null);
            } catch (err) {
                console.error("Error fetching risks:", err);
                setError("Kunne ikke laste inn risikoregisteret.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchRisks();
    }, []);

    const handleOpenNewRisk = () => {
        setEditingRisk(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (risk) => {
        setEditingRisk(risk);
        setIsModalOpen(true);
    };

    const handleDeleteRisk = async (id) => {
        if (!window.confirm("Er du sikker på at du vil slette denne risikoen?")) {
            return;
        }

        try {
            await axios.delete(`/api/risk/${id}`);

            setRisks((prevRisks) => prevRisks.filter((risk) => risk.id !== id));
        } catch (err) {
            console.error("Error deleting risk:", err);
            alert("Kunne ikke slette risikoen. Prøv igjen senere.");
        }
    };

    const handleSaveRisk = (savedRisk) => {
        setRisks((prevRisks) => {
            const exists = prevRisks.find((r) => r.id === savedRisk.id);

            if (exists) {
                return prevRisks.map((r) => (r.id === savedRisk.id ? savedRisk : r));
            } else {
                return [savedRisk, ...prevRisks];
            }
        });
    };

    const filteredRisks = risks.filter((risk) =>
        (risk.description || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getScoreClass = (score) => {
        if (score >= 20) return "score-critical";
        if (score >= 10) return "score-medium";
        return "score-low";
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "Åpen": return "status-open";
            case "Pågår": return "status-progress";
            case "Akseptert": return "status-accepted";
            case "Mitigert": return "status-mitigated";
            default: return "";
        }
    };

    return (
        <div className="risk-page-container">
            <div className="risk-header">
                <div className="risk-header-text">
                    <h1>Risikoregister</h1>
                </div>
                <button className="btn-new-risk" onClick={handleOpenNewRisk}>
                    <span>+</span> Ny risiko
                </button>
            </div>

            <div className="risk-card">
                <div className="risk-toolbar">
                    <div className="search-wrapper">
                        <input
                            type="text"
                            placeholder="Søk i risikoer..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="risk-search-input"
                        />
                    </div>
                </div>

                <div className="risk-table-container">
                    {isLoading && <div style={{padding: "20px"}}>Laster inn risikoer...</div>}

                    {error && <div style={{padding: "20px", color: "red"}}>{error}</div>}

                    {!isLoading && !error && (
                        <table className="risk-table">
                            <thead>
                            <tr>
                                <th style={{ width: "80px" }}>ID</th>
                                <th>BESKRIVELSE</th>
                                <th>KATEGORI</th>
                                <th>SCORE</th>
                                <th>EIER</th>
                                <th>STATUS</th>
                                <th style={{ width: "100px" }}>HANDLINGER</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredRisks.length > 0 ? (
                                filteredRisks.map((risk) => (
                                    <tr key={risk.id || Math.random()}>
                                        <td className="risk-id-cell">
                                            <span className="risk-id-badge">{risk.id}</span>
                                        </td>
                                        <td>
                                            <div className="risk-desc-cell">
                                                <span className="risk-description">
                                                    {risk.description || "Ingen beskrivelse"}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="text-subtle">{risk.category}</td>
                                        <td>
                                            <div className={`risk-score ${getScoreClass(risk.score)}`}>
                                                {risk.score}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="owner-cell">
                                                {risk.ownerAvatar ? (
                                                    <img src={risk.ownerAvatar} alt={risk.owner} className="owner-avatar" />
                                                ) : (
                                                    <div className="owner-avatar placeholder">
                                                        {risk.owner ? risk.owner.charAt(0) : "?"}
                                                    </div>
                                                )}
                                                <span>{risk.owner}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`status-badge ${getStatusClass(risk.status)}`}>
                                              {risk.status}
                                            </span>
                                        </td>
                                        <td className="actions-cell">
                                            <button
                                                className="handle-btn"
                                                title="Rediger"
                                                onClick={() => handleEditClick(risk)}
                                                style={{ marginRight: "8px" }}
                                            >
                                                ✎
                                            </button>
                                            <button
                                                className="handle-btn delete-btn"
                                                title="Slett"
                                                onClick={() => handleDeleteRisk(risk.id)}
                                                style={{ color: "#d32f2f" }}
                                            >
                                                🗑️
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                                        Ingen risikoer funnet.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            <RisikoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveRisk}
                initialRisk={editingRisk}
            />
        </div>
    );
};

export default RisikoRegister;