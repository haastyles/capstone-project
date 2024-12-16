import Card from './Card.js';
import restaurant from '../images/restaurant.jpg';
import owners from '../images/Mario and Adrian A.jpg';
import '../styles/Main.css';
import { Link } from 'react-router-dom';

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
]

const ratings = [
    {
        title: 'Lucas',
        subTitle: '5 stars',
        getImgSrc: () => require("../images/thumbs-up.png"),
        desc: 'This was one of the best meals of my life.',
        altDesc: 'Icon of a hand giving a thumbs up'
    },
    {
        title: 'Kevin',
        subTitle: '5 stars',
        getImgSrc: () => require("../images/thumbs-up.png"),
        desc: 'I will definitely be back for more spinach artichoke dip.',
        altDesc: 'Icon of a hand giving a thumbs up'
    },
    {
        title: 'Teresa',
        subTitle: '5 stars',
        getImgSrc: () => require("../images/thumbs-up.png"),
        desc: 'The BEST restaurant for a girls night out.',
        altDesc: 'Icon of a hand giving a thumbs up'
    },
    {
        title: 'Brett',
        subTitle: '5 stars',
        getImgSrc: () => require("../images/thumbs-up.png"),
        desc: `I love ordering their meat lover's pizza.`,
        altDesc: 'Icon of a hand giving a thumbs up'
    }
]

const descriptions = [
    {
        id: 'hero',
        description: 'Little Lemon is a mediteranean-inspired restaurant dedicated ' +
            'to bringing homestyle cooking to the dining table. A family-owned restaurant, ' +
            'they work to elevate the dining experience of all clientle, new and returning. ' +
            'Feel free to reserve a table or check out the seasonally revolving menu below.'
    },
    {
        id: 'about',
        description: 'Adrian and Mario are two brothers who grew up always in the kitchen. ' +
            'From the time they were young, the brothers have been experimenting with various ' +
            'mediterranean flavors. Since co-founding Little Lemon, they have been on a mission to ' +
            'make every meal feel celebratory.'
    }
]

function Main() {

    return (
        <>
            <main>
                <div className="flex hero">
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
                <div className="bg-specials specials" style={{ display: "block"}}>
                    <div className="title-card specials">
                        <h2>Specials</h2>
                        <button style={{ float: "right" }}>Online Menu</button>
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
                <div className="bg-testimonials testimonials">
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
                                    imgSrc={rate.getImgSrc()}
                                    altDesc={rate.altDesc}
                                    style={{display: "block"}}
                                />
                            ))}
                    </div>
                </div>
                <div>
                    <div className="flex about">
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
