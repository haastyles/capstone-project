import '../styles/Forms.css';
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button } from '@mui/material';
import * as Yup from 'yup';
import FormModal from './FormModal.js';
import DateFormField from './orderOnlineForm/formFields/DateFormField.jsx';
import TextFormField from './orderOnlineForm/formFields/TextFormField.jsx';
import SelectFormField from './orderOnlineForm/formFields/SelectFormField.jsx';
import useSubmit from '../hooks/useSubmit';
import times from "../data/ReserveTableTimes.json";
import parties from "../data/ReserveTableParties.json";

function ReserveTable() {
    
    const tomorrow = new Date();
    const maxDate = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    maxDate.setDate(maxDate.getDate() + 121);

    function getDate(inputDate) {
        const month = inputDate.getMonth() + 1;
        const year = inputDate.getFullYear();
        const date = inputDate.getDate();
        return `${month}/${date}/${year}`;
    }

    const [hour, setHour] = useState(19);
    const [americanHour, setAmericanHour] = useState(7);
    const [midday, setMidday] = useState("PM");
    const [minute, setMinute] = useState(0.5);
    const [zeroSelected, setZeroSelected] = useState(true);
    const [ party, setParty ] = useState(2);

    const { isLoading, response, submit } = useSubmit();
    
    const nameRegex = /^[A-Za-z]*$/;
   
    const validation = Yup.object().shape({
        date: Yup.date()
            .min(getDate(tomorrow), `Pick a date after ${getDate(tomorrow)}`)
            .max(getDate(maxDate), `Pick a date before ${getDate(maxDate)}`)
            .required("Required"),
        firstName: Yup.string()
            .matches(nameRegex, "Name must contain only letters")
            .required("Required"),
        lastName: Yup.string()
            .matches(nameRegex, "Name must contain only letters"),
        email: Yup.string()
            .email("Must be a valid email"),
        phone: Yup.string()
            .required("Required")
    });

    const dropdownChange = (e) => {
        setHour(e.target.value);
        if (e.target.value == 11) {
            setAmericanHour(e.target.value);
            setMidday("AM");
        } else if (e.target.value == 12) {
            setAmericanHour(e.target.value);
            setMidday("PM");
        } else {
            setMidday("PM");
            setAmericanHour(e.target.value - 12);
        }
    }

    const toggleChange = (e) => {
        zeroSelected ? setMinute(0) : setMinute(0.5);
        zeroSelected ? setZeroSelected(false) : setZeroSelected(true);
    }

    const sizeChange = (e) => {
        setParty(e.target.value);
    }

    const handleSubmit = (values, { resetForm }) => {
        submit([], values)
            .then(console.log(isLoading))
            .then(console.log(response))
            .then(console.log(response.type === 'success'))
            .then(() => { if (response.type === 'success') { console.log('Form submitted:', values); resetForm({ values: '' }); } })
            .then(document.querySelector(".popup > p").innerText = response.message)
            .then(document.querySelector(".overlay").style.display = "block")
            .then(document.querySelector(".popup").style.display = "block")
            .catch((error) => { console.log(error); })
    };
        
    return (
        <>
            <main>
                <h1>Reserve a table</h1>
                <div className="form-container">
                    <Formik
                        initialValues={
                            {
                                date: '',
                                hour: 19,
                                minute: 0,
                                size: 2,
                                firstName: '',
                                lastName: '',
                                email: '',
                                phone: ''
                            }
                        }
                        onSubmit={handleSubmit}
                        validationSchema={validation}>
                        {({ errors, touched, setFieldValue, values }) => (
                            <Form className="form reserve-table">
                                <h2>Let us help you select a day</h2>
                                <div className="flex-form date">
                                    <div className="form date">
                                        <label>Choose your date
                                            <span className="required-icon">*</span>
                                        </label>
                                        <DateFormField className="date-picker"/>
                                    </div>
                                    <div className="form time">
                                        <label>Choose your time
                                            <span className="required-icon">*</span>
                                        </label>
                                        <SelectFormField
                                            className="input hour"
                                            name="hour"
                                            data={times}
                                            dropdownValue={hour}
                                            handleChange={dropdownChange}
                                        />
                                        <div className="row minute">
                                            <Field
                                                className="input minute"
                                                name="minute"
                                                type="button"
                                                style={{ display: "none" }}
                                            />
                                            <Button
                                                className={`formButton minute zero ${zeroSelected ? "selected" : ""}`}
                                                onClick={
                                                    (e) => {
                                                        toggleChange(e);
                                                        setFieldValue("minute", minute);
                                                    }
                                                }
                                            >{americanHour + ":00" + midday}</Button>
                                            <Button
                                                className={`formButton minute thirty ${!zeroSelected ? "selected" : ""}`}
                                                onClick={
                                                    (e) => {
                                                        toggleChange(e);
                                                        setFieldValue("minute", minute);
                                                    }
                                                }
                                            >{americanHour + ":30" + midday}</Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="form size">
                                    <label>Choose your party size
                                        <span className="required-icon">*</span>
                                    </label>
                                    <SelectFormField
                                        className="input size"
                                        name="size"
                                        data={parties}
                                        dropdownValue={party}
                                        handleChange={sizeChange}
                                    />
                                    <span>Parties larger than 8 should call the restaurant.</span>
                                </div>
                                <h2>Contact information</h2>
                                <div className="flex-form name">
                                    <div className="form firstName">
                                        <label>First name
                                            <span className="required-icon">*</span>
                                        </label>
                                        <TextFormField
                                            className="input firstName"
                                            name="firstName"
                                            label="First name"
                                        />
                                    </div>
                                    <div className="form lastName">
                                        <label>Last name</label>
                                        <TextFormField
                                            className="input lastName"
                                            name="lastName"
                                            label="Last name"
                                        />
                                    </div>
                                </div>
                                <div className="flex-form contact">
                                    <div className="form email">
                                        <label>Email address</label>
                                        <TextFormField
                                            className="input email"
                                            name="email"
                                            label="Email address"
                                        />
                                    </div>
                                    <div className="form phone">
                                        <label>Phone number
                                            <span className="required-icon">*</span>
                                        </label>
                                        <TextFormField
                                            className="input phone"
                                            name="phone"
                                            label="Phone number"
                                        />
                                    </div>
                                </div>
                                <div className="button-container">
                                    <Button
                                        className="submit formButton"
                                        type="submit"
                                    >Reserve table</Button>
                                </div>
                            </Form>)}
                    </Formik>
                    <FormModal message=""/>
                </div>
            </main>
        </>
    );
}

export default ReserveTable;
