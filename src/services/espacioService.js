import 'dotenv/config'
import dbHelper from '../../helper.js'

const espacioTabla = process.env.DB_TABLA_ESPACIOS;


export class EspacioService {

    getEspacios = async () => {
        console.log('This is a function on the service');
        let response
        let query=`SELECT * from ${espacioTabla}`
        response = await dbHelper(undefined,undefined,query);
        console.log(response)
        return response.recordset;
    }

}