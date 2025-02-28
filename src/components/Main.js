import Card from './Card.jsx';
import { LeftArrow, RightArrow } from './Arrows.jsx';
import restaurant from '../images/restaurant.jpg';
import owners from '../images/Mario and Adrian A.jpg';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
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
        title: 'Fig and Goat Cheese',
        subTitle: '$12',
        getImgSrc: () => require("../images/fig-and-goat-cheese.png"),
        desc: 'Roasted fig topped with whipped goat cheese and a hint of honey.',
        altDesc: 'Plate of figs and goat cheese'
    },
    {
        title: 'Veggie Bowl',
        subTitle: '$24',
        getImgSrc: () => require("../images/veggie-bowl.png"),
        desc: 'Various vegetables enriched with delicious herbs, feta, and hummus.',
        altDesc: 'Vegetable and couscous bowl'
    },
    {
        title: 'Lamb Gyro',
        subTitle: '$28',
        getImgSrc: () => require("../images/lamb-gyro.png"),
        desc: 'A greek classic with shaved lamb, fresh onions and greens, and topped with whipped feta.',
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
                    <ScrollMenu className="flex specials" LeftArrow={LeftArrow} RightArrow={RightArrow}>
                        {dishes.map((dish) => (
                            <Card
                                key={dish.title}
                                itemId={dish.title}
                                title={dish.title}
                                subTitle={dish.subTitle}
                                desc={dish.desc}
                                imgSrc={dish.getImgSrc()}
                                altDesc={dish.altDesc}

                            />
                        ))}
                    </ScrollMenu>
                </div>
                <div className="bg-testimonials type1 testimonials">
                    <div className="title-card testimonials">
                        <h2>Testimonials</h2>
                    </div>
                    <ScrollMenu className="flex flex-testimonials" LeftArrow={LeftArrow} RightArrow={RightArrow}>
                            {ratings.map((rate) => (
                                <Card
                                    key={rate.title}
                                    title={rate.title}
                                    subTitle={rate.subTitle}
                                    desc={rate.desc}
                                />
                            ))}
                    </ScrollMenu>
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
