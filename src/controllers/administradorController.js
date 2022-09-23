import { Router } from 'express';
import { AdministradorService } from '../services/administradorService.js';
import { Authenticate } from '../common/jwt.strategy.js';
import { AuthService } from '../services/authService.js';


const authService = new AuthService();

const router = Router();
const administradorService = new AdministradorService();

{
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
 *     summary: Crea administrador
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
 *       404:
 *          description:Datos repetidos
 *       500:
 *         description: Some server error
 */
}

router.post('', async(req, res) => { //create administrador
    console.log(`This is a post operation`);
    try{
        const administrador = await administradorService.createAdministrador(req.body);
        if(administrador===undefined){
            return res.status(404).json("datos repetidos")
        }else{
            return res.status(201).json(administrador);
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
});

{
/**
 * @swagger
 * /administradores/logIn:
 *   post:
 *     summary: Log in Administrador
 *     tags: [Administrador]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Objeto con token and id_administrador
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *          description: Error en loguearse
 *       500:
 *         description: Some server error
 */
}

router.post('/logIn', async(req, res) => { //get administrador by mail y contraseña and create token
    console.log(`This is a post operation`);
    try {
        const administrador = await administradorService.getAdministrador(req.body);
        if (administrador[0] === undefined) {
            return res.status(404).json("Error en el loguearse");
        } else {
            const id = administrador[0].id_administrador
            const token = authService.getToken(id)
            return res.status(200).json({ token, id });
        }
    }catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
});

/**
 * @swagger
 * /administradores/{id_administrador}:
 *   get:
 *     summary: Trae administrador por su ID
 *     tags: [Administrador]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of administrador
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Administrador by its Id (Array con un solo objeto)
 *       404:
 *         description: No se encontró el administrador
 */

router.get('/:id', Authenticate, async(req, res) => { //get administrador by id
    console.log(`This is a get operation`);
    try{
        const administrador = await administradorService.getAdministradorById(req.params.id);
        if (administrador[0] === undefined) {
            return res.status(404).json("no se encontró administrador");
        } else {
            return res.status(201).json(administrador);
        }
    }catch(error){
        console.log(error)
        return res.status(501).json(error)
    }
});



/**
 * @swagger
 * /administradores/edificio/{id_edificio}:
 *   get:
 *     summary: Trae administrador por edificio
 *     tags: [Administrador]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of edificio
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Administrador by its Id edificio (Array con un solo objeto)
 *       404:
 *         description: Edificio can not be found
 */

router.get('/edificio/:id', Authenticate, async(req, res) => { //get administrador by edificio
    console.log(`This is a get operation`);
    try{
        const administrador = await administradorService.getAdministradorByIdEdificio(req.params.id);
        if (administrador[0] === undefined) {
            return res.status(404).json("no se encontró edificio");
        } else {
            return res.status(201).json(administrador);
        }
    }catch(error){
        console.log(error)
        return res.status(501).json(error)
    }
});

export default router;