import '../styles/ReserveTable.css';


function ReserveTable() {

    
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    return (
        <>
            <main>
                <h1>Reserve a table</h1>
                <div className="form-container">
                    <form className="form reserve-table">
                        <h2>Let us help you select a day</h2>
                        <label>Choose your date
                            <input type="date" min={tomorrow} />
                        </label>
                        <label>Choose your time (CT)
                            <input type="time"/>
                        </label>
                        <label>Choose your party size
                            <select>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                            </select>
                            <br />
                            Parties larger than 8 should call the restaurant.
                        </label>
                        <h2>Billing information</h2>
                        <label>First name
                            <input type="text"/>
                        </label>
                        <label>Last name
                            <input type="text"/>
                        </label>
                        <label>Email address
                            <input type="email"/>
                        </label>
                        <label>Phone number
                            <input type="tel"/>
                        </label>
                        <label>Credit card number
                            <input type="number" minLength="16" maxLength="16"/>
                        </label>
                        <label>Expiration date
                            <input type="month"/>
                        </label>
                        <label>CVV
                            <input type="password" minLength="3"/>
                        </label>
                        <label>Billing zipcode
                            <input type="number" minLength="5"/>
                        </label>
                        <label>
                            <input type="submit" value="Reserve table" />
                        </label>
                    </form>
                </div>
            </main>
        </>
    );
}

export default ReserveTable;
