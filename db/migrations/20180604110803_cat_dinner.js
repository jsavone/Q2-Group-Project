
exports.up = function(knex, Promise) {
  return knex.schema.createTable("cat_dinner",(table)=>{
   table.increments();
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
  return knex.schema.dropTable("cat_dinner");
};
