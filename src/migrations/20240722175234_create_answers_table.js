exports.up = function(knex) {
    return knex.schema.createTable('answers', function(table) {
      table.increments('id').primary();
      table.string('content').notNullable();
      table.integer('question_id').unsigned().references('id').inTable('questions');
      table.integer('user_id').unsigned().references('id').inTable('users');
      table.boolean('correct').defaultTo(false);
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('answers');
  };
  