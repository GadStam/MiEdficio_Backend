import { Router } from 'express';
import { AuthService } from '../services/authService.js';

const router = Router();
const authService = new AuthService();

/**
 * @swagger
 *  tags:
 *    name: Auth
 *    description: Autenticación
 */
/**
 * @swagger
 * /auth/logIn:
 *   get:
 *     summary: Returns token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: the list of the posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 */
router.get('/logIn', async (req, res) => {
    console.log(`This is a get operation`);

    // const token = await authService.getToken();
    
  
    return res.status(200).json(token);
  });

 export default router;