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
import MenuItems from '../data/MenuItems.js';
function Menu() {

    const apps = MenuItems.filter((item) => item.type == 'appetizer');
    const salads = MenuItems.filter((item) => item.type == 'salad');
    const entrees = MenuItems.filter((item) => item.type == 'entree');
    const desserts = MenuItems.filter((item) => item.type == 'dessert');

    return (
        <>
            <main>
                <div className="bg-apps type1 apps">
                    <div className="title-card apps">
                        <h2>Appetizers</h2>
                        <button><Link to="/order">Order Now</Link></button>
                    </div>
                    <ScrollMenu className="flex apps" LeftArrow={LeftArrow} RightArrow={RightArrow}>
                        {apps.map((dish) => (
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
                <div className="bg-salads type2 salads">
                    <div className="title-card salads">
                        <h2>Salads</h2>
                        <button><Link to="/order">Order Now</Link></button>
                    </div>
                    <ScrollMenu className="flex salads" LeftArrow={LeftArrow} RightArrow={RightArrow}>
                        {salads.map((dish) => (
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
                <div className="bg-entrees type1 entrees">
                    <div className="title-card entrees">
                        <h2>Entrees</h2>
                        <button><Link to="/order">Order Now</Link></button>
                    </div>
                    <ScrollMenu className="flex entrees" LeftArrow={LeftArrow} RightArrow={RightArrow}>
                        {entrees.map((dish) => (
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
                <div className="bg-desserts type2 desserts">
                    <div className="title-card desserts">
                        <h2>Desserts</h2>
                        <button><Link to="/order">Order Now</Link></button>
                    </div>
                    <ScrollMenu className="flex dessertss" LeftArrow={LeftArrow} RightArrow={RightArrow}>
                        {desserts.map((dish) => (
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
            </main>
        </>
    );
}

export default Menu;
