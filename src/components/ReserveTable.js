import '../styles/Forms.css';
import { useState, useEffect } from 'react';
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

    const hour = 19;
    const [minute, setMinute] = useState(0.5);
    const [zeroSelected, setZeroSelected] = useState(true);
    const party = 2;
    const [showModal, setShowModal] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const { isLoading, response, submit, reset: resetSubmit } = useSubmit('reservation has been made');

    // Watch for response changes to show modal
    useEffect(() => {
        if (hasSubmitted && response && response.type === 'success') {
            setHasSubmitted(false);
            setShowModal(true);
            
            // Clear the response after a delay to prevent showing stale data
            setTimeout(() => {
                resetSubmit();
            }, 3000);
        }
    }, [response, hasSubmitted, resetSubmit]);
    
    const nameRegex = /^[A-Za-z]*$/;
    const initialValues = {
        date: getDate(tomorrow),
        hour: hour,
        minute: minute,
        size: party,
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    }
   
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
            .length(14, "You need a real 10 digit phone number")
            .required("Required")
    });

    const handleSubmit = (values, { resetForm }) => {
        try {
            console.log('Submitting reservation values:', values);
            setHasSubmitted(true);
            resetSubmit(); // Clear any previous response
            submit(values);
            console.log('Reservation submit called');
            resetForm({ values: initialValues });
        } catch (error) {
            console.log('Error submitting reservation:', error);
            setHasSubmitted(false);
        }
    };
        
    return (
        <>
            <main>
                <h1>Reserve a table</h1>
                <div className="form-container">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={validation}>
                        {({ setFieldValue, values }) => {
                            // Calculate time display based on current form values
                            const currentHour = values.hour || hour;
                            let displayHour, displayMidday;
                            
                            if (currentHour == 11) {
                                displayHour = currentHour;
                                displayMidday = "AM";
                            } else if (currentHour == 12) {
                                displayHour = currentHour;
                                displayMidday = "PM";
                            } else {
                                displayMidday = "PM";
                                displayHour = currentHour - 12;
                            }

                            return (
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
                                                        e.preventDefault();
                                                        setMinute(0);
                                                        setZeroSelected(true);
                                                        setFieldValue("minute", 0);
                                                    }
                                                }
                                            >{displayHour}:00 {displayMidday}</Button>
                                            <Button
                                                className={`formButton minute thirty ${!zeroSelected ? "selected" : ""}`}
                                                onClick={
                                                    (e) => {
                                                        e.preventDefault();
                                                        setMinute(0.5);
                                                        setZeroSelected(false);
                                                        setFieldValue("minute", 0.5);
                                                    }
                                                }
                                            >{displayHour}:30 {displayMidday}</Button>
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
                            </Form>
                            );
                        }}
                    </Formik>
                    <FormModal 
                        message={response?.message || "Your reservation has been confirmed!"} 
                        onClose={() => setShowModal(false)}
                        show={showModal}
                    />
                </div>
            </main>
        </>
    );
}

export default ReserveTable;
