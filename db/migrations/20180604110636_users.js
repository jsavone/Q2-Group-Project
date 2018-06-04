
exports.up = function(knex, Promise) {
  return knex.schema.createTable("users",(table)=>{
   table.increments();
   table.string("name");
   table.string("email");
   table.text('bio');
   table.text('img_url')
   table.string("password");
   table.boolean('admin').defaultsTo('false');
   table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};
