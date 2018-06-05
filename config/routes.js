//Update the name of the controller below and rename the file.
const users = require("../controllers/users.js")
const recipes = require("../controllers/recipes.js")
const comments = require("../controllers/comments.js")

module.exports = function(app){

app.get('/', users.index);
app.get('/users/login', users.render);
app.post('/register', users.register);
app.post('/login', users.login);

app.get('/recipe/:id', recipes.view)
app.use(authenticateUser);
app.get('/recipe/delete/:id', recipes.delete)
app.get('/recipe/upvote/:id', recipes.upvote);
app.get('/recipe/downvote/:id', recipes.downvote);
app.get('/recipe/save/:id', recipes.save);
app.get('/create/recipe',recipes.create_recipe);
app.post('/create/recipe',recipes.add_recipe);
app.post('/comment/:recipe_id', comments.add);
}

function authenticateUser(req, res, next){
  if(!req.session.user_id){
    res.redirect("/users/login");
  }else{
    next();
  }
}
