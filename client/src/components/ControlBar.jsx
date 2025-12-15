import React from "react";

const ControlBar = ({ total, completed, partial = 0, isSquare = true }) => {


    const squares = Array.from({ length: total }, (_, i) => {
        if (i < completed) return 'completed';
        if (i < completed + partial) return 'partial';
        return 'failed';
    });

    const completedPct = (completed / total) * 100;
    const partialPct = (partial / total) * 100;
    const failedPct = Math.max(0, 100 - completedPct - partialPct);

    return (
        <div className="control-bar-container">
            {isSquare ? (
                <div className="control-bar-squares">
                    {squares.map((status, index) => (
                        <div key={index} className={`control-square status-${status}`}></div>
                    ))}
                </div>
            ) : (
                <div className="control-bar-compact" style={{ display: 'flex', height: '8px', borderRadius: '4px', overflow: 'hidden', backgroundColor: '#eee' }}>
                    <div style={{ width: `${completedPct}%`, backgroundColor: '#9333ea' }}></div>
                    <div style={{ width: `${partialPct}%`, backgroundColor: '#38A169' }}></div>
                    <div style={{ width: `${failedPct}%`, backgroundColor: '#E53E3E' }}></div>
                </div>
            )}
        </div>
    );
};
export default ControlBar;