import pkg from 'pg';
const { Pool } = pkg;

// Create a new pool instance
const pool = new Pool({
  user: 'lxnvchwg',
  host: 'john.db.elephantsql.com',
  database: 'lxnvchwg',
  password: 'UbofMeuK3U0Pg-HEyG4PQWVkyje7zy5V',
});


export default pool;
