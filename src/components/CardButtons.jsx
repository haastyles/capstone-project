import '../styles/Card.css';
import { useState } from 'react';

function CardButtons() {

    const [items, setItems] = useState(0);
        
    const increment = () => {
        setItems(items + 1);
    }
    
    const decrement = () => {
        if (items > 0) {
            setItems(items - 1);
        }
    }

    return (
        <>
            <div className="card container buttons">
                <button className="remove" type="button" onClick={decrement}>-</button>
                <div className="counter">{items}</div>
                <button className="add" type="button" onClick={increment}>+</button>
            </div>
        </>
    );
}

export default CardButtons;