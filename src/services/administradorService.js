import 'dotenv/config'
import pool from '../../db.js';

const adminTabla = process.env.DB_TABLA_ADMIN;

export class AdministradorService {

    createAdministrador = async(administrador) => {
        await pool.connect()
        console.log('This is a function on the service');
        let response
        const query = `INSERT INTO ${adminTabla} (nombre, apellido, mail, contraseña, telefono) VALUES ('${administrador.nombre}', '${administrador.apellido}',  '${administrador.mail}', '${administrador.contraseña}', '${administrador.telefono}') `;
        const query2 = `SELECT * from ${adminTabla}`
        administradores = await pool.query(query2)
        const result = administradores.rows.filter(word => word.mail===administrador.mail || word.contraseña===administrador.contraseña);
        console.log(result[0])
        if(result[0] !== undefined){
            return response
        }
        response = await pool.query(query)
        console.log(response)
        

        return response.rowCount;
    }
//hodaaaaaaaaa
    getAdministrador = async(administrador) => {
        console.log('This is a function on the service');
        let response = 0
        await pool.connect()
        let query = `SELECT id_administrador from ${adminTabla} WHERE mail='${administrador.mail}' and contraseña='${administrador.contraseña}'`
        if (administrador.mail && administrador.contraseña) {
            response = await pool.query(query)
        } else {
            response = 0
        }
        console.log(response.rows)
        return response.rows;
    }

    getAdministradorById = async(id) => {
        console.log('This is a function on the serviceeeeeeeeeeeeeee');
        let response
        let query = `SELECT * from ${adminTabla} WHERE id_administrador='${id}'`;
        await pool.connect()
            try{
                if (id = !0) {
                    response = await pool.query(query)
                } else {
                    response = 0
                }
            }catch(error){
                console.log(error)
            }


        console.log(response.rows)
        return response.rows;
        }
    


}