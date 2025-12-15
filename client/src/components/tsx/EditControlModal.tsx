import React, { useEffect, useState } from "react";
import { Control } from "../../types";
import { Icons } from "./Icons";
import "../../style/tsx/EditControlModal.css"

interface EditControlModalProps {
    isOpen: boolean;
    control: Control | null;
    onClose: () => void;
    onSave: (updatedControl: Control) => void;
}

export const EditControlModal: React.FC<EditControlModalProps> = ({ isOpen, control, onClose, onSave }) => {
    const [formData, setFormData] = useState<Control | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setFormData(control);
    }, [control]);

    if (!isOpen || !formData) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => prev ? { ...prev, [name]: value } : null);
    };


    const handleSubmit = async () => {
        if (!formData) return;

        setIsSaving(true);

        try {
            const response = await fetch("/api/compliance", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    type: formData.type,
                    id: formData.id,
                    code: formData.code,
                    name: formData.name,
                    description: formData.description,
                    measures: formData.measures,
                    lastAudited: formData.lastAudited,
                    status: formData.status
                }),
            });

            if (response.ok) {
                onSave(formData);
                onClose();
            } else {
                console.error("Server responded with error:", response.status);
                alert("Kunne ikke lagre til serveren.");
            }
        } catch (error) {
            console.error("Error saving control:", error);
            alert("Feil ved oppkobling til server.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="edit-modal-overlay">
            <div className="edit-modal-container">

                <div className="edit-modal-header">
                    <div>
                        <div className="edit-modal-meta">
                            <span>{formData.type || "Rammeverk"}</span>
                            <span>•</span>
                            <span>{formData.code}</span>
                        </div>
                        <h3 className="edit-modal-title">Rediger Kontroll</h3>
                    </div>
                    <button onClick={onClose} className="edit-modal-close-btn">
                        <Icons.Close />
                    </button>
                </div>

                <div className="edit-modal-body">
                    <div className="form-group">
                        <label className="form-label">Rammeverk</label>
                        <div className="select-wrapper">
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="form-select"
                            >
                                <option value="Ingen">Ingen</option>
                                <option value="I.S.O">I.S.O</option>
                                <option value="Norman">Norman</option>
                            </select>
                    </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Kode</label>
                        <input
                            type="text"
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Tittel</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Beskrivelse</label>
                        <textarea
                            name="description"
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                            className="form-textarea"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Tiltak</label>
                        <textarea
                            name="measures"
                            rows={4}
                            value={formData.measures}
                            onChange={handleChange}
                            className="form-textarea"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Status</label>
                        <div className="select-wrapper">
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="form-select"
                            >
                                <option value="Compliant">Compliant</option>
                                <option value="Partial">Partial</option>
                                <option value="Non-Compliant">Non-Compliant</option>
                            </select>
                            <div className="select-arrow">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Siste endring</label>
                        <div className="date-input-wrapper">
                            <div className="date-icon">
                                <Icons.Calendar />
                            </div>
                            <input
                                type="date"
                                name="lastAudited"
                                value={formData.lastAudited || ""}
                                onChange={handleChange}
                                className="form-input date-input"
                            />
                        </div>
                    </div>
                </div>

                <div className="edit-modal-footer">
                    <button onClick={onClose} className="btn-cancel" disabled={isSaving}>
                        Avbryt
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="btn-save"
                        disabled={isSaving}
                        style={{ opacity: isSaving ? 0.7 : 1, cursor: isSaving ? 'not-allowed' : 'pointer' }}
                    >
                        <Icons.Save /> {isSaving ? "Lagrer..." : "Lagre"}
                    </button>
                </div>
            </div>
        </div>
    );
};