import logo from '../images/footer-logo.png';
import '../styles/Footer.css';
function Footer() {
    const menu = [
        {
            id: 0,
            title: 'home'
        },
        {
            id: 1,
            title: 'about'
        },
        {
            id: 2,
            title: 'menu'
        },
        {
            id: 3,
            title: 'reservations'
        },
        {
            id: 4,
            title: 'order online'
        },
        {
            id: 5,
            title: 'login'
        }
    ];
    const contact = [
        {
            id: 0,
            title: 'Chicago, IL 60614'
        },
        {
            id: 1,
            title: '(123) 456-7890'
        },
        {
            id: 2,
            title: 'contactus@littlelemon.com'
        }
    ];
    const social = [
        {
            id: 0,
            title: 'facebook',
            url: 'www.facebook.com'
        },
        {
            id: 1,
            title: 'instagram',
            url: 'www.instagram.com'
        },
        {
            id: 2,
            title: 'twitter',
            url: 'www.x.com'
        }
    ];

    const menuUpdates =
        menu.map(m =>
            <li key={m.id}><a href='#'>{m.title}</a></li>
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
