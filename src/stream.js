// stream module will return a function which will set up platform for communication
// socket arguement should be passed to it
const stream = ( socket ) => {
    socket.on( 'subscribe', ( data ) => {
        //joining room
        socket.join( data.room );
        socket.join( data.socketId );

        //Inform other members in the room of new user's arrival
        if ( socket.adapter.rooms[data.room].length > 1 ) {
            socket.to( data.room ).emit( 'new user', { socketId: data.socketId } );
        }
    } );


    socket.on( 'newUserStart', ( data ) => {
        socket.to( data.to ).emit( 'newUserStart', { sender: data.sender } );
    } );


    socket.on( 'sdp', ( data ) => {
        socket.to( data.to ).emit( 'sdp', { description: data.description, sender: data.sender } );
    } );


    // ice candidate have 'node' of the network , before it reaches outside 
    // We share these ICE's to the other peer, such that they know 
    // connection points to reach us

    socket.on( 'ice candidates', ( data ) => {
        socket.to( data.to ).emit( 'ice candidates', { candidate: data.candidate, sender: data.sender } );
    } );


    // for working with chat functionality
    // note that we are sharing sender data in sender key
    socket.on( 'chat', ( data ) => {
        socket.to( data.room ).emit( 'chat', { sender: data.sender, msg: data.msg } );
    } );
};

module.exports = stream;
