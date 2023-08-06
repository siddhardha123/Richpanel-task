import express from 'express';
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51Nc482SH17rZca1HwKuuXNKEwseG21GAyjmeNTfY3JhSIoTmC8823K0VbDAWhYNPOZc3qlAnvFHMYxoenvDEoyfO00Dhth0rEQ');
const router = express.Router();

router.post('/payment', async (req, res) => {
  const { token, amount } = req.body;
  try {
    // Create a charge using the token and the amount
    const charge = await stripe.charges.create({
      source: token,
      amount: amount, // Amount in cents
      currency: 'usd', // Replace with your desired currency
    });

    // If the charge was successful, you can send a success response
    res.json({ message: 'Payment succeeded' });
  } catch (error) {
    console.error('Error creating charge:', error);
    // Handle payment failure
    res.status(500).json({ error: 'Payment failed' });
  }
});

export default router;
