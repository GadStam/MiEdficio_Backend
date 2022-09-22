import 'dotenv/config'
import pkg from 'pg';


const expensaTabla = process.env.DB_TABLA_EXPENSA;
const departamentoTabla = process.env.DB_TABLA_DEPARTAMENTO

export class ExpensaService {

    createExpensa = async(pdf) => {
        console.log('This is a function on the service');
        let response
        //let response2
        //const query2= `SELECT id_departamento from ${departamentoTabla} WHERE codigo='${codigo}'`
        const { Pool } = pkg;
        const pool = new Pool(
            {
                connectionString:   process.env.DB_SERVER,
                ssl: {
                    rejectUnauthorized: false
                }
            })
        //response2 = await pool.query(query2)
        //console.log("what", response2.rows[0].id_departamento)
        const query = `INSERT INTO ${expensaTabla} ( pdf_expensa) VALUES ('${pdf}') `;
        response = await pool.query(query)//crea un espacio
        pool.end()
        
        return response.rowCount;
    }

    getExpensaByDepartamento = async(id) => {
        let response
        let response2
        let date
        const query2= `SELECT id_departamento from ${departamentoTabla} WHERE codigo='${id}'`
        const { Pool } = pkg;
        const pool = new Pool(
            {
                connectionString:   process.env.DB_SERVER,
                ssl: {
                    rejectUnauthorized: false
                }
            })
            response2 = await pool.query(query2)
            const query=`SELECT * from ${expensaTabla} WHERE id_departamento=${response2.rows[0].id_departamento} ORDER BY fecha_vencimiento DESC`

            response=await pool.query(query)
            for(let i=0;i<response.rows.length;i++){
                let year=response.rows[i].fecha_vencimiento.getFullYear()+""
                let month=response.rows[i].fecha_vencimiento.getMonth()+""
                let day=response.rows[i].fecha_vencimiento.getDate()+""
                date=year+"-"+month+"-"+day
                response.rows[i].fecha_vencimiento=date
                response.rows[i].id_expensa=parseInt(response.rows[i].id_expensa)
                response.rows[i].id_departamento=parseInt(response.rows[i].id_departamento)
                response.rows[i].monto=parseInt(response.rows[i].monto)               
            } 
        pool.end()
        return response.rows;
    }

    
}