import { Router } from 'express';
import { DepartamentoService } from '../services/departamentoService.js';
import { Authenticate } from '../common/jwt.strategy.js';


const router = Router();
const departamentoService = new DepartamentoService();

    /**
 * @swagger
 *  tags:
 *    name: Departamento
 *    description: Departamento
 */

router.post('', Authenticate, async (req, res) => {
    console.log(`This is a post operation`);
  
    const departamento = await departamentoService.createDepartamento(req.body);
    
    return res.status(201).json(departamento);
    });


    /**
 * @swagger
 * /departamentos/{codigo}:
 *   get:
 *     summary: Returns departamentos by codigo
 *     tags: [Departamento]
 *     responses:
 *       200:
 *         description: the list of the departamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 */
router.get('/',Authenticate, async (req,res) => {
    let Codigo = req.query.Codigo;

    const departamento = await departamentoService.getDepartamentoByCodigo(Codigo)

    return res.status(201).json(departamento);
})

export default router;
