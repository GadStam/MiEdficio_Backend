import 'dotenv/config'
import pool from '../../db.js';

const departamentoTabla = process.env.DB_TABLA_DEPARTAMENTO;


export class DepartamentoService {

    
    createDepartamento = async (departamento) => {
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
        let query
        let k=0;
        let letras = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z", "0","1","2","3","4","5","6","7","8","9"]
        let response
        let response2
        let result
        const query2=`SELECT * from ${departamentoTabla}`

        await pool.connect()
        for(let i=0; i<departamento.cant_pisos; i++){ //repetidor por pisos
            if(departamento.automatico==="true"){ //automatico
                for(let j=0;  j<departamento.departamentosXpiso; j++){ //repetidor por departamento
                    do { 
                        codigo=generateCode() //genera un codigo 
                        console.log(codigo) 
                        response2=await pool.query(query2) //trae todos los departamentos
                        result = response2.rows.filter(word => word.codigo===codigo); //codigo repetidos
                        console.log(result[0])
                    }while(result[0] !== undefined) //ya existe ese codigo
                    if(departamento.letra==="true"){ //numeracion por letra
                        if(departamento.correlativa==="false"){
                            query=`INSERT INTO ${departamentoTabla} (codigo, departamento, id_edificio) VALUES ('${codigo}', '${i+1}${letras[j]}', '${departamento.id_edificio}') `
                            response=await pool.query(query)
                        }else{
                            k++
                            query=`INSERT INTO ${departamentoTabla} (codigo, departamento, id_edificio) VALUES ('${codigo}', '${i+1}${letras[k]}', '${departamento.id_edificio}') `
                            response=await pool.query(query)
                        }
                    }else if(departamento.correlativa==="false"){ //numeracion no correlativa
                        query=`INSERT INTO ${departamentoTabla} (codigo, departamento, id_edificio) VALUES ('${codigo}', '${i+1}.${j+1}', '${departamento.id_edificio}') `;
                        response=await pool.query(query)
                    }else{ //numeracion correlativa
                        k++;
                        query=`INSERT INTO ${departamentoTabla} (codigo, departamento, id_edificio) VALUES ('${codigo}', '${i+1}.${k}', '${departamento.id_edificio}') `;
                        response=await pool.query(query)
                    }
                }
            }else{ //manual
                for(let j=0; j<departamento.departamentosXpiso[i]; j++){ //repetidor por departamento
                    do {
                        codigo=generateCode() //crea un codigo
                        console.log(codigo)
                        response2=await pool.query(query2) //trae departamentos 
                        result = response2.rows.filter(word => word.codigo===codigo); //codigos repetidos
                        console.log(result[0])
                    }while(result[0] !== undefined) //ya existe ese codigo
                    if(departamento.letra==="true"){ //numeracion por letra
                        if(departamento.correlativa==="false"){
                            query=`INSERT INTO ${departamentoTabla} (codigo, departamento, id_edificio) VALUES ('${codigo}', '${i+1}${letras[j]}', '${departamento.id_edificio}') `
                            response=await pool.query(query)
                        }else{
                            k++
                            query=`INSERT INTO ${departamentoTabla} (codigo, departamento, id_edificio) VALUES ('${codigo}', '${i+1}${letras[k]}', '${departamento.id_edificio}') `
                            response=await pool.query(query)                            
                        }
                    }else if(departamento.correlativa==="false"){ //numeracion no correlativa
                        query=`INSERT INTO ${departamentoTabla} (codigo, departamento, id_edificio) VALUES ('${codigo}', '${i+1}.${j+1}', '${departamento.id_edificio}') `;
                        response=await pool.query(query)
                    }else{// numeracion correlativa
                        k++;
                        query=`INSERT INTO ${departamentoTabla} (codigo, departamento, id_edificio) VALUES ('${codigo}', '${i+1}.${k}', '${departamento.id_edificio}') `;
                        response=await pool.query(query)
                    }
                }
            }
        }

    }

    getDepartamentoByCodigo = async (codigo) => {
        console.log('This is a function on the service');
        console.log(codigo)
        let response
        const query=`SELECT * from ${departamentoTabla} WHERE codigo='${codigo}'`
        await pool.connect()
        response=await pool.query(query)//trae el departamento
        console.log(response.rows)
        return response.rows;
    }

    updateDepartamentoByCodigo = async (codigo, departamento) => {
        console.log('This is a function on the service');
        console.log(codigo)

        let response;
        const query=`UPDATE ${departamentoTabla} SET nombre = '${departamento.nombre}', apellido = '${departamento.apellido}', dni = '${departamento.dni}', telefono = '${departamento.telefono}' WHERE codigo = '${codigo}'`;
        const query2=`SELECT * from ${departamentoTabla}`

        await pool.connect()
        const departamentos = await pool.query(query2)//trae todos los departamentos
        const result = departamentos.rows.filter(word => word.dni===departamento.dni || word.telefono===departamento.telefono);
        if(result[0] !== undefined){//datos repetidos
            return response
        }

        response=await pool.query(query)//sube los datos al departamento
        return response.rows;
    }

    
}