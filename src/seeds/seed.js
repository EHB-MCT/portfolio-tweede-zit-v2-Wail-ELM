const bcrypt = require('bcryptjs');

exports.seed = async function(knex) {
  await knex('comments').del();
  await knex('answers').del();
  await knex('questions').del();
  await knex('users').del();

  const hashedPassword1 = await bcrypt.hash('password123', 10);
  const hashedPassword2 = await bcrypt.hash('password123', 10);

  await knex('users').insert([
    { name: 'Student Test', email: 'test@example.com', password: hashedPassword1, role: 'student' },
    { name: 'Teacher Test', email: 'teacher@example.com', password: hashedPassword2, role: 'teacher' }
  ]);

  await knex('questions').insert([
    { content: 'What is Docker?', user_id: 1 }
  ]);

  await knex('answers').insert([
    { content: 'Docker is a platform for developing, shipping, and running applications.', question_id: 1, user_id: 1, correct: false }
  ]);

  await knex('comments').insert([
    { content: 'This is a comment.', answer_id: 1, user_id: 1 }
  ]);
};
