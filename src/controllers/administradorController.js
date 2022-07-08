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

router.post('', /*Authenticate,*/ async (req, res) => {
    console.log(`This is a post operation`);
    console.log(req.body);  
    const administrador = await administradorService.createAdministrador(req.body);
    
    return res.status(201).json(administrador);
    });


router.post('/logIn', /*Authenticate,*/ async (req, res) => {
    console.log(`This is a get operation`);

        const administrador = await administradorService.getAdministrador(req.body);
        //console.log(administrador[0])
        if(administrador[0]===undefined){
            return res.status(404);
        }else{
            const id = administrador[0].id_administrador
            const token = authService.getToken(id)
            return res.status(200).json(token);
        }

        
    });


export default router;
