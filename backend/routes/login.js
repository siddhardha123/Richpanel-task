import express from 'express';
const router = express.Router();

import queries from '../queries.js';
const { login } = queries;

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await login(email, password);
    if (user) {
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
