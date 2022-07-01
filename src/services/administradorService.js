import 'dotenv/config'
import dbHelper from '../../helper.js'

const adminTabla = process.env.DB_TABLA_ADMIN;

export class AdministradorService {

    createAdministrador = async (administrador) => {
        console.log('This is a function on the service');
        let response
        let query=`INSERT INTO ${adminTabla} (Nombre, Apellido, Mail, Contraseña, Telefono) VALUES (@Nombre, @Apellido,  @Mail, @Contraseña, @Telefono) `;
        response=await dbHelper (undefined,administrador,query)
        console.log(response)
        return response.recordset;
    }

    getAdministrador = async (edificio) => {
        console.log('This is a function on the service');
        let response=0
        let query=`SELECT Id_Administrador from ${adminTabla} WHERE Mail=@Mail and Contraseña=@Contraseña`

        const{Mail, Contraseña}= edificio

        if(Mail && Contraseña){
            response=await dbHelper (undefined,{Mail, Contraseña},query)
        }else{
            response=0
        }
        console.log(response.recordset)
        return response.recordset;
    }
}
