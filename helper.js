import pool from './db.js';

const dbHelper = async (query, values) => {
    await pool.connect();
    const result = pool.query(query)
    return result;
};
export default dbHelper;