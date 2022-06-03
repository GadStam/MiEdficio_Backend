import { Router } from 'express';
import { DepartamentoService } from '../services/departamentoService.js';
import { Authenticate } from '../common/jwt.strategy.js';


const router = Router();
const departamentoService = new DepartamentoService();

router.post('', Authenticate, async (req, res) => {
    console.log(`This is a post operation`);
  
    const departamento = await departamentoService.createDepartamento(req.body);
    
    return res.status(201).json(departamento);
    });

router.get('/',Authenticate, async (req,res) => {
    let Codigo = req.query.Codigo;

    const departamento = await departamentoService.getDepartamentoByCodigo(Codigo)

    return res.status(201).json(departamento);
})

export default router;
