import 'dotenv/config'
import dbHelper from '../../helper.js'

const administradorTabla = process.env.DB_TABLA_ADMIN;

export class AdministradorService {

    createAdministrador = async (administrador) => {
        console.log('This is a function on the service');
        let response
        let query=`INSERT INTO ${administradorTabla} (Nombre, Apellido, Mail, Contraseña) VALUES (@Nombre, @Apellido,  @Mail, @Contraseña) `;
        response=await dbHelper (undefined,administrador,query)
        console.log(response)
        return response.recordset;
    }
}
