import logo from '../images/footer-logo.png';
import '../styles/Footer.css';
import menu from "../data/FooterMenu.json";
import contact from "../data/FooterContact.json";
import social from "../data/FooterSocial.json";

function Footer() {
    
    const menuUpdates =
        menu.map(m =>
            <li key={m.id}><a href={m.path}>{m.title}</a></li>
        );
    const contactUpdates =
        contact.map(c =>
            <li key={c.id}><a href='#'>{c.title}</a></li>
        );
    const socialUpdates =
        social.map(s =>
            <li key={s.id}><a href={s.url}>{s.title}</a></li>
        );

    return (
        <>
            <footer>
                <div className='footer-container'>
                    <img className='footer-logo' src={logo} alt='Little Lemon mobile logo' />
                    <ul>{menuUpdates}</ul>
                    <ul>{contactUpdates}</ul>
                    <ul>{socialUpdates}</ul>
                </div>
            </footer>
        </>
    );
}

export default Footer;
