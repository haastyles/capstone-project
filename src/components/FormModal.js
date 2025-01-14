function FormModal({ message }) {
    const closeModal = () => {
        document.querySelector(".popup").style.display = "none";
        document.querySelector(".overlay").style.display = "none"

    }
     return (
        <>
            <div className="overlay"
                style={{
                    display: "none",
                    position: "fixed",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    background: "rgba(0, 0, 0, 0.5)",
                    zIndex: "999"
                }}></div>
            <div className="popup container"
                style={{
                    display: "none",
                    position: "fixed",
                    width: "30%",
                    top: "40%",
                    left: "35%",
                    padding: "20px",
                    borderRadius: "16px",
                    backgroundColor: "#FFF",
                    color: "#495E57",
                    zIndex: "1000"
                 }}>
                 <button className="close button" onClick={closeModal}>X</button>
                <h4 style={{ fontSize: "2vw", width: "100%" }}>THANK YOU</h4>
                <p style={{ fontSize: "1vw", width: "90%" }}>{message}</p>
            </div>
        </>
    );
}

export default FormModal;