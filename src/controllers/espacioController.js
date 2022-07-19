import { Router } from 'express';
import { EspacioService } from '../services/espacioService.js';
import { Authenticate } from '../common/jwt.strategy.js';

/**
 * @swagger
 *  tags:
 *    name: Espacio
 *    description: EndPoints de Espacio
 */

const router = Router();
const espacioService = new EspacioService();


/**
 * @swagger
 * /espacios:
 *   get:
 *     summary: Returns all espacios
 *     tags: [Espacio]
 *     responses:
 *       200:
 *         description: the list of the espacios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
router.get('/',  async(req, res) => {
    try{
        console.log(`This is a get operation`);

        const espacios = await espacioService.getEspacios();

        return res.status(201).json(espacios);
    }catch(error){
        return res.status(500).json(error)
    }
});





router.get('/test', async(req, res) => {
    console.log("holaaaaaaaaaaaaaaa")

    return res.status(200).send("AGACHATE Y CONOCELO");
});


export default router;