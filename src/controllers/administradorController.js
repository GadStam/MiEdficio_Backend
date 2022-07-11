import { Router } from 'express';
import { AdministradorService } from '../services/administradorService.js';
import { Authenticate } from '../common/jwt.strategy.js';
import { AuthService } from '../services/authService.js';

const authService = new AuthService();

const router = Router();
const administradorService = new AdministradorService();


/**
 * @swagger
 *  tags:
 *    name: Administrador
 *    description: Endpoint administrador
 */


/**
 * @swagger
 * /administradores:
 *   post:
 *     summary: Create a new administrador
 *     tags: [Administrador]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Category'
 *     responses:
 *       200:
 *         description: The administrador was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       500:
 *         description: Some server error
 */


router.post('', async (req, res) => {
    console.log(`This is a post operation`);
    console.log(req.body);  
    const administrador = await administradorService.createAdministrador(req.body);
    
    return res.status(201).json(administrador);
    });

/**
 * @swagger
 * /administradores/logIn:
 *   post:
 *     summary: Log in an Administrador
 *     tags: [Administrador]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: The administrador was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       500:
 *         description: Some server error
 */


router.post('/logIn', async (req, res) => {
  console.log(`This is a post operation`);
  try{
    const administrador = await administradorService.getAdministrador(req.body);
    if(administrador[0]===undefined){
        return res.status(404);
    }else{
      const id = administrador[0].id_administrador
      const token = authService.getToken(id)
      return res.status(200).json({token, id});
    }
  }catch(error){
    return res.status(500).json(error)
  }    
}
);


/*  Administrador:
    type: "object"
    required:
    - "nombre"
    - "apellido"
    - "mail"
    - "contraseña"
    - "telefono"
    properties:
      category:
        $ref: "#/definitions/Category"
      id_administrador:
        type: "integer"
        format: "int64"
      nombre:
        type: "string"
        example: "Gad"
      apellido:
        type: "string"
        example: "Stamati"
      mail:
        type: "string"
        example: gadstam@71
      contraseña:
        type: "string"
        example: "BOCA123"
      telefono:
        type: "integer"
        example: "1159558248"
*/

export default router;
