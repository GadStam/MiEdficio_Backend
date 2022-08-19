import { Router } from 'express';
import { EventoService } from '../services/eventoService.js';
import { Authenticate } from '../common/jwt.strategy.js';

const router = Router();
const eventoService = new EventoService()



router.post('', Authenticate, async(req, res) => { //create espacio comun
    console.log(`This is a post operation`);
    try{
            const espacio = await eventoService.createEvento(req.body);
            return res.status(201).json(espacio);
        }
        catch (error) {
        console.log(error)
        return res.status(500).json(error)
        }
    });

    router.get('/:id',  async(req, res) => {//trae eventos por edificio
        console.log(`This is a get operation`);
        try{
            const eventos = await eventoService.getEventosByEdificio(req.params.id);
            return res.status(201).json(eventos);
        }catch(error){
            return res.status(500).json(error)
        }
    });

    router.delete('/:id',  async(req, res) => {//trae eventos por edificio
        console.log(`This is a delete operation`);
        try{
            const eventos = await eventoService.deleteEventos(req.params.id);
            return res.status(201).json(eventos);
        }catch(error){
            return res.status(500).json(error)
        }
    });

export default router;