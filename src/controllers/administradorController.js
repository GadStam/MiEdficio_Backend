import { Router } from 'express';
import { AdministradorService } from '../services/administradorService.js';
import { Authenticate } from '../common/jwt.strategy.js';


const router = Router();
const administradorService = new AdministradorService();

/**
 * @swagger
 *  tags:
 *    name: Administrador
 *    description: Endpoint administrador
 */


/**
 * @swagger
 * /administradores:
 *   post:
 *     summary: Create a new administrador
 *     tags: [Administrador]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: The administrador was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       500:
 *         description: Some server error
 */

router.post('', Authenticate, async (req, res) => {
    console.log(`This is a post operation`);
  
    const administrador = await administradorService.createAdministrador(req.body);
    
    return res.status(201).json(administrador);
    });
export default router;
