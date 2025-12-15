import React from "react";
import ControlPie from "./ControlPie.jsx";
import '../style/control.css';

const ControlCard = ({
                         title,
                         controls,
                         passing,
                         partial,
                         total,
                         completion,
                         color
                     }) => {
    const isSOC = title.includes('SOC');

    const controlsText = isSOC
        ? `${controls} / ${total}`
        : `${controls} / ${passing} Ferdig`;

    return (
        <div className="control-card">
            <div className="control-header">
                <div className="control-title-group">
                    <div
                        className="control-icon-circle"
                        style={{ backgroundColor: `${color}20`, color: color }}
                    >
                        {isSOC ? '🔒' : '🌐'}
                    </div>
                    <h3 className="control-title">{title}</h3>
                </div>
            </div>

            <div className="control-details">
                <div className="controls-status">
                    <span className="controls-count">{controlsText}</span>

                </div>
            </div>

            <div className="chart-container">
                <ControlPie
                    total={total}
                    completed={controls}
                    partial={partial}
                    completion={completion}
                />
            </div>
        </div>
    );
};

export default ControlCard;