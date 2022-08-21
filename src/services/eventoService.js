import 'dotenv/config'
import pkg from 'pg';


const eventoTabla = process.env.DB_TABLA_EVENTO;


export class EventoService {

    createEvento = async(evento) => {
        console.log('This is a function on the service');
        let response
        let response2
        const query = `INSERT INTO ${eventoTabla} (fecha, hora_inicio, hora_final, cant_invitados, id_departamento, id_espaciocomun, id_edificio) VALUES ('${evento.fecha}', '${evento.hora_inicio}', '${evento.hora_final}', '${evento.cant_invitados}', '${evento.id_departamento}', '${evento.id_espaciocomun}', '${evento.id_edificio}' ) `;
        const query2 = `SELECT hora_inicio, hora_final from ${eventoTabla} where id_edificio=${evento.id_edificio} and id_espaciocomun=${evento.id_espaciocomun} and fecha='${evento.fecha}'`
        const { Pool } = pkg;
        const pool = new Pool(
            {
                connectionString:   process.env.DB_SERVER,
                ssl: {
                    rejectUnauthorized: false
                }
            })
            console.log(query2)
            response2=await pool.query(query2)
            console.log(response2.rows)

        const even = (element) => (evento.hora_inicio >= element.hora_inicio && evento.hora_inicio<element.hora_final) || (evento.hora_final>element.hora_inicio && evento.hora_final<=element.hora_final) || (evento.hora_inicio < element.hora_inicio && evento.hora_final> element.hora_final) ;

        const sePisan=(response2.rows.some(even));
        console.log(sePisan)
        if(sePisan===false){
            console.log(query)
            response = await pool.query(query)//crea un espacio
            pool.end()
            return response.rowCount
        }else{
            pool.end()
            return response
        }        
    }

    getEventosByEdificio = async (id) => {
        console.log('This is a function on the service');
        const { Pool } = pkg;
        const pool = new Pool(
            {
                connectionString:   process.env.DB_SERVER,
                ssl: {
                    rejectUnauthorized: false
                }
            })
        let response
        const query=`SELECT * from ${eventoTabla} where id_edificio=${id} order by fecha DESC` 
        console.log(query)
        response=await pool.query(query)//trae espacios
        pool.end()
        console.log(response.rows)
        return response.rows;
    }

    deleteEventos = async (id) => {
        console.log('This is a function on the service');
        const { Pool } = pkg;
        const pool = new Pool(
            {
                connectionString:   process.env.DB_SERVER,
                ssl: {
                    rejectUnauthorized: false
                }
            })
        let response
        const query=`DELETE * from ${eventoTabla} where id_evento=${id}` 
        response=await pool.query(query)//trae espacios
        pool.end()
        console.log(response)
        return response.rows;
    }
    
}