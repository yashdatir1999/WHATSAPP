var express = require('express');
var router = express.Router();

const USER = require("../module/usermodel")
const passport = require("passport")
const LocalStrategy = require("passport-local")
passport.use(new LocalStrategy(USER.authenticate()))
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signin', async function(req, res, next) {
try {
  await USER.register({
    mobile: req.body.mobile ,
    email: req.body.email,
    username: req.body.username
  }, req.body.password)
  res.redirect("/otp")
} catch (error) {
 res.send(error) 
}
});

router.get('/otp', function(req, res, next) {
  res.render('otp', { title: 'Express' });
});


module.exports = router;
