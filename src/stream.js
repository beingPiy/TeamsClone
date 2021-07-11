// stream module will return a function which will set up platform for communication
// socket arguement should be passed to it
const stream = ( socket ) => {
    socket.on( 'subscribe', ( info ) => {
        //joining room for meeting
        socket.join( info.socketId );
        socket.join( info.room );

        // new user arrived 
        // inform other member
        if ( socket.adapter.rooms[info.room].length > 1 ) {
            socket.to( info.room ).emit( 'new user', { socketId: info.socketId } );
        }
    } );

    // starting communication with new user added
    socket.on( 'newUserStart', ( info ) => {
        socket.to( info.to ).emit( 'newUserStart', { sender: info.sender } );
    } );

    // client starts the communication and creates an offer 
    // using Session Description Protocol(SDP) 
    // and transfers it to other peer
    socket.on( 'sdp', ( info ) => {
        socket.to( info.to ).emit( 'sdp', { description: info.description, sender: info.sender } );
    } );


    // ice candidate have 'node' of the network , before it reaches outside 
    // We share these ICE's to the other peer, such that they know 
    // connection points to reach us

    socket.on( 'ice candidates', ( info ) => {
        socket.to( info.to ).emit( 'ice candidates', { candidate: info.candidate, sender: info.sender } );
    } );


    // for working with chat functionality
    // note that we are sharing sender info in sender key
    socket.on( 'chat', ( info ) => {
        socket.to( info.room ).emit( 'chat', { sender: info.sender, msg: info.msg } );
    } );
};

module.exports = stream;
