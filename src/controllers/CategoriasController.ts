import { Request, Response } from 'express';

import db from '../database/connection';

export default class CategoriasController {
    async index(req: Request, res: Response) {
        try {
            const categorias = await db('categorias').select('*');
            
            const serializedCategorias = categorias.map(categoria => {
                return {
                    id: categoria.id,
                    nome: categoria.nome
                };
            });
    
            return res.json(serializedCategorias);

        } catch (error) {
            console.error(error);
        }
    }
}