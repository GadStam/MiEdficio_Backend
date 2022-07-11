import 'dotenv/config'

import pkg from 'pg';

const { Pool } = pkg;

const pool = new Pool(
    {
        
        connectionString:   process.env.DB_SERVER,
        ssl: {
            rejectUnauthorized: false
        }
    })

export default pool;