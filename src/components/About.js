import restaurant from '../images/restaurant.jpg';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import '../styles/Main.css';
import { Link } from 'react-router-dom';
import descriptions from '../data/MainDescriptions.json';
import contacts from '../data/AboutContacts.json';

function About() {

    const EmailLink = ({ mailto, label }) => {
        return (
            <Link
                to='#'
                onClick={(e) => {
                    window.location.href = mailto;
                    e.preventDefault();
                }}
            >{label}
            </Link>
        );
    };

    return (
        <>
            <main>
                <div className="flex type1 hero">
                    <div className="info hero">
                        <h1>Little Lemon</h1>
                        <h3>Chicago</h3>
                        <p>{descriptions[1].description}</p>
                    </div>
                    <div className="image hero">
                        <img className="image hero img-details" src={restaurant} alt="Restaurant patio"></img>
                    </div>
                </div>
                <div className="flex type2 contact">
                    <div className="info contact">
                        <h3>Need to contact us?</h3>
                        <h5>
                            {contacts[0].id}:&ensp;
                            <Link to={`tel:${contacts[0].description}`}>{contacts[0].description}</Link>
                        </h5>
                        <h5>
                            {contacts[1].id}:&ensp;
                            <EmailLink label={contacts[1].description} mailto={`mailto:${contacts[1].description}`}/>
                        </h5>
                        <h5>
                            {contacts[2].id}:&ensp;
                            <EmailLink label={contacts[2].description} mailto={`mailto:${contacts[2].description}`}/>
                        </h5>
                        <h5>
                            {contacts[3].id}:&ensp;
                            <EmailLink label={contacts[3].description} mailto={`mailto:${contacts[3].description}`} />
                        </h5>
                    </div>
                </div>
            </main>
        </>
    );
}

export default About;