import 'dotenv/config'
import pool from '../../db.js';

const edificioTabla = process.env.DB_TABLA_EDIFCIOS;
const edificioXespacioTabla = process.env.DB_TABLA_EDIFICIOSXESPACIO;
const adminTabla = process.env.DB_TABLA_ADMIN


export class EdificioService {

    createEdificio = async(edificio) => {
        console.log('This is a function on the service');
        console.log(edificio.id_espaciocc[0])
        let response
        let response2
        let response3
        let query = `INSERT INTO ${edificioTabla} (direccion, año_construccion, cuit, clave_suterh, id_administrador, nro_encargado, nro_emergencia) VALUES ('${edificio.direccion}', '${edificio.año_construccion}', '${edificio.cuit}', '${edificio.clave_suterh}', '${edificio.id_administrador}', '${edificio.nro_encargado}', '${edificio.nro_emergencia}') `;
        let query3 = `SELECT MAX(id_edificio) as id_edificio from ${edificioTabla}`
        await pool.connect()
        response = await pool.query(query)
        response3 = await pool.query(query3)
        console.log(response3.rows[0].id_edificio)
        if (edificio.id_espaciocc !== undefined) {
            edificio.id_espaciocc.forEach(async(espacio) => {
                console.log('espacio', espacio)
                let query2 = `INSERT INTO ${edificioXespacioTabla} (id_espaciocc,id_edificio) values ('${espacio}', '${response3.rows[0].id_edificio}')`
                console.log(query2)
                response2 = await pool.query(query2)
            })
        }
        return response.rows;
    }

    getEdificio = async(id) => {
        console.log('This is a function on the serviceeeeeeeeeeeeeee');
        let response
        let query = `SELECT * from ${edificioTabla} WHERE id_administrador='${id}'`;
        await pool.connect()
        if (id = !0) {
            response = await pool.query(query)
        } else {
            response = 0
        }
        console.log(response.rows)
        return response.rows;
    }
}