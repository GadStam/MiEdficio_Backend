import 'dotenv/config'
import pool from '../../db.js';

const departamentoTabla = process.env.DB_TABLA_DEPARTAMENTO;


export class DepartamentoService {

    //hello = () => {

    
    createDepartamento = async (departamento) => {

        const generateCode = function() {
            let codigo= ''
            for(let m=0; m<6;m++){
                let char=Math.floor(Math.random() * (36 - 0)) + 0;
                codigo=codigo + letras[char]
            }
    
            return codigo
        }

        console.log('This is a function on the service');

        //definiciones
        let codigo
        let query
        let k=0;
        let letras = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z", "0","1","2","3","4","5","6","7","8","9"]
        let response

        await pool.connect()
        for(let i=0; i<departamento.cant_pisos; i++){
            if(departamento.automatico==="true"){
                for(let j=0;  j<departamento.departamentosXpiso; j++){
                    codigo=generateCode()
                    if(departamento.letra==="true"){
                        query=`INSERT INTO ${departamentoTabla} (codigo, departamento, id_edificio) VALUES ('${codigo}', '${i+1}${letras[j]}', '${departamento.id_edificio}') `
                        response=await pool.query(query)
                    }else if(departamento.correlativa==="false"){
                        query=`INSERT INTO ${departamentoTabla} (codigo, departamento, id_edificio) VALUES ('${codigo}', '${i+1}.${j+1}', '${departamento.id_edificio}') `;
                        response=await pool.query(query)
                    }else{
                        console.log("sino")
                        k++;
                        query=`INSERT INTO ${departamentoTabla} (codigo, departamento, id_edificio) VALUES ('${codigo}', '${i+1}.${k}', '${departamento.id_edificio}') `;
                        response=await pool.query(query)
                    }
                }
            }else{
                for(let j=0; j<departamento.departamentosXpiso[i]; j++){
                    codigo=generateCode()
                    if(departamento.letra==="true"){
                        query=`INSERT INTO ${departamentoTabla} (codigo, departamento, id_edificio) VALUES ('${codigo}', '${i+1}${letras[j]}', '${departamento.id_edificio}') `
                        response=await pool.query(query)
                    }else if(departamento.correlativa==="false"){
                        query=`INSERT INTO ${departamentoTabla} (codigo, departamento, id_edificio) VALUES ('${codigo}', '${i+1}.${j+1}', '${departamento.id_edificio}') `;
                        response=await pool.query(query)
                    }else{
                        k++;
                        query=`INSERT INTO ${departamentoTabla} (codigo, departamento, id_edificio) VALUES ('${codigo}', '${i+1}.${k}', '${departamento.id_edificio}') `;
                        response=await pool.query(query)
                    }
                }
            }
        }

    }

    getDepartamentoByCodigo = async (departamento) => {
        await pool.connect()
        console.log(departamento.codigo)
        let response
        let query=`SELECT * from ${departamentoTabla} WHERE codigo = ${departamento.codigo}`
        response=await pool.query(query)
        console.log(response.rows)
        return response.rows;
    }

    updateDepartamentoByCodigo = async (codigo, departamento) => {
        console.log('This is a function on the service');
        await pool.connect()
        let response;
        let query=`UPDATE ${departamentoTabla} SET nombre = ${departamento.nombre}, apellido = ${departamento.apellido}, dni = ${departamento.dni} WHERE codigo = ${codigo.codigo}`;
        response=await pool.query(query)
        console.log(response)

        return response.rows;
    }

    
}