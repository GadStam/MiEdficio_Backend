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

/**
 * @swagger
 * /espacios:
 *   post:
 *     summary: Create a new espacio
 *     tags: [Espacio]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: The Espacio was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       500:
 *         description: Some server error
 */
router.post('', Authenticate, async(req, res) => { //create espacio comun
    console.log(`This is a post operation`);
    try{
        const espacio = await espacioService.createEspacio(req.body);
        if(espacio===undefined){
            return res.status(404).json("ya existe ese espacio comun")
        }else{
            return res.status(201).json(espacio[0]);
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
});

/**
 * @swagger
 * /espacios/edificio/{id_edificio}:
 *   get:
 *     summary: Trae espacios de un edificio
 *     tags: [Espacio]
 *     parameters:
 *       - in : path
 *         name: id_edificio
 *         description: id_edifcio
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: espacios
 *       400:
 *         description: edificio can not be found
 */
router.get('/edificio/:id', Authenticate, async(req, res) => { //get espacio by edificio
    console.log(`This is a get operation`);
    let espacios=[]
    try{
        const edificio = await espacioService.getEspaciosById_Edificio(req.params.id);
        if (edificio[0] === undefined) {
            return res.status(404).json("no se encontro edificio");
        } else {
            console.log(edificio)
            for(let i=0;i<edificio.length;i++){
                let response = await espacioService.getEspaciosById_EspacioCC(edificio[i].id_espaciocc);
                espacios.push(response)
            }
            return res.status(201).json(espacios);
        }
    }catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
});

/**
 * @swagger
 * /espacios/{id_espaciocc}}:
 *   get:
 *     summary: Trae espacio por id
 *     tags: [Espacio]
 *     parameters:
 *       - in : path
 *         name: id_espaciocc
 *         description: id_espaciocc
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: espacio
 *       400:
 *         description: edificio can not be found
 */
 router.get('/:id', Authenticate, async(req, res) => { //get edificio by administrador
    console.log(`This is a get operation`);
    try{
        const espacio = await espacioService.getEspaciosById_EspacioCC(req.params.id);       
        if (espacio[0] === undefined) {
            return res.status(404).json("no se encontro espacio");
        } else {
            return res.status(201).json(espacio);
        }
    }catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
});


export default router;