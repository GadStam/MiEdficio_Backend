import 'dotenv/config'
import sql from 'mssql'
import config from '../../db.js'
import dbHelper from '../../Helper.js'

const espacioTabla = process.env.DB_TABLA_ESPACIO;


export class EspacioService {

    getEspacios = async () => {
        console.log('This is a function on the service');
        const pool = await sql.connect(config);
        console.log(pool);
        const response = await pool.request()
            .query(`SELECT * from ${espacioTabla}`);
        console.log(response)
        return response.recordset;
    }

}