import '../styles/Card.css';
function Card({ title, subTitle, imgSrc, desc, altDesc, buttonOne, buttonTwo }) {

    return (
        <>
            <div className="card container">
                <img src={imgSrc} alt={altDesc}></img>
                <h4>{title}</h4>
                <h5>{subTitle}</h5>
                <p>{desc}</p>
            </div>
        </>
    );
}

export default Card;