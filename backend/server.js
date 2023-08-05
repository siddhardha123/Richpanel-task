import express from 'express';

const app = express();
const PORT = 3000;



// Import the routes
import signupRoute from './routes/signup.js';
import loginRoute from './routes/login.js';
import getPlanRoute from './routes/getPlans.js'
// Register the routes
app.use('/signup', signupRoute);
app.use('/login', loginRoute);
app.use('/getPlans', getPlanRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});