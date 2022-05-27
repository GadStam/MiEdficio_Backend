import { Router } from 'express';
import { EspacioService } from '../services/espacioService.js';
import { Authenticate } from '../common/jwt.strategy.js';


const router = Router();
const espacioService = new EspacioService();

router.get('/', Authenticate, async (res) => {
      console.log(`This is a get operation`);
    
      const espacios = await espacioService.getEspacios();
    
      return res.status(200).json(espacios);
    });
  

export default router;
