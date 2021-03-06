import React from 'react'
import { Typography, Button, Divider } from '@material-ui/core'
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe} from '@stripe/stripe-js'
import Review from './Review.jsx'

const stripePromise = loadStripe('pk_test_51LMB8XFB0TNm6Q4tFuD4JCnADvIqkR9di3ozLZ47bthKfB9uOzopKbBsZBCxIvdo3zqZvGWqTYjQUslQa6TVUv9X00p0TFbUHw');

const PaymentForm = ({shippingData,checkoutToken,backStep,onCaptureCheckout,nextStep,handleEmptyCart}) => {
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if(!stripe || !elements) return;
    nextStep();
    handleEmptyCart();
    // const cardElement = elements.getElement(CardElement);

    // const { error, paymentMethod } = await stripe.createPaymentMethod({type: 'card', card: cardElement});

    // if(error){
    //   console.log(error);
    // }else{
    //   const orderData = {
    //     line_items: checkoutToken.live.line_items,
    //     customer: {firstname: shippingData.firstname, lastname: shippingData.lastname, email: shippingData.email},
    //     shipping: { 
    //       name: 'International', 
    //       street: shippingData.address1, 
    //       town_city: shippingData.city, 
    //       country_state: shippingData.shippingSubdivision,
    //       postal_zip_code: shippingData.zip,
    //       country: shippingData.shippingCountry,
    //   },
    //   fulfillment: { shipping_method: shippingData.shippingOption},
    //   payment: {
    //     gateway: 'stripe',
    //     stripe: {
    //       payment_method_id: paymentMethod.id
    //     }
    //   }
    //   }
    //   onCaptureCheckout(checkoutToken.id, orderData);
      
    //   nextStep();
    // }
  }
  return (
    <>
      <Review checkoutToken={checkoutToken}/>
      <Divider />
      <Typography variant="h6" gutterBottom style={{margin: '20px 0'}}>Payment method</Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({elements, stripe})=> (
            <form onSubmit={(e)=> handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br/><br/>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <Button variant='outlined' onClick={backStep}>Back</Button>
              <Button variant='contained' type='submit' disabled={!stripe} color='primary'>Pay {checkoutToken.live.subtotal.formatted_with_symbol}</Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  )
}

export default PaymentForm