import '../styles/Card.css';

function CardButtons({
    title,
    subTitle,
    imgSrc,
    desc,
    altDesc,
    decrement,
    increment,
    individualCount
}) {

    return (
        <>
            <div className="card container">
                <img src={imgSrc} alt={altDesc}></img>
                <h4>{title}</h4>
                <h5>{subTitle}</h5>
                <p>{desc}</p>
                <div className="card container buttons">
                    <button
                        className="remove"
                        type="button"
                        onClick={decrement}
                    >-</button>
                    <div className="counter">{individualCount}</div>
                    <button
                        className="add"
                        type="button"
                        onClick={increment}
                    >+</button>
                </div>
            </div>
            
        </>
    );
}

export default CardButtons;