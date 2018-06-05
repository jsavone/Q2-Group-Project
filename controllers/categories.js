const knex = require("../db/knex.js");

module.exports = {
  // CHANGE ME TO AN ACTUAL FUNCTION

  add: (req, res) => {
    knex('categories').then((categories)=> {
      knex('recipes').join('rec_to_cat', 'recipes.id', "rec_to_cat.recipe_id").join('categories', 'rec_to_cat.category_id', 'categories.id').where('recipes.id', req.params.recipe_id).then((added_cats) => {
        res.render('add-categories', {categories:categories, recipe:req.params.recipe_id, added_cats: added_cats})
      })
    })
  },

  insert: (req, res) => {
    knex('rec_to_cat').where('recipe_id', req.params.recipe_id).where('category_id', req.body.categories).then((category) => {
      if(category.length >=1) {
        res.redirect('/categories/'+req.params.recipe_id)
      }else{
        knex('rec_to_cat').insert({
          recipe_id: req.params.recipe_id,
          category_id: req.body.categories
        }).then(() => {
          res.redirect('/categories/'+req.params.recipe_id)
        })
      }
    })
  },

  remove: (req, res) => {
    knex('rec_to_cat').where('recipe_id', req.params.recipe_id).where('category_id', req.params.category_id).del().then(() => {
      res.redirect('/categories/'+req.params.recipe_id)
    })
  }
}
