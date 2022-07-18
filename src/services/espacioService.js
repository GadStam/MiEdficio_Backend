import 'dotenv/config'
import pool from '../../db.js';

const espacioTabla = process.env.DB_TABLA_ESPACIOS;


export class EspacioService {

    getEspacios = async () => {
        console.log('This is a function on the service');
        await pool.connect()
        let response
        let query=`SELECT * from ${espacioTabla}`
        response=await pool.query(query)
        console.log(response)
        await pool.end()
        return response.rows;
    }

}