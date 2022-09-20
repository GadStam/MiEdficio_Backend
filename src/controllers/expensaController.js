import { Router } from 'express';
import { ExpensaService } from '../services/expensaService.js';
import { Authenticate } from '../common/jwt.strategy.js';

const router = Router();
const expensaService = new ExpensaService()


/**
 * @swagger
 *  tags:
 *    name: Expensa
 *    description: EndPoints de Expensas
 */

/**
 * @swagger
 * /eventos:
 *   post:
 *     summary: Create a new expensa
 *     tags: [Expensa]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: The Expensa was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       500:
 *         description: Some server error
 */
router.post('/:codigo', Authenticate, async(req, res) => { //create expensa
    console.log(`This is a post operation`);
    try{
            const expensa = await expensaService.createExpensa(req.body.pdf_expensa, req.params.codigo);
            return res.status(201).json(expensa);
        }
        catch (error) {
        console.log(error)
        return res.status(500).json(error)
        }
    });


/**
 * @swagger
 * /eventos/{codigo}}:
 *   get:
 *     summary: Trae expensas por codigo
 *     tags: [Expensa]
 *     parameters:
 *       - in : path
 *         name: codigo
 *         description: codigo de departanto
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: expensa
 *       400:
 *         description: departamento can not be found
 */
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