import { Router } from 'express';
import { EdificioService } from '../services/edificioService.js';
import { Authenticate } from '../common/jwt.strategy.js';

{
/**
 * @swagger
 *  tags:
 *    name: Edificio
 *    description: EndPoints de Edificio
 */
}

const router = Router();
const edificioService = new EdificioService();

{
/**
 * @swagger
 * /edificios:
 *   post:
 *     summary: Create a new edificio
 *     tags: [Edificio]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: The Edificio was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       500:
 *         description: Some server error
 */
}

router.post('/:id', Authenticate, async(req, res) => { //create edificio by administrador
    console.log(`This is a post operation`);
    console.log(req.body)
    console.log("entraste?")
    try{
        const edificio = await edificioService.createEdificio(req.body, req.params.id);
        console.log(edificio)
        if(edificio===undefined){
            return res.status(404).json("datos repetidos")
        }else{
            return res.status(201).json(edificio);
        }
    } catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
});

{
/**
 * @swagger
 * /edificios/edificios:
 *   post:
 *     summary: gets edificio by its administrador
 *     tags: [Edificio]
 *     parameters:
 *       - in : path
 *         name: mail and contraseña
 *         description: mail and contraseña of administrador
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Edificio by its administrador
 *       400:
 *         description: Edificio can not be found
 */
}

router.get('/:id', Authenticate, async(req, res) => { //get edificio by administrador
    console.log(`This is a get operation`);
    try{
        const edificio = await edificioService.getEdificio(req.params.id);
        console.log(edificio[0])
        if (edificio[0] === undefined) {
            return res.status(404).json("no se encontro administrador");
        } else {
            return res.status(201).json(edificio);
        }
    }catch(error){
        return res.status(500).json(error)
    }
});


export default router;