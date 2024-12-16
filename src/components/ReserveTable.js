import '../styles/ReserveTable.css';
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import useSubmit from '../hooks/useSubmit';
//TO DO: Incorporate minute value into time value submissiom.
function ReserveTable(props) {

    const times = [
        { value: 11, display: "11:00 AM"},
        { value: 12, display: "12:00 PM" },
        { value: 13, display: "1:00 PM" },
        { value: 14, display: "2:00 PM" },
        { value: 15, display: "3:00 PM" },
        { value: 16, display: "4:00 PM" },
        { value: 17, display: "5:00 PM" },
        { value: 18, display: "6:00 PM" },
        { value: 19, display: "7:00 PM" },
        { value: 20, display: "8:00 PM" },
        { value: 21, display: "9:00 PM" },
        { value: 22, display: "10:00 PM" }
    ];

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
    
    const phoneRegex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
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
            .matches(phoneRegex, "Not a valid phone number")
            .min(10, "Too short")
            .max(10, "Too long")
            .required("Required"),
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
    
    const handleSubmit = (values, { resetForm }) => {
        submit([], values)
            .then(console.log(isLoading))
            .then(console.log(response))
            .then(console.log(response.type === 'success'))
            .then(() => { if (response.type === 'success') { console.log('Form submitted:', values); resetForm({ values: '' }); } })
            .then(alert(response.message))
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
                        {({ errors, touched, setFieldValue }) => (
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
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
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
                                        <Field className="input phone" name="phone" type="tel" placeholder="(123) 456-7890"/>
                                        {errors.phone && touched.phone ? (
                                            <span className="error-message">{errors.phone}</span>
                                        ) : null}
                                    </div>
                                </div>
                                <label>
                                    <input className="submit" type="submit" value="Reserve table" />
                                </label>
                            </Form>)}
                    </Formik>
                </div>
            </main>
        </>
    );
}

export default ReserveTable;
