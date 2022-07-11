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
router.get('/', Authenticate, async(req, res) => {
    console.log(`This is a get operation`);

    const espacios = await espacioService.getEspacios();

    return res.status(201).json(espacios);
});





router.get('/test', async(req, res) => {
    console.log("holaaaaaaaaaaaaaaa")

    return res.status(200).send("AGACHATE Y CONOCELO");
});


export default router;