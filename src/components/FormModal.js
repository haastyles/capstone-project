import '../styles/FormModal.css';
function FormModal({ message, onClose, show = true }) {
    const closeModal = () => {
        if (onClose) {
            onClose();
        }
    }
     return (
        <>
            <div className="overlay" style={{ display: show ? "block" : "none" }}></div>
            <div className="popup container" style={{ display: show ? "block" : "none" }}>
                 <button className="close button" onClick={closeModal}>X</button>
                <h4>THANK YOU</h4>
                <p>{message}</p>
            </div>
        </>
    );
}

export default FormModal;