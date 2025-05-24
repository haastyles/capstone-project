import '../../styles/Forms.css';
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import useSubmit from '../../hooks/useSubmit';
import times from "../../data/ReserveTableTimes.json";

function OrderOnline(props) {
    

    const [hour, setHour] = useState(19);
    const [americanHour, setAmericanHour] = useState(7);
    const [midday, setMidday] = useState("PM");
    const [minute, setMinute] = useState(0.5);
    const [zeroSelected, setZeroSelected] = useState(true);

    const { isLoading, response, submit } = useSubmit();
    
    const nameRegex = /^[A-Za-z]*$/;
    const phoneDigits = /[^0-9]+/g;
   
    const validation = Yup.object().shape({
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
                <div className="form-container">
                    <h1>Review Order</h1>
                    <Formik
                        initialValues={
                            {
                                hour: 19,
                                minute: 0,
                                itemCount: 2,
                                items: '',
                                price: 0.0,
                                firstName: '',
                                lastName: '',
                                email: '',
                                phone: ''
                            }
                        }
                        onSubmit={handleSubmit}
                        validationSchema={validation}>
                        {({ errors, touched, setFieldValue, values }) => (
                            <Form className="form order-online">
                                <h2>Want to pick up today?</h2>
                                <div className="form time">
                                    <label>Choose your pickup time
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
                                    <button className="submit" type="submit">Select menu items</button>
                                </label>
                            </Form>)}
                    </Formik>
                </div>
            </main>
        </>
    );
}

export default OrderOnline;