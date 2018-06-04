
exports.up = function(knex, Promise) {
  return knex.schema.createTable("recipes",(table)=>{
   table.increments();
   table.string("recipe_name");
   table.text("recipe_image");
   table.integer("total_votes").defaultsTo(0);
   table.text("ingredients");
   table.text("directions");
   table.string("prep_time");
   table.string("cook_time");
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
  return knex.schema.dropTable("recipes");
};
