import React, { useState } from "react";
import { Control } from "../../types";
import { Icons } from "./Icons";
import "../../style/tsx/DeleteConfirmationModal.css";

interface DeleteModalProps {
    isOpen: boolean;
    control: Control | null;
    onConfirm: () => void;
    onCancel: () => void;
}

export const DeleteConfirmationModal: React.FC<DeleteModalProps> = ({ isOpen, control, onConfirm, onCancel }) => {
    const [isDeleting, setIsDeleting] = useState(false); // State to handle loading feedback

    if (!isOpen || !control) return null;

    const handleDelete = async () => {
        if (!control.id) return;

        setIsDeleting(true);

        try {
            const response = await fetch(`/api/compliance/${control.id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                onConfirm();
            } else {
                console.error("Failed to delete item:", response.status);
                alert("Kunne ikke slette elementet fra serveren.");
            }
        } catch (error) {
            console.error("Error connecting to server:", error);
            alert("Feil ved oppkobling til server.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="delete-modal-overlay">
            <div className="delete-modal-content">
                <div className="delete-modal-body">
                    {/* Icon */}
                    <div className="delete-icon-wrapper">
                        <Icons.Trash />
                    </div>

                    {/* Text content */}
                    <h3 className="delete-modal-title">Slett kontroll?</h3>
                    <p className="delete-modal-desc">
                        Er du sikker på at du vil slette <strong>{control.name}</strong>?
                        <br />Denne handlingen kan ikke angres.
                    </p>

                    {/* Actions */}
                    <div className="delete-modal-actions">
                        <button
                            onClick={onCancel}
                            className="modal-btn cancel"
                            disabled={isDeleting}
                        >
                            Avbryt
                        </button>
                        <button
                            onClick={handleDelete}
                            className="modal-btn confirm-delete"
                            disabled={isDeleting}
                            style={{ opacity: isDeleting ? 0.7 : 1, cursor: isDeleting ? 'not-allowed' : 'pointer' }}
                        >
                            {isDeleting ? "Sletter..." : "Slett"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};