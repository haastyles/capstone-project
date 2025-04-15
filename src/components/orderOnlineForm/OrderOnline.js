import '../../styles/OrderOnline.css';
import { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button } from '@mui/material';
import useSubmit from '../../hooks/useSubmit';
import OrderStep1 from './OrderOnlineFormStep1.js';
import OrderStep2 from './OrderOnlineFormStep2.js';
import OrderStep3 from './OrderOnlineFormStep3.js';
import formFieldModel from './formFields/formFieldModel.jsx';

function OrderOnline(props) {

    const { isLoading, response, submit } = useSubmit();
    const nameRegex = /^[A-Za-z]*$/;
    const phoneDigits = /[^0-9]+/g;
    
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
                .required("Required")
        }),
        Yup.object().shape({
            items: Yup.number()
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
    
    const handleBack = () => {
        console.log(activeStep);
        setActiveStep(activeStep - 1);
    }

    useEffect(() => {console.log(activeStep);}, [activeStep]);

    function _renderStepContent(step) {
        switch (step) {
            case 1:
                return (
                    <>
                        <OrderStep1 formField={formField}/>
                    </>
                );
            case 2:
                return (
                    <>
                        <OrderStep2 formField={formField}/>
                    </>
                );
            case 3:
                return (
                    <>
                        <OrderStep3/>
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
                            items: 0
                        }
                    }
                    validationSchema={currentValidation}
                    onSubmit={_handleSubmit}
                >
                    {({ isSubmitting }) => (
                    <Form id={formId}>
                        {_renderStepContent(activeStep)}
                        {activeStep !== 1 && (
                            <Button className="back" variant="outlined" onClick={handleBack}>Back</Button>
                        )}
                        <Button type="submit" className="next" variant="outlined">{isLastStep ? "Place Order" : "Next"}</Button>
                    </Form>
                    )}
                </Formik>
            </main>
        </>
    )

}

export default OrderOnline;