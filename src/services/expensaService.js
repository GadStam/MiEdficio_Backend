import 'dotenv/config'
import pkg from 'pg';


const expensaTabla = process.env.DB_TABLA_EXPENSA;


export class ExpensaService {

    createExpensa = async(expensa) => {
        console.log('This is a function on the service');
        let response
        const query = `INSERT INTO ${expensaTabla} (id_departamento, monto, fecha_vencimiento, pdf_expensa, mes) VALUES ('${expensa.id_departamento}', '${expensa.monto}', '${expensa.fecha_vencimiento}', '${expensa.pdf_expensa}', '${expensa.mes}') `;
        const { Pool } = pkg;
        const pool = new Pool(
            {
                connectionString:   process.env.DB_SERVER,
                ssl: {
                    rejectUnauthorized: false
                }
            })
        response = await pool.query(query)//crea un espacio
        pool.end()
        console.log(response)
        
        return response.rowCount;
    }

    getExpensaByDepartamento = async(id) => {
        let response
        const query=`SELECT * from ${expensaTabla} WHERE id_departamento='${id}'`
        const { Pool } = pkg;
        const pool = new Pool(
            {
                connectionString:   process.env.DB_SERVER,
                ssl: {
                    rejectUnauthorized: false
                }
            })
        response=await pool.query(query)
        pool.end()
        console.log(response.rows)
        return response.rows;
    }

    
}