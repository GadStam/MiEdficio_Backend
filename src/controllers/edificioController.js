import { Router } from 'express';
import { EdificioService } from '../services/edificioService.js';
import { Authenticate } from '../common/jwt.strategy.js';


const router = Router();
const edificioService = new EdificioService();

/**
 * @swagger
 * components
 *  schemas
 *    User:
 *      type:object
 *      properties:
 *        Direccion:
 *          type: string
 *        Año_Construccion:
 *          Type: int
 *        CUIT:
 *          Type: int
 *        Clave_Suterh:
 *          Type: int
 *        Id_Administrador:
 *          Type: int
 *        Nro_Encargado:
 *          Type: int
 *        Nro_Emergencia:
 *          Type: int
 *      required:
 *        -Direccion
 *        -Año_Construccion
 *        -CUIT
 *        -Clave_Suterh
 *        -Id_Administrador
 *        -Nro_Encargado
 *        -Nro_Emergencia
 *      example:
 *        Direccion: La Plata 190
          Año_Construccion: 2001
          CUIT: 231
          Clave_Suterh: 32
          Id_Administrador: 1
          Nro_Encargado: 231132
          Nro_Emergencia: 213132
 */

 /**
  * @swagger
  * /api/users
  *   post:
  *     summary: create a new edificio
  *     tags: [User]
  *     requestBody:
  *       required:true
  *       content:
  *         aplication/json:
  *           schema:
  *             type:object
  *             $ref'#/components/schemas/User
  *       responses:
  *         200:
  *           description: new edificio created
  *       
  * 
  * 
  */
router.post('', Authenticate, async (req, res) => {
    console.log(`This is a post operation`);
  
    const edificio = await edificioService.createEdificio(req.body);
    
    return res.status(201).json(edificio);
    });

    router.get('/', Authenticate, async (req, res) => {
        console.log(`This is a get operation`);

        let mail = req.query.mail
        let contraseña = req.query.contraseña

        const edificio = await edificioService.getEdificio(mail,contraseña);
      
        return res.status(201).json(edificio);
      });

  

export default router;
