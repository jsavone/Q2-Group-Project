const knex = require("../db/knex.js");
const hasher = require("../config/hasher");

module.exports = {

  newUsers: function(req, res) {
    if(!req.session.errors) {
      req.session.errors = null;
      req.session.save(() => {
        res.render("register", {errors: req.session.errors});
      })
    }else {
      res.render("register", {errors: req.session.errors});
    }
  },

  existingUsers: function(req,res){
    if(req.session.success) {
      res.render("login", {errors: req.session.errors = null, success: req.session.success})
      req.session.save(() => {
        req.session.success = null
        req.session.errors = null
      })
    }else if (req.session.errors){
      res.render("login", {errors: req.session.errors, success: req.session.success = null})
      req.session.save(() => {
        req.session.success = null
        req.session.errors = null
      })
    }else{
      res.render("login", {errors: req.session.errors=null, success: req.session.success = null})
    }
  },

  index: function(req, res) {
      req.session.errors = null;
      req.session.success = null;
    knex('recipes').join('users', 'users.id', 'recipes.user_id').select('recipes.*', 'users.name', 'users.id as users_id').orderBy('recipes.total_votes', 'desc').then((recipes) => {
      knex('categories').then((categories) => {
        res.render("index", {recipes:recipes, categories:categories, user: req.session.user_id || null});
      })
    })
  },

  categories: (req, res) => {
    knex('recipes').join('rec_to_cat', 'recipes.id', "rec_to_cat.recipe_id").join('categories', 'rec_to_cat.category_id', 'categories.id').join('users', 'users.id', 'recipes.user_id').where('categories.id', req.params.id).then((results) => {
        knex('categories').then((categories) => {
          res.render("index", {recipes:results, categories:categories});
      })
    })
  },

  register:function(req,res){
    req.session.errors = null;
    req.session.success = null;
    if(req.body.password == req.body.confirm) {
      hasher.hash(req.body).then((users) => {
        knex("users").insert({
          name:users.name,
          email:users.email,
          bio:users.bio,
          img_url: users.img_url,
          password:users.password
        }).then(()=>{
          req.session.success = "New user has been created! You may now log in."
          req.session.errors = null;
          req.session.save(() => {
            res.redirect('/users/login');
          })
        })
      })
      }else{
        req.session.errors = 'Confirm password did not match. Please try again.'
        req.session.save(() => {
          res.redirect('/users/register')
        })

      }
  },

  login:function(req,res){
    req.session.errors = null;
    req.session.success = null;
    req.session.admin = null;
    knex('users').where("email", req.body.email).then((results)=>{
      let user=results[0];
      hasher.check(user, req.body).then((isMatch) => {
        if (isMatch) {
          req.session.user_id = user.id;
          if (user.admin) {
            req.session.admin = true;
          }
          req.session.save(() => {
            res.redirect(`/profile`);
          })
        } else {
        req.session.errors = "Email or Password was invalid";
          req.session.save(()=>{
            res.redirect("/users/login");
          })
        }
      })
      }).catch(()=>{
            req.session.errors.push("Email or Password was invalid");
            req.session.save(()=>{
              res.redirect("/users/login");
      })
    })
  },

  profile: async function(req, res) {
    req.session.errors = null
    const users = await knex("users").where("id", req.session.user_id);
    const recipe = await knex("recipes").where({user_id: req.session.user_id});
    const saved_recipes = await knex("saved_recipes").where({user_id: req.session.user_id});
    const finalSavedRecipes = await Promise.all(saved_recipes.map(saved_recipe =>
                              knex("recipes").where({id: saved_recipe.recipe_id}).first()
                            )) ;
    res.render("user-profile", {
      user: users[0],
      recipe,
      saved_recipes: finalSavedRecipes,
      saved_id: saved_recipes
    });
  },

  details: function(req, res) {
    knex("users").where("id", req.session.user_id)
      .then((results) => {
        knex("recipes").where({
          user_id: req.session.user_id,
          id: req.params.id
          })
          .then((data) => {
            res.render("recipe-details", {
              user: results[0],
              recipe: data[0]
            });
          })
      })
  },
  logout: function(req, res) {
    req.session.destroy();
    res.redirect("/");
  },

}
