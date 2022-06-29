import 'dotenv/config'
import dbHelper from '../../helper.js'

const edificioTabla = process.env.DB_TABLA_EDIFCIOS;
const edificioXespacioTabla= process.env.DB_TABLA_EDIFICIOSXESPACIO;
const adminTabla= process.env.DB_TABLA_ADMIN


export class EdificioService {

    createEdificio = async (edificio) => {
        console.log('This is a function on the service');
        let response
        let response2
        let response3
        let query=`INSERT INTO ${edificioTabla} (Direccion, Año_Construccion, CUIT, Clave_Suterh, Id_Administrador, Nro_Encargado, Nro_Emergencia) VALUES (@Direccion, @Año_Construccion, @CUIT, @Clave_Suterh, @Id_Administrador, @Nro_Encargado, @Nro_Emergencia) `;
        let query2=`INSERT INTO ${edificioXespacioTabla} (Id_EspacioCC,Id_Edificio) values (@Id_EspacioCC,@Id_Edificio)`
        let query3=`SELECT MAX(Id_Edificio) as Id_Edificio from ${edificioTabla}`
        response=await dbHelper (undefined, {
            Direccion: edificio.Direccion,
            Año_construccion: edificio.Año_Construccion,
            CUIT: edificio.CUIT, 
            Clave_Suterh: edificio.Clave_SUTERH, 
            Id_Administrador: edificio.Id_Administrador, 
            Nro_Encargado: edificio.Nro_Encargado, 
            Nro_Emergencia:edificio.Nro_Emergencia
        },query)
        response3=await dbHelper(undefined,undefined, query3)
                if(edificio.Id_EspacioCC !== undefined){
            edificio.Id_EspacioCC.forEach(async(espacio) => {
                console.log('espacio', espacio)
                response2=await dbHelper(undefined,{Id_EspacioCC:espacio,Id_Edificio:response3.recordset[0].Id_Edificio},query2)
            })
        }
        return response.recordset;
    }

    getEdificio = async (administrador) => {
        console.log('This is a function on the service');

        const{Mail, Contraseña}= administrador

        let response
        let query=`SELECT * from ${edificioTabla}`;
        let query2=`SELECT Id_Administrador from ${adminTabla} WHERE Mail=@Mail and Contraseña=@Contraseña`
        let Id_Administrador=0

        if(Mail && Contraseña){
            Id_Administrador=await dbHelper (undefined,{Mail, Contraseña},query2)
            console.log(Id_Administrador.recordset)
            if(Id_Administrador.recordset!=0){
                query=`SELECT * from ${edificioTabla} WHERE Id_Administrador=@Id_Administrador`
                response=await dbHelper (undefined,{Id_Administrador:Id_Administrador.recordset[0].Id_Administrador},query)
            }else{
                response=0
            }
        }else{
            response=0
        }
        console.log(response.recordset)
        return response.recordset;
    }
}