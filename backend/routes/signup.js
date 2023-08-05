import express from 'express';
const router = express.Router();

import queries from '../queries.js';
const { signUp } = queries;

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    const newUser = await signUp(email, password);
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;