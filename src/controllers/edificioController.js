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
 * /edificios/{id_administrador}:
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
 *         description: Id edificio [{id_edificio}]
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       403:
 *          description: No se encontró administrador
 *       404:
 *          description: Datos repetidos
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
        if(edificio==="error"){
            return res.status(403).json("No se encontró administrador")
        }
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
 * /edifcios/{id_administrador}:
 *   get:
 *     summary: Trae edificio por id_administrador
 *     tags: [Edificio]
 *     parameters:
 *       - in : path
 *         name: codigo
 *         description: id_administrador
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: [{edificios}]
 *       404:
 *         description: no se encontraron edificios 
 */
}

router.get('/:id', Authenticate, async(req, res) => { //get edificio by administrador
    console.log(`This is a get operation`);
    try{
        const edificio = await edificioService.getEdificio(req.params.id);
        console.log(edificio[0])
        if (edificio[0] === undefined) {
            return res.status(404).json("no se encontraron edificios");
        } else {
            return res.status(201).json(edificio);
        }
    }catch(error){
        return res.status(500).json(error)
    }
});


/**
 * @swagger
 * /edifcios/edificio/{id_edificio}:
 *   get:
 *     summary: Trae edificio por id_edificio
 *     tags: [Edificio]
 *     parameters:
 *       - in : path
 *         name: codigo
 *         description: id_edifcio
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: [{edificio}]
 *       400:
 *         description: edificio can not be found
 */
router.get('/edificio/:id', Authenticate, async(req, res) => { //get edificio by administrador
    console.log(`This is a get operation`);
    try{
        const edificio = await edificioService.getEdificioById(req.params.id);
        console.log(edificio[0])
        if (edificio[0] === undefined) {
            return res.status(404).json("no se encontro edificio");
        } else {
            return res.status(201).json(edificio);
        }
    }catch(error){
        return res.status(500).json(error)
    }
});




export default router;