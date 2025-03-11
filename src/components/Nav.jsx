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
                <a href="/">
                    <picture className='logo'>
                        <source
                            media='(max-width: 600px)'
                            srcSet={`${mobileLogo}`}
                        />
                        <source
                            srcSet={logo}
                        />
                        <img src={logo} alt="Little Lemon logo" />
                    </picture>
                </a>
                <div className="menu-icon">
                    <img className="hamburger-menu" src={hamburger} onClick={toggleNav} alt="Hamburger Menu Icon"/>
                </div>
                <div className={`nav-links ${showNav ? 'active' : ''}`}>
                    <ul>
                        <li><NavLink to="/" className='nav-link'>home</NavLink></li>
                        <li><NavLink to="/about" className='nav-link'>about</NavLink></li>
                        <li><NavLink to="/menu" className='nav-link'>menu</NavLink></li>
                        <li><NavLink to="/reserve-a-table" className='nav-link'>reservations</NavLink></li>
                        <li><NavLink to="/order" className='nav-link'>order online</NavLink></li>
                        <li><NavLink to="/login" className='nav-link'>login</NavLink></li>
                    </ul>
                </div>
            </div>
        </nav>

    );
}

export default Nav;
