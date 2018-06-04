const knex = require("../db/knex.js");

module.exports = {
  // CHANGE ME TO AN ACTUAL FUNCTION
  index: function(req, res) {
    knex('recipes').join('users', 'users.id', 'recipes.user_id').then((recipes) => {
      // res.json(recipes);
        res.render("index", {recipes:recipes});
    })

  },
}
