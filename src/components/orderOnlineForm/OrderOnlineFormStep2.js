import '../../styles/Forms.css';
import CounterFormField from './formFields/CounterFormField.jsx';
import CardButtons from '../CardButtons.jsx';
import { LeftArrow, RightArrow } from '../Arrows.jsx';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { useFormikContext } from 'formik';


function OrderOnline({
    items,
    individualCount,
    increment,
    decrement,
    menuItems,
    ...rest
}) {
    
    const apps = menuItems.filter((item) => item.type == 'appetizer');
    const salads = menuItems.filter((item) => item.type == 'salad');
    const entrees = menuItems.filter((item) => item.type == 'entree');
    const desserts = menuItems.filter((item) => item.type == 'dessert');
    const { setFieldValue } = useFormikContext();

    const {
        formField: {
            itemCount
        }
    } = rest;
    
    return (
        <>
            <div className="form-container">
                <div className="order-online">
                    <h2>Add items to your cart</h2>
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
                                    increment={() => {
                                        increment(dish.key);
                                        setFieldValue(itemCount.name, items + 1)
                                    }}
                                    decrement={() => {
                                        decrement(dish.key);
                                        setFieldValue(itemCount.name, individualCount[dish.key].count > 0 ? items - 1 : items)
                                    }}
                                    individualCount={individualCount[dish.key].count}
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
                                    increment={() => {
                                        increment(dish.key);
                                        setFieldValue(itemCount.name, items + 1)
                                    }}
                                    decrement={() => {
                                        decrement(dish.key);
                                        setFieldValue(itemCount.name, individualCount[dish.key].count > 0 ? items - 1 : items)
                                    }}
                                    individualCount={individualCount[dish.key].count}
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
                                    increment={() => {
                                        increment(dish.key);
                                        setFieldValue(itemCount.name, items + 1)
                                    }}
                                    decrement={() => {
                                        decrement(dish.key);
                                        setFieldValue(itemCount.name, individualCount[dish.key].count > 0 ? items - 1 : items)
                                    }}
                                    individualCount={individualCount[dish.key].count}
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
                                    increment={() => {
                                        increment(dish.key);
                                        setFieldValue(itemCount.name, items + 1)
                                    }}
                                    decrement={() => {
                                        decrement(dish.key);
                                        setFieldValue(itemCount.name, individualCount[dish.key].count > 0 ? items - 1 : items)
                                    }}
                                    individualCount={individualCount[dish.key].count}
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