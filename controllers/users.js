const knex = require("../db/knex.js");

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
      // res.json(recipes);
        res.render("index", {recipes:recipes});
    })

  },

  categories: (req, res) => {
    knex('recipes').join('rec_to_cat', 'recipes.id', "rec_to_cat.recipe_id").join('categories', 'rec_to_cat.category_id', 'categories.id').join('users', 'users.id', 'recipes.user_id').where('categories.id', req.params.id).then((results) => {
      // res.json(results);
      res.render("index", {recipes:results});
    })



  },

  register:function(req,res){
    req.session.errors = null
    knex("users").insert({
      name:req.body.name,
      email:req.body.email,
      bio:req.body.bio,
      img_url:req.body.img_url,
      password:req.body.password
    }).then(()=>{
      res.redirect('/users/login');
    }).catch(()=>{
      req.session.errors.push("Register was invalid");
    })

  },
  login:function(req,res){
    req.session.errors = null
    req.session.admin = null
    knex('users').where("email", req.body.email).then((results)=>{
      let user=results[0];
      if(user.password===req.body.password){ //store the user id in session
        req.session.user_id=user.id;
        if (user.admin) {
          req.session.admin = true;
        }
        req.session.save(()=>{
          res.redirect(`/existingusers_profile`);
        })
      }  else{
          req.session.errors = "Email or Password was invalid";
          req.session.save(()=>{
            res.redirect("/users/login");
          })
        }
}).catch(()=>{
      req.session.errors.push("Email or Password was invalid");
      req.session.save(()=>{
        res.redirect("/users/login");
      })
    })
  },
    //   }else {
    //     res.redirect('/');
    //   }
    //   }).catch(()=>{
    //     res.redirect('/');
    // })



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
