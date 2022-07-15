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


router.post('', async(req, res) => {
    console.log("what")
    try{
        console.log(`This is a post operation`);
        console.log(req.body);
        const administrador = await administradorService.createAdministrador(req.body);
        if(administrador===undefined){
            return res.status(404).json("datos repetidos")
        }else{
            return res.status(201).json(administrador);
        }
    } catch (error) {
        return res.status(500).json(error)
    }
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


router.post('/logIn', async(req, res) => {
    console.log(`This is a post operation`);
    try {
        const administrador = await administradorService.getAdministrador(req.body);
        if (administrador[0] === undefined) {
            return res.status(404).json("Error en el loguearse");
        } else {
            console.log("1")
            const id = administrador[0].id_administrador
            console.log("2")
            const token = authService.getToken(id)
            console.log("3")
            return res.status(200).json({ token, id });
        }
    }catch (error) {
        console.log(error)
        return res.status(502).json(error)
    }
});

router.get('/:id', Authenticate, async(req, res) => {
    try{
        console.log(`This is a get operation`);

        const administrador = await administradorService.getAdministradorById(req.params.id);
        console.log(administrador[0])
        if (administrador[0] === undefined) {
            console.log("tarda")
            return res.status(404).json("no se encontró administrador");
        } else {
            return res.status(201).json(administrador);
        }
    }catch(error){
        return res.status(501).json(error)
    }
});

export default router;