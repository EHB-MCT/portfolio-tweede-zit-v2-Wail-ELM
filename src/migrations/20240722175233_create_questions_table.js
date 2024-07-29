exports.up = function(knex) {
    return knex.schema.createTable('questions', function(table) {
      table.increments('id').primary();
      table.string('content').notNullable();
      table.integer('user_id').unsigned().references('id').inTable('users').nullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('questions');
  };
  