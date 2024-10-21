import logo from '../images/nav-logo.svg';
import mobileLogo from '../images/footer-logo.png'
import hamburger from '../images/hamburger-menu-icon.png'
import { NavLink } from "react-router-dom";
import '../styles/Nav.css';
import { useState } from 'react';

function Nav() {

    const [showNav, setShowNav] = useState(false)
  
    const toggleNav = () => {
        setShowNav(!showNav)
    }

    return (
        <nav className='navbar'>
            <div className='nav-container'>
                <picture className='logo'>
                    <source
                        media='(max-width: 600px)'
                        srcSet={`${mobileLogo}`}
                    />
                    <source
                        srcSet={logo}
                    />
                    <img src={logo} alt="Little Lemon logo"/>
                </picture>
                <div className="menu-icon">
                    <img className="hamburger-menu" src={hamburger} onClick={toggleNav} alt="Hamburger Menu Icon"/>
                </div>
                <div className={`nav-links  ${showNav && 'active'}`}>
                    <ul>
                        <li><NavLink to="/">home</NavLink></li>
                        <li><NavLink to="#">about</NavLink></li>
                        <li><NavLink to="#">menu</NavLink></li>
                        <li><NavLink to="/reserve-a-table">reservations</NavLink></li>
                        <li><NavLink to="#">order online</NavLink></li>
                        <li><NavLink to="#">login</NavLink></li>
                    </ul>
                </div>
            </div>
        </nav>

    );
}

export default Nav;
