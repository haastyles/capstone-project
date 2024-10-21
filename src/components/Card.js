function Card({title, subTitle, imgSrc, desc, altDesc}) {

    return (
        <>
            <div className="card container" display="block" style={{ flex: "0 0 20%", padding: "5px", margin: "10px", backgroundColor: "teal", alignContent: "center", justifyContent: "center" }}>
                <img src={imgSrc} alt={altDesc} style={{ width: "100%" }}></img>
                <h4 style={{ fontSize: "2vw", width: "100%" }}>{title}</h4>
                <h5 style={{ fontSize: "1.5vw", width: "100%" }}>{subTitle}</h5>
                <p style={{ fontSize: "1vw", width: "90%" }}>{desc}</p>
            </div>
        </>
    );
}

export default Card;