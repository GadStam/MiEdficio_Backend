import 'dotenv/config'
import pkg from 'pg';


const edificioTabla = process.env.DB_TABLA_EDIFCIOS;
const edificioXespacioTabla = process.env.DB_TABLA_EDIFICIOSXESPACIO;
const adminTabla = process.env.DB_TABLA_ADMIN


export class EdificioService {

    createEdificio = async(edificio, id) => {
        
        console.log('This is a function on the service');

        edificio.id_espaciocc.unshift(0)

        let response
        let response2
        let response3
        let edificios
        const query = `INSERT INTO ${edificioTabla} (direccion, año_construccion, cuit, clave_suterh, id_administrador, nro_encargado, nro_emergencia) VALUES ('${edificio.direccion}', '${edificio.año_construccion}', '${edificio.cuit}', '${edificio.clave_suterh}', '${id}', '${edificio.nro_encargado}', '${edificio.nro_emergencia}') `;
        const query3 = `SELECT MAX(id_edificio) as id_edificio from ${edificioTabla}`
        const query4= `SELECT * from ${edificioTabla}`
        const query5 = `SELECT * from ${adminTabla} where id_administrador=${id}`

        const { Pool } = pkg;
        const pool = new Pool(
            {
                connectionString:   process.env.DB_SERVER,
                ssl: {
                    rejectUnauthorized: false
                }
            })

        let response5=await pool.query(query5)
        if(response5.rows[0]===undefined){
            return "error"
        }
        edificios= await pool.query(query4)//trae todos los edificios
        const result = edificios.rows.filter(word => word.cuit===edificio.cuit || word.clave_suterh===edificio.clave_suterh || word.direccion===edificio.direccion);
        if(result[0] !== undefined){//datos repetidos
            pool.end()
            return response
        }
        response = await pool.query(query)//crea nuevo edificio
        response3 = await pool.query(query3)//trae su id
        if (edificio.id_espaciocc !== undefined) {//tiene espacios comunes
            try{
                await pool.query("BEGIN");
                edificio.id_espaciocc.forEach(async(espacio) => {
                    if(espacio!==0){
                        let query2 = `INSERT INTO ${edificioXespacioTabla} (id_espaciocc,id_edificio) values ('${espacio}', '${response3.rows[0].id_edificio}')`
                        response2 = await pool.query(query2)//crea relacion edificio espacio comun
                    }else{
                        const response4 = await pool.query(`Select * from ${edificioXespacioTabla}`)
                    }
                })
                await pool.query ("COMMIT")
                
            } catch (e) {
                await pool.query("ROLLBACK");
                throw e;
            }
        }
        pool.end()
        return response3.rows
    }

    getEdificio = async(id) => {
        console.log('This is a function on the service');
        let edificio
        const query = `SELECT * from ${edificioTabla} WHERE id_administrador='${id}'`;

        const { Pool } = pkg;
        const pool = new Pool(
            {
                connectionString:   process.env.DB_SERVER,
                ssl: {
                    rejectUnauthorized: false
                }
            })
        edificio = await pool.query(query)//trae edificio by adminsistrador
        pool.end()
        return edificio.rows;
    }

    getEdificioById = async(id) => {
        console.log('This is a function on the service');
        let edificio
        const query = `SELECT * from ${edificioTabla} WHERE id_edificio='${id}'`;

        const { Pool } = pkg;
        const pool = new Pool(
            {
                connectionString:   process.env.DB_SERVER,
                ssl: {
                    rejectUnauthorized: false
                }
            })
        edificio = await pool.query(query)//trae edificio by id
        pool.end()
        return edificio.rows;
    }


    
}