import React, { useState,useContext } from 'react';
import { AppContext } from '../AppContext';
import { CardElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const PaymentPage = () => { 
  const { data } = useContext(AppContext);

  // Initialize Stripe with your Stripe publishable key
  const stripePromise = loadStripe('pk_test_51Nc482SH17rZca1HNPsZ7kbkdhrZMsL20EuP2hDjTG1cLZchqF1xBqzy89lPryT8QoLSABJVvSWOWh7j8fmR7TgK000Y0YfewW');

  const [cardInfo, setCardInfo] = useState({ cardNumber: '4242424242424242', expiryDate: '09/2025', cvv: '123' });

  const handlePayment = async (e) => {
    e.preventDefault();
    // Use the stripePromise to get the stripe object
    const stripe = await stripePromise;

    // Create a payment method with the card info
    const { token, error } = await stripe.createToken({
      
        number: cardInfo.cardNumber,
        exp_month: cardInfo.expiryDate.split('/')[0],
        exp_year: cardInfo.expiryDate.split('/')[1],
        cvv: cardInfo.cvv,
        type : "Card"
    });

    if (error) {
      console.error('Error creating token:', error);
    } else {
      // Implement your API call to your backend here
      // Send the token to your backend to complete the payment
      // You can use Axios or fetch to make the API call

     
      try {
        const response = await fetch('http://localhost:3001/payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: token.id, amount: data.price }), // Send the token and the amount to your backend
        });

        if (response.ok) {
          console.log('Payment succeeded!');
          // Redirect to a success page or display a success message
        } else {
          console.error('Payment failed.');
          // Handle payment failure
        }
      } catch (error) {
        console.error('Error making API call:', error);
        // Handle API call error
      }
    }
  };

  return (
   
    <div className="bg-[#004e96] min-h-screen  flex items-center justify-center">
  <div className="bg-white  rounded shadow-md flex">
    {/* Left side */}
    <div className="w-[700px] p-8">
      <h2 className="text-3xl font-semibold mb-2">Complete Payment</h2>
      <p className="text-sm mb-4">Enter your credit or debit card details below</p>
      <div className="flex mb-4 w-full">
        <Elements stripe={stripePromise}>
          <form onSubmit={handlePayment} className="w-full">
          
          <CardElement options={{ style: { base: { fontSize: '16px', width:'20px' } } }} />

            <button
              type="submit"
              className="bg-[#004e96] text-white rounded  py-2 px-3 mt-3"
              onClick={handlePayment}
            >
              Confirm Payment
            </button>
          </form>
        </Elements>
      </div>
    </div>

    {/* Right side */}
    <div className="w-1/2 p-12 bg-gray-200 rounded">
      <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
      <table className="w-full">
        <tbody>
          <tr className="border-b border-gray-400 ">
            <td className="font-semibold w-1/2 p-2">Full Name:</td>
            <td className="w-1/2 text-right p-2">{data.name}</td>
          </tr>
          <tr className="border-b border-gray-400 ">
            <td className="font-semibold w-1/2 p-2">Billing Cycle:</td>
            <td className="w-1/2 text-right p-2">{data.cycle}</td>
          </tr>
          <tr className="border-b border-gray-400">
            <td className="font-semibold w-1/2 p-2">Price:</td>
            <td className="w-1/2 text-right p-2  ">{data.price}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
  
  );
};

export default PaymentPage;
