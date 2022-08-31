import { Router } from 'express';
import { EventoService } from '../services/eventoService.js';
import { Authenticate } from '../common/jwt.strategy.js';

const router = Router();
const eventoService = new EventoService()

/**
 * @swagger
 *  tags:
 *    name: Evento
 *    description: EndPoints de Evento
 */

/**
 * @swagger
 * /eventos:
 *   post:
 *     summary: Create a new evento
 *     tags: [Evento]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: The Evento was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       500:
 *         description: Some server error
 */
router.post('', Authenticate, async(req, res) => { //create evento
    console.log(`This is a post operation`);
    try{
            const evento = await eventoService.createEvento(req.body);
            if (evento===undefined){
                return res.status(404).json("el espacio ya esta ocupado")
            }else{
                return res.status(201).json(evento);
            }
        }
        catch (error) {
        console.log(error)
        return res.status(500).json(error)
        }
    });


    
    router.get('/:id', Authenticate, async(req, res) => {//trae eventos por edificio
        console.log(`This is a post operation`);
        try{
            const eventos = await eventoService.getEventosByEdificio(req.params.id);
            console.log(eventos)
            if (eventos[0]===undefined){
                return res.status(404).json("No se encontro edificio")
            }else{
                return res.status(201).json(eventos);
            }
        }catch(error){
            console.log(error)
            return res.status(500).json(error)
        }
    });

    router.get('/departamentos/:id', Authenticate, async(req, res) => {//trae eventos por edificio
        console.log(`This is a post operation`);
        try{
            const eventos = await eventoService.getEventosByDepartamento(req.params.id,);
            if (eventos[0]===undefined){
                return res.status(404).json("No se encontro edificio")
            }else{
                return res.status(201).json(eventos);
            }
        }catch(error){
            console.log(error)
            return res.status(500).json(error)
        }
    });

    router.delete('/:id',  Authenticate, async(req, res) => {//borra evento
        console.log(`This is a delete operation`);
        try{
            const eventos = await eventoService.deleteEventos(req.params.id);
            if(eventos="no encontro"){
                return res.status(404).json("no se encontro")
            }else{
                return res.status(201).json(eventos)
            }
        }catch(error){
            return res.status(500).json(error)
        }
    });

export default router;