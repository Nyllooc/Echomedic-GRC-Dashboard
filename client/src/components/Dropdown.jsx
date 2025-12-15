import React, {useState} from "react";
import '../style/dropdown.css';
const Dropdown = () => {
    const [isDark, setDark]= useState(true)

    return(
        <div className="dropdown-wrapper">
            <nav className="dropdown-nav">
                <input id="toggle" type="checkbox" />

                <label htmlFor="toggle" className="dropdown-button">
                    <span>...</span>
                    <div className="arrow-icon"></div>
                </label>

                <ul className="dropdown-menu">
                    <li><a href="#chapter1">NY</a></li>
                    <li><a href="#chapter2">Logg ut</a></li>
                </ul>
            </nav>
        </div>
    )
}
export default Dropdown;