import Card from './Card.js';
import restaurant from '../images/restaurant.jpg';
import owners from '../images/Mario and Adrian A.jpg';
import '../styles/Main.css';
import { Link } from 'react-router-dom';
import ratings from "../data/MainRatings.json";
import descriptions from "../data/MainDescriptions.json";

const dishes = [
    {
        title: 'Greek Salad',
        subTitle: '$22',
        getImgSrc: () => require("../images/greek-salad.jpg"),
        desc: 'A delicious blend of vegetables, feta, and herbs.',
        altDesc: 'Greek salad'
    },
    {
        title: 'Bruchetta',
        subTitle: '$15',
        getImgSrc: () => require("../images/bruchetta.png"),
        desc: 'Light, cripsy bread topped with a flavorful blend of tomatoes and basil.',
        altDesc: 'Plate of bruchetta'
    },
    {
        title: 'Lemon Cake',
        subTitle: '$12',
        getImgSrc: () => require("../images/lemon-dessert.jpg"),
        desc: 'An airy cake with a hint of zest.',
        altDesc: 'Plate of lemon cake'
    }
];
function Main() {

    return (
        <>
            <main>
                <div className="flex type1 hero">
                    <div className="info hero">
                        <h1>Little Lemon</h1>
                        <h3>Chicago</h3>
                        <p>{descriptions[0].description}</p>
                        <button><Link to="reserve-a-table">Reserve a Table</Link></button>
                    </div>
                    <div className="image hero">
                        <img className="image hero img-details" src={restaurant} alt="Restaurant patio"></img>
                    </div>

                </div>
                <div className="bg-specials type2 specials">
                    <div className="title-card specials">
                        <h2>Specials</h2>
                        <button>Online Menu</button>
                    </div>
                    <div className="flex specials">
                        {dishes.map((dish) => (
                            <Card
                                key={dish.title}
                                title={dish.title}
                                subTitle={dish.subTitle}
                                desc={dish.desc}
                                imgSrc={dish.getImgSrc()}
                                altDesc={dish.altDesc}
                            />
                        ))}
                    </div>
                </div>
                <div className="bg-testimonials type1 testimonials">
                    <div className="title-card testimonials">
                        <h2>Testimonials</h2>
                    </div>
                        <div className="flex flex-testimonials">
                            {ratings.map((rate) => (
                                <Card
                                    key={rate.title}
                                    title={rate.title}
                                    subTitle={rate.subTitle}
                                    desc={rate.desc}
                                />
                            ))}
                    </div>
                </div>
                <div>
                    <div className="flex type2 about">
                        <div className="info about">
                            <h2>Little Lemon</h2>
                            <h3>Chicago</h3>
                            <p>{descriptions[1].description}</p>
                        </div>
                        <div className="image about">
                            <img className="image about img-details" src={owners} alt="Two chefs in the kitchen"></img>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Main;
