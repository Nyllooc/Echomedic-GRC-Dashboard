import React from 'react';

const RegulationList = ({ data, limit = 5 }) => {


    const getStatusStyle = (status) => {
        switch (status) {
            case 'Compliant': return { bg: '#efdef7', text: '#9333ea', label: 'Godkjent' };
            case 'Partial': return { bg: '#b2fdbe', text: '#03543f', label: 'Delvis' };
            case 'Non-Compliant': return { bg: '#fde8e8', text: '#9b1c1c', label: 'Feilet' };
            default: return { bg: '#f3f4f6', text: '#374151', label: status };
        }
    };

    return (
        <div className="card">
            <h2 className="card-title">GDPR & Regelverk detaljer</h2>
            <div className="regulation-table-container">
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead>
                    <tr style={{ textAlign: 'left', color: '#6b7280', borderBottom: '1px solid #e5e7eb' }}>
                        <th style={{ padding: '10px 0' }}>KODE</th>
                        <th style={{ padding: '10px' }}>KONTROLL</th>
                        <th style={{ padding: '10px' }}>STATUS</th>
                        <th style={{ padding: '10px', textAlign: 'right' }}>SIST REVIDERT</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.slice(0,limit).map((item) => {
                        const style = getStatusStyle(item.status);
                        return (
                            <tr key={item.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                <td style={{ padding: '12px 0', fontWeight: '600', color: '#6b7280' }}>
                                    {item.code}
                                </td>
                                <td style={{ padding: '12px 10px', fontWeight: '500' }}>
                                    {item.name}
                                </td>
                                <td style={{ padding: '12px 10px' }}>
                                        <span style={{
                                            backgroundColor: style.bg,
                                            color: style.text,
                                            padding: '4px 8px',
                                            borderRadius: '6px',
                                            fontSize: '0.75rem',
                                            fontWeight: '600'
                                        }}>
                                            {style.label}
                                        </span>
                                </td>
                                <td style={{ padding: '12px 10px', textAlign: 'right', color: '#6b7280' }}>
                                    {item.lastAudited}
                                </td>
                            </tr>
                        );
                    })}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RegulationList;