import 'dotenv/config'
import dbHelper from '../../helper.js'

const departamentoTabla = process.env.DB_TABLA_DEPARTAMENTO;


export class DepartamentoService {

    createDepartamento = async (departamento) => {
        console.log('This is a function on the service');
        let response
        let query
        let k=0;
        let letras = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","u","v","w","x","y","z", 0,1,2,3,4,5,6,7,8,9]
        const {automatico, letra, correlativa, cant_pisos, departamentosXpiso}=departamento
        let codigo
        for(let i=0; i<cant_pisos; i++){
            if(automatico==="true"){
                for(let j=0; j<departamentosXpiso; j++){
                    codigo=Math.floor(Math.random() * (37 - 1)) + 1;
                    console.log(letras[codigo])
                    if(letra==="true"){
                        query=`INSERT INTO ${departamentoTabla} (Codigo, Departamento, Id_Edificio) VALUES (@Codigo, '${i+1}${letras[j]}', @Id_Edificio) `
                        response=await dbHelper (undefined,departamento,query)
                    }else if(correlativa==="false"){
                        query=`INSERT INTO ${departamentoTabla} (Codigo, Departamento, Id_Edificio) VALUES (@Codigo, '${i+1}.${j+1}', @Id_Edificio) `;
                        response=await dbHelper (undefined,departamento,query)
                    }else{
                        k++;
                        query=`INSERT INTO ${departamentoTabla} (Codigo, Departamento, Id_Edificio) VALUES (@Codigo, '${i+1}.${k}', @Id_Edificio) `;
                        response=await dbHelper (undefined,departamento,query)
                    }
                }
            }else{
                for(let j=0; j<departamentosXpiso[i]; j++){
                    codigo=Math.floor(Math.random() * (37 - 1)) + 1;
                    console.log(letras[codigo])
                    //console.log(departamentosXpiso[i])
                    if(letra==="true"){
                        query=`INSERT INTO ${departamentoTabla} (Codigo, Departamento, Id_Edificio) VALUES (@Codigo, '${i+1}${letras[j]}', @Id_Edificio) `
                        response=await dbHelper (undefined,departamento,query)
                    }else if(correlativa==="false"){
                        query=`INSERT INTO ${departamentoTabla} (Codigo, Departamento, Id_Edificio) VALUES (@Codigo, '${i+1}.${j+1}', @Id_Edificio) `;
                        response=await dbHelper (undefined,departamento,query)
                    }else{
                        k++;
                        query=`INSERT INTO ${departamentoTabla} (Codigo, Departamento, Id_Edificio) VALUES (@Codigo, '${i+1}.${k}', @Id_Edificio) `;
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