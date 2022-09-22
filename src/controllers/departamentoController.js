import { Router } from 'express';
import { DepartamentoService } from '../services/departamentoService.js';
import { Authenticate } from '../common/jwt.strategy.js';
import { AuthService } from '../services/authService.js';


const authService = new AuthService();

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
 *     summary: Crea departamentos
 *     tags: [Departamento]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Los departamentos fueron creados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       500:
 *         description: Some server error
 */
}

router.post('/:id', Authenticate, async (req, res) => { //create departamentos
    console.log(`This is a post operation`);
    
    let deptos = []
    let codigos = []

    try{
        const departamento = await departamentoService.createDepartamento(req.params.id, req.body);
        if(departamento.deptos[0]===undefined){
            return res.status(404).json("no se encontró edificio")
        }else{
            codigos=departamento.codigos
            const cant_departamentos=departamento.deptos.length
            
            for(let i=0; i<cant_departamentos; i++){
                deptos.push(departamento.deptos[i].departamento)
            }
            return res.status(201).json({deptos, codigos});
        }
    }catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
});

{
/**
 * @swagger
 * /departamentos/{codigo}:
 *   put:
 *     summary: actualiza departamentos por codigo
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
 *     summary: Trae departamento por codigo
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
    console.log(`this is a put operation`)
    try{
        const departamento = await departamentoService.getDepartamentoByCodigo(req.params.codigo)
        
        if(departamento[0]===undefined){
            return res.status(404).json("No se encontro departamento")
        }
        
        const id = departamento[0].id_departamento
        const depto = departamento[0].departamento
        const id_edificio = departamento[0].id_edificio
        const token = authService.getToken(id)
        
        return res.status(201).json({ token, id, depto, id_edificio });
    }catch(error){
        return res.status(500).json(error)
    }
})

/**
 * @swagger
 * /departamentos/edificio{codigo}:
 *   get:
 *     summary: gets edificio by codigo departamento
 *     tags: [Departamento]
 *     parameters:
 *       - in : path
 *         name: id edificio
 *         description: id edificio
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Edificio by its codigo departamento
 *       400:
 *         description: Departamento can not be found
 */
router.get('/edificio/:id', Authenticate, async(req, res) => { //get edificio by administrador
    console.log(`This is a get operation`);
    try{
        const edificio = await departamentoService.getEdificio(req.params.id);
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
