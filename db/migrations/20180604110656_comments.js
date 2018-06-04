
exports.up = function(knex, Promise) {
  return knex.schema.createTable("comments",(table)=>{
   table.increments();
   table.text('comment')
   table.integer("user_id")
  .notNullable()
  .references('id')
  .inTable('users')
  .onDelete('CASCADE')
  .index();
  table.integer("recipe_id")
 .notNullable()
 .references('id')
 .inTable('recipes')
 .onDelete('CASCADE')
 .index();
   table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("comments");
};
