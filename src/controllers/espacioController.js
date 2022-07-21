import { Router } from 'express';
import { EspacioService } from '../services/espacioService.js';
import { Authenticate } from '../common/jwt.strategy.js';

{
/**
 * @swagger
 *  tags:
 *    name: Espacio
 *    description: EndPoints de Espacio
 */
}
const router = Router();
const espacioService = new EspacioService();

{
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
}

router.get('/',  async(req, res) => {//trae espacios comunes
    console.log(`This is a get operation`);
    try{
        const espacios = await espacioService.getEspacios();
        return res.status(201).json(espacios);
    }catch(error){
        return res.status(500).json(error)
    }
});

router.post('', async(req, res) => { //create espacio comun
    console.log(`This is a post operation`);
    try{
        console.log(req.body);
        const espacio = await espacioService.createEspacio(req.body);
        if(espacio===undefined){
            return res.status(404).json("ya existe ese espacio comun")
        }else{
            return res.status(201).json(espacio);
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
});





router.get('/test', async(req, res) => {
    console.log("holaaaaaaaaaaaaaaa")

    return res.status(200).send("AGACHATE Y CONOCELO");
});


export default router;