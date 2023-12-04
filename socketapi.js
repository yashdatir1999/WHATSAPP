// const USER = require("./module/usermodel")

const io = require( "socket.io" )();
const socketapi = {
    io: io
};

// Add your socket.io logic here!
io.on( "connection", function( socket ) {
    console.log( "A user connected" );

    socket.on ("sending" , async(msg) =>{
        console.log(msg)
        socket.broadcast.emit("resivemsg" , msg)
    } )
});
// end of socket.io logic



module.exports = socketapi;
