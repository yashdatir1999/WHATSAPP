var express = require('express');
var router = express.Router();

const USER = require("../module/usermodel")
const passport = require("passport")
const LocalStrategy = require("passport-local")
passport.use(new LocalStrategy(USER.authenticate()))
const nodemailer = require("nodemailer")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signin', async function(req, res, next) {
  try {
        const alluser = await USER.find()
        console.log(alluser)
        alluser.forEach(async (u)=>{
          if(u.mobile == req.body.mobile){
              const user = u;
            console.log(user)
            otphendeler(req,res,user)
          }else{
            await USER.register({
              mobile: req.body.mobile ,
              email: req.body.email,
              username: req.body.username
            }, req.body.password)
            const user = await USER.findOne({mobile: req.body.mobile})
            otphendeler(req,res,user)
          }
        })
        
  
    // res.redirect("/otp")
  } catch (error) {
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
      user: "yashdatir1999@gmail.com",
      pass: "itha rodw dwpr ikbk",
  },
});

// receiver mailing info
const mailOptions = {
  from: "Dhanesh Pvt. Ltd.<dhanesh1296@gmail.com>",
  to: user.email,
  subject: "Testing Mail Service",
  html: `<h1>OTP - ${otp}</h1>`,
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
    res.render("whatapp")
  } catch (error) {
    res.send(error)
  }
});



module.exports = router;



// router.post('/signin', async function(req, res, next) {
//   try {
//         const alluser = await USER.find()
//         console.log(alluser)
//         alluser.forEach(async (u)=>{
//           if(u.mobile == req.body.mobile){
//               const user = u;
//             console.log(user)
//             otphendeler(req,res,user)
//           }else{
//             await USER.register({
//               mobile: req.body.mobile ,
//               email: req.body.email,
//               username: req.body.username
//             }, req.body.password)
//             const user = await USER.findOne({mobile: req.body.mobile})
//             otphendeler(req,res,user)
//           }
//         })
        
  
//     // res.redirect("/otp")
//   } catch (error) {
//    res.send(error) 
//   }
//   });
  