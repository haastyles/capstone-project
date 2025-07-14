import { useState, useEffect, useRef } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button } from '@mui/material';
import useSubmit from '../../hooks/useSubmit.js';
import useCount from '../../hooks/useCount.js';
import OrderStep1 from './OrderOnlineFormStep1.js';
import OrderStep2 from './OrderOnlineFormStep2.js';
import OrderStep3 from './OrderOnlineFormStep3.js';
import FormModal from '../FormModal.js';
import formFieldModel from './formFields/formFieldModel.jsx';
import times from "../../data/ReserveTableTimes.json";
import MenuItems from '../../data/MenuItems.js';

function OrderOnline() {
    const { isLoading, response, submit, reset: resetSubmit } = useSubmit('order has been placed');
    const { items, itemCounts, increment, decrement, reset } = useCount(MenuItems);
    const nameRegex = /^[A-Za-z]*$/;
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const setFieldValueRef = useRef(null);

    useEffect(() => {
        if (hasSubmitted && response && response.type === 'success') {
            setHasSubmitted(false);
            setActiveStep(1);
            setShowModal(true);
            
            // Clear the response after a delay to prevent showing stale data
            setTimeout(() => {
                resetSubmit();
                setShowModal(false);
            }, 3000);
        }
    }, [response, hasSubmitted, resetSubmit]);

    useEffect(() => {
        if (setFieldValueRef.current) {
            setFieldValueRef.current('itemCount', items);
        }
    }, [items]);

    //OrderOnlineFormStep1 constants for state
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    const dropdownValues = times.filter(
        (time)=>(`${time.value}:00:00`>currentTime)
    ); 
    const nextTime = times.filter(
        (time) => (`${time.value}:00:00`>currentTime)
    )[0]?.value || 19;

    const validation = [
        // Step 1: Contact info validation
        Yup.object().shape({
            hour: Yup.number()
                .min(11, "Please select a valid time")
                .max(22, "Please select a valid time")
                .required("Please select a pickup time"),
            firstName: Yup.string()
                .matches(nameRegex, "Name must contain only letters")
                .required("Required"),
            lastName: Yup.string()
                .matches(nameRegex, "Name must contain only letters"),
            email: Yup.string()
                .email("Must be a valid email"),
            phone: Yup.string()
                .length(14, "You need a real 10 digit phone number")
                .required("Required"),
            minute: Yup.number(),
            itemCount: Yup.number()
        }),
        // Step 2: Menu items validation
        Yup.object().shape({
            itemCount: Yup.number()
                .min(1, "You need to add an item to your cart")
                .required("Required"),
            hour: Yup.number(),
            firstName: Yup.string(),
            lastName: Yup.string(),
            email: Yup.string(),
            phone: Yup.string(),
            minute: Yup.number()
        }),
        // Step 3: Final validation
        Yup.object().shape({
            itemCount: Yup.number()
                .min(1, "You need to add an item to your cart")
                .required("Required"),
            hour: Yup.number().required(),
            firstName: Yup.string().required(),
            phone: Yup.string().required(),
            lastName: Yup.string(),
            email: Yup.string(),
            minute: Yup.number()
        })
    ];

    const { formId, formField } = formFieldModel;
    const [activeStep, setActiveStep] = useState(1);
    const isLastStep = activeStep === 3;
    const currentValidation = validation[activeStep - 1];
        
    const submitForm = async (values, { resetForm }) => {
        try {
            console.log('Submitting form values:', values);
            setHasSubmitted(true);
            resetSubmit(); // Clear any previous response
            submit(values);
            console.log('Form submit called');
            resetForm();
            reset();
        } catch (error) {
            console.log('Error submitting form:', error);
            setHasSubmitted(false);
        }
    };

    function _handleSubmit(values, formikBag) {
        console.log('--------FORM SUBMISSION DEBUG--------');
        console.log('Current step:', activeStep, 'Is last step:', isLastStep);
        console.log('All form values:', values);
        console.log('Form values breakdown:', {
            hour: values.hour,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            phone: values.phone,
            itemCount: values.itemCount
        });
        console.log('Items from useCount:', items);
        
        if (isLastStep) {
            submitForm(values, formikBag);
        } else {
            setActiveStep(activeStep + 1);
        }
    }
    
    function _handleBack(values) {
        setActiveStep(activeStep - 1);
        console.log('Form back:', values);
    }

    function _renderStepContent(step) {
        switch (step) {
            case 1:
                return (
                    <>
                        <OrderStep1
                            formField={formField}
                            dropdownValues={dropdownValues}/>
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
                            individualCount={itemCounts}
                            itemCountTotal={items}/>
                    </>
                );
            default:
                return <div>Not Found</div>;
        }
    }

    function Stepper () {
        return (
            <div className="flex items-center">
                <div className="rounded-full bg-blue-500 w-6 h-6"></div>
                <span className="h-1 w-8 bg-blue-500"></span>
            </div>
        );
    }
        

    return(
        <>
            <main>
                <h1>Order Online</h1>
                <Stepper/>
                <Formik
                    key="order-form" 
                    initialValues={{
                        hour: nextTime,
                        minute: 0,
                        firstName: '',
                        lastName: '',
                        email: '',
                        phone: '',
                        itemCount: 0
                    }}
                    validationSchema={currentValidation}
                    onSubmit={_handleSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                    {({ values, setFieldValue }) => {
                        setFieldValueRef.current = setFieldValue;
                        
                        return (
                            <Form id={formId}>
                                {_renderStepContent(activeStep)}
                                <div className="button-container">
                                    {activeStep !== 1 && (
                                    <Button
                                        className="back formButton"
                                        variant="outlined"
                                        onClick={() => _handleBack(values)}
                                    >Back</Button>
                                    )}
                                    <Button
                                        type="submit"
                                        className="next formButton"
                                        variant="outlined"
                                        disabled={isLoading}
                                    >{isLastStep ? (isLoading ? "Placing Order..." : "Place Order") : "Next"}</Button>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
                <FormModal 
                    message={response?.message || "Your order has been placed!"} 
                    onClose={() => setShowModal(false)}
                    show={showModal}
                />
            </main>
        </>
    )

}

export default OrderOnline;