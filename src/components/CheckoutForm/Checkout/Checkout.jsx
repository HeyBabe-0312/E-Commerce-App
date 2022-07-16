import React,{useState,useEffect} from 'react'
import {Paper,Stepper, Step,StepLabel,Typography,Divider,Button, CssBaseline} from '@material-ui/core'
import useStyles from './styles'
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import {commerce} from '../../../lib/commerce'
import {Link} from 'react-router-dom'

const steps = ['Shipping address', 'Payment details'];
const Checkout = ({cart,onCaptureCheckout,order,error,handleEmptyCart}) => {
    const [activeStep,setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const classes = useStyles();

    useEffect(()=>{
        const generateToken = async () => {
            try{
                const token = await commerce.checkout.generateToken(cart.id,{type: 'cart'});

                setCheckoutToken(token);
            }catch(e){
                console.log(e)
            }
        }
        generateToken();
    },[cart])

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const next = (data) =>{
        setShippingData(data);

        nextStep();
    }

    // let Confirmation = () => order.customer?(
    //     <>
    //         <div>
    //             <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
    //             <Divider className={classes.divider}/>
    //             <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
    //         </div>
    //         <br/>
    //         <Button component={Link} to='/' variant="outlined" type="button">Back to Home</Button>
    //     </>
    // ) : (
    //     <div className={classes.spinner}><CircularProgress /></div>
    // )

    // if(error) {
    //     <>
    //         <Typography variant='h5'>
    //             Error: {error}
    //         </Typography>
    //         <Button component={Link} to='/' variant="outlined" type="button">Back to Home</Button>
    //     </>
    // }

    const Confirmation = () =>(
            <>
                <div>
                    <Typography variant="h5">Thank you for your purchase</Typography>
                    <Divider className={classes.divider}/>
                </div>
                <br/>
                <Button component={Link} to='/' variant="outlined" type="button">Back to Home</Button>
            </>
        )

    const Form = () => activeStep === 0 ? <AddressForm checkoutToken={checkoutToken} next={next}/> : <PaymentForm shippingData={shippingData} backStep={backStep} nextStep={nextStep} handleEmptyCart={handleEmptyCart} onCaptureCheckout={onCaptureCheckout} checkoutToken={checkoutToken}/>

  return (
    <CssBaseline>
        <div className={classes.toolbar}/>
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography variant='h4' align='center'>Checkout</Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((step) =>(
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length ? <Confirmation />: checkoutToken && <Form />}
            </Paper>
        </main>
    </CssBaseline>
  )
}

export default Checkout;