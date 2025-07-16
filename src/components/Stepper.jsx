function Stepper({ activeStep }) {
    const steps = [1, 2, 3];
   
    return (
        <div className="flex steps">
            {steps.map((step) => {
                if (step < steps.length) {
                    return (
                        <>
                            <div className={`step step-${step} ${activeStep >= step ? 'active' : ''}`}>{step}</div>
                            <span className={`step-divider step-${step} ${activeStep >= step ? 'active' : ''}`}/>
                        </>
                    );
                } else {
                    return (
                        <div className={`step step-${step} ${activeStep >= step ? 'active' : ''}`}>{step}</div>
                    );
                }
            })
        }
        </div>
    );
}

export default Stepper;