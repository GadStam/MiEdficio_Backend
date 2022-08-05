import 'dotenv/config'
import pkg from 'pg';


const espacioTabla = process.env.DB_TABLA_ESPACIOS;


export class EspacioService {

    getEspacios = async () => {
        console.log('This is a function on the service');
        await pool.connect()
        let response
        const query=`SELECT * from ${espacioTabla}` 
        response=await pool.query(query)//trae espacios
        console.log(response)
        return response.rows;
    }

    createEspacio = async(espacio) => {
        console.log('This is a function on the service');
        let response
        const query = `INSERT INTO ${espacioTabla} (tipo_espacio) VALUES ('${espacio.tipo_espacio}') `;
        const query2 = `SELECT * from ${espacioTabla}`
        const { Pool } = pkg;
        const pool = new Pool(
            {
                connectionString:   process.env.DB_SERVER,
                ssl: {
                    rejectUnauthorized: false
                }
            })
        const espacios = await pool.query(query2)//trae todo de espacios
        const result = espacios.rows.filter(word => word.tipo_espacio===espacio.tipo_espacio);
        console.log(result[0])
        if(result[0] !== undefined){//datos repetidos
            return response
        }
        response = await pool.query(query)//crea un espacio
        pool.end()
        console.log(response)
        
        return response.rowCount;
    }

}