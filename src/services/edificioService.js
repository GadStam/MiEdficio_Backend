import 'dotenv/config'
import dbHelper from '../../helper.js'

const edificioTabla = process.env.DB_TABLA_EDIFCIOS;


export class EdificioService {

    createEdificio = async (edificio) => {
        console.log('This is a function on the service');
        let response
        let query=`INSERT INTO ${edificioTabla} (Direccion, Año_Construccion, CUIT, Clave_Suterh, Id_Administrador, Nro_Encargado, Nro_Emergencia) VALUES (@Direccion, @Año_Construccion, @CUIT, @Clave_Suterh, @Id_Administrador, @Nro_Encargado, @Nro_Emergencia) `;
        response=await dbHelper (undefined,edificio,query)
        console.log(response)
        return response.recordset;
    }

    getEdificio = async () => {
        console.log('This is a function on the service');
        let response
        let query=`SELECT * from ${edificioTabla}`;
        response=await dbHelper (undefined,undefined,query)
        console.log(response)
        return response.recordset;
    }

}