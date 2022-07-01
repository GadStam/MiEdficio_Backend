import 'dotenv/config'
import dbHelper from '../../helper.js'

const departamentoTabla = process.env.DB_TABLA_DEPARTAMENTO;


export class DepartamentoService {

    /*zgenerateCode=() => {
        let codigo= ''
        for(let m=0; m<1;m++){
            let char=Math.floor(Math.random() * (36 - 0)) + 0;
            codigo=codigo + letras[char]
        }

        return codigo
    }*/

    createDepartamento = async (departamento) => {
        console.log('This is a function on the service');
        let response
        //let codigos
        let query
        let k=0;
        let letras = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z", "0","1","2","3","4","5","6","7","8","9"]
        //let query2 = `SELECT Codigo FROM ${departamentoTabla}`
        const {automatico, letra, correlativa, cant_pisos, departamentosXpiso}=departamento
        for(let i=0; i<cant_pisos; i++){
            if(automatico==="true"){
                for(let j=0;  j<departamentosXpiso; j++){
                    let codigo= ''
                    for(let m=0; m<6;m++){
                        let char=Math.floor(Math.random() * (36 - 0)) + 0;
                        codigo=codigo + letras[char]
                    }
                    /*codigo=DepartamentoService.generateCode()
                    codigos=await dbHelper(undefined,departamento,query2)
                    console.log(codigos)
                    codigos.forEach(cod => {
                        if (codigo === cod) {
                            codigo=DepartamentoService.generateCode()
                        }
                    })*/
                    if(letra==="true"){
                        query=`INSERT INTO ${departamentoTabla} (Codigo, Departamento, Id_Edificio) VALUES ('${codigo}', '${i+1}${letras[j]}', @Id_Edificio) `
                        response=await dbHelper (undefined,departamento,query)
                    }else if(correlativa==="false"){
                        query=`INSERT INTO ${departamentoTabla} (Codigo, Departamento, Id_Edificio) VALUES ('${codigo}', '${i+1}.${j+1}', @Id_Edificio) `;
                        response=await dbHelper (undefined,departamento,query)
                    }else{
                        k++;
                        query=`INSERT INTO ${departamentoTabla} (Codigo, Departamento, Id_Edificio) VALUES ('${codigo}', '${i+1}.${k}', @Id_Edificio) `;
                        response=await dbHelper (undefined,departamento,query)
                    }
                }
            }else{
                for(let j=0; j<departamentosXpiso[i]; j++){
                    let codigo= ''
                    for(let m=0; m<6;m++){
                        let char=Math.floor(Math.random() * (36 - 0)) + 0;
                        codigo=codigo + letras[char]
                    }
                    /*codigo=DepartamentoService.generateCode()
                    codigos=await dbHelper(undefined,departamento,query2)
                    console.log(codigos)
                    codigos.forEach(cod => {
                        if (codigo === cod) {
                            codigo=DepartamentoService.generateCode()
                        }
                    })*/
                    if(letra==="true"){
                        query=`INSERT INTO ${departamentoTabla} (Codigo, Departamento, Id_Edificio) VALUES ('${codigo}', '${i+1}${letras[j]}', @Id_Edificio) `
                        response=await dbHelper (undefined,departamento,query)
                    }else if(correlativa==="false"){
                        query=`INSERT INTO ${departamentoTabla} (Codigo, Departamento, Id_Edificio) VALUES ('${codigo}', '${i+1}.${j+1}', @Id_Edificio) `;
                        response=await dbHelper (undefined,departamento,query)
                    }else{
                        k++;
                        query=`INSERT INTO ${departamentoTabla} (Codigo, Departamento, Id_Edificio) VALUES ('${codigo}', '${i+1}.${k}', @Id_Edificio) `;
                        response=await dbHelper (undefined,departamento,query)
                    }
                }
            }
        }
    }

    getDepartamentoByCodigo = async (Codigo) => {
        console.log(Codigo)
        let response
        let query=`SELECT * from ${departamentoTabla} where Codigo=@Codigo`
        response=await dbHelper(undefined,{Codigo}, query)
        console.log(response.recordset)
        return response.recordset;
    }

    updateDepartamentoByCodigo = async (codigo, departamento) => {
        console.log('This is a function on the service');
        let response;
        let query=`UPDATE ${departamentoTabla} SET Nombre = @Nombre, Apellido = @Apellido, Dni = @Dni WHERE Codigo = @Codigo`;
        response=await dbHelper(undefined,{codigo, departamento},query)
        console.log(response)
        console.log(departamento.codigo)

        return response.recordset;
    }
}