
exports.up = function(knex, Promise) {
  return knex.schema.createTable("rec_to_cat",(table)=>{
   table.increments();
   table.integer("recipe_id")
   .notNullable()
   .references('id')
   .inTable('recipes')
   .onDelete('CASCADE')
   .index();
   table.integer("category_id")
   .notNullable()
   .references('id')
   .inTable('categories')
   .onDelete('CASCADE')
   .index();
     table.timestamps(true, true);
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("rec_to_cat");
};
