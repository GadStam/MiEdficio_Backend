import 'dotenv/config'
import dbHelper from '../../helper.js'

const departamentoTabla = process.env.DB_TABLA_DEPARTAMENTO;


export class DepartamentoService {

    createDepartamento = async (departamento) => {
        console.log('This is a function on the service');
        let response
        let query=`INSERT INTO ${departamentoTabla} (Codigo, Nombre, Apellido, Dni, Telefono, Departamento, Id_Edificio) VALUES (@Codigo, @Nombre, @Apellido, @Dni, @Telefono, @Departamento, @Id_Edificio) `;
        response=await dbHelper (undefined,departamento,query)
        console.log(response)
        return response.recordset;
    }

    getDepartamentoByCodigo = async (Codigo) => {
        console.log(Codigo)
        let response
        let query=`SELECT * from ${departamentoTabla} where Codigo=@Codigo`
        response=await dbHelper(undefined,{Codigo}, query)
        console.log(response)
        return response.recordset;
    }
}