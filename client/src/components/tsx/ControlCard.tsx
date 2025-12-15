import React from "react";
import { Control } from "../../types";
import { Icons } from "./Icons";
import { getStatusIcon } from '../../data/complianceUtils';
import "../../style/tsx/Card.css"

interface ControlCardProps {
    control: Control;
    onEdit: (control: Control) => void;
    onDelete: (control: Control) => void;
}

export const ControlCard: React.FC<ControlCardProps> = ({ control, onEdit, onDelete }) => {
    const statusClass = `status-${control.status.toLowerCase().replace(" ", "-")}`;

    return (
        <div className={`control-card ${statusClass}`}>

            {/* Status Icon */}
            <div className="card-icon-wrapper">
                <div className="status-icon-bg">
                    {getStatusIcon(control.status)}
                </div>
            </div>

            {/* Content */}
            <div className="card-content">
                <div className="card-header">
                    <span className="card-code">{control.type}</span>
                </div>

                <div className="card-header">
                    <span className="card-code">{control.code}</span>
                </div>

                <div className="card-body">
                    <h3>{control.name}</h3>
                    <p className="card-text">
                        {control.description}
                    </p>

                    <h4>Tiltak</h4>
                    <p className="card-text">
                        {control.measures}
                    </p>
                </div>

                <div className="card-meta">
                    <div>
                        Siste Endring:
                        <span className="meta-value">{control.lastAudited}</span>
                    </div>
                </div>
            </div>

            {/* Actions & Badge */}
            <div className="card-actions">
                <span className="status-badge">
                    {control.status}
                </span>

                <div className="action-buttons-group">
                    <button
                        onClick={() => onEdit(control)}
                        className="card-btn edit"
                    >
                        <Icons.Pencil /> Rediger
                    </button>

                    <button
                        onClick={() => onDelete(control)}
                        className="card-btn delete"
                    >
                        <Icons.Trash /> Slett
                    </button>
                </div>
            </div>
        </div>
    );
};