import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('profissionais', (table) => {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('cpf').notNullable();
        table.string('cep').notNullable();
        table.string('bairro').notNullable();
        table.string('cidade').notNullable();
        table.string('uf', 2).notNullable();
        table.string('celular').notNullable();
        table.string('whatsapp').notNullable();
        table.string('email').notNullable();
        table.string('facebook').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('profissionais');
}