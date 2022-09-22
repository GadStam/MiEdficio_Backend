import 'dotenv/config'
import pkg from 'pg';


const departamentoTabla = process.env.DB_TABLA_DEPARTAMENTO;


export class DepartamentoService {

    
    createDepartamento = async (id, departamento) => {
        console.log('This is a function on the service');

        //create codigo
        const generateCode = function() {
            let codigo= ''
            for(let m=0; m<6;m++){
                let char=Math.floor(Math.random() * (36 - 0)) + 0;
                codigo=codigo + letras[char]
            }
    
            return codigo
        }


        //definiciones
        let codigo
        let codigos = []
        let deptos
        let query
        let k=0;
        let letras = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z", "0","1","2","3","4","5","6","7","8","9"]
        let response
        let departamentos
        let response3 = []
        let result
        const query2=`SELECT * from ${departamentoTabla}`
        const query4=`SELECT departamento from ${departamentoTabla} WHERE id_edificio=${id}`

        const { Pool } = pkg;
        const pool = new Pool(
            {
                connectionString:   process.env.DB_SERVER,
                ssl: {
                    rejectUnauthorized: false
                }
            })

        departamentos=await pool.query(query4)
        if(departamentos.rows[0]===undefined){
            return departamentos.rows
        }
        for(let i=0; i<departamento.cant_pisos; i++){ //repetidor por pisos
            if(departamento.automatico==="true"){ //automatico
                for(let j=0;  j<departamento.departamentosXpiso; j++){ //repetidor por departamento
                    do { 
                        codigo=generateCode() //genera un codigo 
                        departamentos=await pool.query(query2) //trae todos los departamentos
                        result = departamentos.rows.filter(word => word.codigo===codigo); //codigo repetidos
                    }while(result[0] !== undefined) //ya existe ese codigo
                    codigos.push(codigo)
                    if(departamento.letra==="true"){ //numeracion por letra
                        if(departamento.correlativa==="false"){
                            query=`INSERT INTO ${departamentoTabla} (codigo, departamento, id_edificio) VALUES ('${codigo}', '${i+1}${letras[j]}', '${id}') `
                            response=await pool.query(query)
                        }else{
                            query=`INSERT INTO ${departamentoTabla} (codigo, departamento, id_edificio) VALUES ('${codigo}', '${i+1}${letras[k]}', '${id}') `
                            response=await pool.query(query)
                            k++
                        }
                    }else if(departamento.correlativa==="false"){ //numeracion no correlativa
                        query=`INSERT INTO ${departamentoTabla} (codigo, departamento, id_edificio) VALUES ('${codigo}', '${i+1}.${j+1}', '${id}') `;
                        response=await pool.query(query)
                    }else{ //numeracion correlativa
                        k++;
                        query=`INSERT INTO ${departamentoTabla} (codigo, departamento, id_edificio) VALUES ('${codigo}', '${i+1}.${k}', '${id}') `;
                        response=await pool.query(query)
                    }
                }
            }else{ //manual
                for(let j=0; j<departamento.departamentosXpiso[i]; j++){ //repetidor por departamento
                    do {
                        codigo=generateCode() //crea un codigo
                        departamentos=await pool.query(query2) //trae departamentos 
                        result = departamentos.rows.filter(word => word.codigo===codigo); //codigos repetidos
                    }while(result[0] !== undefined) //ya existe ese codigo
                    codigos.push(codigo)
                    if(departamento.letra==="true"){ //numeracion por letra
                        if(departamento.correlativa==="false"){
                            query=`INSERT INTO ${departamentoTabla} (codigo, departamento, id_edificio) VALUES ('${codigo}', '${i+1}${letras[j]}', '${id}') `
                            response=await pool.query(query)
                        }else{
                            query=`INSERT INTO ${departamentoTabla} (codigo, departamento, id_edificio) VALUES ('${codigo}', '${i+1}${letras[k]}', '${id}') `
                            response=await pool.query(query)     
                            k++                       
                        }
                    }else if(departamento.correlativa==="false"){ //numeracion no correlativa
                        query=`INSERT INTO ${departamentoTabla} (codigo, departamento, id_edificio) VALUES ('${codigo}', '${i+1}.${j+1}', '${id}') `;
                        response=await pool.query(query)
                    }else{// numeracion correlativa
                        k++;
                        query=`INSERT INTO ${departamentoTabla} (codigo, departamento, id_edificio) VALUES ('${codigo}', '${i+1}.${k}', '${id}') `;
                        response=await pool.query(query)
                    }
                }
            }
        }
        response3 = await pool.query(query4)
        deptos=response3.rows
        pool.end()
        return {codigos, deptos}
    }

    getDepartamentoByCodigo = async (codigo) => {
        console.log('This is a function on the service');
        let departamento
        const query=`SELECT * from ${departamentoTabla} WHERE codigo='${codigo}'`
        const { Pool } = pkg;
        const pool = new Pool(
            {
                connectionString:   process.env.DB_SERVER,
                ssl: {
                    rejectUnauthorized: false
                }
            })
        departamento=await pool.query(query)//trae el departamento
        pool.end()
        return departamento.rows;
    }

    updateDepartamentoByCodigo = async (codigo, departamento) => {
        console.log('This is a function on the service');

        let response;
        const query=`UPDATE ${departamentoTabla} SET nombre = '${departamento.nombre}', apellido = '${departamento.apellido}', dni = '${departamento.dni}', telefono = '${departamento.telefono}' WHERE codigo = '${codigo}'`;
        const query2=`SELECT * from ${departamentoTabla}`

        const { Pool } = pkg;
        const pool = new Pool(
            {
                connectionString:   process.env.DB_SERVER,
                ssl: {
                    rejectUnauthorized: false
                }
            })
        const departamentos = await pool.query(query2)//trae todos los departamentos
        const result = departamentos.rows.filter(word => word.dni===departamento.dni || word.telefono===departamento.telefono);
        if(result[0] !== undefined){//datos repetidos
            return response
        }

        response=await pool.query(query)//sube los datos al departamento
        pool.end()
        return response.rows;
    }

    getEdificio = async(id) => {
        console.log('This is a function on the service');
        let id_edificio
        const query = `SELECT id_edificio from ${departamentoTabla} WHERE codigo='${id}'`;

        const { Pool } = pkg;
        const pool = new Pool(
            {
                connectionString:   process.env.DB_SERVER,
                ssl: {
                    rejectUnauthorized: false
                }
            })
        id_edificio = await pool.query(query)//trae edificio by adminsistrador
        pool.end()
        return id_edificio.rows;
    }
    

    
}