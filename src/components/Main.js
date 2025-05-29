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
import MainSpecials from '../data/MainSpecials.js';

function Main() {

    return (
        <>
            <main>
                <h1>Little Lemon</h1>
                <div className="flex type1 hero">
                    <div className="info hero">
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
                        <button><Link to="menu">View Menu</Link></button>
                    </div>
                    <ScrollMenu className="flex specials" LeftArrow={LeftArrow} RightArrow={RightArrow}>
                        {MainSpecials.map((dish) => (
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
