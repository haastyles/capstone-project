import '../styles/ReserveTable.css';
import { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import FormModal from './FormModal.js';
import useSubmit from '../hooks/useSubmit';
import times from "../data/ReserveTableTimes.json";
import parties from "../data/ReserveTableParties.json";
function ReserveTable(props) {
    
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

    const { isLoading, response, submit } = useSubmit();
    
    const nameRegex = /^[A-Za-z]*$/;
    const phoneDigits = /[^0-9]+/g;
   
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

    const formatPhone = (e) => {
        const userInput = e.target.value.replaceAll(phoneDigits, "");
        const first = userInput.slice(0, 3);
        const second = userInput.slice(3, 6);
        const third = userInput.slice(6, 10);
        let formatted = "";

        if (third.length > 0) {
            formatted = "(" + first + ") " + second + "-" + third;
        } else if (second.length > 0) {
            formatted = "(" + first + ") " + second;
        } else if (first.length > 0) {
            formatted = "(" + first;
        }
 
        return formatted;
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
                                        <Field className="input date" name="date" type="date" />
                                        {errors.date && touched.date ? (
                                            <span className="error-message">{errors.date}</span>
                                        ) : null}
                                    </div>
                                    <div className="form time">
                                        <label>Choose your time
                                            <span className="required-icon">*</span>
                                        </label>
                                        <Field className="input hour" name="hour" component="select" value={hour} onChangeCapture={dropdownChange}>
                                            {times.map((time) => (
                                                <option key={time.value} value={time.value}>{time.display}</option>
                                            ))}
                                        </Field>
                                        <div className="row minute">
                                            <Field className="input minute" name="minute" type="button" style={{ display: "none" }} />
                                            <button className={`minute zero ${zeroSelected ? "selected" : ""}`} onClick={(e) => { toggleChange(e); setFieldValue("minute", minute) }} type="button">{americanHour + ":00" + midday}</button>
                                            <button className={`minute thirty ${!zeroSelected ? "selected" : ""}`} onClick={(e) => { toggleChange(e); setFieldValue("minute", minute) }} type="button">{americanHour + ":30" + midday}</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="form size">
                                    <label>Choose your party size
                                        <span className="required-icon">*</span>
                                    </label>
                                    <Field className="input size" name="size" component="select">
                                        {parties.map((party) => (
                                            <option key={party.value} value={party.value}>{party.value}</option>
                                        ))}
                                    </Field>
                                    <span>Parties larger than 8 should call the restaurant.</span>
                                </div>
                                <h2>Contact information</h2>
                                <div className="flex-form name">
                                    <div className="form firstName">
                                        <label>First name
                                            <span className="required-icon">*</span>
                                        </label>
                                        <Field className="input firstName" name="firstName" type="text" placeholder="First name"/>
                                        {errors.firstName && touched.firstName ? (
                                            <span className="error-message">{errors.firstName}</span>
                                        ) : null}
                                    </div>
                                    <div className="form lastName">
                                        <label>Last name</label>
                                        <Field className="input lastName" name="lastName" type="text" placeholder="Last name"/>
                                        {errors.lastName && touched.lastName ? (
                                            <span className="error-message">{errors.lastName}</span>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="flex-form contact">
                                    <div className="form email">
                                        <label>Email address</label>
                                        <Field className="input email" name="email" type="email" placeholder="youremail@email.com"/>
                                        {errors.email && touched.email ? (
                                            <span className="error-message">{errors.email}</span>
                                        ) : null}
                                    </div>
                                    <div className="form phone">
                                        <label>Phone number
                                            <span className="required-icon">*</span>
                                        </label>
                                        <Field className="input phone" name="phone" type="tel" placeholder="(123) 456-7890" onChange={(e) => { setFieldValue("phone", formatPhone(e)) }} />
                                        {errors.phone && touched.phone ? (
                                            <span className="error-message">{errors.phone}</span>
                                        ) : null}
                                    </div>
                                </div>
                                <label>
                                    <button className="submit" type="submit">Reserve table</button>
                                </label>
                            </Form>)}
                    </Formik>
                    <FormModal message=""/>
                </div>
            </main>
        </>
    );
}

export default ReserveTable;
