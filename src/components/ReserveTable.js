import '../styles/ReserveTable.css';
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import useSubmit from '../hooks/useSubmit';
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
    const [minute, setMinute] = useState(0);
    const [zeroSelected, setZeroSelected] = useState(true);
    const [thirtySelected, setThirtySelected] = useState(false);

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

    const handleSubmit = (values, { resetForm }) => {
        submit([], values)
            .then(console.log(isLoading))
            .then(console.log(response))
            .then(console.log(response.type === 'success'))
            .then(() => { if (response.type === 'success') { console.log('Form submitted:', values); resetForm({ values: '' }); } })
            .then(alert(response.message))
            .catch((error) => { console.log(error); })
    }
        
    return (
        <>
            <main>
                <h1>Reserve a table</h1>
                <div className="form-container">
                    <Formik
                        initialValues={
                            {
                                date: '',
                                time: 19,
                                size: 2,
                                firstName: '',
                                lastName: '',
                                email: '',
                                phone: ''
                            }
                        }
                        onSubmit={handleSubmit}
                        validationSchema={validation}>
                        {({errors, touched}) => (
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
                                        <Field className="input time" name="time" component="select" value={hour}
                                            onChange={e => {
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
                                            }}>
                                            <option value={11}>11:00 AM</option>
                                            <option value={12}>12:00 PM</option>
                                            <option value={13}>1:00 PM</option>
                                            <option value={14}>2:00 PM</option>
                                            <option value={15}>3:00 PM</option>
                                            <option value={16}>4:00 PM</option>
                                            <option value={17}>5:00 PM</option>
                                            <option value={18}>6:00 PM</option>
                                            <option value={19}>7:00 PM</option>
                                            <option value={20}>8:00 PM</option>
                                            <option value={21}>9:00 PM</option>
                                            <option value={22}>10:00 PM</option>
                                        </Field>
                                        <div className="row minute">
                                            <Field className={`input minute zero ${zeroSelected ? "selected" : ""}`} name="minute" type="button" value={americanHour + ":00" + midday} onClick={() => {setZeroSelected(!zeroSelected); setThirtySelected(!thirtySelected);}} />
                                            <Field className={`input minute thirty ${thirtySelected ? "selected" : ""}`} name="minute" type="button" value={americanHour + ":30" + midday} onClick={() => { setZeroSelected(!zeroSelected); setThirtySelected(!thirtySelected); }} />
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
                                        <Field className="input firstName" name="firstName" placeholder="First name"/>
                                        {errors.firstName && touched.firstName ? (
                                            <span className="error-message">{errors.firstName}</span>
                                        ) : null}
                                    </div>
                                    <div className="form lastName">
                                        <label>Last name</label>
                                        <Field className="input lastName" name="lastName" placeholder="Last name"/>
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
