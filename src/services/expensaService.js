import 'dotenv/config'
import pkg from 'pg';


const expensaTabla = process.env.DB_TABLA_EXPENSA;
const departamentoTabla = process.env.DB_TABLA_DEPARTAMENTO

export class ExpensaService {

    createExpensa = async(id, expensa) => {
        console.log('This is a function on the service');
        let response
        let id_departamento
        let id_expensa
        const query2= `SELECT id_departamento from ${departamentoTabla} WHERE departamento='${expensa.depto}' and id_edificio='${id}'`
        const query3= `SELECT MAX(id_expensa) as id_expensa from ${expensaTabla}`
        const { Pool } = pkg;
        const pool = new Pool(
            {
                connectionString:   process.env.DB_SERVER,
                ssl: {
                    rejectUnauthorized: false
                }
            })
            console.log(query2)
            response= await pool.query(query2)
            console.log(response.rows)
                if(response.rows[0]===undefined){
                    return response.rows
                }
        id_departamento = await pool.query(query2)
        console.log(id_departamento.rows)
        const query = `INSERT INTO ${expensaTabla} (fecha, monto, id_departamento) VALUES ('${expensa.fecha}','${expensa.monto}',${id_departamento.rows[0].id_departamento} ) `;
        console.log(query)
        response = await pool.query(query)//crea un espacio
        id_expensa=await pool.query(query3)
        pool.end()
        
        return id_expensa.rows;
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
            const query=`SELECT * from ${expensaTabla} WHERE id_departamento=${response2.rows[0].id_departamento} ORDER BY fecha DESC`

            response=await pool.query(query)
            for(let i=0;i<response.rows.length;i++){
                let year=response.rows[i].fecha.getFullYear()+""
                let month=response.rows[i].fecha.getMonth()+""
                let day=response.rows[i].fecha.getDate()+""
                date=year+"-"+month+"-"+day
                response.rows[i].fecha=date
                response.rows[i].id_expensa=parseInt(response.rows[i].id_expensa)
                response.rows[i].id_departamento=parseInt(response.rows[i].id_departamento)
                response.rows[i].monto=parseInt(response.rows[i].monto)               
            } 
        pool.end()
        return response.rows;
    }

    
}