exports.up = async function(knex) {
  const exists = await knex.schema.hasTable('users');
  if (!exists) {
    return knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.string('password').notNullable();
      table.enu('role', ['student', 'teacher']).notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
      table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
    });
  }
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
