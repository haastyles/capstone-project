import '../../styles/OrderOnline.css';
import TextFormField from './formFields/TextFormField';
import SelectFormField from './formFields/SelectFormField';
import times from "../../data/ReserveTableTimes.json";

function OrderOnline(props) {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const currentTime = `${hours}:${minutes}:${seconds}`;

    const {
        formField: {
            hour,
            minute,
            firstName,
            lastName,
            email,
            phone
        }
    } = props;
        
    return (
        <>
            <div className="form-container">
                <div className="form order-online">
                    <h2>Want to pick up today?</h2>
                    <div className="form time">
                        <label>Choose your pickup time
                            <span className="required-icon">*</span>
                        </label>
                        <SelectFormField name={hour.name} label={hour.label} data={times.filter((time)=>(`${time.universalValue}:00:00`>currentTime))}/>
                    </div>
                    <h2>Contact information</h2>
                    <div className="flex-form name">
                        <div className="form firstName">
                            <TextFormField name={firstName.name} label={firstName.label}/>
                        </div>
                        <div className="form lastName">
                            <TextFormField name={lastName.name} label={lastName.label}/>
                        </div>
                    </div>
                    <div className="flex-form contact">
                        <div className="form email">
                            <TextFormField name={email.name} label={email.label}/>
                        </div>
                        <div className="form phone">
                            <TextFormField name={phone.name} label={phone.label}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderOnline;