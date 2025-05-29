import '../../styles/Forms.css';
import TextFormField from './formFields/TextFormField';
import SelectFormField from './formFields/SelectFormField';

function OrderOnline({
    dropdownValue,
    dropdownValues,
    handleChange,
    ...rest
}) {

    const {
        formField: {
            hour,
            firstName,
            lastName,
            email,
            phone
        }
    } = rest;
        
    return (
        <>
            <div className="form-container">
                <div className="order-online">
                    <h2>Want to pick up today?</h2>
                    <div className="form time">
                        <label>Choose your pickup time
                            <span className="required-icon">*</span>
                        </label>
                        <SelectFormField
                            name={hour.name}
                            label={hour.label}
                            data={dropdownValues}
                            dropdownValue={dropdownValue}
                            handleChange={handleChange}
                        />
                    </div>
                    <h2>Contact information</h2>
                    <div className="flex-form name">
                        <div className="form firstName">
                            <label>First name
                                <span className="required-icon">*</span>
                            </label>
                            <TextFormField name={firstName.name} label={firstName.label}/>
                        </div>
                        <div className="form lastName">
                            <label>Last name</label>
                            <TextFormField name={lastName.name} label={lastName.label}/>
                        </div>
                    </div>
                    <div className="flex-form contact">
                        <div className="form email">
                            <label>Email address</label>
                            <TextFormField name={email.name} label={email.label}/>
                        </div>
                        <div className="form phone">
                            <label>Phone number
                                <span className="required-icon">*</span>
                            </label>
                            <TextFormField name={phone.name} label={phone.label}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderOnline;