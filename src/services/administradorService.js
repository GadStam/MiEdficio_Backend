import 'dotenv/config'
import pool from '../../db.js';
import dbHelper from '../../helper.js'

const adminTabla = process.env.DB_TABLA_ADMIN;

export class AdministradorService {

    createAdministrador = async (administrador) => {
        await pool.connect()
        console.log('This is a function on the service');
        let response
        let query=`INSERT INTO ${adminTabla} (nombre, apellido, mail, contraseña, telefono) VALUES ('${administrador.nombre}', '${administrador.apellido}',  '${administrador.mail}', '${administrador.contraseña}', '${administrador.telefono}') `;
        response=await pool.query(query)
        // response= await dbHelper(query)
        console.log(response)
        return response.rowCount;
    }

    getAdministrador = async (administrador) => {
        console.log('This is a function on the service');
        let response=0
        await pool.connect()
        let query=`SELECT id_administrador from ${adminTabla} WHERE mail='${administrador.mail}' and contraseña='${administrador.contraseña}'`

        if(administrador.mail && administrador.contraseña){
        response=await pool.query(query)
        }else{
            response=0
        }
        console.log(response.rows)
        return response.rows;
    }
}
