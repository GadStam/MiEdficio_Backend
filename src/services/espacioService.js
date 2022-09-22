import 'dotenv/config'
import pkg from 'pg';


const espacioTabla = process.env.DB_TABLA_ESPACIOS;
const edificioXespacioTabla = process.env.DB_TABLA_EDIFICIOSXESPACIO;


export class EspacioService {

    getEspacios = async () => {
        console.log('This is a function on the service');
        const { Pool } = pkg;
        const pool = new Pool(
            {
                connectionString:   process.env.DB_SERVER,
                ssl: {
                    rejectUnauthorized: false
                }
            })
        let espacios
        const query=`SELECT * from ${espacioTabla}` 
        espacios=await pool.query(query)//trae espacios
        pool.end()
        return espacios.rows;
    }

    createEspacio = async(espacio) => {
        console.log('This is a function on the service');
        let response
        let id_espaciocc
        const query = `INSERT INTO ${espacioTabla} (tipo_espacio) VALUES ('${espacio.tipo_espacio}') `;
        const query2 = `SELECT * from ${espacioTabla}`
        const query3= `SELECT MAX(id_espaciocc) as id_espaciocc from ${espacioTabla}`
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
        if(result[0] !== undefined){//datos repetidos
            return response
        }
        response = await pool.query(query)//crea un espacio
        id_espaciocc= await pool.query(query3)
        pool.end()
        
        return id_espaciocc.rows;
    }

    getEspaciosById_Edificio = async(id) => {
        console.log('This is a function on the service');
        let response
        let response2
        let espacio
        let espacios=[]
        const query = `SELECT id_espaciocc from ${edificioXespacioTabla} WHERE id_edificio='${id}'`;
        const query2= `SELECT espaciocomun from ${espacioTabla} where id_espaciocc='${espacio}`
        const { Pool } = pkg;
        const pool = new Pool(
            {
                connectionString:   process.env.DB_SERVER,
                ssl: {
                    rejectUnauthorized: false
                }
            })
        response = await pool.query(query)//trae edificio by adminsistrador
        pool.end()
        return response.rows;
    }

    getEspaciosById_EspacioCC=async(id) => {
        console.log('This is a function on the service');
        let tipo_espacio
        const query= `SELECT tipo_espacio from ${espacioTabla} where id_espaciocc=${id}`
        const { Pool } = pkg;
        const pool = new Pool(
            {
                connectionString:   process.env.DB_SERVER,
                ssl: {
                    rejectUnauthorized: false
                }
            })
        tipo_espacio = await pool.query(query)//trae edificio by adminsistrador
        pool.end()
        return tipo_espacio.rows;
    }
}