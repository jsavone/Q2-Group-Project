//Update the name of the controller below and rename the file.
const users = require("../controllers/users.js")
const recipes = require("../controllers/recipes.js")
const comments = require("../controllers/comments.js")

module.exports = function(app){

app.get('/', users.index);
app.get('/users/login', users.render);
app.post('/register', users.register);
app.post('/login', users.login);
app.use(authenticateUser);
app.get('/recipe/:id', recipes.view);


}

function authenticateUser(req, res, next) {
  if (!req.session.doctor_id) {
    res.redirect('/')
  } else {
    next();
  }
}
