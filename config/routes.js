
const users = require("../controllers/users.js")
const recipes = require("../controllers/recipes.js")
const comments = require("../controllers/comments.js")
const categories = require("../controllers/categories.js")

module.exports = function(app){
app.get('/', users.index);
app.get('/users/login', users.existingUsers);
app.get('/users/register', users.newUsers);
app.post('/register', users.register);
app.post('/login', users.login);
app.get('/recipe/:id', recipes.view);
app.get('/recipe/categories/:id', users.categories);
app.use(authenticateUser);
app.get('/profile', users.profile);
app.get('/recipe/delete/:id', recipes.delete)
app.get('/recipe/upvote/:id', recipes.upvote);
app.get('/recipe/downvote/:id', recipes.downvote);
app.get('/recipe/save/:id', recipes.save);
app.get('/recipe/remove/:id', recipes.remove_saved);
app.get('/recipe/edit/:id', recipes.recipeEdit);
app.post('/recipe/update/:id', recipes.recipeUpdate);
app.get('/create_recipe/:id',recipes.create_recipe);
app.post('/create/recipe',recipes.add_recipe);
app.post('/comment/:recipe_id', comments.add);
app.get('/comment/delete/:recipe_id/:comment_id', comments.delete);
app.get('/categories/:recipe_id', categories.add);
app.post('/categories/:recipe_id', categories.insert);
app.get('/categories/remove/:recipe_id/:category_id', categories.remove);
app.get('/logout', users.logout);
}

function authenticateUser(req, res, next){
  if(!req.session.user_id){
    res.redirect("/users/login");
  }else{

    next();
  }
}
