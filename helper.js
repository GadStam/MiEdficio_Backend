import sql from 'mssql'
import config from './db.js'

const dbHelper = async (id, params, query) => {
    const pool = await sql.connect(config);
    const response = await pool.request()
    .input('Id',sql.Int, id)
    .input('Direccion',sql.VarChar, params?.Direccion ?? '')
    .input('Año_Construccion',sql.Int, params?.Año_Construccion ?? 0)
    .input('CUIT',sql.Int, params?.CUIT ?? 0)
    .input('Clave_Suterh',sql.Int, params?.Clave_Suterh ?? 0)
    .input('Id_Administrador',sql.Int, params?.Id_Administrador ?? 0)
    .input('Nro_Encargado',sql.Int, params?.Nro_Encargado ?? 0)
    .input('Nro_Emergencia',sql.Int, params?.Nro_Emergencia ?? 0)
    .input('Id_EspacioCC',sql.Int, params?.Id_EspacioCC ?? 0)
    .input('Id_Edificio',sql.Int, params?.Id_Edificio ?? 0)
    .input('Codigo',sql.VarChar, params?.Codigo ?? '')
    .input('Nombre',sql.VarChar, params?.Nombre ?? '')
    .input('Apellido',sql.VarChar, params?.Apellido ?? '')
    .input('Dni',sql.Int, params?.Dni ?? '')
    .input('Telefono',sql.Int, params?.Telefono ?? '')
    .input('Departamento',sql.VarChar, params?.Departamento ?? '')
    .query(query);
    return response;
};
export default dbHelper;