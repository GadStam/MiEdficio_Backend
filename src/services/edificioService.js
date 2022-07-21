import 'dotenv/config'
import pool from '../../db.js';

const edificioTabla = process.env.DB_TABLA_EDIFCIOS;
const edificioXespacioTabla = process.env.DB_TABLA_EDIFICIOSXESPACIO;
const adminTabla = process.env.DB_TABLA_ADMIN


export class EdificioService {

    createEdificio = async(edificio, id) => {
        
        console.log('This is a function on the service');
        console.log(edificio.id_espaciocc[0])

        let response
        let response2
        let response3
        let edificios
        const query = `INSERT INTO ${edificioTabla} (direccion, año_construccion, cuit, clave_suterh, id_administrador, nro_encargado, nro_emergencia) VALUES ('${edificio.direccion}', '${edificio.año_construccion}', '${edificio.cuit}', '${edificio.clave_suterh}', '${id}', '${edificio.nro_encargado}', '${edificio.nro_emergencia}') `;
        const query3 = `SELECT MAX(id_edificio) as id_edificio from ${edificioTabla}`
        const query4= `SELECT * from ${edificioTabla}`

        await pool.connect()
        edificios= await pool.query(query4)//trae todos los edificios
        const result = edificios.rows.filter(word => word.cuit===edificio.cuit || word.clave_suterh===edificio.clave_suterh || word.direccion===edificio.direccion);
        console.log(result[0])
        if(result[0] !== undefined){//datos repetidos
            return response
        }
        response = await pool.query(query)//crea nuevo edificio
        response3 = await pool.query(query3)//trae su id
        console.log(response3.rows[0].id_edificio)
        if (edificio.id_espaciocc !== undefined) {//tiene espacios comunes
            edificio.id_espaciocc.forEach(async(espacio) => {
                console.log('espacio', espacio)
                let query2 = `INSERT INTO ${edificioXespacioTabla} (id_espaciocc,id_edificio) values ('${espacio}', '${response3.rows[0].id_edificio}')`
                console.log(query2)
                response2 = await pool.query(query2)//crea relacion edificio espacio comun
            })
        }
        return response.rows;
    }

    getEdificio = async(id) => {
        console.log('This is a function on the service');
        let response
        const query = `SELECT * from ${edificioTabla} WHERE id_administrador='${id}'`;

        await pool.connect()
        response = await pool.query(query)//trae edificio by adminsistrador
        console.log(response.rows)
        return response.rows;
    }
}