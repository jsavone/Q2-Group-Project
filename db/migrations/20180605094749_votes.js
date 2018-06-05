
exports.up = function(knex, Promise) {
  return knex.schema.createTable("votes",(table)=>{
   table.increments();
   table.string("vote")
   table.integer("recipe_id")
   .notNullable()
   .references('id')
   .inTable('recipes')
   .onDelete('CASCADE')
   .index();
   table.integer("user_id")
   .notNullable()
   .references('id')
   .inTable('users')
   .onDelete('CASCADE')
   .index();
     table.timestamps(true, true);
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("votes");
};
