import 'dotenv/config'
import pkg from 'pg';


const eventoTabla = process.env.DB_TABLA_EVENTO;
const departamentoTabla = process.env.DB_TABLA_DEPARTAMENTO
const edificioTabla = process.env.DB_TABLA_EDIFCIOS;


export class EventoService {


    createEvento = async(evento) => {

        const { Pool } = pkg;
        const pool = new Pool(
            {
                connectionString:   process.env.DB_SERVER,
                ssl: {
                    rejectUnauthorized: false
                }
            })

        function addDaysToDate(date, days){
            let res = new Date(date);
            res.setDate(res.getDate() + days);
            res = new Date(res).toISOString()
            res=res.replace('T03:00:00.000Z','')
            console.log(res)
            return res;
        }

        function round(num) {
            var m = Number((Math.abs(num) * 100).toPrecision(15));
            return Math.round(m) / 100 * Math.sign(num);
        }

        console.log('This is a function on the service');
        let response
        let response2
        let response3
        let esDigitoI=false
        let esDigitoF=false
        let nueva_fecha

        let hora_inicio=parseFloat(evento.hora_inicio)
        let hora_final=hora_inicio+evento.horas
        if(hora_inicio<10){
            esDigitoI=true
        }
        if(hora_final>=24){
            hora_final=hora_final-24
            nueva_fecha=addDaysToDate(evento.fecha, 1)
            console.log(hora_final)
            hora_final=round(hora_final)
            console.log("queeeeeee", hora_final)
        }
        if(hora_final<10){
            esDigitoF=true
        }

        let hora_inicio_string=evento.hora_inicio+''
        let hora_final_string=hora_final + ''
        hora_final_string=hora_final_string.replace('.',':')
        hora_inicio_string=hora_inicio_string.replace('.',':')

        if(esDigitoF===true){
            if(hora_final_string.length===1){
                hora_final_string='0'+hora_final_string+':00:00'
            }else if(hora_final_string.length===3){
                hora_final_string='0'+hora_final_string+'0:00'
            }else if(hora_final_string.length===4){
                hora_final_string='0'+hora_final_string+':00'
            }
        }else{
            if(hora_final_string.length===2){
                hora_final_string=hora_final_string+':00:00'
            }else if(hora_final_string.length===4){
                console.log("entro")
                hora_final_string=hora_final_string+'0:00'
                console.log(hora_final_string)
            }else if(hora_final_string.length===5){
                hora_final_string=hora_final_string+':00'
            }
        }
        if(esDigitoI===true){
            if(hora_inicio_string.length===1){
                hora_inicio_string='0'+hora_inicio_string+':00:00'
            }else if(hora_inicio_string.length===3){
                hora_inicio_string='0'+hora_inicio_string+'0:00'
            }else if(hora_inicio_string.length===4){
                hora_inicio_string='0'+hora_inicio_string+':00'
            }
        }else{
            if(hora_inicio_string.length===2){
                hora_inicio_string=hora_inicio_string+':00:00'
            }else if(hora_inicio_string.length===4){
                hora_inicio_string=hora_inicio_string+'0:00'
            }else if(hora_inicio_string.length===5){
                hora_inicio_string=hora_inicio_string+':00'
            }
        }

        console.log(hora_final_string,hora_inicio_string)

        const query7 = `SELECT id_departamento from ${departamentoTabla} where departamento='${evento.depto}'`
        let response7 = await pool.query(query7)
        const query6 = `SELECT id_edificio from ${edificioTabla} where direccion='${evento.direccion}'`
        console.log(query6)
        let response6=await pool.query(query6)
        console.log(response6.rows[0])
        const query = `INSERT INTO ${eventoTabla} (fecha, hora_inicio, hora_final, cant_invitados, id_departamento, id_espaciocomun, id_edificio, horas, nombre_evento) VALUES ('${evento.fecha}', '${hora_inicio_string}', '${hora_final_string}', '${evento.cant_invitados}', '${response7.rows[0].id_departamento}', '${evento.id_espaciocc}', '${response6.rows[0].id_edificio}', '${evento.horas}', '${evento.nombre_evento}') `;
        const query2 = `SELECT hora_inicio, hora_final from ${eventoTabla} where id_edificio=${response6.rows[0].id_edificio} and id_espaciocomun=${evento.id_espaciocc} and fecha='${evento.fecha}'`
        const query3 = `SELECT hora_inicio, hora_final from ${eventoTabla} where id_edificio=${response6.rows[0].id_edificio} and id_espaciocomun=${evento.id_espaciocc} and fecha='${nueva_fecha}'`
        const query4 = `INSERT INTO ${eventoTabla} (fecha, hora_inicio, hora_final, cant_invitados, id_departamento, id_espaciocomun, id_edificio, horas, nombre_evento) VALUES ('${evento.fecha}', '${hora_inicio_string}', '23:59:00', '${evento.cant_invitados}', '${response7.rows[0].id_departamento}', '${evento.id_espaciocc}', '${response6.rows[0].id_edificio}', '${evento.horas}', '${evento.nombre_evento}') `;
        const query5 = `INSERT INTO ${eventoTabla} (fecha, hora_inicio, hora_final, cant_invitados, id_departamento, id_espaciocomun, id_edificio, horas, nombre_evento) VALUES ('${nueva_fecha}', '00:00:00', '${hora_final_string}', '${evento.cant_invitados}', '${response7.rows[0].id_departamento}', '${evento.id_espaciocc}', '${response6.rows[0].id_edificio}', '${evento.horas}', '${evento.nombre_evento}') `;
        const query8 = `SElECT MAX(id_evento) as id_evento from ${eventoTabla}`


            if(hora_inicio>hora_final){
                response2=await pool.query(query2)
                response3=await pool.query(query3)
                const even = (element) => (hora_inicio_string >= element.hora_inicio && hora_inicio_string<element.hora_final) || ('23:59:00'>element.hora_inicio && '23:59:00'<=element.hora_final) || (hora_inicio_string < element.hora_inicio && '23:59:00'> element.hora_final) ;
                const even2 = (element) => ('00:00:00' >= element.hora_inicio && '00:00:00'<element.hora_final) || (hora_final_string>element.hora_inicio && hora_final_string<=element.hora_final) || ('00:00:00' < element.hora_inicio && hora_final_string> element.hora_final) ;
                const sePisan=(response2.rows.some(even));
                const sePisan2=(response3.rows.some(even2));
                if(sePisan===false && sePisan2===false){
                    console.log(query)
                    response = await pool.query(query4)//crea un espacio
                    response = await pool.query(query5)
                    let response8= await pool.query(query8)
                    pool.end()
                    return response8.rows[0]
                }else{
                    pool.end()
                    return response
                }

            }
            console.log(query2)
            response2=await pool.query(query2)
            console.log(response2.rows)

        const even = (element) => (hora_inicio_string >= element.hora_inicio && hora_inicio_string<element.hora_final) || (hora_final_string>element.hora_inicio && hora_final_string<=element.hora_final) || (hora_inicio_string < element.hora_inicio && hora_final_string> element.hora_final) ;

        const sePisan=(response2.rows.some(even));
        console.log(sePisan)
        if(sePisan===false){
            console.log(query)
            response = await pool.query(query)//crea un espacio
            let response8= await pool.query(query8)
            pool.end()
            return response8.rows[0]
        }else{
            pool.end()
            return response
        }       
    }

    getEventosByEdificio = async (id, fecha) => {
        console.log('This is a function on the service');
        console.log(fecha)
        const { Pool } = pkg;
        const pool = new Pool(
            {
                connectionString:   process.env.DB_SERVER,
                ssl: {
                    rejectUnauthorized: false
                }
            })
        let response
        const query=`SELECT * from ${eventoTabla} where id_edificio=${id} order by fecha DESC` 
        console.log(query)
        response=await pool.query(query)//trae espacios
        pool.end()
        console.log(response.rows)
        let date
        for(let i=0;i<response.rows.length;i++){
            console.log(response.rows[i].fecha)
            let year=response.rows[i].fecha.getFullYear()+""
            let month=response.rows[i].fecha.getMonth()+""
            let day=response.rows[i].fecha.getDate()+""
            console.log(year, month, day)
            date=year+"-"+month+"-"+day
            console.log(date)
            response.rows[i].fecha=date
        }
        return response.rows;
    }

    getEventosByDepartamento = async (id) => {
        console.log('This is a function on the service')
        console.log(id)
        const { Pool } = pkg;
        const pool = new Pool(
            {
                connectionString:   process.env.DB_SERVER,
                ssl: {
                    rejectUnauthorized: false
                }
            })
            let response
            let response2
            let depto
            const query2=`SELECT id_departamento from ${departamentoTabla} where codigo='${id}'`
            console.log(query2)
            response2=await pool.query(query2)
            depto=response2.rows[0].id_departamento
            let query=`SELECT * from ${eventoTabla} where id_departamento=${depto} order by fecha DESC` 
            console.log("es",depto)
            console.log(query)
            response=await pool.query(query)//trae espacios
            pool.end()
            console.log(response.rows)
            let date
            for(let i=0;i<response.rows.length;i++){
                console.log(response.rows[i].fecha)
                let year=response.rows[i].fecha.getFullYear()+""
                let month=response.rows[i].fecha.getMonth()+""
                let day=response.rows[i].fecha.getDate()+""
                console.log(year, month, day)
                date=year+"-"+month+"-"+day
                console.log(date)
                response.rows[i].fecha=date
            }
            return response.rows;
    }

    deleteEventos = async (id) => {
        console.log('This is a function on the service');
        console.log(id)
        const { Pool } = pkg;
        const pool = new Pool(
            {
                connectionString:   process.env.DB_SERVER,
                ssl: {
                    rejectUnauthorized: false
                }
            })
        let response
        let response2
        const query2=`SELECT from ${eventoTabla} where id_evento=${id}` 
        const query=`DELETE from ${eventoTabla} where id_evento=${id}` 
        response2=await pool.query(query2)
        if(response2===undefined){
            return "no encontro"
        }
        console.log(query)
        response=await pool.query(query)//trae espacios
        pool.end()
        console.log(response)
        return response.rows;
    }
    
}