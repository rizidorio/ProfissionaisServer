import Knex from 'knex';

export async function seed(knek: Knex) {
    await knek('categorias').insert([
        { nome: 'Manutenção Residencial' },
        { nome: 'Manutenção Automotiva' },
        { nome: 'Manutenção Eletrônica' },
        { nome: 'Informática' },
        { nome: 'Cuidados Pessoais' },
        { nome: 'Transportes' }
    ]);
}