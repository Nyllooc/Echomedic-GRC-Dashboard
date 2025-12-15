import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const sidebarItems = [
    { name: 'Dashboard', icon: '', active: true, path: '/dashboard' },
    { section: 'COMPLIANCE' },
    { name: 'SjekkListe', icon: '', path: '/sjekkliste'},
    { name: 'RisikoRegister', icon: '', path: '/risikoregister'},
    {section: 'FAQ', icon: ''},
    { name: 'Onboarding', icon: '', path: '/onboarding'},
    { name: 'Informasjon', icon: '', path: '/information'}


];

const Sidebar = () => {
    const location = useLocation();

    return (
        <aside className="sidebar">
            <div className="logo-container">
                <span className="logo-text">Riyadh SikkerhetsGruppe</span>
            </div>
            <nav className="nav">
                {sidebarItems.map((item, index) => {
                    if (item.section) {
                        return <div key={index} className="nav-section-title">{item.section}</div>;
                    }

                    const isActive = location.pathname === item.path;

                    return (
                        <Link
                            to={item.path}
                            key={index}
                            className={`nav-item ${isActive ? 'active' : ''}`}
                            style={{textDecoration: 'none'}}
                        >
                            {item.icon && <span className="nav-icon">{item.icon}</span>}
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    )
};

export default Sidebar;