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
    password: String
})

user.plugin(plm)
module.exports = mongoose.model("WHATSAPP USER" , user)