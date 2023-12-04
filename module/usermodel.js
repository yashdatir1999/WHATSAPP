const mongoose = require("mongoose")

const plm = require("passport-local-mongoose")

const user = new mongoose.Schema({
    mobile: Number,
    email: String,
    username: String,
    loginotp: {
        type: Number,
        default: -1
    },

})

user.plugin(plm,{usernameField: "mobile"})
module.exports = mongoose.model("WHATSAPPUSER" , user)