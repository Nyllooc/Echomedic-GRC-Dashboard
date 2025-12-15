import React from 'react';

const openIssueSummary = [
    { type: 'PRO203', data: { H: 0, C: 0, M: 2, L: 0, I: 0 } },
    { type: 'KODING', data: { H: 0, C: 0, M: 0, L: 0, I: 2 } },
    { type: 'MATH', data: { H: 0, C: 5, M: 3, L: 0, I: 0 }},
    { type: 'ISO-27001', data: { H: 4, C: 0, M: 0, L: 2, I: 0 } },
    { type: 'CAM FIVE', data: {H: 4, C:0, M: 0, L: 5, I: 3 }}
];

const OpenIssuesTable = () => {
    const headers = ['TYPE:', 'C', 'H', 'M', 'L', 'I'];

    const getLevelClass = (l) => {
        switch (l) {
            case 'H': return 'level-high';
            case 'M': return 'level-medium';
            case 'L': return 'level-low';
            case 'C': return 'level-critical';
            case 'I': return 'level-info';
            default: return '';
        }
    };

    return (
        <div className="open-issues-card card">
            <h2 className="card-title">Åpne saker</h2>
            <div className="open-issues-table-container">
                <div className="open-issues-header-row">
                    {headers.map((header, index) => (
                        <div key={index} className={`open-issues-cell header ${getLevelClass(header)}`}>
                            {header}
                        </div>
                    ))}
                </div>
                {openIssueSummary.map((row, rowIndex) => (
                    <div key={rowIndex} className="open-issues-data-row">
                        <div className="open-issues-cell issue-type-cell">
                            {rowIndex === 0 && ''}
                            {rowIndex === 1 && '️'}
                            {rowIndex === 2 && ''}
                            {rowIndex === 3 && ''}
                            {row.type}
                        </div>
                        {Object.entries(row.data).map(([level, count], colIndex) => (
                            <div key={colIndex} className={`open-issues-cell data-cell ${getLevelClass(level)}`}>
                                {count > 0 ? <span className={`data-count-badge ${getLevelClass(level)}`}>{count}</span> : 0}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OpenIssuesTable;