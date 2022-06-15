import { Router } from 'express';
import { EdificioService } from '../services/edificioService.js';
import { Authenticate } from '../common/jwt.strategy.js';


const router = Router();
const edificioService = new EdificioService();

router.post('', Authenticate, async (req, res) => {
    console.log(`This is a post operation`);
  
    const edificio = await edificioService.createEdificio(req.body);
    
    return res.status(201).json(edificio);
    });

    router.get('/', Authenticate, async (req, res) => {
        console.log(`This is a get operation`);

        let mail = req.query.mail
        let contraseña = req.query.contraseña

        const edificio = await edificioService.getEdificio(mail,contraseña);
      
        return res.status(201).json(edificio);
      });

  

export default router;
