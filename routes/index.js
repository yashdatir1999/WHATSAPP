var express = require('express');
var router = express.Router();

const USER = require("../module/usermodel")
const passport = require("passport")
const LocalStrategy = require("passport-local")
passport.use(new LocalStrategy(USER.authenticate()))
const nodemailer = require("nodemailer")
const idpass = require("../idpasswordhide")

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signin', async function(req, res, next) {
  try {
    const user = await USER.findOne({mobile: req.body.mobile})
        if(!user){
              await USER.register({
              mobile: req.body.mobile ,
              email: req.body.email,
              username: req.body.username,
            }, req.body.password)
            const newuser = await USER.findOne({mobile: req.body.mobile})
            otphendeler(req,res,newuser)
        }else{
          otphendeler(req,res,user)
        }
  
    // res.redirect("/otp")
  } catch (error) {
    console.log(error)
   res.send(error) 
  }
  });

  function otphendeler(req,res,user){
    const otp = Math.floor(1000+Math.random()*999)

// admin mail address, which is going to be the sender
const transport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: idpass.gmail,
    pass: idpass.password,
  },
});

// receiver mailing info
const mailOptions = {
  from: "whatsappClone Pvt. Ltd.<yashdatir@gmail.com>",
  to: user.email,
  subject: "whatsApp Clone",
  html: `Do Not Share OTP: <h1>OTP - ${otp}</h1>`,
};

// actual object which intregrate all info and send mail
transport.sendMail(mailOptions, (err, info) => {
  if (err) return res.send(err);
  console.log(info);
  user.loginotp = otp
  user.save()
  res.render("otp",{user})
});
}

router.post('/checkotp/:id', async function(req, res, next) {
  try {
    const user = await USER.findById(req.params.id)
    user.loginotp = -1
    await user.save()
    // res.render("whatapp" , {user})
    res.redirect(`/whatapp/${req.params.id}`)
  } catch (error) {
    res.send(error)
  }
});

router.get('/whatapp/:id', async function(req, res, next) {
  try {
    const alluser = await USER.find()
    console.log(alluser)
    const user = await USER.findById(req.params.id)
    res.render("whatapp" , {user , alluser: alluser.reverse()})
  } catch (error) {
    res.send(error)
  }
});

router.get('/setting/:id', async function(req, res, next) {
  try {
    const user = await USER.findById(req.params.id)
    res.render("setting" , {user})
  } catch (error) {
    res.send(error)
  }
});

router.post('/update/:id', async function(req, res, next) {
  try {
    await USER.findByIdAndUpdate(req.params.id , {
      mobile: req.body.mobile , 
      username: req.body.username , 
      email: req.body.email,})
      res.redirect(`/setting/${req.params.id}`)
  } catch (error) {
    res.send(error)
  }
});

router.get('/delete/:id', async function(req, res, next) {
  try {
    await USER.findByIdAndDelete(req.params.id)
    res.redirect("/")
  } catch (error) {
    res.send(error)
  }
});

router.get('/signout', function(req, res, next) {
  req.logout(() =>{
    res.redirect("/")
  })
});

module.exports = router;


