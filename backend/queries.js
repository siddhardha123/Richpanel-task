import pool from './DB/postgres.js';

const getPlans = async () => {
  const query = 'SELECT * FROM Plans';
  const { rows } = await pool.query(query);
  return rows;
};

const signUp = async (email,name, password) => {
  const query = 'INSERT INTO UserAccounts (email,name,password) VALUES ($1, $2, $3) RETURNING *';
  const values = [email,name, password];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const login = async (email, password) => {
  const query = 'SELECT * FROM UserAccounts WHERE email = $1 AND password = $2';
  const values = [email, password];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const buySubscription = async (userId, planId, billingInterval, stripeSubscriptionId) => {
  const query =
    'INSERT INTO Subscription (user_id, plan_id, billing_interval, stripe_subscription_id) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [userId, planId, billingInterval, stripeSubscriptionId];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const cancelSubscription = async (subscriptionId) => {
  const query = 'DELETE FROM Subscription WHERE subscription_id = $1';
  const values = [subscriptionId];
  await pool.query(query, values);
};

const getSubscriptionByUserId = async (userId) => {
  const query = 'SELECT * FROM Subscription WHERE user_id = $1';
  const values = [userId];
  const { rows } = await pool.query(query, values);
  return rows;
};

export default {
  getPlans,
  signUp,
  login,
  buySubscription,
  cancelSubscription,
  getSubscriptionByUserId,
};