const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/WHATSAPP")

.then(()=>console.log("WHATASAPP DB CONNECTED"))
.catch((err)=> console.log(err))