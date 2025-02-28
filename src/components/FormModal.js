import '../styles/FormModal.css';
function FormModal({ message }) {
    const closeModal = () => {
        document.querySelector(".popup").style.display = "none";
        document.querySelector(".overlay").style.display = "none"

    }
     return (
        <>
            <div className="overlay"></div>
            <div className="popup container">
                 <button className="close button" onClick={closeModal}>X</button>
                <h4>THANK YOU</h4>
                <p>{message}</p>
            </div>
        </>
    );
}

export default FormModal;