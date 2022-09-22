import 'dotenv/config'
import pkg from 'pg';


const adminTabla = process.env.DB_TABLA_ADMIN;
const edificioTabla = process.env.DB_TABLA_EDIFCIOS;


export class AdministradorService {

    createAdministrador = async(administrador) => {
        console.log('This is a function on the service');
        
        let response
        const query = `INSERT INTO ${adminTabla} (nombre, apellido, mail, contraseña, telefono) VALUES ('${administrador.nombre}', '${administrador.apellido}',  '${administrador.mail}', '${administrador.contraseña}', '${administrador.telefono}') `;
        const query2 = `SELECT * from ${adminTabla}`
        const query3= `SELECT MAX(id_administrador) as id_administrador from ${adminTabla}`

        const { Pool } = pkg;
        const pool = new Pool(
            {
                connectionString:   process.env.DB_SERVER,
                ssl: {
                    rejectUnauthorized: false
                }
            })

        const administradores = await pool.query(query2)//trae todo de administradores
        const result = administradores.rows.filter(word => word.mail===administrador.mail || word.contraseña===administrador.contraseña || word.telefono===administrador.telefono);
        if(result[0] !== undefined){//datos repetidos
            return response
        }
        response = await pool.query(query)//crea un administrador
        response= await pool.query(query3)
        pool.end()        
        return response.rows[0];
    }


    getAdministrador = async(administrador) => {
        console.log('This is a function on the service');
        let response = 0
        const query = `SELECT id_administrador from ${adminTabla} WHERE mail='${administrador.mail}' and contraseña='${administrador.contraseña}'`


        const { Pool } = pkg;
        const pool = new Pool(
            {
                connectionString:   process.env.DB_SERVER,
                ssl: {
                    rejectUnauthorized: false
                }
            })

        
        response = await pool.query(query)//trae el administrador
        pool.end()
        console.log(response.rows)
        return response.rows;
    }

    getAdministradorById = async(id) => {
        console.log('This is a function on the service');
        let response
        const query = `SELECT * from ${adminTabla} WHERE id_administrador='${id}'`;

        const { Pool } = pkg;

        const pool = new Pool(
            {
                connectionString:   process.env.DB_SERVER,
                ssl: {
                    rejectUnauthorized: false
                }
            })

        response = await pool.query(query)
        pool.end()
        return response.rows;
        }
    
        getAdministradorByIdEdificio = async(id) => {
            console.log('This is a function on the service');
            let response
            let response2
            let id_adm

            const query = `SELECT id_administrador from ${edificioTabla} WHERE id_edificio=${id}`;

            const { Pool } = pkg;    
            const pool = new Pool(
                {
                    connectionString:   process.env.DB_SERVER,
                    ssl: {
                        rejectUnauthorized: false
                    }
                })
        
            response = await pool.query(query)
            if(response.rows[0]===undefined){
                pool.end()
                return response
            }

            id_adm=response.rows[0].id_administrador

            const query2= `SELECT * from ${adminTabla} WHERE ${id_adm}=id_administrador`;
            
            response2 = await pool.query(query2)
            pool.end()
            
            return response2.rows;
            }
        


}