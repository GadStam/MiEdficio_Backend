import { Router } from 'express';
import { DepartamentoService } from '../services/departamentoService.js';
import { Authenticate } from '../common/jwt.strategy.js';


const router = Router();
const departamentoService = new DepartamentoService();

{
/**
 * @swagger
 *  tags:
 *    name: Departamento
 *    description: Endpoint departamento
 */

/**
 * @swagger
 * /departamentos:
 *   post:
 *     summary: Create a new departamento
 *     tags: [Departamento]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: The departamento was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       500:
 *         description: Some server error
 */
}

router.post('', Authenticate, async (req, res) => { //create departamentos
    console.log(`This is a post operation`);
    try{
        const departamento = await departamentoService.createDepartamento(req.body);
        return res.status(201).json(departamento);
    }catch(error){
        return res.status(500).json(error)
    }
});

{
/**
 * @swagger
 * /departamentos/{codigo}:
 *   put:
 *     summary: updates departamento by codigo
 *     tags: [Departamento]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         schema:
 *           type: integer
 *         required: true
 *         description: departamento codigo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         decsription: The departamento was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: departamento was not found.
 *       500:
 *         description: Some errors happend.
 *
 */
}
router.put('/:codigo', Authenticate, async (req, res) => { //update departamento by codigo
    console.log(`this is a put operation`)
    try{
        const departamento = await departamentoService.updateDepartamentoByCodigo(req.params.codigo, req.body)
        if(departamento===undefined){
            return res.status(404).json("Datos repetidos")
        }
        return res.status(200).json(departamento);
    } catch(error){
        return res.status(500).json(error)
    }
})


{
/**
 * @swagger
 * /departamentos/{codigo}:
 *   get:
 *     summary: gets departamento by codigo
 *     tags: [Departamento]
 *     parameters:
 *       - in : path
 *         name: codigo
 *         description: codigo of departamento
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Departamento by its codigo
 *       400:
 *         description: Departamento can not be found
 */
}

router.get('/:codigo', async (req,res) => {//get departamento by codigo
    try{
        const departamento = await departamentoService.getDepartamentoByCodigo(req.params.codigo)
        if(departamento[0]===undefined){
            return res.status(404).json("No se encontro departamento")
        }
        console.log(departamento[0].id_departamento)
        const id = departamento[0].id_departamento
        const token = authService.getToken(id)
        return res.status(200).json({ token, id });
    }catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
})

export default router;
