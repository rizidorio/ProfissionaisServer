import Knex from 'knex';

export async function seed(knek: Knex) {
    await knek('subcategorias').insert([
        { nome: 'Pintor', categoria_id: 1 },
        { nome: 'Pedreiro', categoria_id: 1 },
        { nome: 'Jardineiro', categoria_id: 1 },
        { nome: 'Bombeiro Hidráulico', categoria_id: 1 },
        { nome: 'Mêcanico geral', categoria_id: 2 },
    ]);
}