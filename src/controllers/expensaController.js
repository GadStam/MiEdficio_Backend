import { Router } from 'express';
import { ExpensaService } from '../services/expensaService.js';
import { Authenticate } from '../common/jwt.strategy.js';

const router = Router();
const expensaService = new ExpensaService()



router.post('', Authenticate, async(req, res) => { //create expensa
    console.log(`This is a post operation`);
    try{
            const expensa = await expensaService.createExpensa(req.body);
            return res.status(201).json(expensa);
        }
        catch (error) {
        console.log(error)
        return res.status(500).json(error)
        }
    });

router.get('/:id', Authenticate, async(req, res)=>{ //get expensa by departamento
    console.log(`This is a get operation`)
    try{
        const expensa= await expensaService.getExpensaByDepartamento(req.params.id)
        return res.status(201).json(expensa)
    }
    catch (error){
        console.log(error)
        return res.status(500).json(error)
    }
})

export default router;