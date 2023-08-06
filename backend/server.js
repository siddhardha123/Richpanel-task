import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
const app = express();
const PORT = 3001;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Import the routes
import signupRoute from './routes/signup.js';
import loginRoute from './routes/login.js';
import getPlanRoute from './routes/getPlans.js'
import paymentRoute from './routes/payment.js'
// Register the routes
app.use('/signup', signupRoute);
app.use('/login', loginRoute);
app.use('/getPlans', getPlanRoute);
app.use('/payment', paymentRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
