import React, { useState, useEffect } from "react";
import { ComplianceView } from "../../ComplianceView";
import { Control } from "../../types";
import '../../App.css';

export const Sjekkliste: React.FC = () => {
    const [complianceData, setComplianceData] = useState<Control[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchInitialData = async () => {
        try {
            const res = await fetch("/api/compliance");
            if (res.ok) {
                const data = await res.json();
                setComplianceData(data);
            } else {
                console.error("Failed to fetch data:", res.status);
            }
        } catch (error) {
            console.error("Error connecting to server:", error);
        }
    };

    useEffect(() => {
        fetchInitialData();
    }, []);

    const handleSaveControl = async (updatedControl: Control) => {
        setComplianceData((prevData) => {
            const exists = prevData.some((item) => item.id === updatedControl.id);
            if (exists) {
                return prevData.map((item) =>
                    item.id === updatedControl.id ? updatedControl : item
                );
            }
            return [...prevData, updatedControl];
        });

        try {
            await fetch("/api/compliance", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedControl),
            });
        } catch (error) {
            console.error("Error saving individual control:", error);
            alert("Feil: Kunne ikke lagre endringen til serveren.");
            fetchInitialData();
        }
    };

    const handleDeleteControl = async (controlId: string) => {
        setComplianceData((prevData) => prevData.filter((c) => c.id !== controlId));

    };

    const handleImportData = async (importedData: Control[]) => {
        setIsLoading(true);
        try {
            const savePromises = importedData.map(control =>
                fetch("/api/compliance", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        type: control.type,
                        id: control.id,
                        code: control.code,
                        name: control.name,
                        description: control.description,
                        measures: control.measures,
                        lastAudited: control.lastAudited,
                        status: control.status
                    }),
                })
            );

            const responses = await Promise.all(savePromises);

            const failed = responses.some(res => !res.ok);

            if (failed) {
                console.error("Some items failed to save.");
                alert("Import delvis fullført: Noen elementer ble ikke lagret.");
            } else {
                await fetchInitialData();
            }
        } catch (error) {
            console.error("Error importing data:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {isLoading && <div className="loading-overlay">Lagrer til database...</div>}
            <ComplianceView
                controls={complianceData}
                onSave={handleSaveControl}
                onDelete={handleDeleteControl}
                onImport={handleImportData}
            />
        </div>
    );
};