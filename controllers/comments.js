const knex = require("../db/knex.js");

module.exports = {
  // CHANGE ME TO AN ACTUAL FUNCTION

  add: function(req, res) {
    knex('comments').insert({
      comment: req.body.comment,
      user_id: req.body.user_id,
      recipe_id: req.params.recipe_id
    })
    .then(() => {
      res.redirect('/recipe/'+req.params.recipe_id);
    })
  },

  delete: function(req, res) {
    knex('comments').where('id', req.params.comment_id).del()
    .then(() => {
      res.redirect('/recipe/'+req.params.recipe_id);
    })
  },
}
