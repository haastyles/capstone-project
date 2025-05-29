import { useState } from 'react';
import { Formik, Form, useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from '@mui/material';
import useSubmit from '../../hooks/useSubmit.js';
import useCount from '../../hooks/useCount.js';
import OrderStep1 from './OrderOnlineFormStep1.js';
import OrderStep2 from './OrderOnlineFormStep2.js';
import OrderStep3 from './OrderOnlineFormStep3.js';
import formFieldModel from './formFields/formFieldModel.jsx';
import times from "../../data/ReserveTableTimes.json";
import MenuItems from '../../data/MenuItems.js';

function OrderOnline(props) {

    const { isLoading, response, submit } = useSubmit();
    const { items, itemCounts, increment, decrement } = useCount(MenuItems);
    const nameRegex = /^[A-Za-z]*$/;

    //OrderOnlineFormStep1 constants for state
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const currentTime = `${hours}:${minutes}:${seconds}`;
    const dropdownValues = times.filter(
        (time)=>(`${time.value}:00:00`>currentTime)
    ); 
    const nextTime = times.filter(
        (time) => (`${time.value}:00:00`>currentTime)
    )[0].value ? times.filter(
        (time) => (`${time.value}:00:00`>currentTime)
    )[0].value : null;
    const [dropdownValue, setDropdownValue] = useState(nextTime);

    //OrderOnlineFormStep1 onChange function for state
    const handleChange = (e) => {
        const currentValue = e.target.value;
        setDropdownValue(currentValue);
    };

    const validation = [
        Yup.object().shape({
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
        }),
        Yup.object().shape({
            itemCount: Yup.number()
                .min(1, "You need to add an item to your cart")
                .required("Required")
            
        })
    ];

    const steps = ['Contact info', 'Menu items', 'Review your order'];
    const { formId, formField } = formFieldModel;
    const [activeStep, setActiveStep] = useState(1);
    const isLastStep = activeStep === steps.length;
    const currentValidation = validation[activeStep - 1];
        
    const submitForm = (values, { resetForm }) => {
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

    function _handleSubmit(values) {
        if (isLastStep) {
            submitForm(values);
        } else {
            setActiveStep(activeStep + 1);
        }
    }
    
    function _handleBack({values}) {
        setActiveStep(activeStep - 1);
        console.log('Form back:', {values});
    }

    function _renderStepContent(step) {
        switch (step) {
            case 1:
                return (
                    <>
                        <OrderStep1
                            formField={formField}
                            dropdownValues={dropdownValues}
                            dropdownValue={dropdownValue}
                            handleChange={handleChange}/>
                    </>
                );
            case 2:
                return (
                    <>
                        <OrderStep2
                            formField={formField}
                            items={items}
                            increment={increment}
                            decrement={decrement}
                            individualCount={itemCounts}
                            menuItems={MenuItems}/>
                    </>
                );
            case 3:
                return (
                    <>
                        <OrderStep3
                            individualCount={itemCounts}/>
                    </>
                );
            default:
                return <div>Not Found</div>;
        }
    }

    function Stepper () {
        <div className="flex items-center">
            <div className="rounded-full bg-blue-500 w-6 h-6"></div>
            <span className="h-1 w-8 bg-blue-500"></span>
        </div>
    }
        

    return(
        <>
            <main>
                <h1>Order Online</h1>
                <Stepper/>
                <Formik
                    initialValues={
                        {
                            hour: 19,
                            minute: 0,
                            firstName: '',
                            lastName: '',
                            email: '',
                            phone: '',
                            itemCount: 0
                        }
                    }
                    validationSchema={currentValidation}
                    onSubmit={_handleSubmit}
                >
                    {({ isSubmitting }) => (
                    <Form id={formId}>
                        {_renderStepContent(activeStep)}
                        <div className="button-container">
                            {activeStep !== 1 && (
                            <Button
                                className="back formButton"
                                variant="outlined"
                                onClick={_handleBack}
                            >Back</Button>
                            )}
                            <Button
                                type="submit"
                                className="next formButton"
                                variant="outlined"
                            >{isLastStep ? "Place Order" : "Next"}</Button>
                        </div>
                    </Form>
                    )}
                </Formik>
            </main>
        </>
    )

}

export default OrderOnline;