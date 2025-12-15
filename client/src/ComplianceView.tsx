import React, { useState, useRef } from "react";
import { Control } from "./types";
import { Icons } from "./components/tsx/Icons";
import { ControlCard } from '../src/components/tsx/ControlCard'
import { EditControlModal } from "./components/tsx/EditControlModal";
import { DeleteConfirmationModal } from "./components/tsx/DeleteConfirmationModal";
import "./style/tsx/ComplianceView.css";

interface ComplianceViewProps {
    controls: Control[];
    onSave: (control: Control) => void;
    onDelete: (id: string) => void;
    onImport: (data: Control[]) => Promise<void>;
}

const STATUS_FILTERS = ["All", "Compliant", "Partial", "Non-Compliant"];
const TYPE_FILTERS = ["All", "I.S.O", "Norman", "Ingen"];

export const ComplianceView: React.FC<ComplianceViewProps> = ({
                                                                  controls,
                                                                  onSave,
                                                                  onDelete,
                                                                  onImport
                                                              }) => {
    const [statusFilter, setStatusFilter] = useState<string>("All");
    const [typeFilter, setTypeFilter] = useState<string>("All");

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingControl, setEditingControl] = useState<Control | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deletingControl, setDeletingControl] = useState<Control | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const filteredData = controls.filter((item) => {
        const matchesStatus = statusFilter === "All" || item.status === statusFilter;
        const matchesType = typeFilter === "All" || item.type === typeFilter;
        return matchesStatus && matchesType;
    });

    const handleImportClick = () => fileInputRef.current?.click();

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const result = e.target?.result as string;
                const parsedData = JSON.parse(result);

                if (Array.isArray(parsedData)) {
                    await onImport(parsedData);
                    alert("Data imported and saved to database successfully!");
                } else {
                    alert("Invalid JSON structure. Expected an array.");
                }
            } catch (error) {
                console.error(error);
                alert("Failed to process file or save to database.");
            }
        };
        reader.readAsText(file);
        event.target.value = '';
    };

    const handleDownloadJson = () => {
        const jsonString = JSON.stringify(controls, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "compliance-data.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleAddNew = () => {
        const newControl: Control = {
            id: Date.now().toString(),
            type: "Ingen",
            code: "",
            name: "",
            description: "",
            status: "Non-Compliant",
            lastAudited: new Date().toISOString().split('T')[0],
            measures: ""
        };
        setEditingControl(newControl);
        setIsEditModalOpen(true);
    };

    const handleEditClick = (control: Control) => {
        setEditingControl(control);
        setIsEditModalOpen(true);
    };

    const handleSaveControl = (updatedControl: Control) => {
        onSave(updatedControl);
        setIsEditModalOpen(false);
        setEditingControl(null);
    };

    const handleDeleteClick = (control: Control) => {
        setDeletingControl(control);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (deletingControl) {
            onDelete(deletingControl.id);
            setDeletingControl(null);
            setIsDeleteModalOpen(false);
        }
    };

    return (
        <div className="compliance-container">
            <div className="compliance-wrapper">
                <div className="compliance-header">
                    <div className="header-title">
                        <h2>SjekkListe</h2>
                        <p>Compliance Sjekkeliste</p>
                    </div>

                    <div className="controls-toolbar">
                        <div className="filter-group" style={{ marginBottom: '10px' }}>
                            <span style={{ marginRight: '10px', fontWeight: 'bold', fontSize: '14px' }}>Type:</span>
                            {TYPE_FILTERS.map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTypeFilter(t)}
                                    className={`filter-btn ${typeFilter === t ? "active" : "inactive"}`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>

                        <div className="filter-group">
                            <span style={{ marginRight: '10px', fontWeight: 'bold', fontSize: '14px' }}>Status:</span>
                            {STATUS_FILTERS.map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setStatusFilter(f)}
                                    className={`filter-btn ${statusFilter === f ? "active" : "inactive"}`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>

                        <div className="action-buttons">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                className="hidden-input"
                                accept=".json"
                            />
                            <button onClick={handleImportClick} className="btn btn-secondary">
                                <Icons.Upload /> Importer JSON
                            </button>
                            <button onClick={handleDownloadJson} className="btn btn-save">
                                <Icons.Save /> Lagre endringer
                            </button>
                            <button onClick={handleAddNew} className="btn btn-add">
                                <Icons.Plus /> Legg til Krav
                            </button>
                        </div>
                    </div>
                </div>

                <div className="controls-list">
                    {filteredData.map((item) => (
                        <ControlCard
                            key={item.id}
                            control={item}
                            onEdit={handleEditClick}
                            onDelete={handleDeleteClick}
                        />
                    ))}
                    {filteredData.length === 0 && (
                        <p className="empty-state">Ingen krav funnet.</p>
                    )}
                </div>
            </div>

            <EditControlModal
                isOpen={isEditModalOpen}
                control={editingControl}
                onClose={() => setIsEditModalOpen(false)}
                onSave={handleSaveControl}
            />

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                control={deletingControl}
                onConfirm={confirmDelete}
                onCancel={() => setIsDeleteModalOpen(false)}
            />
        </div>
    );
};