const knex = require("../db/knex.js");
const hasher = require("../config/hasher");

module.exports = {
  // CHANGE ME TO AN ACTUAL FUNCTION

  newUsers: function(req, res) {
    res.render("register");
  },
  existingUsers: function(req,res){
    if(!req.session.errors){
      req.session.errors = null;
    }
    res.render("login", {errors: req.session.errors});
    },

  index: function(req, res) {
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
  register: (req, res) => {
    hasher.hash(req.body).then((doctors) => {
      knex("doctors").insert({
        name: doctors.name,
        email: doctors.email,
        bio: doctors.bio,
        img_url: doctors.img_url,
        password: doctors.password
      }).then(() => {
        res.redirect('/doctors/login');
      }).catch(() => {
        req.session.errors.push("Register was invalid");
      })
    })

  },
  register:function(req,res){
    req.session.errors = null;
    hasher.hash(req.body).then((users) => {
    knex("users").insert({
      name:users.name,
      email:users.email,
      bio:users.bio,
      img_url:users.img_url,
      password:users.password
    }).then(()=>{
      res.redirect('/users/login');
    }).catch(()=>{
      req.session.errors.push("Register was invalid");
    })
  })

  },




  login:function(req,res){
    req.session.errors = null
    req.session.admin = null
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
    // console.log('finalSavedRecipes ', finalSavedRecipes)
    res.render("user-profile", {
      user: users[0],
      recipe,
      saved_recipes: finalSavedRecipes,
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
