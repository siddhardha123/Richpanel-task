import express from 'express';
const router = express.Router();
import queries from '../queries.js';
const { getPlans } = queries;

router.get('/', async (req, res) => {
  try {
    const plans = await getPlans();
    res.json({ plans : plans  });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
