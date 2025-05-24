import '../../styles/Forms.css';
import CounterFormField from './formFields/CounterFormField.jsx';
import MenuItems from '../../data/MenuItems.js';
import CardButtons from '../CardButtons.jsx';
import { LeftArrow, RightArrow } from '../Arrows.jsx';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';


function OrderOnline({
    items,
    individualCount,
    increment,
    decrement,
    ...rest
}) {
    
    const apps = MenuItems.filter((item) => item.type == 'appetizer');
    const salads = MenuItems.filter((item) => item.type == 'salad');
    const entrees = MenuItems.filter((item) => item.type == 'entree');
    const desserts = MenuItems.filter((item) => item.type == 'dessert');

    const {
        formField: {
            itemCount
        }
    } = rest;
    
    return (
        <>
            <div className="form-container">
                <div className="order-online">
                    <div className="items">
                        <label>Here's your cart count
                            <span className="required-icon">*</span>
                        </label>
                        <CounterFormField
                            className="form itemCount"
                            name={itemCount.name}
                            label={itemCount.label}
                            value={items}
                        />
                    </div>
                    <div className="bg-apps type1 apps">
                        <div className="title-card apps">
                            <h2>Appetizers</h2>
                        </div>
                        <ScrollMenu className="flex apps" LeftArrow={LeftArrow} RightArrow={RightArrow}>
                            {apps.map((dish) => (
                                <CardButtons
                                    key={dish.key}
                                    itemId={dish.title}
                                    title={dish.title}
                                    subTitle={dish.subTitle}
                                    desc={dish.desc}
                                    imgSrc={dish.getImgSrc()}
                                    altDesc={dish.altDesc}
                                    increment={() => {increment(dish.key)}}
                                    decrement={() => {decrement(dish.key)}}
                                    individualCount={individualCount[dish.key]}
                                />
                            ))}
                        </ScrollMenu>
                    </div>
                    <div className="bg-salads type2 salads">
                        <div className="title-card salads">
                            <h2>Salads</h2>
                        </div>
                        <ScrollMenu className="flex salads" LeftArrow={LeftArrow} RightArrow={RightArrow}>
                            {salads.map((dish) => (
                                <CardButtons
                                    key={dish.key}
                                    itemId={dish.title}
                                    title={dish.title}
                                    subTitle={dish.subTitle}
                                    desc={dish.desc}
                                    imgSrc={dish.getImgSrc()}
                                    altDesc={dish.altDesc}
                                    increment={() => {increment(dish.key)}}
                                    decrement={() => {decrement(dish.key)}}
                                    individualCount={individualCount[dish.key]}
                                />                    
                            ))}
                        </ScrollMenu>
                    </div>
                    <div className="bg-entrees type1 entrees">
                        <div className="title-card entrees">
                            <h2>Entrees</h2>
                        </div>
                        <ScrollMenu className="flex entrees" LeftArrow={LeftArrow} RightArrow={RightArrow}>
                            {entrees.map((dish) => (
                                <CardButtons
                                    key={dish.key}
                                    itemId={dish.title}
                                    title={dish.title}
                                    subTitle={dish.subTitle}
                                    desc={dish.desc}
                                    imgSrc={dish.getImgSrc()}
                                    altDesc={dish.altDesc}
                                    increment={() => {increment(dish.key)}}
                                    decrement={() => {decrement(dish.key)}}
                                    individualCount={individualCount[dish.key]}
                                />                       
                            ))}
                        </ScrollMenu>
                    </div>
                    <div className="bg-desserts type2 desserts">
                        <div className="title-card desserts">
                            <h2>Desserts</h2>
                        </div>
                        <ScrollMenu className="flex desserts" LeftArrow={LeftArrow} RightArrow={RightArrow}>
                            {desserts.map((dish) => (
                                <CardButtons
                                    key={dish.key}
                                    itemId={dish.title}
                                    title={dish.title}
                                    subTitle={dish.subTitle}
                                    desc={dish.desc}
                                    imgSrc={dish.getImgSrc()}
                                    altDesc={dish.altDesc}
                                    increment={() => {increment(dish.key)}}
                                    decrement={() => {decrement(dish.key)}}
                                    individualCount={individualCount[dish.key]}
                                />                       
                            ))}
                        </ScrollMenu>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderOnline;